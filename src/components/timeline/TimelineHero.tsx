"use client";

import { useRef } from "react";
import Image from "next/image";
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
      style={{ background: "#0a0a0a" }}
    >
      {/* Restaurant interior at Hotel Das Central — mountain dining atmosphere */}
      <motion.div className="absolute inset-0" style={{ scale: bgScale }}>
        <Image
          src="https://falstaff.b-cdn.net/storage/2023/08/1500-x800-iceq_innenaufnahme_hotel_das_central_by_rudi_wyhlidal.jpg?width=1920&aspect_ratio=40:21&crop_gravity=center"
          alt="Elegant restaurant interior with mountain atmosphere"
          fill
          className="object-cover"
          style={{ objectPosition: "60% center" }}
          priority
        />
      </motion.div>

      {/* Dark scrim — keeps all text legible against the photo */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.52) 50%, rgba(0,0,0,0.30) 75%, transparent 90%)",
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
