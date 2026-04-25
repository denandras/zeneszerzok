"use client";

import { useEffect, useRef, useState } from "react";

export default function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [canPlay, setCanPlay] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      console.log("[VideoBG] No video ref");
      return;
    }

    console.log("[VideoBG] Initializing video", {
      muted: video.muted,
      playsInline: video.playsInline,
      paused: video.paused,
      readyState: video.readyState,
      src: video.src,
    });

    const setupVideo = () => {
      video.muted = true;
      video.playsInline = true;
      video.controls = false;
      video.disablePictureInPicture = true;
      video.disableRemotePlayback = true;
      video.loop = true;
      video.autoplay = true;
      console.log("[VideoBG] Setup complete");
    };

    const tryPlay = async (attempt = 1) => {
      if (!video) return;
      
      console.log(`[VideoBG] Attempt ${attempt}`, {
        paused: video.paused,
        readyState: video.readyState,
        networkState: video.networkState,
      });
      
      try {
        setupVideo();
        const playPromise = video.play();
        
        if (playPromise !== undefined) {
          await playPromise;
          console.log("[VideoBG] Play SUCCESS");
          setCanPlay(true);
          setError(null);
        } else {
          console.log("[VideoBG] Play returned undefined");
        }
      } catch (err: any) {
        console.error(`[VideoBG] Play FAILED (attempt ${attempt}):`, err.name, err.message);
        setError(`${err.name}: ${err.message}`);
        
        if (attempt < 6) {
          const delay = 50 * (2 ** attempt - 1);
          console.log(`[VideoBG] Retrying in ${delay}ms`);
          setTimeout(() => tryPlay(attempt + 1), delay);
        } else {
          console.error("[VideoBG] All attempts failed");
        }
      }
    };

    // Try immediately
    tryPlay();

    const handleCanPlay = () => {
      console.log("[VideoBG] canplay event fired", {
        readyState: video.readyState,
        paused: video.paused,
      });
      if (!canPlay) tryPlay();
    };

    const handleLoadedData = () => {
      console.log("[VideoBG] loadeddata event fired", {
        readyState: video.readyState,
        paused: video.paused,
      });
      if (!canPlay) tryPlay();
    };

    const handleError = (e: Event) => {
      console.error("[VideoBG] Video error event:", e);
      const videoEl = e.target as HTMLVideoElement;
      console.error("[VideoBG] Error code:", videoEl.error?.code, "message:", videoEl.error?.message);
    };

    const handleVisibility = () => {
      console.log("[VideoBG] Visibility changed", {
        hidden: document.hidden,
        canPlay,
        paused: video?.paused,
      });
      if (!document.hidden && !canPlay && video?.paused) {
        tryPlay();
      }
    };

    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("error", handleError);
    document.addEventListener("visibilitychange", handleVisibility);

    // One more attempt after load completes
    if (video.readyState >= 3) {
      console.log("[VideoBG] Video already ready (readyState >= 3)");
      tryPlay();
    }

    // Log final state after 2 seconds
    setTimeout(() => {
      if (video) {
        console.log("[VideoBG] Final state after 2s:", {
          paused: video.paused,
          currentTime: video.currentTime,
          readyState: video.readyState,
          error: video.error,
          canPlay,
        });
      }
    }, 2000);

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("error", handleError);
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
        webkit-playsinline="true"
        webkit-playsInline="true"
        x5-playsinline="true"
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ 
          pointerEvents: "none",
          WebkitAppearance: "none"
        }}
      >
        <source src="/background-video.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/50" />
    </div>
  );
}
