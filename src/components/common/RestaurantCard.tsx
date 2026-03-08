"use client";

import { motion } from "framer-motion";
import type { RestaurantEntry } from "@/data/restaurants";

interface Props {
  restaurant: RestaurantEntry;
  index?: number;
}

export function RestaurantCard({ restaurant, index = 0 }: Props) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-sm border border-foreground/10 bg-background/60"
    >
      {/* Photo */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={restaurant.photo}
          alt={restaurant.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Rating badge */}
        <div className="absolute top-3 right-3 bg-[#1a2e18]/85 backdrop-blur-sm px-2.5 py-1 rounded-sm">
          <span className="font-mono text-sm font-bold text-[#E8C587]">
            {restaurant.rating.toFixed(1)}
          </span>
        </div>
        {/* Price range badge */}
        {restaurant.priceRange && (
          <div className="absolute top-3 left-3 bg-background/80 backdrop-blur-sm px-2 py-0.5 rounded-sm">
            <span className="font-mono text-xs text-muted">
              {restaurant.priceRange}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-heading text-xl font-bold text-foreground leading-tight">
          {restaurant.name}
        </h3>
        <p className="mt-1 font-mono text-xs text-muted">
          {restaurant.cuisine}
          {restaurant.neighborhood && ` · ${restaurant.neighborhood}`}
          {!restaurant.neighborhood && restaurant.city && ` · ${restaurant.city}`}
          {restaurant.country && `, ${restaurant.country}`}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted line-clamp-3">
          {restaurant.summary}
        </p>
        {restaurant.dateVisited && (
          <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-foreground/30">
            Visited {restaurant.dateVisited}
          </p>
        )}
      </div>
    </motion.article>
  );
}
