"use client";

import { useEffect, useRef } from "react";

export function FilmGrain() {
  const seedRef = useRef(0);
  const turbRef = useRef<SVGFETurbulenceElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    // Animate the grain seed for a living film texture
    const animate = () => {
      seedRef.current += 1;
      if (turbRef.current) {
        turbRef.current.setAttribute("seed", String(seedRef.current % 100));
      }
      animRef.current = requestAnimationFrame(animate);
    };

    // Run at ~8fps for subtle grain movement (not every frame)
    let lastTime = 0;
    const throttledAnimate = (time: number) => {
      if (time - lastTime > 125) {
        seedRef.current += 1;
        if (turbRef.current) {
          turbRef.current.setAttribute("seed", String(seedRef.current % 100));
        }
        lastTime = time;
      }
      animRef.current = requestAnimationFrame(throttledAnimate);
    };

    animRef.current = requestAnimationFrame(throttledAnimate);

    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[100]"
      style={{ opacity: "var(--grain-opacity, 0.08)" }}
    >
      <svg className="hidden">
        <filter id="film-grain">
          <feTurbulence
            ref={turbRef}
            type="fractalNoise"
            baseFrequency="0.75"
            numOctaves="4"
            stitchTiles="stitch"
            seed="0"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>
      <div
        className="h-full w-full"
        style={{
          filter: "url(#film-grain)",
          transform: "scale(1.5)",
        }}
      />
    </div>
  );
}
