"use client";

import { useCountdown, formatTimeComponent } from "../hooks/useCountdown";

interface CountdownProps {
  onSkip: () => void;
}

export default function Countdown({ onSkip }: CountdownProps) {
  const { timeLeft, isExpired } = useCountdown();

  if (isExpired || !timeLeft) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8">
        <div className="text-center animate-pulse">
          <p className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-4">
            Élőben
          </p>
          <div className="w-3 h-3 bg-red-500 rounded-full mx-auto animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center p-6 md:p-8 pb-24 md:pb-8">
      {/* Main content - flexes to fill space */}
      <div className="flex-1 flex flex-col items-center justify-center w-full">
        {/* Title */}
        <div className="text-center mb-16 md:mb-20">
          <p className="text-xs uppercase tracking-[0.4em] text-gray-500 mb-2">
            Alkalmazott zeneszerzés
          </p>
          <h1 className="text-responsive-title font-light tracking-tight">
            BA diplomakoncert
          </h1>
        </div>

        {/* Countdown */}
        <div className="flex items-baseline gap-2 md:gap-4 font-light select-none"
        >
          {/* Hours */}
          <div className="text-center">
            <span className="text-[clamp(3rem,12vw,10rem)] md:text-[clamp(4rem,15vw,12rem)] leading-none tracking-tighter">
              {formatTimeComponent(timeLeft.hours)}
            </span>
            <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mt-2">
              óra
            </p>
          </div>

          <span className="text-[clamp(2rem,8vw,6rem)] md:text-[clamp(3rem,10vw,8rem)] text-gray-600 -translate-y-2 md:-translate-y-4">
            :
          </span>

          {/* Minutes */}
          <div className="text-center">
            <span className="text-[clamp(3rem,12vw,10rem)] md:text-[clamp(4rem,15vw,12rem)] leading-none tracking-tighter">
              {formatTimeComponent(timeLeft.minutes)}
            </span>
            <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mt-2">
              perc
            </p>
          </div>

          <span className="text-[clamp(2rem,8vw,6rem)] md:text-[clamp(3rem,10vw,8rem)] text-gray-600 -translate-y-2 md:-translate-y-4">
            :
          </span>

          {/* Seconds */}
          <div className="text-center">
            <span className="text-[clamp(3rem,12vw,10rem)] md:text-[clamp(4rem,15vw,12rem)] leading-none tracking-tighter">
              {formatTimeComponent(timeLeft.seconds)}
            </span>
            <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mt-2">
              másodperc
            </p>
          </div>
        </div>

        {/* Date */}
        <div className="mt-16 md:mt-24 text-center">
          <p className="text-sm text-gray-500 tracking-wide">
            2026. május 3. 19:00
          </p>
          <p className="text-xs text-gray-600 mt-1">
            Zeneakadémia
          </p>
        </div>
      </div>

      {/* Skip button - fixed at bottom with safe area padding */}
      <div className="fixed bottom-6 left-0 right-0 flex justify-center px-4"
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
        <button
          onClick={() => onSkip()}
          className="px-6 py-3 text-xs uppercase tracking-widest text-gray-500 hover:text-white border border-gray-800 hover:border-gray-600 rounded-full transition-all bg-black/80 backdrop-blur"
        >
          Program megtekintése
        </button>
      </div>
    </div>
  );
}
