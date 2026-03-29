'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const lines = [
  { text: 'Every donation.', color: 'var(--warmth)' },
  { text: 'Every volunteer hour.', color: 'var(--relief)' },
  { text: 'Every act of kindness.', color: 'var(--kindness)' },
  { text: 'Creates hope within our community.', color: 'var(--trust)' },
];

export default function RotatingImpact() {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (visibleCount >= lines.length) {
      // All lines shown — pause, then reset and restart
      const resetTimer = setTimeout(() => setVisibleCount(0), 4000);
      return () => clearTimeout(resetTimer);
    }

    const timer = setTimeout(() => {
      setVisibleCount((prev) => prev + 1);
    }, 1800);

    return () => clearTimeout(timer);
  }, [visibleCount]);

  return (
    <div className="flex flex-col items-center gap-3 md:gap-4 min-h-[280px] md:min-h-[320px] justify-center">
      {lines.map((line, i) => (
        <motion.p
          key={`${line.text}-${Math.floor(visibleCount / (lines.length + 1))}`}
          initial={{ opacity: 0, y: 15 }}
          animate={i < visibleCount ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="font-[var(--font-dm-serif)] text-3xl md:text-5xl lg:text-6xl text-center font-bold"
          style={{ color: line.color }}
        >
          {line.text}
        </motion.p>
      ))}
    </div>
  );
}
