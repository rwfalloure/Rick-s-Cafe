"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Simplified Houston bayou paths (Buffalo Bayou, Brays Bayou, White Oak)
// Stylized line-art — not geographically exact but evocative of the city's waterways
const BAYOU_PATHS = [
  // Buffalo Bayou — main artery, west to east through downtown
  "M 50,280 C 120,270 180,300 250,285 C 320,270 380,260 450,270 C 520,280 570,250 640,255 C 710,260 760,240 820,250 C 880,260 920,255 950,260",
  // Brays Bayou — south arc
  "M 250,450 C 320,440 400,420 480,430 C 560,440 620,410 700,400 C 780,390 840,380 920,385",
  // White Oak Bayou — north branch
  "M 350,120 C 400,140 440,170 480,180 C 520,190 560,220 600,230 C 640,240 660,250 640,255",
  // Sims Bayou — far south
  "M 150,520 C 250,510 350,500 450,505 C 550,510 650,490 750,495 C 820,498 880,485 950,490",
];

// Restaurant location dots along the bayous
const RESTAURANT_DOTS = [
  { x: 450, y: 270, label: "Truth BBQ", neighborhood: "Heights" },
  { x: 640, y: 255, label: "Xochi", neighborhood: "Downtown" },
  { x: 480, y: 430, label: "Crawfish & Noodles", neighborhood: "Asiatown" },
  { x: 600, y: 230, label: "March", neighborhood: "Montrose" },
  { x: 700, y: 400, label: "Himalaya", neighborhood: "Hillcroft" },
  { x: 820, y: 250, label: "Le Jardinier", neighborhood: "Uptown" },
];

// The 610 Loop — simplified circle/oval representing Houston's inner loop
const LOOP_610 =
  "M 640,180 C 750,180 820,230 820,310 C 820,390 750,440 640,440 C 530,440 460,390 460,310 C 460,230 530,180 640,180 Z";

interface Props {
  onComplete: () => void;
}

