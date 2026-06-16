import { useCallback, useEffect, useRef, useState } from "react";

const VIDEOS = ["/videos/video2.mp4", "/videos/hero-presentation.mp4"] as const;
const FADE_MS = 1400;
const FADE_BEFORE_END_S = 1.8;

export function HeroCrossfadeVideos() {
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const transitioningRef = useRef(false);

  const setVideoRef = useCallback((index: number) => (el: HTMLVideoElement | null) => {
    videoRefs.current[index] = el;
  }, []);

  useEffect(() => {
    const activeVideo = videoRefs.current[activeIndex];
    if (!activeVideo) return;

    void activeVideo.play().catch(() => {});

    const handleTimeUpdate = () => {
      if (transitioningRef.current || !Number.isFinite(activeVideo.duration)) return;

      const remaining = activeVideo.duration - activeVideo.currentTime;
      if (remaining > FADE_BEFORE_END_S) return;

      transitioningRef.current = true;
      const nextIndex = (activeIndex + 1) % VIDEOS.length;
      const nextVideo = videoRefs.current[nextIndex];
      if (!nextVideo) {
        transitioningRef.current = false;
        return;
      }

      nextVideo.currentTime = 0;
      void nextVideo.play().catch(() => {});
      setActiveIndex(nextIndex);

      window.setTimeout(() => {
        activeVideo.pause();
        transitioningRef.current = false;
      }, FADE_MS);
    };

    activeVideo.addEventListener("timeupdate", handleTimeUpdate);
    return () => activeVideo.removeEventListener("timeupdate", handleTimeUpdate);
  }, [activeIndex]);

  return (
    <div className="relative h-full w-full overflow-hidden transition-transform duration-500 group-hover:scale-105">
      {VIDEOS.map((src, index) => (
        <video
          key={src}
          ref={setVideoRef(index)}
          src={src}
          muted
          autoPlay={index === 0}
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover transition-opacity ease-in-out"
          style={{
            opacity: index === activeIndex ? 1 : 0,
            transitionDuration: `${FADE_MS}ms`,
          }}
        />
      ))}
    </div>
  );
}
