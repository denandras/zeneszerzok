"use client";

import { useEffect, useRef, useState } from "react";
import { prepareWithSegments, layoutNextLine, type LayoutCursor } from "@chenglou/pretext";

interface ArrowObstacleLayoutProps {
  children: React.ReactNode;
  // Arrow zones as padding (in pixels)
  leftArrowWidth?: number;
  rightArrowWidth?: number;
  arrowPadding?: number;
  className?: string;
}

// Simple CSS-based approach using padding zones
export default function ArrowObstacleLayout({
  children,
  leftArrowWidth = 16, // Just the clickable area, minimal
  rightArrowWidth = 16,
  arrowPadding = 8, // Minimal padding around arrows
  className = "",
}: ArrowObstacleLayoutProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({
          width: rect.width,
          height: rect.height,
        });
      }
    };
    
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);
  
  // Calculate content area (excluding arrow zones)
  const contentLeft = leftArrowWidth + arrowPadding;
  const contentRight = dimensions.width - rightArrowWidth - arrowPadding;
  const contentWidth = Math.max(0, contentRight - contentLeft);
  
  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full ${className}`}
    >
      {/* Left arrow zone - invisible padding area */}
      <div
        className="absolute left-0 top-0 bottom-0 pointer-events-none"
        style={{ width: leftArrowWidth + arrowPadding }}
        aria-hidden="true"
      />
      
      {/* Right arrow zone - invisible padding area */}
      <div
        className="absolute right-0 top-0 bottom-0 pointer-events-none"
        style={{ width: rightArrowWidth + arrowPadding }}
        aria-hidden="true"
      />
      
      {/* Content area - safe zone for text */}
      <div
        className="absolute top-0 bottom-0 overflow-y-auto"
        style={{
          left: contentLeft,
          width: contentWidth,
        }}
      >
        {children}
      </div>
    </div>
  );
}

// Pretext-based flowing text component for long text blocks
interface PretextTextProps {
  text: string;
  font?: string;
  lineHeight?: number;
  className?: string;
  leftArrowWidth?: number;
  rightArrowWidth?: number;
  arrowPadding?: number;
}

export function PretextText({
  text,
  font = '14px "Sora", sans-serif',
  lineHeight = 22,
  className = "",
  leftArrowWidth = 64,
  rightArrowWidth = 64,
  arrowPadding = 32,
}: PretextTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<Array<{ text: string; y: number; width: number }>>([]);
  const [containerWidth, setContainerWidth] = useState(0);
  const preparedRef = useRef<ReturnType<typeof prepareWithSegments> | null>(null);
  
  useEffect(() => {
    if (!preparedRef.current) {
      preparedRef.current = prepareWithSegments(text, font);
    }
  }, [text, font]);
  
  useEffect(() => {
    const updateLayout = () => {
      if (!containerRef.current || !preparedRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const totalWidth = rect.width;
      const contentWidth = totalWidth - leftArrowWidth - rightArrowWidth - arrowPadding * 2;
      
      setContainerWidth(contentWidth);
      
      const prepared = preparedRef.current;
      const newLines: Array<{ text: string; y: number; width: number }> = [];
      let cursor: LayoutCursor = { segmentIndex: 0, graphemeIndex: 0 };
      let y = 0;
      
      // Simple layout - full width since we're in the safe zone
      while (cursor.segmentIndex < prepared.segments.length) {
        const line = layoutNextLine(prepared, cursor, contentWidth);
        if (line === null) break;
        
        newLines.push({
          text: line.text,
          y,
          width: line.width,
        });
        
        cursor = line.end;
        y += lineHeight;
      }
      
      setLines(newLines);
    };
    
    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, [text, font, lineHeight, leftArrowWidth, rightArrowWidth, arrowPadding]);
  
  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{ 
        paddingLeft: leftArrowWidth + arrowPadding,
        paddingRight: rightArrowWidth + arrowPadding,
      }}
    >
      <div className="relative" style={{ minHeight: lines.length * lineHeight }}>
        {lines.map((line, index) => (
          <div
            key={index}
            className="absolute left-0 right-0"
            style={{
              top: line.y,
              height: lineHeight,
              lineHeight: `${lineHeight}px`,
            }}
          >
            {line.text}
          </div>
        ))}
      </div>
    </div>
  );
}
