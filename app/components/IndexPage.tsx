"use client";

import { program, concertInfo } from "../data/program";
import BackgroundImage from "./BackgroundImage";

interface IndexPageProps {
  onSelectPiece: (index: number) => void;
}

export default function IndexPage({ onSelectPiece }: IndexPageProps) {
  return (
    <div className="h-screen flex flex-col relative">
      {/* Shared background - prevents flicker, consistent brightness */}
      <BackgroundImage />

      {/* Header - with invisible margin around text for proper formatting */}
      <header className="flex-shrink-0 z-20 relative">
        <div className="max-w-2xl mx-auto my-8 md:my-12 px-8 md:px-16 py-6">
          {/* Invisible margin container */}
          <div className="space-y-2">
            <p className="text-[10px] uppercase tracking-[0.3em] text-gray-200 whitespace-pre-line leading-relaxed drop-shadow-md">
              {concertInfo.venue}
            </p>
            <h1 className="text-sm md:text-base font-light whitespace-pre-line leading-relaxed text-white drop-shadow-md">
              {concertInfo.title}
            </h1>
            <div className="flex items-center gap-1 text-xs text-gray-200 drop-shadow-md pt-1">
              <span>{concertInfo.date} {concertInfo.time}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Program list - scrollable, centered container */}
      <main className="flex-1 overflow-y-auto px-8 md:px-16">
        <div className="max-w-2xl mx-auto flex flex-col items-center gap-6">
          {/* Top spacing - 1 piece height */}
          <div className="py-4" />
          
          {program.map((piece, index) => {
            const isIntermission = piece.id === -1;

            if (isIntermission) {
              return (
                <div key={piece.id} className="py-6 flex items-center justify-center gap-4 w-full max-w-md">
                  <span className="flex-1 h-px bg-gray-500"></span>
                  <span className="text-xs uppercase tracking-[0.3em] text-gray-300 flex-shrink-0 drop-shadow-md">
                    {piece.title}
                  </span>
                  <span className="flex-1 h-px bg-gray-500"></span>
                </div>
              );
            }

            return (
              <button
                key={piece.id}
                onClick={() => onSelectPiece(index)}
                className="w-full max-w-md text-center group py-4 px-6 rounded-lg transition-all duration-300 ease-out hover:bg-white/10 hover:scale-[1.02] hover:shadow-lg hover:shadow-white/5 active:scale-[0.98]"
              >
                <div className="flex flex-col items-center gap-1">
                  <p className="text-xs uppercase tracking-[0.15em] text-gray-200 drop-shadow-md group-hover:text-white transition-colors duration-300">
                    {piece.composer}
                  </p>
                  <p className="text-base md:text-lg text-white drop-shadow-md group-hover:text-white transition-colors duration-300 whitespace-nowrap">
                    {piece.title}
                  </p>
                </div>
              </button>
            );
          })}
          
          {/* Bottom spacing - significant footer for last item visibility */}
          <div className="h-32 md:h-40" />
        </div>
      </main>
    </div>
  );
}
