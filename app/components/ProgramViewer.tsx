"use client";

import Image from "next/image";
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

      {/* Műsor button — fixed to left edge, vertically centered */}
      <button
        onClick={onBackToIndex}
        className="fixed left-0 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center justify-center gap-1 py-6 px-2 text-white hover:opacity-70 transition-opacity"
        aria-label="Vissza a műsorhoz"
        style={{ writingMode: "vertical-rl", transform: "translateY(-50%) rotate(180deg)" }}
      >
        <span className="text-[10px] uppercase tracking-[0.25em]">Műsor</span>
        <span className="text-xs">↓</span>
      </button>

      {/* Fixed prev arrow — left side, centered vertically */}
      {showPrev && (
        <button
          onClick={goToPrev}
          className="fixed left-8 top-1/2 -translate-y-1/2 z-30 p-2 text-white hover:opacity-70 transition-opacity"
          aria-label="Előző"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Fixed next arrow — right side, centered vertically */}
      {showNext && (
        <button
          onClick={goToNext}
          className="fixed right-4 top-1/2 -translate-y-1/2 z-30 p-2 text-white hover:opacity-70 transition-opacity"
          aria-label="Következő"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Horizontal scroll container — fills full height */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-x-auto overflow-y-hidden snap-x snap-mandatory hide-scrollbar flex"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {pieces.map((piece, index) => (
          <PageContent
            key={piece.id}
            piece={piece}
            isActive={index === currentIndex}
          />
        ))}
      </div>

      {/* Bottom bar: page number bottom-left + dots centered */}
      <div className="flex-shrink-0 relative z-20 px-6 pb-10 pt-4 flex items-end justify-between">
        {/* Page number — bottom left */}
        <span className="text-3xl md:text-4xl font-extralight text-white/25 leading-none select-none">
          {String(currentIndex + 1).padStart(2, "0")}
        </span>

        {/* Dots — centered */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-10 flex items-center gap-2">
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

        {/* Spacer to balance number on left */}
        <div className="w-10" />
      </div>
    </div>
  );
}

interface PageContentProps {
  piece: Piece;
  isActive: boolean;
}

function PageContent({ piece }: PageContentProps) {
  // Intermission page
  if (piece.id === -1) {
    return (
      <div className="w-screen h-full flex-shrink-0 snap-center snap-always overflow-hidden relative flex items-center justify-center px-16">
        <div className="flex items-center gap-6">
          <span className="w-16 md:w-28 h-px bg-gray-700"></span>
          <span className="text-sm md:text-base uppercase tracking-[0.4em] text-white">
            {piece.title}
          </span>
          <span className="w-16 md:w-28 h-px bg-gray-700"></span>
        </div>
      </div>
    );
  }

  const hasPhoto = piece.id === 13; // Sebestyén-Lázár Regina — Detachment

  // Regular piece page
  return (
    <div className="w-screen h-full flex-shrink-0 snap-center snap-always overflow-hidden relative flex">
      {/* Content — padded away from fixed arrows */}
      <div className="flex-1 flex flex-col items-center justify-start px-16 md:px-28 gap-5 pt-10 md:pt-14 pb-20 overflow-y-auto">
        {/* Image */}
        <div className="relative w-32 h-32 md:w-40 md:h-40 flex-shrink-0 border border-gray-800 bg-gray-950 overflow-hidden">
          {hasPhoto ? (
            <Image
              src="/regina.jpg"
              alt={piece.composer}
              fill
              className="object-cover"
              sizes="160px"
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

        {/* Composer + Title */}
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

        {/* Poem */}
        {piece.poem && (
          <pre className="text-xs italic text-white/70 text-center max-w-xs leading-relaxed whitespace-pre-wrap font-sora px-4">
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
          <div className="text-center mt-2">
            {piece.poemYear && <p className="text-xs text-white/60">{piece.poemYear}</p>}
            <p className="text-xs text-white/60">-{piece.poemAuthor}-</p>
            {piece.poemTranslator && <p className="text-xs text-white/50 mt-1">{piece.poemTranslator}</p>}
          </div>
        )}

        {/* Performers */}
        {piece.performers.length > 0 && (
          <div className="space-y-3 text-center">
            <p className="text-xs uppercase tracking-[0.15em] text-white/60">Előadják:</p>
            {piece.performers.map((performer, i) => (
              <p key={i} className="text-sm text-white">
                {performer}
              </p>
            ))}
          </div>
        )}

        <div className="h-12 flex-shrink-0" />
      </div>
    </div>
  );
}
