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

      {/* Header - transparent with text shadow for readability */}
      <header className="flex-shrink-0 z-20 px-16 py-4 relative">
        <div className="max-w-2xl mx-auto">
          <p className="text-[10px] uppercase tracking-[0.3em] text-gray-200 mb-0.5 whitespace-pre-line leading-tight drop-shadow-md">
            {concertInfo.venue}
          </p>
          <h1 className="text-sm md:text-base font-light mb-1 whitespace-pre-line leading-tight text-white drop-shadow-md">
            {concertInfo.title}
          </h1>
          <div className="flex items-center gap-1 text-xs text-gray-200 drop-shadow-md">
            <span>{concertInfo.date} {concertInfo.time}</span>
          </div>
        </div>
      </header>

      {/* Program list - scrollable */}
      <main className="flex-1 px-16 overflow-y-auto">
        <div className="max-w-2xl mx-auto flex flex-col gap-6">
          {/* Top spacing - 1 piece height */}
          <div className="py-4" />
          
          {program.map((piece, index) => {
            const isIntermission = piece.id === -1;

            if (isIntermission) {
              return (
                <div key={piece.id} className="py-6 flex items-center justify-center gap-4 drop-shadow-md">
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
                className="w-full text-center group transition-colors py-4 px-4 hover:bg-white/10 rounded"
              >
                <div className="flex flex-col items-center gap-1 drop-shadow-md">
                  <p className="text-xs uppercase tracking-[0.15em] text-gray-200 drop-shadow-md">
                    {piece.composer}
                  </p>
                  <p className="text-base md:text-lg text-white drop-shadow-md group-hover:text-white transition-colors whitespace-nowrap">
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
