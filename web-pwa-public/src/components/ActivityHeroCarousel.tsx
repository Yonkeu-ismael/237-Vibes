"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

export default function ActivityHeroCarousel({
   title,
   imageUrls,
}: {
   title: string;
   imageUrls?: string[];
}) {
   const media = useMemo(() => imageUrls ?? [], [imageUrls]);
   const [active, setActive] = useState(0);

   useEffect(() => {
      if (media.length <= 1) return;
      const timer = window.setInterval(() => {
         setActive((prev) => (prev + 1) % media.length);
      }, 3200);
      return () => window.clearInterval(timer);
   }, [media.length]);

   if (media.length === 0) return null;

   return (
      <>
         {media.map((src, index) => (
            <Image
               key={`${title}-${index}`}
               src={src}
               alt={`${title} visuel ${index + 1}`}
               fill
               priority={index === 0}
               sizes="100vw"
               className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${index === active ? "opacity-100" : "opacity-0"}`}
            />
         ))}

         {media.length > 1 && (
            <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
               {media.map((_, index) => (
                  <span
                     key={`${title}-dot-${index}`}
                     className={`h-1.5 rounded-full transition-all ${index === active ? "w-5 bg-white" : "w-2 bg-white/50"}`}
                  />
               ))}
            </div>
         )}
      </>
   );
}
