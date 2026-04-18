"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { PageTransition } from "@/components/layout/PageTransition";
import { Leaderboard, type LeaderboardRow } from "@/components/common/Leaderboard";

// — Data ——————————————————————————————————————————————————————

const TACO_SPOTS = [
  {
    id: "cantina-barba",
    name: "Cantina Barba",
    neighborhood: "Houston, TX",
    visited: "2025",
    pricePerTaco: "$5–6",
    vibeScore: 9.5,
    overallScore: 8.6,
    tacoSize: "Standard street taco size",
    description:
      "Cantina Barba easily wins best vibe out of the places tried. The interior is very small — classic taco shop energy, this is where you order. There's also a small patio with string lights in the shape of chili peppers. At night it's very dark, but that only adds to the ambience. The only way to describe it: Halloween vibes, in the best way possible.",
    tacos: [
      {
        name: "Barbacoa",
        score: 9.5,
        isBenchmark: true,
        notes:
          "Best Barbacoa of the night — and best taco of the night. The flavor just popped. Sweet, tangy, savory all at once, almost like a smoky barbecue sauce but not as heavy and way fresher.",
      },
      {
        name: "Smoked Pork",
        score: 8.5,
        isBenchmark: false,
        notes:
          "A high point. Crispy edges, a very well-rounded smoky profile. Punchy in the best way.",
      },
      {
        name: "Carne Asada",
        score: 7.2,
        isBenchmark: false,
        notes:
          "Solid. Small cubes, well cooked, great meat quality — but the flavor profile didn't inspire a reaction.",
      },
      {
        name: "Al Pastor",
        score: 7.3,
        isBenchmark: false,
        notes:
          "Solid. Nothing to write home about, and nothing to complain about either. Same story as the asada.",
      },
    ],
  },
  {
    id: "el-taconazo",
    name: "El Taconazo",
    neighborhood: "North Houston, TX",
    visited: "2025",
    pricePerTaco: "$2–3",
    vibeScore: 8.2,
    overallScore: 9.1,
    tacoSize: "Standard street taco size",
    description:
      "El Taconazo is undeniably a Houston hidden gem. Located on the north side of Houston in a neighborhood only locals seem to know about. We got there around 8:30 PM and there was a line wrapped around the corner — you could tell this was a standard night for the food truck because they were pumping out tacos like nobody's business. We waited close to 30 minutes, with the line moving fairly quickly. Once we ordered, our 12 tacos were out in about three minutes. El Taconazo was easily the best and most consistent spot across all forms of tacos.",
    tacos: [
      {
        name: "Barbacoa",
        score: 9.2,
        isBenchmark: true,
        notes:
          "Just as flavorful as the Barbacoa from Cantina Barba — if anything, a little more subtle and a little less sweet. The freshness and quality of ingredients is easily detectable. One of those bites that requires some noise.",
      },
      {
        name: "Trompo",
        score: 9.5,
        isBenchmark: false,
        notes:
          "The highlight. A deep red from the spicy marinade catches your eye immediately. At first touch you get an explosion of savory flavor, and on the back end a building wave of spice. This taco didn't need any sauce — adding one would only be a distraction.",
      },
      {
        name: "Lengua",
        score: 8.5,
        isBenchmark: false,
        notes:
          "A pleasant surprise. Never had Lengua (beef tongue) before — what I found was a very light, tender, and decadent meat. The perfect vessel for red and green sauce and a perfect contrast to the heartier flavors of Barbacoa and Trompo.",
      },
      {
        name: "Fajita",
        score: 7.5,
        isBenchmark: false,
        notes:
          "Shredded steak. The meat wasn't bursting with flavor on its own, but the quality was great — it acts more as a vehicle for the red and green sauces, and it does that job well.",
      },
    ],
  },
  {
    id: "el-mapache",
    name: "El Mapache",
    neighborhood: "Bellaire, TX",
    visited: "2025",
    pricePerTaco: "$2–3",
    vibeScore: 7.5,
    overallScore: 8.4,
    tacoSize: "Standard street taco size",
    description:
      "El Mapache is a food truck you'll only find out about by word of mouth. Found in a parking lot just outside Bellaire, it was a unique find. Their specialty is the tripa and the pastor — and both lived up to the reputation. Service was a little slow compared to the other spots we visited, but once the tacos arrived, all was forgiven.",
    tacos: [
      {
        name: "Al Pastor",
        score: 9.5,
        isBenchmark: false,
        notes:
          "The best pastor we had all night. The pineapple flavor came in strong, which is rare — sometimes you don't get that fresh pineapple pop. Here it was front and center, combining with the smoky pork to create something genuinely beautiful.",
      },
      {
        name: "Tripa",
        score: 9.5,
        isBenchmark: false,
        notes:
          "Perfectly crispy with a smoky, salty flavor. Tripa can be hit or miss but these were amazing — definitely the most unique taco found so far. A total standout.",
      },
      {
        name: "Barbacoa",
        score: 8.1,
        isBenchmark: true,
        notes:
          "Good, solid Barbacoa. Not at the level of Cantina Barba or El Taconazo, but well-executed. The tacos that will bring me back are the pastor and tripa — the Barbacoa is just a bonus.",
      },
      {
        name: "Lengua",
        score: 8.2,
        isBenchmark: false,
        notes:
          "Good. Same story as the Barbacoa — solid and well-made, but the pastor and tripa are the reason you come here.",
      },
    ],
  },
];

