"use client";

import { useState, useRef, useEffect } from "react";
import { program, type Piece } from "../data/program";

interface ProgramViewerProps {
  startIndex?: number;
  onBackToIndex: () => void;
}

export default function ProgramViewer({ startIndex = 0, onBackToIndex }: ProgramViewerProps) {
  const pieces = program;
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

  const goToPrev = () => scrollToPage(currentIndex - 1);
  const goToNext = () => scrollToPage(currentIndex + 1);

  return (
    <div 
      className="h-[100dvh] flex flex-col overflow-hidden relative"
      style={{
        backgroundImage: 'url(/background-image.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Dark overlay - pointer-events-none so clicks pass through */}
      <div className="absolute inset-0 bg-black/50 pointer-events-none" />
      
      {/* Header - Műsor and number on one line with spacing */}
      <div className="flex-shrink-0 px-8 py-6 flex items-center justify-between relative z-10">
        <button
          onClick={onBackToIndex}
          className="text-xs uppercase tracking-[0.2em] text-white hover:opacity-70 transition-opacity"
        >
          ← Vissza
        </button>
        <div className="flex items-center gap-3">
          <span className="text-xs uppercase tracking-[0.15em] text-white/60">Műsor</span>
          <span className="text-xs text-white/40">|</span>
          <span className="text-sm font-light text-white">{String(currentIndex + 1).padStart(2, "0")}</span>
        </div>
      </div>

      {/* Horizontal scroll container */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-x-auto overflow-y-hidden snap-x snap-mandatory hide-scrollbar flex"
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

      {/* Bottom bar - dots with space above and below */}
      <div className="flex-shrink-0 px-6 pt-4 pb-8 relative z-10">
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
      </div>
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
      </div>
    );
  }

  // Regular piece page
  return (
    <div className="w-screen h-full flex-shrink-0 snap-center snap-always overflow-hidden relative flex">
      {/* Center content - with padding to keep away from arrows */}
      <div className="flex-1 flex flex-col items-center justify-start px-8 md:px-24 gap-6 py-8 overflow-y-auto">
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
        <div className="space-y-3 text-center">
          {piece.performers.map((performer, i) => (
            <p key={i} className="text-sm text-white">
              {performer}
            </p>
          ))}
        </div>
        
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
    </div>
  );
}
