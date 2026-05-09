import Link from "next/link";

export default function Footer() {
   return (
      <footer className="border-t border-white/8 bg-[#06041a] py-14">
         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
               {/* Brand */}
               <div>
                  <p className="text-xl font-extrabold">
                     <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">237</span>
                     <span className="text-white"> VIBES</span>
                  </p>
                  <p className="mt-3 text-sm text-violet-100/60 leading-6">
                     La plateforme camerounaise pour découvrir, réserver et vivre les meilleures expériences locales.
                  </p>
                  <div className="mt-4 flex gap-3">
                     <a href="#" aria-label="Instagram" className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/12 text-violet-300 hover:border-violet-400 transition">📸</a>
                     <a href="#" aria-label="Facebook" className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/12 text-violet-300 hover:border-violet-400 transition">📘</a>
                     <a href="#" aria-label="TikTok" className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/12 text-violet-300 hover:border-violet-400 transition">🎵</a>
                  </div>
               </div>

               {/* Explore */}
               <div>
                  <p className="text-sm font-semibold text-white">Explorer</p>
                  <ul className="mt-4 space-y-3 text-sm text-violet-100/65">
                     <li><Link href="/explore" className="hover:text-white transition">Toutes les activités</Link></li>
                     <li><Link href="/explore?cat=musique" className="hover:text-white transition">Musique & Concerts</Link></li>
                     <li><Link href="/explore?cat=restaurants" className="hover:text-white transition">Restaurants</Link></li>
                     <li><Link href="/explore?cat=culture" className="hover:text-white transition">Culture & Arts</Link></li>
                     <li><Link href="/explore?cat=tourisme" className="hover:text-white transition">Tourisme & Nature</Link></li>
                  </ul>
               </div>

               {/* Villes */}
               <div>
                  <p className="text-sm font-semibold text-white">Villes</p>
                  <ul className="mt-4 space-y-3 text-sm text-violet-100/65">
                     <li><Link href="/explore?city=yaoundé" className="hover:text-white transition">Yaoundé</Link></li>
                     <li><Link href="/explore?city=douala" className="hover:text-white transition">Douala</Link></li>
                     <li><Link href="/explore?city=bafoussam" className="hover:text-white transition">Bafoussam</Link></li>
                     <li><Link href="/explore?city=kribi" className="hover:text-white transition">Kribi</Link></li>
                  </ul>
               </div>

               {/* Compte */}
               <div>
                  <p className="text-sm font-semibold text-white">Compte</p>
                  <ul className="mt-4 space-y-3 text-sm text-violet-100/65">
                     <li><Link href="/login" className="hover:text-white transition">Se connecter</Link></li>
                     <li><Link href="/signup" className="hover:text-white transition">Créer un compte</Link></li>
                     <li><Link href="/dashboard" className="hover:text-white transition">Mon espace</Link></li>
                  </ul>
               </div>
            </div>

            <hr className="my-10 border-white/8" />

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-xs text-violet-100/45">
               <p>© 2026 237 VIBES — Tous droits réservés</p>
               <div className="flex gap-4">
                  <a href="#" className="hover:text-white transition">Mentions légales</a>
                  <a href="#" className="hover:text-white transition">Confidentialité</a>
                  <a href="#" className="hover:text-white transition">CGU</a>
               </div>
            </div>
         </div>
      </footer>
   );
}
