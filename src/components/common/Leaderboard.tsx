"use client";

import { motion } from "framer-motion";

export interface LeaderboardRow {
  rank: number;
  name: string;
  detail1?: string;
  detail2?: string;
  score: number;
}

interface Props {
  rows: LeaderboardRow[];
  col1Label?: string;
  col2Label?: string;
  scoreLabel?: string;
}

const MEDAL: Record<number, string> = {
  1: "#D4AF37",
  2: "#A8A9AD",
  3: "#CD7F32",
};

export function Leaderboard({
  rows,
  col1Label = "Name",
  col2Label,
  scoreLabel = "Score",
}: Props) {
  return (
    <div className="w-full overflow-x-auto">
      {/* Header */}
      <div
        className={`grid gap-4 border-b border-foreground/10 pb-3 mb-1 ${
          col2Label
            ? "grid-cols-[3rem_1fr_1fr_5rem]"
            : "grid-cols-[3rem_1fr_5rem]"
        }`}
      >
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
          #
        </span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
          {col1Label}
        </span>
        {col2Label && (
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
            {col2Label}
          </span>
        )}
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted text-right">
          {scoreLabel}
        </span>
      </div>

      {/* Rows */}
      {rows.map((row, i) => (
        <motion.div
          key={row.rank}
          className={`grid gap-4 border-b border-foreground/5 py-4 items-center ${
            col2Label
              ? "grid-cols-[3rem_1fr_1fr_5rem]"
              : "grid-cols-[3rem_1fr_5rem]"
          }`}
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.07, duration: 0.45 }}
        >
          <span
            className="font-mono text-xl font-bold"
            style={{ color: MEDAL[row.rank] ?? "var(--muted)" }}
          >
            {String(row.rank).padStart(2, "0")}
          </span>

          <div>
            <p className="font-heading text-base font-semibold text-foreground">
              {row.name}
            </p>
            {row.detail1 && (
              <p className="text-xs text-muted mt-0.5">{row.detail1}</p>
            )}
          </div>

          {col2Label && (
            <p className="text-sm text-muted">{row.detail2 ?? "—"}</p>
          )}

          <p className="font-mono text-xl font-bold text-foreground text-right">
            {row.score.toFixed(1)}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
