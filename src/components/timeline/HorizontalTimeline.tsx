"use client";

import { TimelinePanel } from "./TimelinePanel";
import type { TimelineRestaurant } from "@/lib/types";

// Houston food scene Unsplash photos
const MOCK_IMAGES = [
  "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
  "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&q=80",
  "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800&q=80",
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80",
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
  "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80",
];

interface Props {
  restaurants: TimelineRestaurant[];
}

export function HorizontalTimeline({ restaurants }: Props) {
  return (
    <div className="divide-y divide-foreground/5">
      {restaurants.map((restaurant, i) => (
        <TimelinePanel
          key={restaurant._id}
          restaurant={restaurant}
          index={i}
          imageUrl={MOCK_IMAGES[i % MOCK_IMAGES.length]}
        />
      ))}

      {/* End of current entries */}
      <div className="flex items-center justify-center py-24">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-muted">
            The journey continues
          </p>
          <p className="mt-4 font-mono text-3xl font-bold text-foreground/30">
            ...
          </p>
        </div>
      </div>
    </div>
  );
}
