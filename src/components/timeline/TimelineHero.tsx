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
      style={{ background: "#2d0808" }}
    >
      {/* Smoky red → burnt orange → bright amber → gold → apricot cream */}
      <motion.div className="absolute inset-0" style={{ scale: bgScale }}>
        <div
          className="h-full w-full"
          style={{
            background: `linear-gradient(
              to bottom,
              #2d0808 0%,
              #4a1208 12%,
              #7a2010 28%,
              #c4521a 46%,
              #e8892a 62%,
              #d4a030 74%,
              #d4b060 85%,
              #E8C587 96%,
              #E8C587 100%
            )`,
          }}
        />
      </motion.div>

      {/* Dark scrim — deepens the bright amber zone so cream text is clearly readable */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.32) 0%, rgba(0,0,0,0.28) 45%, rgba(0,0,0,0.08) 68%, transparent 85%)",
        }}
      />

      {/* Warm glow at the horizon */}
      <div
        className="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 85% 35% at 50% 100%, rgba(232,137,42,0.12) 0%, transparent 65%)",
        }}
      />

      {/* Fade smoothly into the apricot cream page below */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/4"
        style={{
          background: "linear-gradient(to top, #E8C587, transparent)",
        }}
      />

      <motion.div
        className="relative z-10 text-center"
        style={{ y: titleY, opacity: titleOpacity }}
      >
        <motion.p
          className="mb-6 font-mono text-xs uppercase tracking-[0.4em]"
          style={{ color: "#eedcc8" }}
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
          transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="block" style={{ color: "#f5e8d0" }}>Rick&apos;s</span>
          <span className="block" style={{ color: "#f5e8d0" }}>Caf&eacute;</span>
        </motion.h1>

        <hr
          className="mx-auto mt-8 w-16"
          style={{ borderColor: "rgba(245,232,208,0.40)" }}
        />

        <p
          className="font-mono text-xs mt-4"
          style={{ color: "#eedcc8" }}
        >
          Houston, TX — Est. 2018
        </p>

        <motion.p
          className="mx-auto mt-8 max-w-sm text-sm leading-relaxed md:max-w-md"
          style={{ color: "#eedcc8" }}
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
          <span className="font-mono text-xs" style={{ color: "#eedcc8" }}>
            scroll ↓
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}
