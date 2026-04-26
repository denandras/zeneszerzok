"use client";

import { program, concertInfo } from "../data/program";
import BackgroundImage from "./BackgroundImage";

interface IndexPageProps {
  onSelectPiece: (index: number) => void;
}

export default function IndexPage({ onSelectPiece }: IndexPageProps) {
  return (
    <div className="h-screen flex flex-col relative overflow-hidden">
      {/* Shared background - prevents flicker, consistent brightness */}
      <BackgroundImage />

      {/* Header - translucent with backdrop blur like piece pages */}
      <header className="fixed top-0 left-0 right-0 z-30 px-6 py-8 min-h-[4rem] bg-black/30 backdrop-blur-md border-b border-white/10 flex items-center justify-center">
        <div className="w-full max-w-2xl text-center">
          <div className="space-y-4">
            <p className="text-[10px] uppercase tracking-[0.3em] text-gray-200 whitespace-pre-line leading-relaxed drop-shadow-md">
              {concertInfo.venue}
            </p>
            <h1 className="text-sm md:text-base font-light whitespace-pre-line leading-relaxed text-white drop-shadow-md">
              {concertInfo.title}
            </h1>
            <p className="text-xs text-gray-200 drop-shadow-md">
              {concertInfo.date} {concertInfo.time}
            </p>
            {/* Empty line after date */}
            <div className="h-4" />
          </div>
        </div>
      </header>

      {/* Program list - scrollable, centered */}
      <main className="flex-1 overflow-y-auto relative z-10 w-full flex flex-col items-center pt-32">
        <div className="w-full max-w-2xl flex flex-col items-center gap-6 px-8 md:px-16 pb-32">
          {/* Header height spacer - reduced */}
          <div className="h-16 md:h-24 flex-shrink-0" />
          
          {/* Empty line before first piece */}
          <div className="h-4" />
          
          {program.map((piece, index) => {
            const isIntermission = piece.id === -1;

            if (isIntermission) {
              return (
                <div key={piece.id} className="py-6 flex items-center justify-center gap-4 w-full max-w-md">
                  <span className="flex-1 h-px bg-white/30"></span>
                  <span className="text-xs uppercase tracking-[0.3em] text-gray-300 flex-shrink-0 drop-shadow-md">
                    {piece.title}
                  </span>
                  <span className="flex-1 h-px bg-white/30"></span>
                </div>
              );
            }

            return (
              <button
                key={piece.id}
                onClick={() => onSelectPiece(index)}
                className="w-full max-w-md text-center py-4 px-6 cursor-pointer"
              >
                <div className="flex flex-col items-center gap-1 grayscale">
                  <p className="text-xs uppercase tracking-[0.15em] text-gray-200 drop-shadow-md">
                    {piece.composer}
                  </p>
                  <p className="text-base md:text-lg text-white drop-shadow-md whitespace-nowrap">
                    {piece.title}
                  </p>
                </div>
              </button>
            );
          })}
          
          {/* Website credit */}
          <div className="text-[10px] text-gray-600 text-center mt-8">
            website by{" "}
            <a
              href="https://andrasdenes.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-500 transition-colors"
            >
              András Dénes
            </a>
          </div>
          
          {/* Bottom spacing - significant footer for last item visibility */}
          <div className="h-16 md:h-20" />
        </div>
      </main>
    </div>
  );
}
