"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageTransition } from "@/components/layout/PageTransition";
import { MasonryGallery } from "@/components/gallery/MasonryGallery";
import { Lightbox } from "@/components/gallery/Lightbox";
import { galleryPhotos, type GalleryPhoto } from "@/data/gallery";

type Category = 'all' | 'restaurant' | 'coffee' | 'travel' | 'adventure';

const CATEGORIES: { key: Category; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'restaurant', label: 'Restaurants' },
  { key: 'coffee', label: 'Coffee' },
  { key: 'travel', label: 'Travel' },
  { key: 'adventure', label: 'Adventure' },
];

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

export function GalleryClient() {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredPhotos = useMemo(() => {
    if (activeCategory === 'all') return galleryPhotos;
    return galleryPhotos.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const openLightbox = (_photo: GalleryPhoto, index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => setLightboxIndex(null);

  const nextPhoto = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredPhotos.length);
  };

  const prevPhoto = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex(
      (lightboxIndex - 1 + filteredPhotos.length) % filteredPhotos.length
    );
  };

  return (
    <PageTransition>
      {/* ── Hero ──────────────────────────────────────────── */}
      <div className="relative pt-40 pb-16 px-6 text-center">
        <motion.p
          className="mb-4 font-mono text-xs uppercase tracking-[0.4em] text-muted"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Visual Record
        </motion.p>
        <motion.h1
          className="font-heading text-5xl font-bold md:text-7xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          The Gallery
        </motion.h1>
        <motion.p
          className="mt-5 max-w-md mx-auto text-muted leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Every meal, every city, every moment the phone came out before the
          fork. Click any photo to open it full-screen.
        </motion.p>
      </div>

      {/* ── Category Filter ───────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-6 pb-10">
        <RevealText>
          <div className="flex flex-wrap items-center gap-3">
            {CATEGORIES.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`font-mono text-xs uppercase tracking-widest px-4 py-2 rounded-sm border transition-colors ${
                  activeCategory === key
                    ? "border-foreground bg-foreground text-background"
                    : "border-foreground/20 text-muted hover:border-foreground/50"
                }`}
              >
                {label}
              </button>
            ))}
            <span className="font-mono text-[10px] text-muted ml-2">
              {filteredPhotos.length} photo{filteredPhotos.length !== 1 ? "s" : ""}
            </span>
          </div>
        </RevealText>
      </div>

      {/* ── Masonry Grid ──────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-6 pb-32">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <MasonryGallery photos={filteredPhotos} onPhotoClick={openLightbox} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Lightbox ──────────────────────────────────────── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            photos={filteredPhotos}
            currentIndex={lightboxIndex}
            onClose={closeLightbox}
            onNext={nextPhoto}
            onPrev={prevPhoto}
          />
        )}
      </AnimatePresence>
    </PageTransition>
  );
}
