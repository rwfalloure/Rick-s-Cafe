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
    name: "Tiny Boxwoods",
    slug: { current: "tiny-boxwoods" },
    cuisine: "Café / Brunch",
    priceRange: "$$",
    neighborhood: "River Oaks",
    heroImage: null as any,
    overallScore: 8.1,
    dateVisited: "2026-02-14",
    summary:
      "A River Oaks gem with a courtyard straight out of a storybook. The atmosphere alone earns its reputation — the food is solid, the sangria is a must, and the lox on the avocado toast had one bad day.",
    vibeColor: "#7a9e7e",
  },
  {
    _id: "houston-2",
    name: "BB's Tex-Orleans",
    slug: { current: "bbs-tex-orleans" },
    cuisine: "Cajun-Texas",
    priceRange: "$$",
    neighborhood: "Heights",
    heroImage: null as any,
    overallScore: 8.4,
    dateVisited: "2026-02-20",
    summary:
      "Where New Orleans meets Texas and neither one backs down. The Tex-Orleans crawfish is one of the most unique spice profiles in the city — messy, bold, and completely worth it.",
    vibeColor: "#c45c2a",
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
