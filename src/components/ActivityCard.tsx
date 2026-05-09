"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { type activities } from "@/lib/mock-data";

type Activity = (typeof activities)[number];

export default function ActivityCard({
   item,
   showBook = true,
   className,
   style,
}: {
   item: Activity;
   showBook?: boolean;
   className?: string;
   style?: CSSProperties;
}) {
   const priceFormatted = item.priceFcfa.toLocaleString("fr-FR");
   const occupancyPct = Math.round(((item.totalSpots - item.spotsLeft) / item.totalSpots) * 100);
   const isAlmostFull = item.spotsLeft <= 10;
   const media = useMemo(() => {
      if (Array.isArray(item.imageUrls) && item.imageUrls.length > 0) return item.imageUrls;
      return item.imageUrl ? [item.imageUrl] : [];
   }, [item.imageUrls, item.imageUrl]);
   const [currentImageIndex, setCurrentImageIndex] = useState(0);

   useEffect(() => {
      if (media.length <= 1) return;

      const timer = window.setInterval(() => {
         setCurrentImageIndex((prev) => (prev + 1) % media.length);
      }, 2800);

      return () => window.clearInterval(timer);
   }, [media.length]);

   return (
      <article
         className={`group relative flex flex-col rounded-2xl overflow-hidden border border-white/8 bg-gradient-to-b from-[#1c1640]/80 to-[#13102e]/80 transition hover:border-violet-400/40 hover:shadow-[0_0_32px_rgba(124,58,237,0.25)] ${className ?? ""}`}
         style={style}
      >
         {/* Image zone */}
         <div className={`relative h-44 bg-gradient-to-br ${item.gradientClass} flex items-end px-4 pb-4`}>
            {media.map((src, index) => (
               <Image
                  key={`${item.id}-img-${index}`}
                  src={src}
                  alt={`${item.title} - visuel ${index + 1}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${index === currentImageIndex ? "opacity-100" : "opacity-0"}`}
               />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-transparent" />
            {item.featured && (
               <span className="absolute top-3 left-3 z-10 rounded-full bg-amber-400 px-2.5 py-0.5 text-xs font-bold text-amber-900">À l&apos;affiche</span>
            )}
            {isAlmostFull && (
               <span className="absolute top-3 right-3 z-10 rounded-full bg-rose-500/90 px-2.5 py-0.5 text-xs font-semibold text-white">Presque complet</span>
            )}
            <span className="relative z-10 inline-flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1 text-xs font-medium text-white backdrop-blur">
               ★ {item.rating} · {item.reviewCount} avis
            </span>

            {media.length > 1 && (
               <div className="absolute bottom-2 right-3 z-10 flex items-center gap-1.5">
                  {media.map((_, index) => (
                     <span
                        key={`${item.id}-dot-${index}`}
                        className={`h-1.5 rounded-full transition-all ${index === currentImageIndex ? "w-4 bg-white" : "w-1.5 bg-white/45"}`}
                     />
                  ))}
               </div>
            )}
         </div>

         {/* Content */}
         <div className="flex flex-1 flex-col gap-2 p-4">
            <p className="text-xs text-violet-300/80">{item.date}</p>
            <h3 className="font-bold text-white leading-snug line-clamp-1">{item.title}</h3>
            <p className="text-xs text-violet-100/60 line-clamp-2">{item.shortDesc}</p>
            <p className="mt-1 text-xs text-violet-200/70">📍 {item.venue}, {item.city}</p>

            {/* Occupancy bar */}
            <div className="mt-auto pt-3">
               <div className="mb-1 flex items-center justify-between text-xs text-violet-100/60">
                  <span>{item.spotsLeft} places restantes</span>
                  <span>{occupancyPct}% réservé</span>
               </div>
               <div className="h-1.5 rounded-full bg-white/10">
                  <div className="h-1.5 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500" style={{ width: `${occupancyPct}%` }} />
               </div>
            </div>

            {/* Footer */}
            <div className="mt-3 flex items-center justify-between">
               <div>
                  <span className="text-lg font-extrabold text-white">{priceFormatted}</span>
                  <span className="ml-1 text-xs text-violet-100/60">FCFA / pers.</span>
               </div>
               {showBook && (
                  <Link
                     href={`/activity/${item.id}`}
                     className="rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-2 text-xs font-bold text-white hover:opacity-90 transition"
                  >
                     Voir →
                  </Link>
               )}
            </div>
         </div>
      </article>
   );
}
