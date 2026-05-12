"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Lock } from "lucide-react";
import type { Activity, PaymentMethodId } from "./types";

const METHODS: { id: PaymentMethodId; label: string; hint: string }[] = [
   { id: "mtn", label: "MTN Mobile Money", hint: "Numéro MTN Cameroun" },
   { id: "orange", label: "Orange Money", hint: "Numéro Orange Cameroun" },
   { id: "wave", label: "Wave", hint: "Paiement instantané" },
];

export default function ReservePayment({ activity, seats }: { activity: Activity; seats: number }) {
   const router = useRouter();
   const [method, setMethod] = useState<PaymentMethodId>("mtn");
   const [phone, setPhone] = useState("");

   const totalFcfa = seats * activity.priceFcfa;

   const phoneLabel = useMemo(() => {
      if (method === "mtn") return "Votre numéro MTN :";
      if (method === "orange") return "Votre numéro Orange :";
      return "Numéro Wave :";
   }, [method]);

   const placeholder = method === "wave" ? "Numéro lié à Wave" : "6XX XXX XXX";

   const pay = () => {
      const q = new URLSearchParams({ seats: String(seats), method });
      if (phone.trim()) q.set("phone", phone.trim());
      router.push(`/activity/${activity.id}/reserve/confirmation?${q.toString()}`);
   };

   return (
      <div className="mx-auto max-w-lg px-4 pb-28 pt-6 sm:pt-8">
         <Link href={`/activity/${activity.id}/reserve`} className="text-sm font-semibold text-violet-200 hover:text-white transition">
            ← Retour
         </Link>

         <div className="mt-6 flex items-center gap-2 text-white">
            <Lock className="h-6 w-6 text-amber-300" aria-hidden />
            <h1 className="text-xl font-extrabold">Paiement sécurisé</h1>
         </div>

         <div className="mt-6 rounded-2xl border border-white/10 bg-[#161030]/95 p-5">
            <p className="text-xs uppercase tracking-wider text-violet-100/50">Votre réservation</p>
            <p className="mt-2 font-semibold text-white">
               {activity.title} — {seats} {seats > 1 ? "places" : "place"}
            </p>
            <p className="mt-3 text-lg font-bold text-violet-300">Total : {totalFcfa.toLocaleString("fr-FR")} FCFA</p>
         </div>

         <h2 className="mt-8 text-sm font-bold text-white">Choisissez votre mode de paiement</h2>
         <div className="mt-3 space-y-3">
            {METHODS.map((m) => {
               const selected = method === m.id;
               return (
                  <button
                     key={m.id}
                     type="button"
                     onClick={() => setMethod(m.id)}
                     className={`flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition ${
                        selected ? "border-amber-400 bg-amber-400/10" : "border-white/10 bg-white/[0.03] hover:border-white/20"
                     }`}
                  >
                     <span
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                           selected ? "border-amber-400 bg-amber-400" : "border-white/30"
                        }`}
                     >
                        {selected ? <span className="h-2 w-2 rounded-full bg-[#09061b]" /> : null}
                     </span>
                     <span>
                        <span className="block font-semibold text-white">{m.label}</span>
                        <span className="text-xs text-violet-100/60">{m.hint}</span>
                     </span>
                  </button>
               );
            })}
         </div>

         <div className="mt-6">
            <label htmlFor="pay-phone" className="text-sm font-medium text-violet-100/80">
               {phoneLabel}
            </label>
            <input
               id="pay-phone"
               type="tel"
               inputMode="numeric"
               autoComplete="tel"
               placeholder={placeholder}
               value={phone}
               onChange={(e) => setPhone(e.target.value)}
               className="mt-2 w-full rounded-xl border border-white/10 bg-[#0d0820] px-4 py-3 text-white placeholder:text-violet-100/35 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
            />
         </div>

         <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#09061b]/95 p-4 backdrop-blur-md sm:relative sm:mt-10 sm:border-0 sm:bg-transparent sm:p-0">
            <button
               type="button"
               onClick={pay}
               className="flex h-14 w-full items-center justify-center rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-400 text-base font-bold text-amber-950 shadow-lg hover:opacity-95"
            >
               Payer {totalFcfa.toLocaleString("fr-FR")} FCFA →
            </button>
            <p className="mt-3 text-center text-xs text-violet-100/45">Paiement 100% sécurisé — Remboursable selon conditions</p>
         </div>
      </div>
   );
}
