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

export function ScrollReveal({
  children,
  className,
  variant = "fade-up",
  delay = 0,
  duration = 700,
  threshold = 0.12,
  once = true,
  as: Tag = "div",
  style,
  ...rest
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useLayoutEffect(() => {
    setMounted(true);
  }, []);

  useLayoutEffect(() => {
    if (!mounted) return;

    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setVisible(true);
      return;
    }

    const revealIfInView = () => {
      const rect = el.getBoundingClientRect();
      return rect.top < window.innerHeight * 0.96 && rect.bottom > 0;
    };

    if (revealIfInView()) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold, rootMargin: "0px 0px -4% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [mounted, once, threshold]);

  const animate = mounted;

  return (
    <Tag
      ref={ref}
      {...rest}
      className={cn(
        animate && "scroll-reveal",
        animate && `scroll-reveal--${variant}`,
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
