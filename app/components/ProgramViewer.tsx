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

      <div
        ref={scrollRef}
        className="flex-1 overflow-x-auto overflow-y-hidden snap-x snap-mandatory hide-scrollbar flex"
      >
        {pieces.map((piece) => (
          <Page key={piece.id} piece={piece} />
        ))}
      </div>

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
        {/* Centered container with minimal margins */}
        <div className="min-h-full flex items-center justify-center px-4 md:px-8 py-8 md:py-12">
          <div className="relative w-full max-w-md md:max-w-lg">
            
            {/* Background number */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none -z-10">
              <span className="text-[18rem] md:text-[24rem] font-extralight text-gray-900 opacity-10 leading-none">
                {formattedId}
              </span>
            </div>

            {/* Content - centered layout */}
            <div className="text-center space-y-8 md:space-y-10">
              
              {/* Image - prominent */}
              <div className="w-56 h-56 md:w-72 md:h-72 mx-auto border border-gray-800 bg-gray-950 flex items-center justify-center"
              >
                <svg
                  className="w-16 h-16 md:w-20 md:h-20 text-gray-800"
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

              {/* Composer */}
              <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-gray-500">
                {piece.composer}
              </p>

              {/* Title */}
              <h2 className="text-2xl md:text-4xl font-light leading-tight">
                {piece.title}
              </h2>

              {/* Performers */}
              <div className="space-y-2 md:space-y-3 pt-4">
                {piece.performers.map((performer, i) => (
                  <p key={i} className="text-sm md:text-base text-gray-400">
                    {performer}
                  </p>
                ))}
              </div>

              {/* Description */}
              <div className="max-w-sm mx-auto pt-4">
                <p className="text-gray-500 leading-relaxed text-center text-sm md:text-base">
                  {piece.description}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom padding */}
        <div className="h-8"></div>
      </div>
    </div>
  );
}
