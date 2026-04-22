"use client";

import { useState, useRef, useEffect } from "react";
import { getPieces, type Piece } from "../data/program";

interface ProgramViewerProps {
  startIndex?: number;
}

export default function ProgramViewer({ startIndex = 0 }: ProgramViewerProps) {
  const pieces = getPieces();
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [expandedPiece, setExpandedPiece] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Handle scroll snap detection
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      const scrollLeft = scrollContainer.scrollLeft;
      const pageWidth = scrollContainer.clientWidth;
      const newIndex = Math.round(scrollLeft / pageWidth);
      if (newIndex !== currentIndex && newIndex >= 0 && newIndex < pieces.length) {
        setCurrentIndex(newIndex);
      }
    };

    scrollContainer.addEventListener("scroll", handleScroll);
    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, [currentIndex, pieces.length]);

  const scrollToPage = (index: number) => {
    if (scrollRef.current && index >= 0 && index < pieces.length) {
      scrollRef.current.scrollTo({
        left: index * scrollRef.current.clientWidth,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  const goToIndex = () => {
    scrollToPage(0);
  };

  const toggleExpand = (id: number) => {
    setExpandedPiece(expandedPiece === id ? null : id);
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-black" ref={containerRef}>
      {/* Top navigation bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-900">
        <button
          onClick={goToIndex}
          className="text-xs uppercase tracking-[0.2em] text-gray-500 hover:text-white transition-colors"
        >
          ← Tartalom
        </button>
        <div className="text-xs text-gray-600 tracking-wider">
          {currentIndex + 1} / {pieces.length}
        </div>
      </div>

      {/* Horizontal scrolling pages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-x-auto overflow-y-hidden snap-x snap-mandatory hide-scrollbar"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {pieces.map((piece, index) => (
          <Page
            key={piece.id}
            piece={piece}
            isActive={currentIndex === index}
            isExpanded={expandedPiece === piece.id}
            onToggleExpand={() => toggleExpand(piece.id)}
          />
        ))}
      </div>

      {/* Bottom progress dots */}
      <div className="flex justify-center gap-2 py-6 border-t border-gray-900">
        {pieces.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToPage(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentIndex === index
                ? "bg-white w-8"
                : "bg-gray-800 hover:bg-gray-600"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

interface PageProps {
  piece: Piece;
  isActive: boolean;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

function Page({ piece, isActive, isExpanded, onToggleExpand }: PageProps) {
  const pageRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={pageRef}
      className="w-screen h-full flex-shrink-0 snap-center snap-always flex flex-col"
    >
      {/* Large page number */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 relative overflow-hidden"
      >
        {/* Background number */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span className="page-number text-gray-900 opacity-30">
            {piece.id.toString().padStart(2, "0")}
          </span>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center max-w-2xl">
          {/* Composer */}
          <p className="text-responsive-composer text-gray-500 mb-2">
            {piece.composer}
          </p>

          {/* Title */}
          <h2 className="text-responsive-title font-light mb-8">
            {piece.title}
          </h2>

          {/* Image placeholder */}
          <div className="w-48 h-48 md:w-64 md:h-64 mx-auto mb-8 border border-gray-800 bg-gray-950 flex items-center justify-center"
          >
            <svg
              className="w-12 h-12 text-gray-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>

          {/* Performers */}
          <div className="space-y-1 mb-6">
            {piece.performers.map((performer, i) => (
              <p key={i} className="text-sm md:text-base text-gray-400">
                {performer}
              </p>
            ))}
          </div>

          {/* Expand description */}
          <button
            onClick={onToggleExpand}
            className="text-xs uppercase tracking-[0.2em] text-gray-600 hover:text-gray-400 transition-colors flex items-center gap-2 mx-auto"
          >
            {isExpanded ? "Kevesebb ↑" : "Részletek ↓"}
          </button>
        </div>
      </div>

      {/* Expandable description panel */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-out bg-gray-950 border-t border-gray-900 ${
          isExpanded ? "max-h-[40vh]" : "max-h-0"
        }`}
      >
        <div className="p-6 overflow-y-auto custom-scrollbar max-h-[40vh]">
          <p className="text-gray-400 leading-relaxed max-w-prose mx-auto text-center">
            {piece.description}
          </p>
        </div>
      </div>
    </div>
  );
}
