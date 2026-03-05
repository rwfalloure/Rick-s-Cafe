"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function TimelineHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <div
      ref={ref}
      className="relative flex h-screen items-center justify-center overflow-hidden"
      style={{ background: "var(--background)" }}
    >
      {/* Houston sunset sky — hand-crafted gradient, no image required */}
      <motion.div
        className="absolute inset-0"
        style={{ scale: bgScale }}
      >
        <div
          className="h-full w-full"
          style={{
            background: `
              radial-gradient(ellipse 200% 35% at 50% 90%, rgba(232,137,42,0.35) 0%, rgba(212,96,26,0.20) 40%, transparent 70%),
              linear-gradient(
                to bottom,
                #2d0808 0%,
                #4a1208 15%,
                #7a2010 30%,
                #c4521a 48%,
                #e8892a 64%,
                #d4a030 76%,
                #c8b048 88%,
                #edd988 97%,
                #edd988 100%
              )
            `,
          }}
        />
      </motion.div>

      {/* Amber horizon glow — the sun just below the skyline */}
      <div
        className="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 85% 35% at 50% 100%, rgba(232,137,42,0.10) 0%, transparent 65%)",
        }}
      />

      {/* Fade into page background at bottom */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/3"
        style={{
          background: "linear-gradient(to top, var(--background), transparent)",
        }}
      />

      <motion.div
        className="relative z-10 text-center"
        style={{ y: titleY, opacity: titleOpacity }}
      >
        <motion.p
          className="mb-6 font-mono text-xs uppercase tracking-[0.4em]"
          style={{ color: "#c8a070" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          A Houston Food Journey
        </motion.p>

        <motion.h1
          className="font-heading text-[15vw] font-bold leading-[0.85] tracking-tighter md:text-[12vw]"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.5,
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <span className="block" style={{ color: "#f5e8d0" }}>Rick&apos;s</span>
          <span className="block" style={{ color: "#f5e8d0" }}>Caf&eacute;</span>
        </motion.h1>

        <hr className="mx-auto mt-8 w-16" style={{ borderColor: "rgba(200,160,112,0.5)" }} />

        <p className="font-mono text-xs mt-4" style={{ color: "#c8a070" }}>Houston, TX — Est. 2018</p>

        <motion.p
          className="mx-auto mt-8 max-w-sm text-sm leading-relaxed md:max-w-md"
          style={{ color: "#c8a070" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          Meticulous reviews documenting every bite, every vibe,
          every moment worth remembering.
        </motion.p>

        <motion.div
          className="mt-16 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <span className="font-mono text-xs" style={{ color: "#c8a070" }}>scroll ↓</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
