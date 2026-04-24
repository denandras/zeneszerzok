"use client";

import { useState, useCallback } from "react";
import ProgramViewer from "../components/ProgramViewer";
import IndexPage from "../components/IndexPage";

type ViewState = "index" | "program";

export default function ProgrammePage() {
  const [view, setView] = useState<ViewState>("index");
  const [selectedPiece, setSelectedPiece] = useState(0);

  const handleSelectPiece = useCallback((index: number) => {
    setSelectedPiece(index);
    setView("program");
  }, []);

  const handleBackToIndex = useCallback(() => {
    setView("index");
  }, []);

  if (view === "index") {
    return <IndexPage onSelectPiece={handleSelectPiece} />;
  }

  return <ProgramViewer startIndex={selectedPiece} onBackToIndex={handleBackToIndex} />;
}
