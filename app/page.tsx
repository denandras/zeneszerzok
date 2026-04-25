"use client";

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // Redirect root to /programme/
    window.location.href = "/programme/";
  }, []);

  return null;
}
