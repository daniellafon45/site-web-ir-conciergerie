import { type CSSProperties, type ElementType, type HTMLAttributes, useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type ScrollRevealVariant = "fade-up" | "fade-down" | "fade-left" | "fade-right" | "fade" | "zoom-in";

type ScrollRevealProps = {
  children: React.ReactNode;
  className?: string;
  variant?: ScrollRevealVariant;
  /** Délai avant l'animation (ms) */
  delay?: number;
  /** Durée de l'animation (ms) */
  duration?: number;
  /** Part visible avant déclenchement (0–1) */
  threshold?: number;
  /** Ne jouer l'animation qu'une fois */
  once?: boolean;
  as?: ElementType;
  style?: CSSProperties;
} & Omit<HTMLAttributes<HTMLElement>, "style">;

function isInRevealZone(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight;
  return rect.top < vh * 0.92 && rect.bottom > vh * 0.04;
}

export function ScrollReveal({
  children,
  className,
  variant = "fade-up",
  delay = 0,
  duration = 700,
  threshold = 0.05,
  once = true,
  as: Tag = "div",
  style,
  ...rest
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const revealedRef = useRef(false);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      revealedRef.current = true;
      setVisible(true);
      return;
    }

    const reveal = () => {
      if (revealedRef.current) return;
      revealedRef.current = true;
      // Double rAF: laisse le navigateur peindre l'état initial (opacity 0) avant la transition.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true));
      });
    };

    if (isInRevealZone(el)) {
      reveal();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            reveal();
            if (once) observer.disconnect();
          } else if (!once) {
            revealedRef.current = false;
            setVisible(false);
          }
        }
      },
      { threshold: [0, threshold, Math.min(threshold + 0.1, 1)], rootMargin: "0px 0px 8% 0px" },
    );

    observer.observe(el);

    const onScroll = () => {
      if (isInRevealZone(el)) {
        reveal();
        if (once) {
          observer.disconnect();
          window.removeEventListener("scroll", onScroll, true);
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true, capture: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll, true);
    };
  }, [once, threshold]);

  return (
    <Tag
      ref={ref}
      {...rest}
      className={cn(
        "scroll-reveal",
        `scroll-reveal--${variant}`,
        visible && "scroll-reveal--visible",
        className,
      )}
      style={
        {
          ...style,
          "--scroll-reveal-delay": `${delay}ms`,
          "--scroll-reveal-duration": `${duration}ms`,
        } as CSSProperties
      }
    >
      {children}
    </Tag>
  );
}
