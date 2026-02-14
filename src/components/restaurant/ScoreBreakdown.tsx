"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScoreBreakdownProps {
  scores: {
    taste: number;
    vibe: number;
    service: number;
    value: number;
  };
  rickFactor: {
    score: number;
    description: string;
  };
}

const categories = [
  { key: "taste", label: "Taste", color: "var(--accent-red)" },
  { key: "vibe", label: "Vibe", color: "var(--accent-gold)" },
  { key: "service", label: "Service", color: "var(--accent-teal)" },
  { key: "value", label: "Value", color: "var(--accent)" },
] as const;

function ScoreBar({
  label,
  score,
  delay,
  color,
}: {
  label: string;
  score: number;
  delay: number;
  color: string;
}) {
  const percentage = (score / 10) * 100;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-widest text-muted">{label}</span>
        <span className="font-serif text-sm" style={{ fontStyle: "italic" }}>
          {score}
        </span>
      </div>
      <div className="h-1 w-full overflow-hidden rounded-full bg-foreground/5">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

export function ScoreBreakdown({ scores, rickFactor }: ScoreBreakdownProps) {
  const overall = (scores.taste + scores.vibe + scores.service + scores.value) / 4;

  return (
    <div className="space-y-8">
      {/* Overall score — "Rick's Verdict" stamp */}
      <div className="text-center">
        <motion.div
          className="warm-glow inline-flex h-24 w-24 items-center justify-center rounded-full border-2"
          style={{ borderColor: "var(--accent)" }}
          initial={{ scale: 0, opacity: 0, rotate: -12 }}
          whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 12,
            delay: 0.1,
          }}
        >
          <span className="font-serif text-3xl" style={{ fontStyle: "italic", color: "var(--accent)" }}>
            {overall.toFixed(1)}
          </span>
        </motion.div>

        {/* Stamp text */}
        <motion.div
          className="mt-3"
          initial={{ opacity: 0, scale: 1.3, rotate: -3 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.15, ease: "easeOut" }}
        >
          <p
            className="text-[10px] font-bold uppercase tracking-[0.5em]"
            style={{ color: "var(--accent)", fontFamily: "var(--font-display-var)" }}
          >
            Rick&apos;s Verdict
          </p>
        </motion.div>
      </div>

      {/* Individual scores with colored bars */}
      <div className="space-y-4">
        {categories.map((cat, i) => (
          <ScoreBar
            key={cat.key}
            label={cat.label}
            score={scores[cat.key]}
            delay={i * 0.1}
            color={cat.color}
          />
        ))}
      </div>

      {/* The Rick Factor — branded card */}
      <motion.div
        className={cn(
          "noise-texture rounded-2xl border border-accent/20 bg-accent/5 p-6",
          "space-y-3"
        )}
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <div className="relative z-10 flex items-center justify-between">
          <span
            className="text-xs font-bold uppercase tracking-widest text-accent"
            style={{ fontFamily: "var(--font-display-var)" }}
          >
            The Rick Factor
          </span>
          {/* Stamp-style score */}
          <motion.span
            className="font-serif text-2xl text-accent"
            style={{ fontStyle: "italic" }}
            initial={{ scale: 2, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, type: "spring", stiffness: 400, damping: 15 }}
          >
            {rickFactor.score}
          </motion.span>
        </div>
        <p className="relative z-10 text-sm leading-relaxed text-muted">
          {rickFactor.description}
        </p>
      </motion.div>
    </div>
  );
}
