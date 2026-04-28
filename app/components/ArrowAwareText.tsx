"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { prepareWithSegments, layoutNextLine, type LayoutCursor } from "@chenglou/pretext";

interface FlowingTextProps {
  text: string;
  font?: string;
  lineHeight?: number;
  fontSize?: number;
  // Arrow obstacle zones
  leftArrowZone?: { x: number; y: number; width: number; height: number };
  rightArrowZone?: { x: number; y: number; width: number; height: number };
  arrowPadding?: number;
  className?: string;
}

interface TextLine {
  text: string;
  y: number;
  x: number;
  width: number;
}

// Calculate blocked horizontal interval for a line at y position
function getBlockedIntervalForLine(
  lineY: number,
  lineHeight: number,
  arrowZone: { x: number; y: number; width: number; height: number } | undefined,
  padding: number
): { left: number; right: number } | null {
  if (!arrowZone) return null;
  
  const lineTop = lineY;
  const lineBottom = lineY + lineHeight;
  const zoneTop = arrowZone.y - padding;
  const zoneBottom = arrowZone.y + arrowZone.height + padding;
  
  // Check if line intersects with arrow zone vertically
  if (lineBottom <= zoneTop || lineTop >= zoneBottom) return null;
  
  // Block this horizontal interval
  return {
    left: arrowZone.x - padding,
    right: arrowZone.x + arrowZone.width + padding,
  };
}

// Carve available slots from total width minus blocked intervals
function carveSlots(
  totalLeft: number,
  totalRight: number,
  blockedIntervals: Array<{ left: number; right: number }>,
  minWidth: number = 50
): Array<{ left: number; right: number }> {
  let slots = [{ left: totalLeft, right: totalRight }];
  
  for (const interval of blockedIntervals) {
    const next: Array<{ left: number; right: number }> = [];
    
    for (const slot of slots) {
      // No overlap
      if (interval.right <= slot.left || interval.left >= slot.right) {
        next.push(slot);
        continue;
      }
      
      // Left remainder
      if (interval.left > slot.left) {
        next.push({ left: slot.left, right: interval.left });
      }
      
      // Right remainder
      if (interval.right < slot.right) {
        next.push({ left: interval.right, right: slot.right });
      }
    }
    
    slots = next;
  }
  
  return slots.filter(slot => slot.right - slot.left >= minWidth);
}

export function FlowingText({
  text,
  font = '400 14px Sora, sans-serif',
  lineHeight = 22,
  fontSize = 14,
  leftArrowZone,
  rightArrowZone,
  arrowPadding = 16,
  className = "",
}: FlowingTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<TextLine[]>([]);
  const [scrollY, setScrollY] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const preparedRef = useRef<ReturnType<typeof prepareWithSegments> | null>(null);
  const contentHeightRef = useRef(0);
  
  // Prepare text once
  useEffect(() => {
    if (!preparedRef.current) {
      preparedRef.current = prepareWithSegments(text, font);
    }
  }, [text, font]);
  
  // Handle scroll
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;
    
    const handleScroll = () => {
      setScrollY(scrollContainer.scrollTop);
    };
    
    scrollContainer.addEventListener("scroll", handleScroll, { passive: true });
    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Layout text with dynamic obstacle avoidance
  useEffect(() => {
    if (!containerRef.current || !preparedRef.current) return;
    
    const container = containerRef.current;
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    setContainerHeight(containerHeight);
    
    const prepared = preparedRef.current;
    const newLines: TextLine[] = [];
    let cursor: LayoutCursor = { segmentIndex: 0, graphemeIndex: 0 };
    let y = 0;
    
    // Layout each line
    while (cursor.segmentIndex < prepared.segments.length) {
      // Check for obstacles at this line's position (accounting for scroll)
      const screenY = y - scrollY;
      const blockedIntervals: Array<{ left: number; right: number }> = [];
      
      // Check left arrow
      const leftBlock = getBlockedIntervalForLine(
        screenY,
        lineHeight,
        leftArrowZone,
        arrowPadding
      );
      if (leftBlock) blockedIntervals.push(leftBlock);
      
      // Check right arrow  
      const rightBlock = getBlockedIntervalForLine(
        screenY,
        lineHeight,
        rightArrowZone,
        arrowPadding
      );
      if (rightBlock) blockedIntervals.push(rightBlock);
      
      // Get available slots
      const slots = carveSlots(0, containerWidth, blockedIntervals);
      
      if (slots.length === 0) {
        // No space, skip this line
        y += lineHeight;
        continue;
      }
      
      // Use the widest slot for simplicity
      const widestSlot = slots.reduce((widest, slot) => 
        (slot.right - slot.left) > (widest.right - widest.left) ? slot : widest
      );
      
      const slotWidth = widestSlot.right - widestSlot.left;
      const line = layoutNextLine(prepared, cursor, slotWidth);
      
      if (line === null) break;
      
      newLines.push({
        text: line.text,
        y,
        x: widestSlot.left,
        width: line.width,
      });
      
      cursor = line.end;
      y += lineHeight;
    }
    
    contentHeightRef.current = y;
    setLines(newLines);
  }, [text, font, lineHeight, leftArrowZone, rightArrowZone, arrowPadding, scrollY, containerHeight]);
  
  return (
    <div ref={scrollRef} className={`overflow-y-auto h-full ${className}`}>
      <div 
        ref={containerRef} 
        className="relative w-full"
        style={{ height: contentHeightRef.current || "auto" }}
      >
        {lines.map((line, index) => (
          <div
            key={index}
            className="absolute whitespace-nowrap"
            style={{
              left: line.x,
              top: line.y,
              height: lineHeight,
              lineHeight: `${lineHeight}px`,
              fontSize: `${fontSize}px`,
            }}
          >
            {line.text}
          </div>
        ))}
      </div>
    </div>
  );
}

// Wrapper that sets up arrow zones based on viewport
interface ArrowAwareTextProps {
  text: string;
  font?: string;
  fontSize?: number;
  lineHeight?: number;
  className?: string;
}

export default function ArrowAwareText({
  text,
  font = '400 14px Sora, sans-serif',
  fontSize = 14,
  lineHeight = 22,
  className = "",
}: ArrowAwareTextProps) {
  const [arrowZones, setArrowZones] = useState<{
    left?: { x: number; y: number; width: number; height: number };
    right?: { x: number; y: number; width: number; height: number };
  }>({});
  
  useEffect(() => {
    const calculateZones = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const arrowSize = 48; // w-8 h-8 (32px) + padding
      const arrowY = vh / 2 - arrowSize / 2;
      
      // Left arrow zone (matches the fixed position in ProgramViewer)
      setArrowZones({
        left: {
          x: 16, // left-4 = 16px
          y: arrowY,
          width: arrowSize,
          height: arrowSize,
        },
        right: {
          x: vw - 16 - arrowSize, // right-4 = 16px from right
          y: arrowY,
          width: arrowSize,
          height: arrowSize,
        },
      });
    };
    
    calculateZones();
    window.addEventListener("resize", calculateZones);
    return () => window.removeEventListener("resize", calculateZones);
  }, []);
  
  return (
    <FlowingText
      text={text}
      font={font}
      fontSize={fontSize}
      lineHeight={lineHeight}
      leftArrowZone={arrowZones.left}
      rightArrowZone={arrowZones.right}
      arrowPadding={20}
      className={className}
    />
  );
}
