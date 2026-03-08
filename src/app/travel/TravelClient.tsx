"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { PageTransition } from "@/components/layout/PageTransition";
import { RestaurantCard } from "@/components/common/RestaurantCard";
import { getRestaurantsByCategory } from "@/data/restaurants";

const RestaurantMap = dynamic(
  () => import("@/components/map/RestaurantMap"),
  { ssr: false }
);

function RevealText({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function TravelClient() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const titleY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const travelRestaurants = getRestaurantsByCategory("travel");

  // Group by city
  const byCityMap = travelRestaurants.reduce<Record<string, typeof travelRestaurants>>(
    (acc, r) => {
      const key = r.country ? `${r.city}, ${r.country}` : r.city;
      if (!acc[key]) acc[key] = [];
      acc[key].push(r);
      return acc;
    },
    {}
  );
  const cities = Object.entries(byCityMap);

  return (
    <PageTransition>
      {/* ── Hero ──────────────────────────────────────────── */}
      <div
        ref={heroRef}
        className="relative flex h-screen items-center justify-center overflow-hidden"
      >
        {/* Deep navy → midnight blue → warm gold → apricot cream */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(
              to bottom,
              #050a1a 0%,
              #0a1840 15%,
              #0d2060 32%,
              #1a3880 48%,
              #c4a028 66%,
              #d4b048 78%,
              #ddc068 88%,
              #E8C587 96%,
              #E8C587 100%
            )`,
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.40) 0%, rgba(0,0,0,0.22) 50%, rgba(0,0,0,0.06) 72%, transparent 88%)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-1/4"
          style={{ background: "linear-gradient(to top, #E8C587, transparent)" }}
        />

        <motion.div
          className="relative z-10 text-center px-6"
          style={{ y: titleY, opacity: titleOpacity }}
        >
          <motion.p
            className="mb-6 font-mono text-xs uppercase tracking-[0.4em]"
            style={{ color: "#c8d8f0" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Beyond Houston
          </motion.p>

          <motion.h1
            className="font-heading text-[14vw] font-bold leading-[0.85] tracking-tighter md:text-[10vw]"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="block" style={{ color: "#f0f4ff" }}>Travel</span>
            <span className="block text-[7vw] md:text-[5vw] mt-2" style={{ color: "#c4a028" }}>
              Food Reviews
            </span>
          </motion.h1>

          <hr className="mx-auto mt-8 w-16" style={{ borderColor: "rgba(240,244,255,0.35)" }} />

          <motion.p
            className="mt-4 font-mono text-xs"
            style={{ color: "#c8d8f0" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            New York · Malibu · Modena — and everywhere the table calls
          </motion.p>

          <motion.div
            className="mt-16 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <span className="font-mono text-xs" style={{ color: "#c8d8f0" }}>
              scroll ↓
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Intro ─────────────────────────────────────────── */}
      <section className="mx-auto max-w-3xl px-6 py-24">
        <RevealText>
          <p className="font-heading text-2xl leading-relaxed text-muted md:text-3xl">
            Some meals require a plane ticket. These are the ones worth
            the flight — restaurants I sought out on the road, rated with the
            same obsessive care as anything back home.
          </p>
        </RevealText>
        <RevealText delay={0.2}>
          <p className="mt-8 text-lg leading-relaxed text-muted">
            Every city has a table worth sitting at. Below are the ones that
            earned a place in the record.
          </p>
        </RevealText>
      </section>

      <div className="mx-auto max-w-7xl px-6">
        <div className="h-px bg-foreground/10" />
      </div>

      {/* ── City-grouped entries ──────────────────────────── */}
      {cities.map(([cityLabel, entries], cityIndex) => (
        <section key={cityLabel} className="mx-auto max-w-7xl px-6 py-20">
          <RevealText>
            <div className="mb-10">
              <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted">
                {String(cityIndex + 1).padStart(2, "0")} / Destination
              </span>
              <h2 className="mt-2 font-heading text-3xl font-bold md:text-5xl">
                {cityLabel}
              </h2>
            </div>
          </RevealText>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {entries.map((r, i) => (
              <RestaurantCard key={r.id} restaurant={r} index={i} />
            ))}
          </div>
        </section>
      ))}

      <div className="mx-auto max-w-7xl px-6">
        <div className="h-px bg-foreground/10" />
      </div>

      {/* ── World Map ─────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <RevealText>
          <div className="mb-10">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted mb-2">
              Around the World
            </p>
            <h2 className="font-heading text-3xl font-bold md:text-5xl">
              Every Pin is a Meal
            </h2>
            <p className="mt-3 text-muted text-sm">
              A living map — every restaurant I&apos;ve visited on the road.
            </p>
          </div>
        </RevealText>
        <RevealText delay={0.15}>
          <div className="overflow-hidden rounded-sm border border-foreground/10">
            <RestaurantMap
              restaurants={travelRestaurants}
              center={[30, 0]}
              zoom={2}
            />
          </div>
        </RevealText>
      </section>

      {/* ── Closing ───────────────────────────────────────── */}
      <section className="py-32 text-center px-6">
        <RevealText>
          <p className="mx-auto max-w-lg font-heading text-2xl leading-relaxed text-muted">
            The map keeps growing.
            <br />
            <span className="text-foreground">
              Every table is a new chapter.
            </span>
          </p>
        </RevealText>
      </section>
    </PageTransition>
  );
}
