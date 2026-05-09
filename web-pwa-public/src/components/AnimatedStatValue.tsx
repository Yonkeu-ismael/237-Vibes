"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export default function AnimatedStatValue({
   end,
   suffix = "",
   durationMs = 1200,
}: {
   end: number;
   suffix?: string;
   durationMs?: number;
}) {
   const ref = useRef<HTMLParagraphElement | null>(null);
   const [started, setStarted] = useState(false);
   const [value, setValue] = useState(0);

   useEffect(() => {
      const node = ref.current;
      if (!node) return;

      const observer = new IntersectionObserver(
         ([entry]) => {
            if (entry.isIntersecting) {
               setStarted(true);
               observer.disconnect();
            }
         },
         { threshold: 0.35 },
      );

      observer.observe(node);
      return () => observer.disconnect();
   }, []);

   useEffect(() => {
      if (!started) return;

      let raf = 0;
      const startAt = performance.now();

      const tick = (now: number) => {
         const progress = Math.min(1, (now - startAt) / durationMs);
         const eased = 1 - Math.pow(1 - progress, 3);
         setValue(Math.round(end * eased));
         if (progress < 1) raf = requestAnimationFrame(tick);
      };

      raf = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(raf);
   }, [started, end, durationMs]);

   const formatted = useMemo(() => value.toLocaleString("fr-FR"), [value]);

   return (
      <p ref={ref} className="text-3xl font-extrabold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
         {formatted}
         {suffix}
      </p>
   );
}
