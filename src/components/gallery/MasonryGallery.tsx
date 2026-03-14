"use client";

import { motion } from "framer-motion";
import type { GalleryPhoto } from "@/data/gallery";

interface Props {
  photos: GalleryPhoto[];
  onPhotoClick: (photo: GalleryPhoto, index: number) => void;
}

export function MasonryGallery({ photos, onPhotoClick }: Props) {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
      {photos.map((photo, index) => (
        <motion.div
          key={photo.id}
          className="break-inside-avoid mb-4 cursor-pointer group relative overflow-hidden rounded-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
          onClick={() => onPhotoClick(photo, index)}
        >
          <img
            src={photo.src}
            alt={photo.alt}
            className="w-full block transition-transform duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />
          {/* Caption overlay on hover */}
          <div className="absolute inset-0 bg-[#1a2e18]/0 group-hover:bg-[#1a2e18]/65 transition-all duration-300 flex items-end">
            <p className="p-4 text-[#F6E7CB] text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 leading-snug">
              {photo.caption ?? photo.alt}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
