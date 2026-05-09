"use client";

import Link from "next/link";
import { Suspense, useDeferredValue, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ActivityCard from "@/components/ActivityCard";
import { activities, categories, cities } from "@/lib/mock-data";

const ALL_CITIES_VALUE = "__all__";

function normalizeText(value: string) {
   return value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();
}

function ExploreContent() {
   const router = useRouter();
   const pathname = usePathname();
   const searchParams = useSearchParams();

   const [search, setSearch] = useState("");
   const [selectedCat, setSelectedCat] = useState("");
   const [selectedCity, setSelectedCity] = useState(ALL_CITIES_VALUE);
   const [sortBy, setSortBy] = useState<"rating" | "price_asc" | "price_desc">("rating");
   const deferredSearch = useDeferredValue(search);

   useEffect(() => {
      const syncFromParams = () => {
         const qParam = searchParams.get("q") ?? "";
         const catParam = searchParams.get("cat") ?? "";
         const cityParam = searchParams.get("city") ?? "";

         setSearch(qParam);
         setSelectedCat(categories.some((c) => c.id === catParam) ? catParam : "");

         if (!cityParam) {
            setSelectedCity(ALL_CITIES_VALUE);
            return;
         }

         const matchedCity = cities.find((city) => normalizeText(city) === normalizeText(cityParam));
         setSelectedCity(matchedCity ?? ALL_CITIES_VALUE);
      };

      const timer = window.setTimeout(syncFromParams, 0);
      return () => window.clearTimeout(timer);
   }, [searchParams]);

   const setFilterParam = (key: "cat" | "city", value: string) => {
      const nextParams = new URLSearchParams(searchParams.toString());
      if (!value || value === ALL_CITIES_VALUE) {
         nextParams.delete(key);
      } else {
         nextParams.set(key, value);
      }

      if (key === "cat") {
         setSelectedCat(value);
      }
      if (key === "city") {
         setSelectedCity(value || ALL_CITIES_VALUE);
      }

      const nextQuery = nextParams.toString();
      router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, { scroll: false });
   };

   const categoryLabelById = useMemo(() => {
      return new Map(categories.map((category) => [category.id, category.label]));
   }, []);

   const filtered = useMemo(() => {
      let list = [...activities];

      if (deferredSearch.trim()) {
         const q = normalizeText(deferredSearch);
         list = list.filter(
            (a) =>
               [
                  a.title,
                  a.shortDesc,
                  a.city,
                  a.venue,
                  a.date,
                  categoryLabelById.get(a.category) ?? "",
               ].some((field) => normalizeText(field).includes(q)),
         );
      }
      if (selectedCat) {
         list = list.filter((a) => a.category === selectedCat);
      }
      if (selectedCity !== ALL_CITIES_VALUE) {
         list = list.filter((a) => normalizeText(a.city) === normalizeText(selectedCity));
      }

      list.sort((a, b) => {
         if (sortBy === "rating") return b.rating - a.rating;
         if (sortBy === "price_asc") return a.priceFcfa - b.priceFcfa;
         return b.priceFcfa - a.priceFcfa;
      });

      return list;
   }, [deferredSearch, selectedCat, selectedCity, sortBy, categoryLabelById]);

   return (
      <>
         <Navbar />
         <div className="min-h-screen pt-20 animate-fade-up">
            {/* Filters header */}
            <div className="sticky top-16 z-40 border-b border-white/8 bg-[#09061b]/90 backdrop-blur-xl">
               <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                     {/* Search */}
                     <div className="flex flex-1 items-center gap-2 rounded-xl border border-white/12 bg-white/5 px-3 py-2.5">
                        <span className="text-violet-300 text-sm">🔍</span>
                        <input
                           value={search}
                           onChange={(e) => setSearch(e.target.value)}
                           placeholder="Rechercher une activité, lieu, catégorie..."
                           className="flex-1 bg-transparent text-sm text-white placeholder-violet-100/45 outline-none"
                        />
                        {search && (
                           <button type="button" onClick={() => setSearch("")} className="text-violet-300/60 text-sm hover:text-white">✕</button>
                        )}
                     </div>

                     {/* City */}
                     <select
                        value={selectedCity}
                        onChange={(e) => setFilterParam("city", e.target.value)}
                        className="rounded-xl border border-white/12 bg-white/5 px-3 py-2.5 text-sm text-white outline-none"
                     >
                        <option value={ALL_CITIES_VALUE} className="bg-[#1c1640]">Toutes les villes</option>
                        {cities.filter((c) => c !== "Toutes les villes").map((c) => (
                           <option key={c} value={c} className="bg-[#1c1640]">{c}</option>
                        ))}
                     </select>

                     {/* Sort */}
                     <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                        className="rounded-xl border border-white/12 bg-white/5 px-3 py-2.5 text-sm text-white outline-none"
                     >
                        <option value="rating" className="bg-[#1c1640]">Mieux notés</option>
                        <option value="price_asc" className="bg-[#1c1640]">Prix croissant</option>
                        <option value="price_desc" className="bg-[#1c1640]">Prix décroissant</option>
                     </select>
                  </div>

                  {/* Category pills */}
                  <div className="mt-3 flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                     <button
                        type="button"
                        onClick={() => setFilterParam("cat", "")}
                        className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold transition ${!selectedCat ? "bg-violet-600 text-white" : "border border-white/15 bg-white/5 text-violet-100/75 hover:border-violet-400/50"}`}
                     >
                        Tout
                     </button>
                     {categories.map((cat) => (
                        <button
                           key={cat.id}
                           type="button"
                           onClick={() => setFilterParam("cat", cat.id === selectedCat ? "" : cat.id)}
                           className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold transition whitespace-nowrap ${selectedCat === cat.id ? "bg-violet-600 text-white" : "border border-white/15 bg-white/5 text-violet-100/75 hover:border-violet-400/50"}`}
                        >
                           {cat.icon} {cat.label.split(" ")[0]}
                        </button>
                     ))}
                  </div>
               </div>
            </div>

            {/* Results */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
               <div className="mb-6 flex items-center justify-between">
                  <h1 className="text-lg font-bold text-white">
                     {filtered.length} activité{filtered.length > 1 ? "s" : ""}
                     {selectedCat ? ` · ${categories.find((c) => c.id === selectedCat)?.label}` : ""}
                     {selectedCity !== ALL_CITIES_VALUE ? ` à ${selectedCity}` : ""}
                  </h1>
               </div>

               {filtered.length === 0 ? (
                  <div className="flex flex-col items-center gap-4 py-24 text-center">
                     <span className="text-5xl">🔎</span>
                     <p className="text-lg font-bold text-white">Aucune activité trouvée</p>
                     <p className="text-sm text-violet-100/60">Essayez de modifier vos filtres.</p>
                     <button
                        type="button"
                        onClick={() => {
                           setSearch("");
                           setFilterParam("cat", "");
                           setFilterParam("city", ALL_CITIES_VALUE);
                        }}
                        className="mt-2 rounded-xl border border-white/15 px-5 py-2 text-sm font-semibold text-white hover:bg-white/5 transition"
                     >
                        Réinitialiser les filtres
                     </button>
                  </div>
               ) : (
                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                     {filtered.map((item, index) => (
                        <ActivityCard
                           key={item.id}
                           item={item}
                           className="animate-fade-up"
                           style={{ animationDelay: `${Math.min(420, index * 70)}ms` }}
                        />
                     ))}
                  </div>
               )}
            </div>

            {/* No account needed note */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 text-center">
               <p className="text-sm text-violet-100/50">
                  Vous naviguez en tant que visiteur.{" "}
                  <Link href="/signup" className="text-violet-300 font-semibold underline underline-offset-4 hover:text-white transition">
                     Créez un compte
                  </Link>{" "}
                  uniquement quand vous souhaitez réserver.
               </p>
            </div>
         </div>
         <Footer />
      </>
   );
}

export default function ExplorePage() {
   return (
      <Suspense fallback={<div className="min-h-screen bg-[#09061b]" />}>
         <ExploreContent />
      </Suspense>
   );
}
