"use client";

import { useState, useCallback } from "react";
import Countdown from "./components/Countdown";
import ProgramViewer from "./components/ProgramViewer";
import IndexPage from "./components/IndexPage";

type ViewState = "countdown" | "index" | "program";

export default function Home() {
  const [view, setView] = useState<ViewState>("countdown");
  const [selectedPiece, setSelectedPiece] = useState(0);

  const handleSkipCountdown = useCallback(() => {
    setView("index");
  }, []);

  const handleSelectPiece = useCallback((index: number) => {
    setSelectedPiece(index);
    setView("program");
  }, []);

  const handleBackToIndex = useCallback(() => {
    setView("index");
  }, []);

  // Handle view switching
  if (view === "countdown") {
    return <Countdown onSkip={handleSkipCountdown} />;
  }

  if (view === "index") {
    return <IndexPage onSelectPiece={handleSelectPiece} />;
  }

  return <ProgramViewer startIndex={selectedPiece} />;
}
