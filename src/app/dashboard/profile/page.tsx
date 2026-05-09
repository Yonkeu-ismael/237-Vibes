"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AUTH_EVENT_NAME, AUTH_STORAGE_KEY, readMockSession, type MockAuthSession } from "@/lib/mock-auth";

export default function DashboardProfilePage() {
   const router = useRouter();
   const [session, setSession] = useState<MockAuthSession | null>(null);

   useEffect(() => {
      const current = readMockSession();
      if (!current) {
         router.replace("/login?redirect=/dashboard/profile");
         return;
      }

      const timer = window.setTimeout(() => {
         setSession(current);
      }, 0);

      return () => window.clearTimeout(timer);
   }, [router]);

   const handleLogout = () => {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      window.dispatchEvent(new Event(AUTH_EVENT_NAME));
      router.push("/");
   };

   if (!session) {
      return (
         <main className="min-h-screen">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 text-center">
               <p className="text-sm text-violet-200/80">Chargement de votre profil...</p>
            </div>
         </main>
      );
   }

   return (
      <main className="min-h-screen">
         <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
            <div className="mb-5 flex items-center justify-between rounded-2xl border border-white/10 bg-[#120d2b]/90 px-4 py-3">
               <Link href="/dashboard" className="text-sm font-extrabold tracking-tight text-white">
                  Espace personnel 237 VIBES
               </Link>
               <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-lg bg-linear-to-r from-rose-500 to-orange-500 px-3 py-1.5 text-xs font-bold text-white hover:opacity-90 transition"
               >
                  Logout
               </button>
            </div>

            <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#231a50] to-[#171236] p-6 sm:p-8">
               <p className="text-xs uppercase tracking-widest text-violet-300/80">Mon profil</p>
               <h1 className="mt-2 text-2xl font-extrabold text-white sm:text-4xl">{session.name ?? "Utilisateur"}</h1>
               <p className="mt-2 text-sm text-violet-100/70">Email: {session.email}</p>
               <p className="mt-1 text-sm text-violet-100/70">Dernière connexion: {session.loggedInAt ? new Date(session.loggedInAt).toLocaleString("fr-FR") : "N/A"}</p>

               <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                     href="/dashboard"
                     className="flex h-11 items-center justify-center rounded-xl border border-white/20 bg-white/10 px-5 text-sm font-semibold text-white hover:bg-white/15 transition"
                  >
                     Retour dashboard
                  </Link>
                  <Link
                     href="/explore"
                     className="flex h-11 items-center justify-center rounded-xl bg-linear-to-r from-violet-600 to-fuchsia-600 px-5 text-sm font-bold text-white hover:opacity-90 transition"
                  >
                     Explorer les activités
                  </Link>
               </div>
            </section>
         </div>
      </main>
   );
}
