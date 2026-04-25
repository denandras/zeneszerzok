"use client";

import Image from "next/image";

interface BackgroundImageProps {
  className?: string;
}

export default function BackgroundImage({ className = "" }: BackgroundImageProps) {
  return (
    <>
      {/* Fixed background image - no fade, consistent across views */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/background-image.png"
          alt=""
          fill
          priority
          quality={90}
          sizes="100vw"
          className={`object-cover opacity-100 ${className}`}
          style={{
            transform: "translateZ(0)",
          }}
        />
      </div>
      {/* Consistent dark overlay */}
      <div className="fixed inset-0 bg-black/50 z-0 pointer-events-none" />
    </>
  );
}
