"use client";

import { useState } from "react";
import { useCountdown, formatTimeComponent } from "../hooks/useCountdown";

interface CountdownProps {
  onSkip: () => void;
}

export default function Countdown({ onSkip }: CountdownProps) {
  const { timeLeft, isExpired } = useCountdown();
  const [showSkip, setShowSkip] = useState(false);

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
    <div className="min-h-screen flex flex-col items-center justify-center p-8 relative">
      {/* Title */}
      <div className="text-center mb-16">
        <p className="text-xs uppercase tracking-[0.4em] text-gray-500 mb-2">
          Alkalmazott zeneszerzés
        </p>
        <h1 className="text-responsive-title font-light tracking-tight">
          BA diplomakoncert
        </h1>
      </div>

      {/* Countdown */}
      <div className="flex items-baseline gap-2 md:gap-4 font-light select-none">
        {/* Hours */}
        <div className="text-center">
          <span className="text-[clamp(4rem,15vw,12rem)] leading-none tracking-tighter">
            {formatTimeComponent(timeLeft.hours)}
          </span>
          <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mt-2">
            óra
          </p>
        </div>

        <span className="text-[clamp(3rem,10vw,8rem)] text-gray-600 -translate-y-4">
          :
        </span>

        {/* Minutes */}
        <div className="text-center">
          <span className="text-[clamp(4rem,15vw,12rem)] leading-none tracking-tighter">
            {formatTimeComponent(timeLeft.minutes)}
          </span>
          <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mt-2">
            perc
          </p>
        </div>

        <span className="text-[clamp(3rem,10vw,8rem)] text-gray-600 -translate-y-4">
          :
        </span>

        {/* Seconds */}
        <div className="text-center">
          <span className="text-[clamp(4rem,15vw,12rem)] leading-none tracking-tighter">
            {formatTimeComponent(timeLeft.seconds)}
          </span>
          <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mt-2">
            másodperc
          </p>
        </div>
      </div>

      {/* Date */}
      <div className="mt-16 text-center">
        <p className="text-sm text-gray-500 tracking-wide">
          2026. május 3. 19:00
        </p>
        <p className="text-xs text-gray-600 mt-1">
          Zeneakadémia
        </p>
      </div>

      {/* Skip button - visible but subtle */}
      <button
        onClick={() => onSkip()}
        className="absolute bottom-8 right-8 px-4 py-2 text-xs uppercase tracking-wider text-gray-600 hover:text-white border border-gray-800 hover:border-gray-600 rounded transition-all"
      >
        Program megtekintése →
      </button>
    </div>
  );
}
