"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { GalleryPhoto } from "@/data/gallery";

interface Props {
  photos: GalleryPhoto[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export function Lightbox({ photos, currentIndex, onClose, onNext, onPrev }: Props) {
  const photo = photos[currentIndex];

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    },
    [onClose, onNext, onPrev]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1a2e18]/96 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {/* Close */}
      <button
        className="absolute top-5 right-5 text-[#E8C587]/60 hover:text-[#E8C587] transition-colors z-10"
        onClick={onClose}
        aria-label="Close lightbox"
      >
        <X size={28} />
      </button>

      {/* Counter */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-widest text-[#E8C587]/40">
        {currentIndex + 1} / {photos.length}
      </div>

      {/* Prev */}
      <button
        className="absolute left-3 md:left-6 text-[#E8C587]/50 hover:text-[#E8C587] transition-colors z-10 p-3"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        aria-label="Previous photo"
      >
        <ChevronLeft size={36} />
      </button>

      {/* Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="relative px-16 max-w-5xl w-full flex flex-col items-center"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.22 }}
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={photo.src}
            alt={photo.alt}
            className="max-h-[75vh] max-w-full w-auto object-contain rounded-sm"
          />
          {photo.caption && (
            <p className="mt-5 text-center text-sm text-[#E8C587]/70 max-w-xl">
              {photo.caption}
            </p>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Next */}
      <button
        className="absolute right-3 md:right-6 text-[#E8C587]/50 hover:text-[#E8C587] transition-colors z-10 p-3"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        aria-label="Next photo"
      >
        <ChevronRight size={36} />
      </button>
    </motion.div>
  );
}
