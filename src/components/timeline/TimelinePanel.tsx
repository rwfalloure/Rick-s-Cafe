"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { TextScramble } from "@/components/effects/TextScramble";
import type { TimelineRestaurant } from "@/lib/types";

// Per-restaurant vibe gradients — colors derived from cuisine character
const VIBE_GRADIENTS: Record<string, string> = {
  "#b5332b": "radial-gradient(circle at 30% 50%, rgba(181,51,43,0.2), transparent 60%)",
  "#6b3a5d": "radial-gradient(circle at 70% 40%, rgba(107,58,93,0.2), transparent 60%)",
  "#1a7a6d": "radial-gradient(circle at 40% 60%, rgba(26,122,109,0.18), transparent 60%)",
  "#c49a3c": "radial-gradient(circle at 60% 30%, rgba(196,154,60,0.2), transparent 60%)",
  "#e8723a": "radial-gradient(circle at 50% 70%, rgba(232,114,58,0.18), transparent 60%)",
  "#2d6b5e": "radial-gradient(circle at 30% 40%, rgba(45,107,94,0.18), transparent 60%)",
};

const FALLBACK_GRADIENT =
  "radial-gradient(circle at 30% 50%, rgba(232,114,58,0.15), transparent 60%)";

interface Props {
  restaurant: TimelineRestaurant;
  index: number;
  imageUrl: string;
}

function ScoreCounter({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 800;
          const start = performance.now();

          const tick = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(parseFloat((eased * value).toFixed(1)));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref} className="font-serif text-4xl text-accent" style={{ fontStyle: "italic" }}>
      {display.toFixed(1)}
    </span>
  );
}

export function TimelinePanel({ restaurant, index, imageUrl }: Props) {
  const [revealed, setRevealed] = useState(false);
  const [wipeProgress, setWipeProgress] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);

  const vibeColor = restaurant.vibeColor || "#e8723a";
  const vibeGradient = VIBE_GRADIENTS[vibeColor] || FALLBACK_GRADIENT;

  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
        }
        // Drive the wipe progress based on intersection ratio
        setWipeProgress(entry.intersectionRatio);
      },
      { threshold: Array.from({ length: 20 }, (_, i) => i / 20) }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={panelRef}
      className="relative flex min-h-screen w-full flex-shrink-0 items-center px-4 md:h-screen md:w-[80vw] md:px-16"
    >
      {/* Layer 0: Flavor wipe — color wash that sweeps in based on scroll */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: `linear-gradient(90deg, ${vibeColor}15 0%, transparent 100%)`,
          clipPath: `inset(0 ${100 - wipeProgress * 100}% 0 0)`,
          opacity: revealed ? 1 : 0,
        }}
      />

      {/* Layer 1: Background vibe gradient blob */}
      <div
        className="absolute inset-0 transition-opacity duration-1000"
        style={{
          background: vibeGradient,
          opacity: revealed ? 1 : 0,
        }}
      />

      {/* Color temperature border glow */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-700"
        style={{
          boxShadow: `inset 0 0 120px -40px ${vibeColor}30`,
          opacity: revealed ? 1 : 0,
        }}
      />

      <div className="relative z-10 grid h-full w-full grid-cols-1 items-center gap-8 py-20 md:grid-cols-2 md:gap-16">
        {/* Layer 2: Image with clip-path reveal + vignette */}
        <Link
          href={`/restaurant/${restaurant.slug.current}`}
          className="group relative block overflow-hidden rounded-2xl"
          data-cursor="magnetic"
        >
          <div
            className="photo-vignette relative aspect-[3/4] overflow-hidden rounded-2xl transition-all duration-[1.2s] ease-out md:aspect-[4/5]"
            style={{
              clipPath: revealed
                ? "inset(0% 0% 0% 0%)"
                : "inset(0% 100% 0% 0%)",
            }}
          >
            <Image
              src={imageUrl}
              alt={restaurant.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 80vw, 40vw"
            />
            {/* Warm tint overlay with restaurant's vibe color */}
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to top, var(--background) 0%, ${vibeColor}20 30%, transparent 60%)`,
              }}
            />
          </div>
        </Link>

        {/* Layer 3: Text content */}
        <div
          className="flex flex-col justify-center space-y-5 transition-all duration-700 ease-out"
          style={{
            opacity: revealed ? 1 : 0,
            transform: revealed ? "translateX(0)" : "translateX(40px)",
          }}
        >
          {/* Neighborhood tag — Houston cultural identity */}
          {restaurant.neighborhood && (
            <div className="flex items-center gap-3">
              <div
                className="h-px transition-all duration-700"
                style={{
                  backgroundColor: vibeColor,
                  opacity: revealed ? 0.6 : 0,
                  width: revealed ? 24 : 0,
                }}
              />
              <p
                className="text-[10px] font-semibold uppercase tracking-[0.4em]"
                style={{ color: vibeColor, fontFamily: "var(--font-display-var)" }}
              >
                {restaurant.neighborhood}
              </p>
            </div>
          )}

          {/* Date */}
          <p className="text-xs uppercase tracking-[0.3em] text-accent-gold">
            {new Date(restaurant.dateVisited).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
            })}
          </p>

          {/* Restaurant name with scramble effect */}
          <TextScramble
            text={restaurant.name}
            as="h2"
            className="font-serif text-4xl leading-tight md:text-6xl"
            delay={300}
          />

          {/* Meta */}
          <div className="flex items-center gap-4 text-sm text-muted">
            <span>{restaurant.cuisine}</span>
            <span className="text-foreground/20">|</span>
            <span>{restaurant.priceRange}</span>
          </div>

          {/* Score */}
          {restaurant.overallScore && (
            <div className="flex items-baseline gap-3">
              <ScoreCounter value={restaurant.overallScore} />
              <span className="text-xs uppercase tracking-widest text-muted">
                / 10
              </span>
            </div>
          )}

          {/* Summary */}
          <p className="max-w-md leading-relaxed text-muted">
            {restaurant.summary}
          </p>

          {/* CTA */}
          <Link
            href={`/restaurant/${restaurant.slug.current}`}
            className="group/cta inline-flex items-center gap-2 text-sm uppercase tracking-widest text-accent transition-colors hover:text-accent-gold"
          >
            Read Review
            <svg
              width="16"
              height="8"
              viewBox="0 0 16 8"
              fill="none"
              className="transition-transform group-hover/cta:translate-x-1"
            >
              <path
                d="M0 4h12m0 0L9 1m3 3L9 7"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
