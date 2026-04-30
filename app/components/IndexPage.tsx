"use client";

import { useState, useRef, useEffect } from "react";
import { program, concertInfo } from "../data/program";
import BackgroundImage from "./BackgroundImage";

interface IndexPageProps {
  onSelectPiece: (index: number) => void;
}

export default function IndexPage({ onSelectPiece }: IndexPageProps) {
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const mainRef = useRef<HTMLElement>(null);

  // Reveal animation observer - more aggressive to show one more piece initially
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px 30% 0px" }
    );

    const raf = window.requestAnimationFrame(() => {
      nodes.forEach((node) => observer.observe(node));
    });

    return () => {
      window.cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const main = mainRef.current;
    if (!main) return;

    const handleScroll = () => {
      setIsScrolling(true);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 1500);
    };

    main.addEventListener("scroll", handleScroll);
    return () => {
      main.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);
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
      <main ref={mainRef} className="flex-1 overflow-y-auto relative z-10 w-full flex flex-col items-center pt-32">
        <div className="w-full max-w-2xl flex flex-col items-center gap-6 px-8 md:px-16 pb-32">
          {/* Header height spacer - reduced */}
          <div className="h-16 md:h-24 flex-shrink-0" />
          
          {/* Empty line before first piece */}
          <div className="h-4" />
          
          {program.map((piece, index) => {
            const isIntermission = piece.id === -1;
            // Stagger delays: start at 200ms, add 50ms per item for faster scroll reveals
            const revealDelay = 200 + (index * 50);

            if (isIntermission) {
              return (
                <div 
                  key={piece.id} 
                  className="py-6 flex items-center justify-center gap-4 w-full max-w-md"
                  data-reveal="fade-only"
                  style={{ "--reveal-delay": `${revealDelay}ms` } as React.CSSProperties}
                >
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
                className="w-auto text-center cursor-pointer transition-all duration-[1500ms]"
                data-reveal
                style={{ "--reveal-delay": `${revealDelay}ms` } as React.CSSProperties}
              >
                <div className="py-5 px-10">
                  <div className="flex flex-col items-center gap-0.5 grayscale">
                  <p className="text-xs uppercase tracking-[0.15em] text-gray-200 drop-shadow-md">
                    {piece.composer}
                  </p>
                  <div className="relative inline-block">
                    <p className="text-base md:text-lg text-white drop-shadow-md whitespace-nowrap relative z-10">
                      {piece.title}
                    </p>
                    <div 
                      className="absolute -inset-x-4 -inset-y-2 rounded-lg pointer-events-none transition-opacity duration-[1500ms]"
                      style={{
                        opacity: isScrolling ? 1 : 0,
                        boxShadow: '0 15px 11px -8px rgba(255,255,255,0.15)'
                      }}
                      aria-hidden="true" 
                    />
                  </div>
                  </div>
                </div>
              </button>
            );
          })}
          
          {/* Bottom spacing - pushes credit up while keeping scroll space */}
          <div className="h-4 md:h-8" />
          
          {/* Website credit - small and subtle */}
          <div 
            className="text-[10px] text-white/5 text-center -mt-2"
            data-reveal="fade-only"
            style={{ "--reveal-delay": `${300 + (program.length * 50)}ms` } as React.CSSProperties}
          >
            website by{" "}
            <a
              href="https://andrasdenes.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/10 transition-colors"
            >
              András Dénes
            </a>
          </div>
          
          {/* Space below credit */}
          <div className="h-8 md:h-12" />
        </div>
      </main>
    </div>
  );
}
