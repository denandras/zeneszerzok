"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { program, type Piece } from "../data/program";
import BackgroundImage from "./BackgroundImage";
import ArrowObstacleLayout from "./ArrowObstacleLayout";
import ArrowAwareText from "./ArrowAwareText";

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
      if (isScrollingProgrammatically.current) return;
      const scrollLeft = scrollContainer.scrollLeft;
      const pageWidth = scrollContainer.clientWidth;
      const newIndex = Math.round(scrollLeft / pageWidth);
      setCurrentIndex((prev) => {
        if (newIndex !== prev && newIndex >= 0 && newIndex < pieces.length) {
          return newIndex;
        }
        return prev;
      });
    };

    scrollContainer.addEventListener("scroll", handleScroll);
    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, [pieces.length]);

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
      isScrollingProgrammatically.current = true;
      scrollRef.current.scrollTo({
        left: index * scrollRef.current.clientWidth,
        behavior: "smooth",
      });
      setCurrentIndex(index);
      setTimeout(() => {
        isScrollingProgrammatically.current = false;
      }, 500);
    }
  };

  const goToPrev = () => scrollToPage(currentIndex - 1);
  const goToNext = () => scrollToPage(currentIndex + 1);

  const showPrev = currentIndex > 0;
  const showNext = currentIndex < pieces.length - 1;

  return (
    <div className="h-[100dvh] overflow-hidden relative flex flex-col">
      {/* Shared background */}
      <BackgroundImage />

      {/* Header - translucent with backdrop blur, larger */}
      <header className="fixed top-0 left-0 right-0 z-30 flex items-center px-6 py-8 min-h-[4rem] bg-black/30 backdrop-blur-md border-b border-white/10">
        {/* Műsor button - left corner with space padding */}
        <button
          onClick={onBackToIndex}
          className="flex items-center gap-2 text-white/80 hover:text-white transition-all duration-300 hover:scale-105 cursor-pointer pl-4"
          aria-label="Vissza a műsorhoz"
        >
          <span className="text-xs">  </span>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-xs uppercase tracking-[0.25em]">Műsor</span>
        </button>
      </header>

      {/* Static graphical arrows - left */}
      {showPrev && (
        <div className="fixed left-4 top-1/2 -translate-y-1/2 z-20 pointer-events-none">
          <svg className="w-8 h-8 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 19l-7-7 7-7" />
          </svg>
        </div>
      )}

      {/* Static graphical arrows - right */}
      {showNext && (
        <div className="fixed right-4 top-1/2 -translate-y-1/2 z-20 pointer-events-none">
          <svg className="w-8 h-8 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      )}

      {/* Full-height clickable zones on edges with scroll glow */}
      {showPrev && (
        <button
          onClick={goToPrev}
          className="fixed left-0 top-0 bottom-0 w-16 md:w-24 z-10 cursor-pointer"
          aria-label="Előző"
        />
      )}

      {showNext && (
        <button
          onClick={goToNext}
          className="fixed right-0 top-0 bottom-0 w-16 md:w-24 z-10 cursor-pointer"
          aria-label="Következő"
        />
      )}

      {/* Horizontal scroll container - fills full height, minimal top padding since content is centered */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-x-auto overflow-y-hidden snap-x snap-mandatory hide-scrollbar flex pt-20"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {pieces.map((piece, index) => (
          <PageContent
            key={piece.id}
            piece={piece}
            isActive={index === currentIndex}
            pageNumber={index + 1}
            isAdjacent={Math.abs(index - currentIndex) <= 1}
          />
        ))}
      </div>

      {/* Footer - fixed bottom, translucent with backdrop blur */}
      <footer className="fixed bottom-0 left-0 right-0 z-20 bg-black/30 backdrop-blur-md border-t border-white/10">
        <div className="px-8 py-4 min-h-[3rem] flex items-center justify-center grayscale relative">
          {/* Page number - bottom left, absolute positioned */}
          <span className="absolute left-[10px] text-2xl md:text-3xl font-extralight text-white/40 leading-none select-none">
            {String(currentIndex + 1).padStart(2, "0")}
          </span>

          {/* Dots - centered in footer */}
          <div className="flex items-center gap-2">
            {pieces.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToPage(index)}
                className={`h-1.5 rounded-full transition-all duration-300 z-10 ${
                  currentIndex === index
                    ? "bg-white w-6"
                    : "w-1.5 bg-white/30 hover:bg-white/50 "
                }`}
              />
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

interface PageContentProps {
  piece: Piece;
  isActive: boolean;
  pageNumber: number;
  isAdjacent: boolean;
}

function PageContent({ piece, isAdjacent }: PageContentProps) {
  // Intermission page - centered vertically (aligned with arrows)
  if (piece.id === -1) {
    return (
      <div className="w-screen h-full flex-shrink-0 snap-center snap-always relative flex items-center justify-center">
        <div className="flex items-center gap-6 px-16 md:px-24 w-full max-w-[calc(100%-52px)] md:max-w-[calc(100%-84px)]">
          <span className="flex-1 h-px bg-white/30"></span>
          <span className="text-sm md:text-base uppercase tracking-[0.4em] text-white flex-shrink-0">
            {piece.title}
          </span>
          <span className="flex-1 h-px bg-white/30"></span>
        </div>
      </div>
    );
  }

  // Regina's pieces have photos - preload adjacent images
  const hasPhoto = piece.composer === "Sebestyén-Lázár Regina";

  // Regular piece page
  return (
    <div className="w-screen min-h-full flex-shrink-0 snap-center snap-always relative overflow-y-auto">
      {/* 
        Responsive padding approach:
        - Base: px-16 (64px) provides base arrow clearance
        - md:px-28 (112px) extra room on larger screens
        Content stays centered and readable, arrows sit in the extra space
      */}
      <div className="flex flex-col items-center px-20 md:px-32 lg:px-40 gap-5 py-8">
        {/* Top spacer */}
        <div className="h-16 flex-shrink-0" />

        <div className="relative w-32 h-32 md:w-40 md:h-36 flex-shrink-0 border border-gray-800 bg-gray-950 overflow-hidden rounded-lg grayscale">
          {hasPhoto ? (
            <Image
              src="/regina.jpg"
              alt={piece.composer}
              fill
              className="object-cover"
              style={{ objectPosition: "center 15%" }}
              sizes="160px"
              loading={isAdjacent ? "eager" : "lazy"}
              priority={isAdjacent}
            />
          ) : (
            <svg
              className="absolute inset-0 w-full h-full p-6 md:p-8 text-white/20"
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
          )}
        </div>

        {/* Composer + Title - centered */}
        <div className="flex flex-col items-center gap-4">
          <p className="text-[10px] uppercase tracking-[0.15em] text-white text-center max-w-md leading-relaxed">
            {piece.composer}
          </p>
          <h2 className="text-lg md:text-xl font-light leading-tight text-center max-w-md">
            {piece.title}
          </h2>
        </div>

        {/* Description */}
        {piece.description && (
          <p className="text-sm text-white/80 text-center max-w-xs leading-relaxed">
            {piece.description}
          </p>
        )}

        {/* Poem */}
        {piece.poem && (
          <pre className="text-xs italic text-white/70 text-center max-w-xs leading-relaxed whitespace-pre-wrap font-sora">
            {piece.poem.split("\n").map((line, i, arr) => {
              const isHeader = ["Elegy", "Moments", "Detachment"].includes(line.trim());
              return (
                <span key={i} className={isHeader ? "font-bold italic" : ""}>
                  {line}
                  {i < arr.length - 1 ? "\n" : ""}
                </span>
              );
            })}
          </pre>
        )}

        {/* Poem metadata */}
        {piece.poem && piece.poemAuthor && (
          <div className="text-center">
            {piece.poemYear && <p className="text-xs text-white/60">{piece.poemYear}</p>}
            <p className="text-xs text-white/60">-{piece.poemAuthor}-</p>
            {piece.poemTranslator && <p className="text-xs text-white/50 mt-1">{piece.poemTranslator}</p>}
          </div>
        )}

        {/* Performers */}
        {piece.performers.length > 0 && (
          <div className="flex flex-col items-center gap-2">
            <p className="text-xs uppercase tracking-[0.15em] text-white/60">Előadják:</p>
            <div className="h-2 flex-shrink-0" />
            {piece.performers.map((performer, i) => (
              <p key={i} className="text-sm text-white">
                {performer}
              </p>
            ))}
          </div>
        )}
        
        {/* Bottom spacer */}
        <div className="h-16 flex-shrink-0" />
      </div>
    </div>
  );
}
// force rebuild 1777370038
