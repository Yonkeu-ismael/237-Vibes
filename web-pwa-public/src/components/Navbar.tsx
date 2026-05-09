"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AUTH_EVENT_NAME, AUTH_STORAGE_KEY } from "@/lib/mock-auth";

export default function Navbar() {
   const [open, setOpen] = useState(false);
   const [isLoggedIn, setIsLoggedIn] = useState(false);

   useEffect(() => {
      const syncAuth = () => {
         try {
            const raw = localStorage.getItem(AUTH_STORAGE_KEY);
            setIsLoggedIn(Boolean(raw));
         } catch {
            setIsLoggedIn(false);
         }
      };

      syncAuth();
      window.addEventListener(AUTH_EVENT_NAME, syncAuth);
      window.addEventListener("storage", syncAuth);
      return () => {
         window.removeEventListener(AUTH_EVENT_NAME, syncAuth);
         window.removeEventListener("storage", syncAuth);
      };
   }, []);

   const handleLogout = () => {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      window.dispatchEvent(new Event(AUTH_EVENT_NAME));
      setOpen(false);
   };

   return (
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/8 bg-[#09061b]/80 backdrop-blur-xl">
         <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
               <span className="text-xl font-extrabold tracking-tight">
                  <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">237</span>
                  <span className="text-white"> VIBES</span>
               </span>
            </Link>

            {/* Nav desktop */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-violet-100/75">
               <Link href="/explore" className="hover:text-white transition">Explorer</Link>
               <Link href="/explore?cat=musique" className="hover:text-white transition">Musique</Link>
               <Link href="/explore?cat=restaurants" className="hover:text-white transition">Restaurants</Link>
               <Link href="/explore?cat=culture" className="hover:text-white transition">Culture</Link>
               <Link href="/#how" className="hover:text-white transition">Comment ça marche</Link>
            </nav>

            {/* CTA desktop */}
            <div className="hidden md:flex items-center gap-3">
               {isLoggedIn ? (
                  <>
                     <Link
                        href="/dashboard"
                        className="rounded-xl px-4 py-2 text-sm font-semibold text-violet-200 border border-white/15 hover:border-violet-400/50 hover:bg-white/5 transition"
                     >
                        Mon espace personnel
                     </Link>
                     <button
                        type="button"
                        onClick={handleLogout}
                        className="rounded-xl px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-rose-500 to-orange-500 hover:opacity-90 transition"
                     >
                        Logout
                     </button>
                  </>
               ) : (
                  <>
                     <Link
                        href="/login"
                        className="rounded-xl px-4 py-2 text-sm font-semibold text-violet-200 border border-white/15 hover:border-violet-400/50 hover:bg-white/5 transition"
                     >
                        Connexion
                     </Link>
                     <Link
                        href="/signup"
                        className="rounded-xl px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:opacity-90 transition"
                     >
                        S&apos;inscrire
                     </Link>
                  </>
               )}
            </div>

            {/* Burger mobile */}
            <button
               type="button"
               className="md:hidden flex flex-col gap-1.5 p-2"
               onClick={() => setOpen(!open)}
               aria-label="Menu"
            >
               <span className={`block h-0.5 w-6 bg-white transition-all ${open ? "rotate-45 translate-y-2" : ""}`} />
               <span className={`block h-0.5 w-6 bg-white transition-all ${open ? "opacity-0" : ""}`} />
               <span className={`block h-0.5 w-6 bg-white transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
         </div>

         {/* Mobile menu */}
         {open && (
            <div className="md:hidden border-t border-white/8 bg-[#0f0a22] px-4 pb-5 pt-4 space-y-3">
               <Link href="/explore" className="block py-2 text-sm font-semibold text-violet-100" onClick={() => setOpen(false)}>Explorer les activités</Link>
               <Link href="/explore?cat=musique" className="block py-2 text-sm text-violet-100/75" onClick={() => setOpen(false)}>Musique & Concerts</Link>
               <Link href="/explore?cat=restaurants" className="block py-2 text-sm text-violet-100/75" onClick={() => setOpen(false)}>Restaurants</Link>
               <Link href="/explore?cat=culture" className="block py-2 text-sm text-violet-100/75" onClick={() => setOpen(false)}>Culture & Arts</Link>
               <hr className="border-white/10" />
               {isLoggedIn ? (
                  <div className="grid grid-cols-2 gap-3 pt-1">
                     <Link href="/dashboard" className="flex h-11 items-center justify-center rounded-xl border border-white/15 text-sm font-semibold text-violet-200" onClick={() => setOpen(false)}>Mon espace</Link>
                     <button
                        type="button"
                        onClick={handleLogout}
                        className="flex h-11 items-center justify-center rounded-xl bg-gradient-to-r from-rose-500 to-orange-500 text-sm font-semibold text-white"
                     >
                        Logout
                     </button>
                  </div>
               ) : (
                  <div className="grid grid-cols-2 gap-3 pt-1">
                     <Link href="/login" className="flex h-11 items-center justify-center rounded-xl border border-white/15 text-sm font-semibold text-violet-200" onClick={() => setOpen(false)}>Connexion</Link>
                     <Link href="/signup" className="flex h-11 items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-sm font-semibold text-white" onClick={() => setOpen(false)}>S&apos;inscrire</Link>
                  </div>
               )}
            </div>
         )}
      </header>
   );
}
