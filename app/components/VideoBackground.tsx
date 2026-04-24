"use client";

import { useEffect, useRef } from "react";

export default function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    // iOS requires these properties to be set via JS
    video.muted = true;
    video.playsInline = true;
    // Disable controls explicitly
    video.controls = false;
    video.disablePictureInPicture = true;
    video.disableRemotePlayback = true;
    
    video.play().catch(() => {
      // Retry once after short delay for stubborn iOS
      setTimeout(() => video.play().catch(() => {}), 100);
    });
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <style jsx>{`
        video::-webkit-media-controls,
        video::-webkit-media-controls-overlay-play-button,
        video::-webkit-media-controls-play-button,
        video::-webkit-media-controls-timeline,
        video::-webkit-media-controls-current-time-display,
        video::-webkit-media-controls-time-remaining-display,
        video::-webkit-media-controls-mute-button,
        video::-webkit-media-controls-volume-slider,
        video::-webkit-media-controls-fullscreen-button,
        video::-webkit-media-controls-rewind-button,
        video::-webkit-media-controls-fast-forward-button {
          display: none !important;
          opacity: 0 !important;
          visibility: hidden !important;
        }
        video::-webkit-media-controls-enclosure {
          display: none !important;
        }
      `}</style>
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        controls={false}
        controlsList="nodownload noremoteplayback"
        disablePictureInPicture
        disableRemotePlayback
        // @ts-ignore - iOS-specific attributes
        webkit-playsinline="true"
        webkit-playsInline="true"
        x5-playsinline="true"
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ 
          pointerEvents: "none",
          // @ts-ignore
          WebkitAppearance: "none"
        }}
      >
        <source src="/background-video.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/40" />
    </div>
  );
}
