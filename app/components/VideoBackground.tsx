"use client";

import { useEffect, useRef, useState } from "react";

export default function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [canPlay, setCanPlay] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const setupVideo = () => {
      // iOS requires these properties to be set via JS before play()
      video.muted = true;
      video.playsInline = true;
      video.controls = false;
      video.disablePictureInPicture = true;
      video.disableRemotePlayback = true;
      video.loop = true;
      video.autoplay = true;
    };

    const tryPlay = async (attempt = 1) => {
      if (!video) return;
      
      try {
        setupVideo();
        await video.play();
        setCanPlay(true);
        console.log("Video autoplay success");
      } catch (err) {
        console.log(`Video autoplay failed (attempt ${attempt}):`, err);
        
        // Exponential backoff: 50ms, 150ms, 350ms, 750ms, 1550ms
        if (attempt < 6) {
          const delay = 50 * (2 ** attempt - 1);
          setTimeout(() => tryPlay(attempt + 1), delay);
        }
      }
    };

    // Try immediately
    tryPlay();

    // Also try when video is ready
    const handleCanPlay = () => {
      if (!canPlay) tryPlay();
    };

    // Try when tab becomes visible
    const handleVisibility = () => {
      if (!document.hidden && !canPlay) {
        tryPlay();
      }
    };

    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("loadeddata", handleCanPlay);
    document.addEventListener("visibilitychange", handleVisibility);

    // One more attempt after load completes
    if (video.readyState >= 3) {
      tryPlay();
    }

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("loadeddata", handleCanPlay);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
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
      <div className="absolute inset-0 bg-black/50" />
    </div>
  );
}