const LIVE_RANKINGS = [
  {
    rank: 1,
    spot: "El Taconazo",
    score: 9.1,
    notes: "The most consistent spot across all meats — a north Houston hidden gem",
  },
  {
    rank: 2,
    spot: "Cantina Barba",
    score: 8.6,
    notes: "Best vibe of any spot — the Barbacoa is untouchable",
  },
  {
    rank: 3,
    spot: "El Mapache",
    score: 8.4,
    notes: "Best pastor of any run — the pineapple pop is real",
  },
];

// — Helpers ———————————————————————————————————————————————————

function RevealText({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
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

function ScoreBar({ score, max = 10 }: { score: number; max?: number }) {
  return (
    <div className="flex items-center gap-4">
      <div className="h-px flex-1 bg-foreground/10 overflow-hidden relative">
        <motion.div
          className="absolute inset-y-0 left-0 bg-accent"
          style={{ height: "1px" }}
          initial={{ width: 0 }}
          whileInView={{ width: `${(score / max) * 100}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        />
      </div>
      <span className="font-mono text-sm text-foreground w-8 text-right shrink-0">
        {score.toFixed(1)}
      </span>
    </div>
  );
}

// — Page ——————————————————————————————————————————————————————

export function TacosClient() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const titleY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <PageTransition>
      {/* ── Hero ─────────────────────────────────────────── */}
      <div
        ref={heroRef}
        className="relative flex h-screen items-center justify-center overflow-hidden"
        style={{ background: "#0a0a0a" }}
      >
        {/* Birria tacos on a black plate */}
        <div className="absolute inset-0">
          <Image
            src="https://media.istockphoto.com/id/2021971495/photo/3-beef-birria-tacos-stacked-on-black-plate.jpg?b=1&s=1024x1024&w=0&k=20&c=dJHAeD_zYj9PqYJgHLOfxMARw4HHfeSL0VyA_PzcCkM="
            alt="Three beef birria tacos stacked on a black plate"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Dark scrim — keeps all text legible against the photo */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.28) 75%, transparent 90%)",
          }}
        />
        {/* Fade into apricot cream page */}
        <div
          className="absolute inset-x-0 bottom-0 h-1/4"
          style={{
            background: "linear-gradient(to top, #F6E7CB, transparent)",
          }}
        />

        <motion.div
          className="relative z-10 text-center px-6"
          style={{ y: titleY, opacity: titleOpacity }}
        >
          <motion.p
            className="mb-6 font-mono text-xs uppercase tracking-[0.4em]"
            style={{ color: "#eedcc8" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            The Quest
          </motion.p>

          <motion.h1
            className="font-heading text-[15vw] font-bold leading-[0.85] tracking-tighter md:text-[12vw]"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="block" style={{ color: "#f5e8d0" }}>Taco</span>
            <span className="block" style={{ color: "#e8892a" }}>Run</span>
          </motion.h1>

          <hr className="mx-auto mt-8 w-16" style={{ borderColor: "rgba(245,232,208,0.40)" }} />

          <motion.p
            className="mt-4 font-mono text-xs"
            style={{ color: "#eedcc8" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            Houston, TX — In Search of the Best Taco
          </motion.p>

          <motion.div
            className="mt-16 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <span className="font-mono text-xs" style={{ color: "#eedcc8" }}>scroll ↓</span>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Top Taco Leaderboard ──────────────────────────── */}
      {(() => {
        const sorted = [...TACO_SPOTS].sort((a, b) => {
          const aBarb = a.tacos.find((t) => t.isBenchmark)?.score ?? 0;
          const bBarb = b.tacos.find((t) => t.isBenchmark)?.score ?? 0;
          return bBarb - aBarb;
        });
        const rows: LeaderboardRow[] = sorted.map((r, i) => ({
          rank: i + 1,
          name: r.name,
          detail1: r.neighborhood,
          detail2: r.tacos.find((t) => t.isBenchmark)?.name ?? "Barbacoa",
          score: r.tacos.find((t) => t.isBenchmark)?.score ?? 0,
        }));
        return (
          <section className="mx-auto max-w-4xl px-6 py-24">
            <RevealText>
              <div className="flex items-center gap-3 flex-wrap mb-2">
                <h2 className="font-heading text-3xl font-bold md:text-5xl">
                  Taco Leaderboard
                </h2>
                <span className="font-mono text-[10px] uppercase tracking-widest text-accent border border-accent/40 px-2 py-1 rounded-sm">
                  Live
                </span>
              </div>
              <p className="text-muted text-sm mt-2 mb-10">
                Ranked by Barbacoa score. Updated after every run.
              </p>
            </RevealText>
            <RevealText delay={0.2}>
              <Leaderboard
                rows={rows}
                col1Label="Taco Spot"
                col2Label="Signature Taco"
                scoreLabel="Barbacoa"
              />
            </RevealText>
          </section>
        );
      })()}

      <div className="mx-auto max-w-4xl px-6">
        <div className="h-px bg-foreground/10" />
      </div>

      {/* ── Mission ──────────────────────────────────────── */}
      <section className="mx-auto max-w-3xl px-6 py-24">
        <RevealText>
          <p className="font-heading text-2xl leading-relaxed text-muted md:text-3xl">
            A friend and I are on a quest to find Houston&apos;s best taco.
            Growing up here our whole lives, surrounded by Mexican flavors — it
            was unacceptable that we hadn&apos;t explored the taco scene the way
            it deserves.
          </p>
        </RevealText>

        <RevealText delay={0.2}>
          <p className="mt-8 text-lg leading-relaxed text-muted">
            We thought it was necessary to keep at least one taco consistent
            across every spot we visit. We ultimately decided that{" "}
            <span className="text-foreground font-semibold">Barbacoa</span>{" "}
            should be the constant variable. Every other taco is fair game.
            Here&apos;s the running record.
          </p>
        </RevealText>

        {/* The constant variable callout */}
        <RevealText delay={0.35}>
          <div className="mt-12 border border-accent-gold/30 p-6 rounded-sm">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent-gold mb-2">
              The Constant Variable
            </p>
            <p className="font-heading text-3xl font-bold text-foreground">
              Barbacoa
            </p>
            <p className="mt-2 text-sm text-muted leading-relaxed">
              Ordered at every single spot. Scored independently. The benchmark
              that ties the whole expedition together.
            </p>
          </div>
        </RevealText>
      </section>

      <div className="mx-auto max-w-3xl px-6">
        <div className="h-px bg-foreground/10" />
      </div>

      {/* ── Spot Reviews ─────────────────────────────────── */}
      {TACO_SPOTS.map((spot, spotIndex) => (
        <section key={spot.id} className="mx-auto max-w-4xl px-6 py-24">
          <RevealText>
            <div className="flex items-start justify-between gap-8 flex-wrap">
              <div>
                <span className="font-mono text-xs text-muted">
                  {String(spotIndex + 1).padStart(2, "0")} / Review
                </span>
                <h2 className="mt-2 font-heading text-4xl font-bold md:text-6xl">
                  {spot.name}
                </h2>
                <div className="mt-3 flex items-center gap-4 font-mono text-sm text-muted flex-wrap">
                  <span>{spot.neighborhood}</span>
                  <span className="text-foreground/20">|</span>
                  <span>{spot.pricePerTaco} per taco</span>
                  <span className="text-foreground/20">|</span>
                  <span>Visited {spot.visited}</span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="font-mono text-xs uppercase tracking-widest text-muted mb-1">
                  Overall
                </p>
                <p className="font-mono text-5xl font-bold text-accent">
                  {spot.overallScore.toFixed(1)}
                </p>
                <p className="font-mono text-xs text-muted">/ 10</p>
              </div>
            </div>
          </RevealText>

          {/* Vibe */}
          <RevealText delay={0.15}>
            <p className="mt-8 text-lg leading-relaxed text-muted">
              {spot.description}
            </p>
          </RevealText>

          {/* Taco scores */}
          <RevealText delay={0.25}>
            <div className="mt-12">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted mb-8">
                Tacos Ordered
              </p>
              <div className="space-y-8">
                {spot.tacos.map((taco) => (
                  <div key={taco.name} className="space-y-2">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="font-heading text-lg font-semibold text-foreground">
                        {taco.name}
                      </span>
                      {taco.isBenchmark && (
                        <span className="font-mono text-[10px] uppercase tracking-widest text-accent-gold border border-accent-gold/40 px-2 py-0.5 rounded-sm">
                          Benchmark
                        </span>
                      )}
                    </div>
                    <ScoreBar score={taco.score} />
                    <p className="text-sm text-muted leading-relaxed">
                      {taco.notes}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </RevealText>

          {/* Spot-level stats */}
          <RevealText delay={0.35}>
            <div className="mt-12 grid grid-cols-2 gap-6 border-t border-foreground/10 pt-8 sm:grid-cols-3">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-muted mb-1">
                  Vibe Score
                </p>
                <p className="font-mono text-2xl font-bold text-foreground">
                  {spot.vibeScore.toFixed(1)}
                </p>
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-muted mb-1">
                  Price
                </p>
                <p className="text-sm text-foreground">{spot.pricePerTaco}</p>
                <p className="text-xs text-muted">per taco</p>
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-muted mb-1">
                  Taco Size
                </p>
                <p className="text-sm text-foreground">{spot.tacoSize}</p>
              </div>
            </div>
          </RevealText>
        </section>
      ))}

      <div className="mx-auto max-w-4xl px-6">
        <div className="h-px bg-foreground/10" />
      </div>

      {/* ── Live Rankings ────────────────────────────────── */}
      <section className="mx-auto max-w-4xl px-6 py-24">
        <RevealText>
          <div className="flex items-center gap-3 flex-wrap mb-2">
            <h2 className="font-heading text-3xl font-bold md:text-5xl">
              Live Ranking
            </h2>
            <span className="font-mono text-[10px] uppercase tracking-widest text-accent border border-accent/40 px-2 py-1 rounded-sm">
              Live
            </span>
          </div>
          <p className="text-muted text-sm mt-2">
            Ranked by overall restaurant score. Updated as we eat.
          </p>
        </RevealText>

        <RevealText delay={0.2}>
          <div className="mt-12">
            {/* Table header */}
            <div className="grid grid-cols-[3rem_1fr_5rem] gap-4 border-b border-foreground/10 pb-4 mb-2">
              <span className="font-mono text-xs uppercase tracking-widest text-muted">
                #
              </span>
              <span className="font-mono text-xs uppercase tracking-widest text-muted">
                Spot
              </span>
              <span className="font-mono text-xs uppercase tracking-widest text-muted text-right">
                Score
              </span>
            </div>

            {LIVE_RANKINGS.map((entry) => (
              <motion.div
                key={entry.rank}
                className="grid grid-cols-[3rem_1fr_5rem] gap-4 border-b border-foreground/5 py-5 items-center"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: entry.rank * 0.1, duration: 0.5 }}
              >
                <span className="font-mono text-2xl font-bold text-accent">
                  {String(entry.rank).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-heading text-lg font-semibold text-foreground">
                    {entry.spot}
                  </p>
                  <p className="text-xs text-muted mt-0.5">{entry.notes}</p>
                </div>
                <p className="font-mono text-2xl font-bold text-foreground text-right">
                  {entry.score.toFixed(1)}
                </p>
              </motion.div>
            ))}
          </div>
        </RevealText>
      </section>

      {/* ── Closing ──────────────────────────────────────── */}
      <section className="py-32 text-center px-6">
        <RevealText>
          <p className="mx-auto max-w-lg font-heading text-2xl leading-relaxed text-muted">
            The quest is ongoing.
            <br />
            <span className="text-foreground">
              Houston&apos;s best taco is still out there.
            </span>
          </p>
        </RevealText>
      </section>
    </PageTransition>
  );
}
