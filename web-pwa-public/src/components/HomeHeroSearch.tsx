"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const ALL_CITIES = "__all__";

export default function HomeHeroSearch() {
   const router = useRouter();
   const [query, setQuery] = useState("");
   const [city, setCity] = useState(ALL_CITIES);

   const onSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const params = new URLSearchParams();

      if (query.trim()) params.set("q", query.trim());
      if (city !== ALL_CITIES) params.set("city", city);

      const nextQuery = params.toString();
      router.push(nextQuery ? `/explore?${nextQuery}` : "/explore");
   };

   return (
      <form onSubmit={onSubmit} className="mt-10 flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
         <div className="flex-1 flex items-center gap-3 rounded-2xl border border-white/15 bg-white/6 px-4 py-3 backdrop-blur">
            <span className="text-violet-300">🔍</span>
            <input
               value={query}
               onChange={(e) => setQuery(e.target.value)}
               className="flex-1 bg-transparent text-white placeholder-violet-100/45 outline-none text-sm"
               placeholder="Concert, restaurant, balade..."
            />
         </div>

         <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="rounded-2xl border border-white/15 bg-[#1a1538] px-4 py-3 text-sm text-white backdrop-blur outline-none cursor-pointer appearance-none"
         >
            <option value={ALL_CITIES}>📍 Toutes les villes</option>
            <option value="Yaoundé">Yaoundé</option>
            <option value="Douala">Douala</option>
            <option value="Bafoussam">Bafoussam</option>
            <option value="Kribi">Kribi</option>
         </select>

         <button
            type="submit"
            className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-3 text-sm font-bold text-white hover:opacity-90 transition"
         >
            Rechercher
         </button>
      </form>
   );
}
