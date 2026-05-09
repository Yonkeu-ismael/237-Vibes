"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { interests, onboardingSlides } from "@/lib/mock-data";

export default function OnboardingPage() {
   const [step, setStep] = useState(0);
   const [selectedInterests, setSelectedInterests] = useState<string[]>([
      "Musique",
      "Restaurants",
   ]);

   const isLastStep = step === onboardingSlides.length - 1;
   const currentSlide = onboardingSlides[step];

   const progress = useMemo(
      () => `${Math.round(((step + 1) / onboardingSlides.length) * 100)}%`,
      [step],
   );

   function toggleInterest(item: string) {
      setSelectedInterests((prev) =>
         prev.includes(item) ? prev.filter((interest) => interest !== item) : [...prev, item],
      );
   }

   return (
      <main className="app-shell flex flex-1 flex-col gap-6">
         <header className="rounded-2xl card-soft p-4">
            <div className="mb-3 flex items-center justify-between text-xs text-violet-200/80">
               <span>Onboarding</span>
               <span>{progress}</span>
            </div>
            <div className="h-2 rounded-full bg-white/10">
               <div className="h-2 rounded-full bg-gradient-to-r from-violet-500 to-pink-500" style={{ width: progress }} />
            </div>
         </header>

         <section className="rounded-3xl p-6 card-soft">
            <div className={`mb-5 inline-flex rounded-full bg-gradient-to-r px-4 py-1 text-xs font-semibold text-white ${currentSlide.accent}`}>
               Etape {currentSlide.id}
            </div>
            <h1 className="text-2xl font-extrabold leading-tight">{currentSlide.title}</h1>
            <p className="mt-3 text-sm leading-6 text-violet-100/70">{currentSlide.description}</p>

            {isLastStep ? (
               <div className="mt-6 space-y-4">
                  <h2 className="text-sm font-semibold text-violet-100">Choisissez vos centres d&apos;interet</h2>
                  <div className="grid-onboarding">
                     {interests.map((item) => {
                        const active = selectedInterests.includes(item);

                        return (
                           <button
                              key={item}
                              type="button"
                              onClick={() => toggleInterest(item)}
                              className={`rounded-xl border px-3 py-3 text-left text-sm transition ${active
                                    ? "border-violet-400 bg-violet-500/20 text-white"
                                    : "border-white/10 bg-white/5 text-violet-100/80"
                                 }`}
                           >
                              {item}
                           </button>
                        );
                     })}
                  </div>
               </div>
            ) : null}
         </section>

         <div className="mt-auto grid grid-cols-2 gap-3">
            <button
               type="button"
               disabled={step === 0}
               onClick={() => setStep((prev) => Math.max(prev - 1, 0))}
               className="btn-secondary h-12 rounded-xl disabled:cursor-not-allowed disabled:opacity-40"
            >
               Retour
            </button>

            {isLastStep ? (
               <Link
                  href="/signup"
                  className="btn-primary flex h-12 items-center justify-center rounded-xl"
               >
                  Continuer
               </Link>
            ) : (
               <button
                  type="button"
                  onClick={() => setStep((prev) => Math.min(prev + 1, onboardingSlides.length - 1))}
                  className="btn-primary h-12 rounded-xl"
               >
                  Suivant
               </button>
            )}
         </div>

         <Link href="/login" className="text-center text-sm text-violet-200/80 underline underline-offset-4">
            J&apos;ai deja un compte
         </Link>
      </main>
   );
}