export function NeonMapIntro({ onComplete }: Props) {
  const [phase, setPhase] = useState<"map" | "text" | "dissolve">("map");
  const [activeDot, setActiveDot] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasSkipped = useRef(false);

  const handleSkip = useCallback(() => {
    if (hasSkipped.current) return;
    hasSkipped.current = true;
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    // Phase timing
    const timers: NodeJS.Timeout[] = [];

    // Stagger the restaurant dot reveals
    RESTAURANT_DOTS.forEach((_, i) => {
      timers.push(setTimeout(() => setActiveDot(i), 600 + i * 350));
    });

    // Transition to text phase after dots animate
    timers.push(setTimeout(() => setPhase("text"), 600 + RESTAURANT_DOTS.length * 350 + 400));

    // Dissolve phase
    timers.push(setTimeout(() => setPhase("dissolve"), 600 + RESTAURANT_DOTS.length * 350 + 2200));

    // Complete
    timers.push(setTimeout(() => {
      if (!hasSkipped.current) onComplete();
    }, 600 + RESTAURANT_DOTS.length * 350 + 3000));

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "dissolve" ? (
        <motion.div
          ref={containerRef}
          className="fixed inset-0 z-[10000] flex items-center justify-center overflow-hidden"
          style={{ background: "var(--background)" }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          onClick={handleSkip}
        >
          {/* Skip hint */}
          <motion.button
            className="absolute bottom-8 right-8 z-10 text-xs uppercase tracking-widest text-muted/50 transition-colors hover:text-muted"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            onClick={handleSkip}
            aria-label="Skip intro"
          >
            Skip
          </motion.button>

          {/* SVG Map */}
          <svg
            viewBox="0 0 1000 600"
            className="absolute inset-0 h-full w-full"
            style={{ opacity: phase === "text" ? 0.3 : 1, transition: "opacity 0.8s ease" }}
          >
            {/* Ambient glow behind the map */}
            <defs>
              <radialGradient id="map-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.08" />
                <stop offset="100%" stopColor="transparent" stopOpacity="0" />
              </radialGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="dot-glow">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <rect width="1000" height="600" fill="url(#map-glow)" />

            {/* 610 Loop */}
            <motion.path
              d={LOOP_610}
              fill="none"
              stroke="var(--accent-gold)"
              strokeWidth="0.5"
              strokeOpacity="0.2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut", delay: 0.2 }}
            />

            {/* Bayou paths — draw in with glowing stroke */}
            {BAYOU_PATHS.map((path, i) => (
              <g key={i}>
                {/* Glow layer */}
                <motion.path
                  d={path}
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  filter="url(#glow)"
                  strokeOpacity="0.3"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    duration: 1.8,
                    ease: "easeInOut",
                    delay: i * 0.15,
                  }}
                />
                {/* Main stroke */}
                <motion.path
                  d={path}
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeOpacity="0.7"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    duration: 1.8,
                    ease: "easeInOut",
                    delay: i * 0.15,
                  }}
                />
              </g>
            ))}

            {/* Restaurant dots with flare */}
            {RESTAURANT_DOTS.map((dot, i) => (
              <g key={i}>
                {/* Pulse ring */}
                <motion.circle
                  cx={dot.x}
                  cy={dot.y}
                  r="12"
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="1"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={
                    activeDot >= i
                      ? { scale: [0, 1.5, 2], opacity: [0, 0.5, 0] }
                      : {}
                  }
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
                {/* Glow dot */}
                <motion.circle
                  cx={dot.x}
                  cy={dot.y}
                  r="6"
                  fill="var(--accent)"
                  filter="url(#dot-glow)"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={activeDot >= i ? { scale: 1, opacity: 0.6 } : {}}
                  transition={{ duration: 0.4, ease: "backOut" }}
                />
                {/* Core dot */}
                <motion.circle
                  cx={dot.x}
                  cy={dot.y}
                  r="3"
                  fill="var(--accent-gold)"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={activeDot >= i ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.3, ease: "backOut" }}
                />
                {/* Neighborhood label */}
                <motion.text
                  x={dot.x}
                  y={dot.y - 18}
                  textAnchor="middle"
                  fill="var(--foreground)"
                  fontSize="9"
                  fontFamily="var(--font-sans-var)"
                  letterSpacing="0.15em"
                  initial={{ opacity: 0, y: 5 }}
                  animate={activeDot >= i ? { opacity: 0.6, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  style={{ textTransform: "uppercase" }}
                >
                  {dot.neighborhood}
                </motion.text>
              </g>
            ))}

            {/* Skyline silhouette hint along the downtown area */}
            <motion.path
              d="M 580,250 L 585,230 L 590,230 L 590,240 L 600,240 L 600,210 L 610,210 L 610,220 L 620,220 L 620,195 L 630,195 L 630,205 L 640,205 L 640,185 L 650,185 L 650,200 L 660,200 L 660,215 L 670,215 L 670,240 L 680,240 L 680,250"
              fill="none"
              stroke="var(--accent-gold)"
              strokeWidth="0.8"
              strokeOpacity="0.25"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 1.2, ease: "easeInOut" }}
            />
          </svg>

          {/* Title overlay — appears in text phase */}
          <motion.div
            className="relative z-10 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === "text" ? 1 : 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1
              className="font-serif text-[18vw] leading-[0.85] tracking-tight md:text-[12vw]"
              style={{ fontStyle: "italic" }}
              initial={{ opacity: 0, y: 40 }}
              animate={phase === "text" ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="block" style={{ color: "var(--foreground)" }}>
                Rick&apos;s
              </span>
              <span className="block" style={{ color: "var(--accent)" }}>
                Caf&eacute;
              </span>
            </motion.h1>

            <motion.p
              className="mt-6 text-xs uppercase tracking-[0.5em]"
              style={{ color: "var(--accent-gold)" }}
              initial={{ opacity: 0 }}
              animate={phase === "text" ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Houston &middot; Every Plate &middot; Every Story
            </motion.p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
