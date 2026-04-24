"use client";

import { useState, useEffect } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
}

// Target: May 3, 2026 18:00 Hungary time (CEST)
const TARGET_DATE = new Date("2026-05-03T18:00:00+02:00");

export function useCountdown(): {
  timeLeft: TimeLeft | null;
  isExpired: boolean;
  isLoading: boolean;
  targetDate: Date;
} {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [isExpired, setIsExpired] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const diff = TARGET_DATE.getTime() - now.getTime();

      if (diff <= 0) {
        setIsExpired(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, totalSeconds: 0 });
        setIsLoading(false);
        return;
      }

      const totalSeconds = Math.floor(diff / 1000);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, totalSeconds });
      setIsExpired(false);
      setIsLoading(false);
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return { timeLeft, isExpired, isLoading, targetDate: TARGET_DATE };
}

export function formatTimeComponent(value: number): string {
  return value.toString().padStart(2, "0");
}

export function formatCountdown(timeLeft: TimeLeft | null): string {
  if (!timeLeft) return "00:00:00";
  const h = formatTimeComponent(timeLeft.hours);
  const m = formatTimeComponent(timeLeft.minutes);
  const s = formatTimeComponent(timeLeft.seconds);
  return `${h}:${m}:${s}`;
}
