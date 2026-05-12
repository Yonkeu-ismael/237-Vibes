"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Calendar, MapPin, Minus, Music, Plus, Star, Ticket } from "lucide-react";
import type { Activity } from "./types";

export default function ReserveStepDetail({ activity }: { activity: Activity }) {
   const router = useRouter();
   const maxSeats = Math.max(1, activity.spotsLeft);
   const [seats, setSeats] = useState(() => Math.min(2, maxSeats));

   const clamped = Math.min(Math.max(1, seats), maxSeats);
   const totalFcfa = clamped * activity.priceFcfa;

   const dateLine = useMemo(() => {
      const parts = activity.date.split("·");
      const left = parts[0]?.trim() ?? activity.date;
      const right = parts[1]?.trim();
      return right ? `${left} - ${right}` : left;
   }, [activity.date]);

   const dec = () => setSeats((s) => Math.min(maxSeats, Math.max(1, s - 1)));
   const inc = () => setSeats((s) => Math.min(maxSeats, Math.max(1, s + 1)));

   const onReserve = () => {
      router.push(`/activity/${activity.id}/reserve/payment?seats=${clamped}`);
   };

   return (
      <div className="mx-auto max-w-lg px-4 pb-28 pt-6 sm:pt-8">
         <div className="mb-6 flex items-center justify-between">
            <Link
               href={`/activity/${activity.id}`}
               className="text-sm font-semibold text-violet-200 hover:text-white transition"
            >
               ← Retour
            </Link>
            <button type="button" aria-label="Favoris" className="rounded-full border border-white/15 p-2 text-violet-200 hover:bg-white/5">
               <span className="text-lg">♡</span>
            </button>
         </div>

         <div className="mb-2 flex items-center gap-2">
            <Music className="h-6 w-6 text-amber-300" aria-hidden />
            <h1 className="text-2xl font-extrabold text-white">{activity.title}</h1>
         </div>
         <p className="text-sm text-violet-100/80">
            📍 {activity.venue} — {activity.city}
         </p>

         <ul className="mt-5 space-y-3 text-sm text-violet-100/85">
            <li className="flex gap-2">
               <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" aria-hidden />
               <span>{dateLine}</span>
            </li>
            <li className="flex gap-2">
               <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" aria-hidden />
               <span>
                  {activity.venue}, {activity.city} — {activity.distanceKm} km
               </span>
            </li>
         </ul>

         <div className="mt-4 flex items-center gap-1 text-amber-300">
            {Array.from({ length: 5 }).map((_, i) => (
               <Star key={i} className="h-4 w-4 fill-amber-300" aria-hidden />
            ))}
            <span className="ml-2 text-sm text-violet-100/80">
               {activity.rating} — {activity.reviewCount} avis
            </span>
         </div>

         <p className="mt-5 text-sm leading-relaxed text-violet-100/75">{activity.shortDesc}</p>

         <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-white/10 bg-[#161030]/90 p-4">
               <p className="text-xs text-violet-100/55">Places restantes</p>
               <p className="mt-1 text-lg font-bold text-emerald-400">
                  {activity.spotsLeft} / {activity.totalSpots}
               </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#161030]/90 p-4">
               <p className="text-xs text-violet-100/55">Prix par personne</p>
               <p className="mt-1 text-lg font-bold text-white">{activity.priceFcfa.toLocaleString("fr-FR")} F</p>
            </div>
         </div>

         <div className="mt-8">
            <p className="text-sm font-semibold text-white">Nombre de places :</p>
            <div className="mt-3 flex items-center gap-4">
               <button
                  type="button"
                  onClick={dec}
                  disabled={clamped <= 1}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white hover:bg-white/10 disabled:opacity-40"
               >
                  <Minus className="h-5 w-5" />
               </button>
               <span className="min-w-[2ch] text-center text-xl font-bold text-white">{clamped}</span>
               <button
                  type="button"
                  onClick={inc}
                  disabled={clamped >= maxSeats}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white hover:bg-white/10 disabled:opacity-40"
               >
                  <Plus className="h-5 w-5" />
               </button>
            </div>
         </div>

         <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#09061b]/95 p-4 backdrop-blur-md sm:relative sm:mt-10 sm:border-0 sm:bg-transparent sm:p-0 sm:backdrop-blur-none">
            <button
               type="button"
               onClick={onReserve}
               className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-base font-bold text-white shadow-lg shadow-violet-900/40 hover:opacity-95"
            >
               <Ticket className="h-5 w-5" />
               Réserver — {totalFcfa.toLocaleString("fr-FR")} F
            </button>
         </div>
      </div>
   );
}
