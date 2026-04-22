"use client";

import { getPieces, concertInfo } from "../data/program";

interface IndexPageProps {
  onSelectPiece: (index: number) => void;
}

export default function IndexPage({ onSelectPiece }: IndexPageProps) {
  const pieces = getPieces();

  return (
    <div className="min-h-screen flex flex-col bg-black">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-black/95 backdrop-blur border-b border-gray-900 px-6 py-6">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-[0.4em] text-gray-500 mb-1">
            {concertInfo.venue}
          </p>
          <h1 className="text-2xl md:text-3xl font-light mb-2">
            {concertInfo.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>{concertInfo.date}</span>
            <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
            <span>{concertInfo.time}</span>
          </div>
        </div>
      </header>

      {/* Program list */}
      <main className="flex-1 px-6 py-8">
        <div className="max-w-2xl mx-auto space-y-1">
          {pieces.map((piece, index) => {
            const isIntermission = piece.id === -1;

            return (
              <button
                key={piece.id}
                onClick={() => onSelectPiece(index)}
                className={`w-full text-left group transition-colors ${
                  isIntermission
                    ? "py-6 flex items-center justify-center"
                    : "py-4 px-4 -mx-4 hover:bg-gray-950 rounded"
                }`}
              >
                {isIntermission ? (
                  <span className="text-xs uppercase tracking-[0.3em] text-gray-600">
                    {piece.title}
                  </span>
                ) : (
                  <div className="flex items-baseline gap-4">
                    <span className="text-2xl md:text-3xl font-extralight text-gray-700 w-12 flex-shrink-0 tabular-nums">
                      {piece.id.toString().padStart(2, "0")}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs uppercase tracking-[0.15em] text-gray-500 mb-1">
                        {piece.composer}
                      </p>
                      <p className="text-base md:text-lg truncate">
                        {piece.title}
                      </p>
                    </div>
                    <span className="text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity">
                      →
                    </span>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Note */}
        <div className="max-w-2xl mx-auto mt-12 pt-8 border-t border-gray-900 px-2">
          <p className="text-xs text-gray-600 text-center leading-relaxed break-words">
            {concertInfo.note}
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-gray-900">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs text-gray-700">
            {concertInfo.venueEn}
          </p>
        </div>
      </footer>
    </div>
  );
}
