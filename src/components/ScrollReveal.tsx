import { type CSSProperties, type ElementType, type HTMLAttributes, useEffect, useRef, useState } from "react";
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
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
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
      { threshold, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once, threshold]);

  return (
    <Tag
      ref={ref}
      {...rest}
      className={cn("scroll-reveal", `scroll-reveal--${variant}`, visible && "scroll-reveal--visible", className)}
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
