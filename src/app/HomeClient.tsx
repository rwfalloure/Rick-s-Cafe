"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PageTransition } from "@/components/layout/PageTransition";
import { TimelineHero } from "@/components/timeline/TimelineHero";
import { HorizontalTimeline } from "@/components/timeline/HorizontalTimeline";
import { RestaurantCard } from "@/components/common/RestaurantCard";
import { getTopByCategory } from "@/data/restaurants";
import type { TimelineRestaurant } from "@/lib/types";

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

function FeaturedSection({
  title,
  subtitle,
  seeAllHref,
  children,
}: {
  title: string;
  subtitle: string;
  seeAllHref: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <RevealText>
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <h2 className="font-heading text-3xl font-bold md:text-4xl">{title}</h2>
            <p className="mt-2 text-muted text-sm">{subtitle}</p>
          </div>
          <Link
            href={seeAllHref}
            className="font-mono text-xs uppercase tracking-widest text-accent underline underline-offset-4 decoration-accent/40 hover:decoration-accent transition-all shrink-0"
          >
            See All →
          </Link>
        </div>
      </RevealText>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{children}</div>
    </section>
  );
}

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

  return (
    <PageTransition>
      <TimelineHero />
      <HorizontalTimeline restaurants={data} />

      {/* ── Featured Houston Reviews ──────────────────────── */}
      <div className="mx-auto max-w-7xl px-6">
        <div className="h-px bg-foreground/10" />
      </div>
      <FeaturedSection
        title="Houston Reviews"
        subtitle="The city's most essential tables, scored and documented."
        seeAllHref="/houston"
      >
        {getTopByCategory("houston", 3).map((r, i) => (
          <RestaurantCard key={r.id} restaurant={r} index={i} />
        ))}
      </FeaturedSection>

      {/* ── Featured Taco Reviews ─────────────────────────── */}
      <div className="mx-auto max-w-7xl px-6">
        <div className="h-px bg-foreground/10" />
      </div>
      <FeaturedSection
        title="Taco Run"
        subtitle="One city, one mission, one benchmark taco at every stop."
        seeAllHref="/tacos"
      >
        {getTopByCategory("taco", 3).map((r, i) => (
          <RestaurantCard key={r.id} restaurant={r} index={i} />
        ))}
      </FeaturedSection>

      {/* ── Featured Travel Reviews ───────────────────────── */}
      <div className="mx-auto max-w-7xl px-6">
        <div className="h-px bg-foreground/10" />
      </div>
      <FeaturedSection
        title="Travel Eats"
        subtitle="The restaurants worth boarding a plane for."
        seeAllHref="/travel"
      >
        {getTopByCategory("travel", 3).map((r, i) => (
          <RestaurantCard key={r.id} restaurant={r} index={i} />
        ))}
      </FeaturedSection>

      {/* ── Footer CTA ────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-6">
        <div className="h-px bg-foreground/10" />
      </div>
      <section className="flex min-h-[40vh] flex-col items-center justify-center px-6 text-center">
        <h2 className="font-heading text-4xl font-bold md:text-6xl">
          Explore the Full
          <br />
          <span className="text-accent">Journey</span>
        </h2>
        <a
          href="/about"
          data-cursor="magnetic"
          className="mt-8 inline-block text-sm uppercase tracking-widest text-accent underline underline-offset-4 decoration-accent/40 transition-all hover:decoration-accent"
        >
          About Rick&apos;s Caf&eacute;
        </a>
      </section>
    </PageTransition>
  );
}
