'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

function AnimatedNumber({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function ImpactCounter() {
  const stats = [
    { target: 500, suffix: '+', label: 'Families Helped', icon: '🏠' },
    { target: 1000, suffix: '+', label: 'Relief Bags Delivered', icon: '🛍' },
    { target: 50, suffix: '+', label: 'Active Volunteers', icon: '🤝' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.15, duration: 0.5 }}
          className="text-center"
        >
          <p className="text-5xl md:text-6xl font-bold text-[var(--kindness)] mb-2">
            <AnimatedNumber target={stat.target} suffix={stat.suffix} />
          </p>
          <p className="text-[var(--trust-soft)] font-medium">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  );
}
