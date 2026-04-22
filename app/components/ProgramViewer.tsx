"use client";

import { useState, useRef, useEffect } from "react";
import { getPieces, type Piece } from "../data/program";

interface ProgramViewerProps {
  startIndex?: number;
  onBackToIndex: () => void;
}

export default function ProgramViewer({ startIndex = 0, onBackToIndex }: ProgramViewerProps) {
  const pieces = getPieces();
  const [currentIndex, setCurrentIndex] = useState(startIndex);
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

  // Scroll to selected page on mount
  useEffect(() => {
    if (scrollRef.current && startIndex > 0) {
      scrollRef.current.scrollTo({
        left: startIndex * scrollRef.current.clientWidth,
        behavior: "auto",
      });
    }
  }, [startIndex]);

  const scrollToPage = (index: number) => {
    if (scrollRef.current && index >= 0 && index < pieces.length) {
      scrollRef.current.scrollTo({
        left: index * scrollRef.current.clientWidth,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-black">
      {/* Top navigation bar */}
      <div className="flex-shrink-0 flex items-center justify-between px-6 py-4 border-b border-gray-900">
        <button
          onClick={onBackToIndex}
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
        className="flex-1 overflow-x-auto overflow-y-hidden snap-x snap-mandatory hide-scrollbar flex"
      >
        {pieces.map((piece) => (
          <Page key={piece.id} piece={piece} />
        ))}
      </div>

      {/* Bottom progress dots */}
      <div className="flex-shrink-0 flex justify-center gap-2 py-6 border-t border-gray-900">
        {pieces.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToPage(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentIndex === index
                ? "bg-white w-8"
                : "w-2 bg-gray-800 hover:bg-gray-600"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

interface PageProps {
  piece: Piece;
}

function Page({ piece }: PageProps) {
  const formattedId = piece.id.toString().padStart(2, "0");

  return (
    <div className="w-screen h-full flex-shrink-0 snap-center snap-always overflow-hidden">
      <div className="h-full overflow-y-auto custom-scrollbar">
        {/* Main content area with good whitespace */}
        <div className="min-h-[calc(100vh-180px)] flex flex-col items-center justify-center px-6 py-12 md:py-16 relative"
        >
          {/* Background number - subtle */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
          >
            <span className="text-[20rem] md:text-[30rem] font-extralight text-gray-900 opacity-20 leading-none">
              {formattedId}
            </span>
          </div>

          {/* Content with generous spacing */}
          <div className="relative z-10 text-center max-w-2xl w-full">
            {/* Composer */}
            <p className="text-xs md:text-sm uppercase tracking-[0.25em] text-gray-500 mb-6">
              {piece.composer}
            </p>

            {/* Title */}
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-light mb-12 md:mb-16 leading-tight">
              {piece.title}
            </h2>

            {/* Image - moved up, prominent */}
            <div className="w-56 h-56 md:w-72 md:h-72 mx-auto mb-12 md:mb-16 border border-gray-800 bg-gray-950 flex items-center justify-center rounded-sm"
            >
              <svg
                className="w-16 h-16 text-gray-800"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={0.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>

            {/* Performers - centered, clean */}
            <div className="space-y-2 md:space-y-3 mb-16 md:mb-20">
              {piece.performers.map((performer, i) => (
                <p key={i} className="text-sm md:text-base text-gray-400">
                  {performer}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Description section - always visible, scrollable */}
        <div className="border-t border-gray-900 bg-gray-950/50">
          <div className="max-w-xl mx-auto px-6 py-12 md:py-16">
            <p className="text-gray-400 leading-relaxed text-center text-sm md:text-base">
              {piece.description}
            </p>
          </div>
        </div>

        {/* Bottom spacer for comfortable scrolling */}
        <div className="h-20"></div>
      </div>
    </div>
  );
}
