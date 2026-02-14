"use client";

import { useState, useEffect } from "react";
import { PageTransition } from "@/components/layout/PageTransition";
import { TimelineHero } from "@/components/timeline/TimelineHero";
import { HorizontalTimeline } from "@/components/timeline/HorizontalTimeline";
import { FilmGrain } from "@/components/effects/FilmGrain";
import { ParticleField } from "@/components/effects/ParticleField";
import { NeonMapIntro } from "@/components/effects/NeonMapIntro";
import type { TimelineRestaurant } from "@/lib/types";

const mockRestaurants: TimelineRestaurant[] = [
  {
    _id: "houston-1",
    name: "Truth BBQ",
    slug: { current: "truth-bbq" },
    cuisine: "Texas BBQ",
    priceRange: "$$",
    neighborhood: "Heights",
    heroImage: null as any,
    overallScore: 9.4,
    dateVisited: "2025-12-15",
    summary:
      "Brisket so tender it surrenders on contact. The burnt ends are obsidian jewels of smoky perfection. Worth every minute in line.",
    vibeColor: "#b5332b",
  },
  {
    _id: "houston-2",
    name: "Xochi",
    slug: { current: "xochi" },
    cuisine: "Oaxacan Mexican",
    priceRange: "$$$",
    neighborhood: "Downtown",
    heroImage: null as any,
    overallScore: 9.1,
    dateVisited: "2025-11-28",
    summary:
      "Mole negro that tastes like it took a village to make. The chocolate tamale dessert is an emotional experience disguised as food.",
    vibeColor: "#6b3a5d",
  },
  {
    _id: "houston-3",
    name: "Crawfish & Noodles",
    slug: { current: "crawfish-and-noodles" },
    cuisine: "Viet-Cajun",
    priceRange: "$$",
    neighborhood: "Asiatown",
    heroImage: null as any,
    overallScore: 8.8,
    dateVisited: "2025-10-10",
    summary:
      "Where garlic butter meets lemongrass in a muddy, beautiful marriage. Houston in a single bite. Plastic bibs mandatory.",
    vibeColor: "#1a7a6d",
  },
  {
    _id: "houston-4",
    name: "March",
    slug: { current: "march" },
    cuisine: "Contemporary American",
    priceRange: "$$$$",
    neighborhood: "Montrose",
    heroImage: null as any,
    overallScore: 9.3,
    dateVisited: "2025-09-05",
    summary:
      "A tasting menu that reads like poetry and tastes like a fever dream. Every course is a thesis statement on Houston's diversity.",
    vibeColor: "#c49a3c",
  },
  {
    _id: "houston-5",
    name: "Himalaya",
    slug: { current: "himalaya" },
    cuisine: "Pakistani-Indian",
    priceRange: "$$",
    neighborhood: "Hillcroft",
    heroImage: null as any,
    overallScore: 9.0,
    dateVisited: "2025-08-22",
    summary:
      "The fried goat is legendary for a reason. Biryani that could broker peace treaties. A strip-mall cathedral of spice.",
    vibeColor: "#e8723a",
  },
  {
    _id: "houston-6",
    name: "Le Jardinier",
    slug: { current: "le-jardinier" },
    cuisine: "French Vegetable-Forward",
    priceRange: "$$$$",
    neighborhood: "Uptown",
    heroImage: null as any,
    overallScore: 8.6,
    dateVisited: "2025-07-14",
    summary:
      "Proof that vegetables can be the main character. Every plate is a still life that happens to be edible. The wine list whispers to you.",
    vibeColor: "#2d6b5e",
  },
];

interface Props {
  restaurants: TimelineRestaurant[];
}

export function HomeClient({ restaurants }: Props) {
  const data = restaurants.length > 0 ? restaurants : mockRestaurants;
  const [showIntro, setShowIntro] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);

  useEffect(() => {
    // Only show intro once per session
    const hasSeenIntro = sessionStorage.getItem("rick-intro-seen");
    if (!hasSeenIntro) {
      setShowIntro(true);
      // Prevent scroll during intro
      document.body.style.overflow = "hidden";
    } else {
      setIntroComplete(true);
    }
  }, []);

  const handleIntroComplete = () => {
    sessionStorage.setItem("rick-intro-seen", "true");
    document.body.style.overflow = "";
    setShowIntro(false);
    setIntroComplete(true);
  };

  return (
    <>
      {showIntro && <NeonMapIntro onComplete={handleIntroComplete} />}

      {introComplete && (
        <PageTransition>
          <FilmGrain />
          <ParticleField count={25} />
          <TimelineHero />
          <HorizontalTimeline restaurants={data} />

          {/* Bayou divider */}
          <div className="bayou-divider mx-auto my-8 max-w-4xl px-6">
            <svg viewBox="0 0 800 40" preserveAspectRatio="none">
              <path
                d="M 0,20 C 100,10 200,30 300,20 C 400,10 500,30 600,20 C 700,10 800,25 800,20"
                fill="none"
                stroke="var(--accent-gold)"
                strokeWidth="0.5"
                strokeOpacity="0.3"
              />
            </svg>
          </div>

          {/* Footer CTA section */}
          <section className="flex min-h-[50vh] flex-col items-center justify-center px-6 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-muted">
              Hungry for more?
            </p>
            <h2 className="mt-4 font-serif text-4xl font-bold md:text-6xl" style={{ fontStyle: "italic" }}>
              Explore the Full
              <br />
              <span className="text-accent">Journey</span>
            </h2>
            <a
              href="/about"
              data-cursor="magnetic"
              className="warm-glow mt-8 inline-block border border-accent/30 px-8 py-3 text-xs uppercase tracking-widest text-accent transition-all hover:border-accent hover:bg-accent/10"
            >
              About Rick&apos;s Caf&eacute;
            </a>

            {/* Houston skyline silhouette footer */}
            <div className="mt-20 w-full max-w-3xl opacity-10">
              <svg viewBox="0 0 800 120" className="w-full" preserveAspectRatio="xMidYMax meet">
                <path
                  d="M 0,120 L 0,100 L 30,100 L 30,80 L 50,80 L 50,90 L 70,90 L 70,60 L 90,60 L 90,70 L 110,70 L 110,45 L 125,45 L 125,55 L 140,55 L 140,35 L 155,35 L 155,50 L 170,50 L 170,70 L 200,70 L 200,55 L 220,55 L 220,40 L 235,40 L 235,30 L 250,30 L 250,45 L 270,45 L 270,60 L 290,60 L 290,50 L 310,50 L 310,25 L 325,25 L 325,15 L 340,15 L 340,25 L 355,25 L 355,35 L 370,35 L 370,20 L 385,20 L 385,10 L 400,10 L 400,20 L 415,20 L 415,30 L 430,30 L 430,45 L 450,45 L 450,55 L 470,55 L 470,40 L 490,40 L 490,30 L 505,30 L 505,20 L 520,20 L 520,35 L 540,35 L 540,50 L 560,50 L 560,65 L 580,65 L 580,50 L 600,50 L 600,40 L 620,40 L 620,55 L 640,55 L 640,70 L 660,70 L 660,80 L 700,80 L 700,90 L 740,90 L 740,95 L 780,95 L 780,100 L 800,100 L 800,120 Z"
                  fill="var(--accent-gold)"
                />
              </svg>
            </div>
          </section>
        </PageTransition>
      )}
    </>
  );
}
