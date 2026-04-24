"use client";

import { useCountdown, formatTimeComponent } from "../hooks/useCountdown";
import VideoBackground from "./VideoBackground";

interface CountdownProps {
  onSkip: () => void;
}

export default function Countdown({ onSkip }: CountdownProps) {
  const { timeLeft, isExpired, isLoading } = useCountdown();

  if (isLoading) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center bg-black">
        <div className="w-4 h-4 border border-gray-700 border-t-gray-400 rounded-full animate-spin" />
      </div>
    );
  }

  if (isExpired) {
    onSkip();
    return null;
  }

  return (
    <>
      <VideoBackground />
      <div className="min-h-[100dvh] flex flex-col items-center p-6 md:p-8 relative z-10">
        {/* Top spacer - pushes content to lower third */}
        <div className="flex-1 min-h-[20vh]" />
        
        {/* Content block */}
        <div className="flex flex-col items-center">
          {/* Title */}
          <div className="text-center mb-4 md:mb-6">
            <h1 className="text-xl md:text-2xl font-light tracking-tight text-white whitespace-pre-line leading-tight">
              Zeneszerzés és{"\n"}
              alkalmazott zeneszerzés{"\n"}
              BA diplomakoncert
            </h1>
          </div>

          {/* Spacer before timer */}
          <div className="h-8 md:h-12" />

          {/* Countdown - no wrap, single line */}
          <div className="flex items-baseline gap-3 md:gap-6 font-bold select-none justify-center">
            {/* Days */}
            <div className="text-center">
              <span className="text-[clamp(2rem,10vw,8rem)] md:text-[clamp(3rem,12vw,10rem)] leading-none tabular-nums tracking-tighter text-white">
                {timeLeft ? formatTimeComponent(timeLeft.days) : "00"}
              </span>
            </div><span className="text-[clamp(1.5rem,6vw,4rem)] md:text-[clamp(2rem,8vw,6rem)] text-white -translate-y-2 md:-translate-y-4">:</span><div className="text-center">
              <span className="text-[clamp(2rem,10vw,8rem)] md:text-[clamp(3rem,12vw,10rem)] leading-none tabular-nums tracking-tighter text-white">
                {timeLeft ? formatTimeComponent(timeLeft.hours) : "00"}
              </span>
            </div><span className="text-[clamp(1.5rem,6vw,4rem)] md:text-[clamp(2rem,8vw,6rem)] text-white -translate-y-2 md:-translate-y-4">:</span><div className="text-center">
              <span className="text-[clamp(2rem,10vw,8rem)] md:text-[clamp(3rem,12vw,10rem)] leading-none tabular-nums tracking-tighter text-white">
                {timeLeft ? formatTimeComponent(timeLeft.minutes) : "00"}
              </span>
            </div><span className="text-[clamp(1.5rem,6vw,4rem)] md:text-[clamp(2rem,8vw,6rem)] text-white -translate-y-2 md:-translate-y-4">:</span><div className="text-center">
              <span className="text-[clamp(2rem,10vw,8rem)] md:text-[clamp(3rem,12vw,10rem)] leading-none tabular-nums text-white">
                {timeLeft ? formatTimeComponent(timeLeft.seconds) : "00"}
              </span>
            </div>
          </div>

          {/* Spacer after timer */}
          <div className="h-8 md:h-12" />

          {/* Date */}
          <div className="text-center mb-6 md:mb-8">
            <p className="text-sm text-white tracking-wide">
              2026. május 3. 18:00
            </p>
            <p className="text-xs text-white mt-2">
              Zeneakadémia, Solti terem
            </p>
          </div>

          {/* Spacer before registration */}
          <div className="h-8 md:h-12" />

          {/* Links - only registration visible during countdown */}
          <div className="flex flex-col items-center gap-4">
            <a
              href="https://zeneakademia.jegy.hu/program/zeneszerzes-ba-diplomakoncert-103155/1433641"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white underline hover:no-underline transition-all"
            >
              Regisztráció
            </a>
            {/* Program megtekintése hidden until countdown expires */}
          </div>
        </div>
        
        {/* Bottom spacer for breathing room */}
        <div className="h-16 md:h-24" />
      </div>
    </>
  );
}
