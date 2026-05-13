"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  subLabel: string;
}

const stats: StatItem[] = [
  { value: 15, suffix: "+", label: "Years", subLabel: "Experience" },
  { value: 2000, suffix: "+", label: "Happy", subLabel: "Farmers" },
  { value: 50, suffix: "+", label: "Expert", subLabel: "Team" },
  { value: 100, suffix: "%", label: "Genuine", subLabel: "Spares" }
];

const Counter = ({ end, suffix, duration = 2, shouldStart }: { end: number; suffix: string; duration?: number; shouldStart: boolean }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!shouldStart || hasAnimated) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / (duration * 1000);

      if (progress < 1) {
        setCount(Math.min(Math.floor(end * progress), end));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
        setHasAnimated(true);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [shouldStart, end, duration, hasAnimated]);

  return (
    <span className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-orange-400">
      {count}
      {suffix}
    </span>
  );
};

export default function StatsCounter() {
  const sectionRef = useRef(null);
  const [hasTriggered, setHasTriggered] = useState(false);
  
  // Use InView with more sensitive detection
  const isInView = useInView(sectionRef, { 
    once: true, 
    amount: 0.3 // Trigger when 30% of the element is visible
  });

  // Update triggered state when element comes into view
  useEffect(() => {
    if (isInView && !hasTriggered) {
      setHasTriggered(true);
    }
  }, [isInView, hasTriggered]);

  return (
    <section ref={sectionRef} className="bg-black py-8 text-white border-y border-white/10 sm:py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-2 sm:px-4 md:px-6">
        <div className="grid grid-cols-4 gap-4 text-center xs:gap-6 sm:gap-8 md:gap-12 md:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={hasTriggered ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="space-y-1 xs:space-y-2"
            >
              <Counter 
                end={stat.value} 
                suffix={stat.suffix} 
                duration={2} 
                shouldStart={hasTriggered}
              />
              <p className="text-[10px] xs:text-xs font-black uppercase tracking-wider text-gray-500">
                {stat.label}<br className="hidden xs:inline" /> {stat.subLabel}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}