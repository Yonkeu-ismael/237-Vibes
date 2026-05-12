"use client";

import Link from "next/link";
import { Bell, Check, Download, Ticket } from "lucide-react";
import type { Activity, PaymentMethodId } from "./types";

function methodLabel(m: PaymentMethodId) {
   if (m === "mtn") return "MTN Mobile Money";
   if (m === "orange") return "Orange Money";
   return "Wave";
}

export default function ReserveConfirmation({
   activity,
   seats,
   method,
   ticketId,
}: {
   activity: Activity;
   seats: number;
   method: PaymentMethodId;
   ticketId: string;
}) {
   const dateShort = activity.date.split("·")[0]?.trim() ?? activity.date;
   const timePart = activity.date.includes("·") ? activity.date.split("·")[1]?.trim() : "";

   return (
      <div className="mx-auto max-w-lg px-4 pb-16 pt-8">
         <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500 shadow-lg shadow-emerald-900/40">
            <Check className="h-10 w-10 text-white" strokeWidth={3} />
         </div>

         <h1 className="mt-6 text-center text-2xl font-extrabold text-white">Réservation confirmée</h1>
         <p className="mt-2 text-center text-sm text-violet-100/75">Votre billet a été envoyé par SMS et email</p>

         <div className="mt-8 rounded-2xl border-2 border-dashed border-violet-400/40 bg-[#120c28]/80 p-5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-violet-300">
               <Ticket className="h-4 w-4" />
               Billet électronique
            </div>
            <p className="mt-3 font-bold text-white">
               {activity.title.split("—")[0]?.trim() ?? activity.title} — {activity.venue}
            </p>
            <p className="mt-1 text-sm text-violet-100/75">
               {dateShort}
               {timePart ? ` • ${timePart}` : ""} • {seats} {seats > 1 ? "places" : "place"}
            </p>
            <p className="mt-1 text-xs text-violet-100/50">Paiement : {methodLabel(method)}</p>

            <div
               className="mt-4 grid h-28 gap-1 rounded-lg p-2"
               style={{
                  gridTemplateColumns: "repeat(12, 1fr)",
                  background: "linear-gradient(135deg, #4c1d95 0%, #7c3aed 50%, #5b21b6 100%)",
               }}
               aria-hidden
            >
               {Array.from({ length: 144 }).map((_, i) => (
                  <div key={i} className={`rounded-sm ${i % 7 === 0 || i % 11 === 0 ? "bg-white/90" : "bg-white/25"}`} />
               ))}
            </div>

            <p className="mt-4 text-center font-mono text-sm text-violet-200">{ticketId}</p>
         </div>

         <div className="mt-6 grid grid-cols-2 gap-3">
            <button
               type="button"
               className="flex h-12 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 text-sm font-semibold text-white hover:bg-white/10"
            >
               <Download className="h-4 w-4" />
               Télécharger
            </button>
            <a
               href={`https://wa.me/?text=${encodeURIComponent(`Mon billet ${ticketId} — ${activity.title}`)}`}
               target="_blank"
               rel="noopener noreferrer"
               className="flex h-12 items-center justify-center gap-2 rounded-xl bg-emerald-500 text-sm font-bold text-white hover:bg-emerald-400"
            >
               WhatsApp
            </a>
         </div>

         <div className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-emerald-500/50 py-3 text-sm text-emerald-300">
            <Bell className="h-4 w-4" />
            Rappel SMS envoyé à J-1
         </div>

         <Link
            href={`/activity/${activity.id}`}
            className="mt-8 block text-center text-sm font-semibold text-violet-300 hover:text-white"
         >
            Retour à l&apos;activité
         </Link>
      </div>
   );
}
