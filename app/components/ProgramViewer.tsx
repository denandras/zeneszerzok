"use client";

import { useState, useRef, useEffect } from "react";
import { program, type Piece } from "../data/program";
import BackgroundImage from "./BackgroundImage";

interface ProgramViewerProps {
  startIndex?: number;
  onBackToIndex: () => void;
}

export default function ProgramViewer({ startIndex = 0, onBackToIndex }: ProgramViewerProps) {
  const pieces = program;
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isScrollingProgrammatically = useRef(false);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      // Ignore scroll events during programmatic scrolling
      if (isScrollingProgrammatically.current) return;
      
      const scrollLeft = scrollContainer.scrollLeft;
      const pageWidth = scrollContainer.clientWidth;
      const newIndex = Math.round(scrollLeft / pageWidth);
      // Use functional update to avoid stale closure
      setCurrentIndex((prev) => {
        if (newIndex !== prev && newIndex >= 0 && newIndex < pieces.length) {
          return newIndex;
        }
        return prev;
      });
    };

    scrollContainer.addEventListener("scroll", handleScroll);
    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, [pieces.length]); // Remove currentIndex dependency

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
      // Set flag to ignore scroll events during animation
      isScrollingProgrammatically.current = true;
      
      scrollRef.current.scrollTo({
        left: index * scrollRef.current.clientWidth,
        behavior: "smooth",
      });
      
      setCurrentIndex(index);
      
      // Clear flag after smooth scroll animation completes (~500ms)
      setTimeout(() => {
        isScrollingProgrammatically.current = false;
      }, 500);
    }
  };

  const goToPrev = () => scrollToPage(currentIndex - 1);
  const goToNext = () => scrollToPage(currentIndex + 1);

  return (
    <div className="h-[100dvh] grid grid-rows-[auto_1fr_auto] overflow-hidden relative">
      {/* Shared background - prevents flicker, consistent brightness */}
      <BackgroundImage />

      {/* Header - single row, vertically centered: number left, arrow+Műsor center */}
      <header className="px-6 md:px-12 py-6 md:py-10 relative z-20">
        <div className="flex items-center justify-between relative max-w-6xl mx-auto">
          {/* Big number on left */}
          <button
            onClick={onBackToIndex}
            className="text-xl md:text-2xl font-extralight text-white/30 hover:text-white/60 transition-colors leading-none py-2 px-3"
            aria-label="Vissza a műsorhoz"
          >
            {String(currentIndex + 1).padStart(2, "0")}
          </button>

          {/* Center: arrow + Műsor */}
          <button
            onClick={onBackToIndex}
            className="flex items-center justify-center gap-2 text-xs md:text-sm uppercase tracking-[0.2em] text-white hover:opacity-70 transition-opacity py-2 px-4"
          >
            <span>←</span>
            <span>Műsor</span>
          </button>

          {/* Spacer to balance the layout */}
          <div className="w-12 md:w-16 flex-shrink-0"></div>
        </div>
      </header>

      {/* Horizontal scroll container - fills remaining space */}
      <div
        ref={scrollRef}
        className="overflow-x-auto overflow-y-hidden snap-x snap-mandatory hide-scrollbar flex"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {pieces.map((piece, index) => (
          <Page
            key={piece.id}
            piece={piece}
            isActive={index === currentIndex}
            showPrev={index > 0}
            showNext={index < pieces.length - 1}
            onPrev={goToPrev}
            onNext={goToNext}
          />
        ))}
      </div>

      {/* Bottom bar - dots with 3x space above and below */}
      <footer className="px-6 pt-12 pb-24 relative z-20">
        <div className="flex justify-center items-center gap-2">
          {pieces.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToPage(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? "bg-white w-6"
                  : "w-1.5 bg-gray-700 hover:bg-gray-500"
              }`}
            />
          ))}
        </div>
      </footer>
    </div>
  );
}

interface PageProps {
  piece: Piece;
  isActive: boolean;
  showPrev: boolean;
  showNext: boolean;
  onPrev: () => void;
  onNext: () => void;
}

function Page({ piece, isActive, showPrev, showNext, onPrev, onNext }: PageProps) {
  // Intermission page
  if (piece.id === -1) {
    return (
      <div className="w-screen h-full flex-shrink-0 snap-center snap-always overflow-hidden relative flex items-center justify-center">
        <div className="flex items-center gap-6 px-8">
          <span className="w-20 md:w-32 h-px bg-gray-800"></span>
          <span className="text-sm md:text-base uppercase tracking-[0.4em] text-white">
            {piece.title}
          </span>
          <span className="w-20 md:w-32 h-px bg-gray-800"></span>
        </div>
        
        {/* Navigation arrows */}
        {showPrev && (
          <button
            onClick={onPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-1 bg-transparent text-white hover:opacity-70 transition-opacity"
            aria-label="Előző"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}
        {showNext && (
          <button
            onClick={onNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 bg-transparent text-white hover:opacity-70 transition-opacity"
            aria-label="Következő"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}

        {/* Invisible edge touch zones for navigation */}
        {showPrev && (
          <button
            onClick={onPrev}
            className="absolute left-0 top-0 w-16 h-full bg-transparent cursor-w-resize z-20"
            aria-label="Előző"
          />
        )}
        {showNext && (
          <button
            onClick={onNext}
            className="absolute right-0 top-0 w-16 h-full bg-transparent cursor-e-resize z-20"
            aria-label="Következő"
          />
        )}
      </div>
    );
  }

  // Regular piece page
  return (
    <div className="w-screen h-full flex-shrink-0 snap-center snap-always overflow-hidden relative flex">
      {/* Center content - starts from top with consistent spacing before image */}
      <div className="flex-1 flex flex-col items-center justify-start px-6 md:px-24 gap-5 pt-8 md:pt-16 pb-8 overflow-y-auto">
        {/* Venue above image */}
        <p className="text-[10px] uppercase tracking-[0.2em] text-white/50 text-center">
          Zeneakadémia, Solti terem
        </p>

        {/* Image */}
        <div className="relative w-32 h-32 md:w-40 md:h-40 flex-shrink-0 border border-gray-800 bg-gray-950">
          <svg
            className="absolute inset-0 w-full h-full p-6 md:p-8 text-white"
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

        {/* Composer + Title grouped with smaller gap */}
        <div className="flex flex-col items-center gap-1">
          <p className="text-[10px] uppercase tracking-[0.15em] text-white text-center max-w-md leading-relaxed">
            {piece.composer}
          </p>

          <h2 className="text-lg md:text-xl font-light leading-tight text-center max-w-md whitespace-nowrap">
            {piece.title}
          </h2>
        </div>

        {/* Description */}
        {piece.description && (
          <p className="text-sm text-white/80 text-center max-w-xs leading-relaxed px-4">
            {piece.description}
          </p>
        )}

        {/* Poem - with styled section headers */}
        {piece.poem && (
          <pre className="text-xs italic text-white/70 text-center max-w-xs leading-relaxed whitespace-pre-wrap font-sora px-4">
            {piece.poem.split('\n').map((line, i) => {
              // Check if line is a section header (Elegy, Moments, Detachment)
              const isHeader = ['Elegy', 'Moments', 'Detachment'].includes(line.trim());
              return (
                <span key={i} className={isHeader ? 'font-bold italic' : ''}>
                  {line}
                  {i < piece.poem!.split('\n').length - 1 ? '\n' : ''}
                </span>
              );
            })}
          </pre>
        )}

        {/* Poem metadata (year + author) */}
        {piece.poem && piece.poemAuthor && (
          <div className="text-center mt-2">
            {piece.poemYear && <p className="text-xs text-white/60">{piece.poemYear}</p>}
            <p className="text-xs text-white/60">-{piece.poemAuthor}-</p>
            {piece.poemTranslator && <p className="text-xs text-white/50 mt-1">{piece.poemTranslator}</p>}
          </div>
        )}

        {/* Performers */}
        {piece.performers.length > 0 && (
          <div className="space-y-3 text-center">
            <p className="text-xs uppercase tracking-[0.15em] text-white/60">
              Előadják:
            </p>
            {piece.performers.map((performer, i) => (
              <p key={i} className="text-sm text-white">
                {performer}
              </p>
            ))}
          </div>
        )}
        
        {/* Space after content */}
        <div className="h-12 flex-shrink-0" />
      </div>

      {/* Navigation arrows */}
      {showPrev && (
        <button
          onClick={onPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-1 bg-transparent text-white hover:opacity-70 transition-colors z-10"
          aria-label="Előző"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}
      {showNext && (
        <button
          onClick={onNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-1 bg-transparent text-white hover:opacity-70 transition-colors z-10"
          aria-label="Következő"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Invisible edge touch zones for navigation */}
      {showPrev && (
        <button
          onClick={onPrev}
          className="absolute left-0 top-0 w-16 h-full bg-transparent cursor-w-resize z-20"
          aria-label="Előző"
        />
      )}
      {showNext && (
        <button
          onClick={onNext}
          className="absolute right-0 top-0 w-16 h-full bg-transparent cursor-e-resize z-20"
          aria-label="Következő"
        />
      )}
    </div>
  );
}
