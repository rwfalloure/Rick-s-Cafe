"use client";

import { useRef, useState, useMemo } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { PageTransition } from "@/components/layout/PageTransition";
import { RestaurantCard } from "@/components/common/RestaurantCard";
import { getRestaurantsByCategory } from "@/data/restaurants";

// Leaflet map is dynamically imported because it requires browser APIs
const RestaurantMap = dynamic(
  () => import("@/components/map/RestaurantMap"),
  { ssr: false }
);

// ── Helpers ──────────────────────────────────────────────────

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

type SortKey = "rating" | "name" | "neighborhood";

// ── Page ─────────────────────────────────────────────────────

export function HoustonClient() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const titleY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const allRestaurants = getRestaurantsByCategory("houston");
  const neighborhoods = useMemo(
    () => ["All", ...Array.from(new Set(allRestaurants.map((r) => r.neighborhood ?? "Other")))],
    [allRestaurants]
  );

  const [sortBy, setSortBy] = useState<SortKey>("rating");
  const [filterNeighborhood, setFilterNeighborhood] = useState("All");

  const displayed = useMemo(() => {
    let list = [...allRestaurants];
    if (filterNeighborhood !== "All") {
      list = list.filter((r) => r.neighborhood === filterNeighborhood);
    }
    list.sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "neighborhood")
        return (a.neighborhood ?? "").localeCompare(b.neighborhood ?? "");
      return 0;
    });
    return list;
  }, [allRestaurants, sortBy, filterNeighborhood]);

  return (
    <PageTransition>
      {/* ── Hero ──────────────────────────────────────────── */}
      <div
        ref={heroRef}
        className="relative flex h-screen items-center justify-center overflow-hidden"
        style={{ background: "#0a0a0a" }}
      >
        {/* Houston skyline at dusk */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1551703599-6b3e8379aa8c?auto=format&fit=crop&w=1920&q=85"
            alt="Houston skyline at dusk"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.60) 0%, rgba(0,0,0,0.48) 50%, rgba(0,0,0,0.25) 75%, transparent 90%)",
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
            style={{ color: "#d4eacf" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            The City
          </motion.p>

          <motion.h1
            className="font-heading text-[15vw] font-bold leading-[0.85] tracking-tighter md:text-[11vw]"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="block" style={{ color: "#f0f7ee" }}>Houston</span>
            <span className="block text-[8vw] md:text-[6vw] mt-2" style={{ color: "#d4a830" }}>
              Food Reviews
            </span>
          </motion.h1>

          <hr className="mx-auto mt-8 w-16" style={{ borderColor: "rgba(240,247,238,0.35)" }} />

          <motion.p
            className="mt-4 font-mono text-xs"
            style={{ color: "#d4eacf" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            Houston, TX — Where the World Eats
          </motion.p>

          <motion.div
            className="mt-16 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <span className="font-mono text-xs" style={{ color: "#d4eacf" }}>
              scroll ↓
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Intro ─────────────────────────────────────────── */}
      <section className="mx-auto max-w-3xl px-6 py-24">
        <RevealText>
          <p className="font-heading text-2xl leading-relaxed text-muted md:text-3xl">
            Houston is America&apos;s most underrated food city — a place where
            Vietnamese, Mexican, Pakistani, and French kitchens exist on the same
            block, each one world-class.
          </p>
        </RevealText>
        <RevealText delay={0.2}>
          <p className="mt-8 text-lg leading-relaxed text-muted">
            These are the restaurants that surprised me, challenged me, and
            reminded me why this city is worth documenting. Every score is earned
            through one honest meal at a time.
          </p>
        </RevealText>
      </section>

      <div className="mx-auto max-w-7xl px-6">
        <div className="h-px bg-foreground/10" />
      </div>

      {/* ── Filter / Sort ──────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 pt-16 pb-8">
        <RevealText>
          <div className="flex flex-wrap items-center gap-6">
            {/* Sort */}
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
                Sort:
              </span>
              {(["rating", "name", "neighborhood"] as SortKey[]).map((key) => (
                <button
                  key={key}
                  onClick={() => setSortBy(key)}
                  className={`font-mono text-xs capitalize px-3 py-1.5 rounded-sm border transition-colors ${
                    sortBy === key
                      ? "border-foreground bg-foreground text-background"
                      : "border-foreground/20 text-muted hover:border-foreground/50"
                  }`}
                >
                  {key}
                </button>
              ))}
            </div>

            {/* Filter by neighborhood */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
                Area:
              </span>
              {neighborhoods.map((n) => (
                <button
                  key={n}
                  onClick={() => setFilterNeighborhood(n)}
                  className={`font-mono text-xs px-3 py-1.5 rounded-sm border transition-colors ${
                    filterNeighborhood === n
                      ? "border-accent bg-accent/10 text-foreground"
                      : "border-foreground/15 text-muted hover:border-foreground/40"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        </RevealText>
      </section>

      {/* ── Restaurant Grid ──────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayed.map((r, i) => (
            <RestaurantCard key={r.id} restaurant={r} index={i} />
          ))}
        </div>
        {displayed.length === 0 && (
          <p className="text-center text-muted py-16">
            No restaurants match that filter.
          </p>
        )}
      </section>

      <div className="mx-auto max-w-7xl px-6">
        <div className="h-px bg-foreground/10" />
      </div>

      {/* ── Map ──────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <RevealText>
          <div className="mb-10">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted mb-2">
              On the Map
            </p>
            <h2 className="font-heading text-3xl font-bold md:text-5xl">
              Houston Restaurants
            </h2>
            <p className="mt-3 text-muted text-sm">
              Click a pin to see details. Zoom in to explore by neighborhood.
            </p>
          </div>
        </RevealText>
        <RevealText delay={0.15}>
          <div className="overflow-hidden rounded-sm border border-foreground/10">
            <RestaurantMap
              restaurants={allRestaurants}
              center={[29.76, -95.37]}
              zoom={11}
            />
          </div>
        </RevealText>
      </section>
    </PageTransition>
  );
}
