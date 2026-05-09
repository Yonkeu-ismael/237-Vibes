"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AUTH_STORAGE_KEY, AUTH_EVENT_NAME, readMockSession, type MockAuthSession } from "@/lib/mock-auth";
import { activities, categories } from "@/lib/mock-data";
import ActivityCard from "@/components/ActivityCard";

/* ─── types ──────────────────────────────────────────────── */
type TabId = "home" | "favorites" | "tickets" | "profile";

/* ─── helpers ─────────────────────────────────────────────── */
function formatPrice(fcfa: number) {
   return fcfa.toLocaleString("fr-FR") + " F";
}

const CATEGORY_ICON: Record<string, string> = {
   musique: "\uD83C\uDFB5",
   restaurants: "\uD83C\uDF7D\uFE0F",
   culture: "\uD83C\uDFAD",
   tourisme: "\uD83C\uDF3F",
   sport: "\u26BD",
   loisirs: "\uD83C\uDFAE",
   afterwork: "\uD83E\uDD42",
   famille: "\uD83D\uDC68\u200D\uD83D\uDC69\u200D\uD83D\uDC67",
};

const QUICK_CATS = [
   { id: "musique", label: "Musique" },
   { id: "restaurants", label: "Resto" },
   { id: "loisirs", label: "Loisirs" },
   { id: "sport", label: "Sport" },
];

/* ─── SVG icons ───────────────────────────────────────────── */
function IconHome() {
   return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
         <path d="M3 12L12 3l9 9" />
         <path d="M5 10v11h14V10" />
         <path d="M9 21V12h6v9" />
      </svg>
   );
}

function IconSearch() {
   return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="w-5 h-5" aria-hidden="true">
         <circle cx="11" cy="11" r="8" />
         <path d="m21 21-4.35-4.35" />
      </svg>
   );
}

function IconHeart({ filled }: { filled?: boolean }) {
   return (
      <svg viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
         <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
   );
}

function IconTicket() {
   return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
         <path d="M2 9a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v1.5a2.5 2.5 0 0 0 0 4.5V17a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-2.5a2.5 2.5 0 0 0 0-4.5V9z" />
         <line x1="9" y1="8" x2="9" y2="16" strokeDasharray="2 3" />
      </svg>
   );
}

function IconUser() {
   return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
         <circle cx="12" cy="8" r="4" />
         <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
   );
}

/* ─── Compact card (favorites / tickets) ──────────────────── */
type Activity = (typeof activities)[number];

function ActivityCompactCard({
   activity,
   isFav,
   onToggleFav,
}: {
   activity: Activity;
   isFav: boolean;
   onToggleFav: () => void;
}) {
   return (
      <article className="relative rounded-2xl bg-[#19133d] border border-white/8 p-4 hover:border-violet-400/30 active:scale-[0.98] transition-all">
         <button
            type="button"
            aria-label={isFav ? "Retirer des favoris" : "Ajouter aux favoris"}
            onClick={onToggleFav}
            className="absolute top-3 right-3 z-10 text-lg leading-none"
         >
            {isFav ? <span className="text-pink-400">&#9829;</span> : <span className="text-white/30">&#9825;</span>}
         </button>
         <Link href={`/activity/${activity.id}`} className="block">
            <div className="flex items-start gap-3 pr-8">
               <div className="shrink-0 w-10 h-10 rounded-full bg-violet-700/40 border border-violet-400/20 flex items-center justify-center text-base">
                  {CATEGORY_ICON[activity.category] ?? "🎫"}
               </div>
               <div className="flex-1 min-w-0">
                  <p className="font-bold text-white text-sm leading-snug">{activity.title}</p>
                  {activity.rating ? (
                     <p className="mt-1 text-xs text-violet-200/70">
                        <span className="text-amber-400">&#9733;</span> {activity.rating} &middot; {activity.reviewCount} avis
                     </p>
                  ) : null}
                  <div className="flex items-center gap-1 mt-1 text-xs text-violet-200/60">
                     <svg width="11" height="11" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path d="M6 2a1 1 0 0 0-1 1v1H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1V3a1 1 0 1 0-2 0v1H7V3a1 1 0 0 0-1-1zm0 5h8v1H6V7z" />
                     </svg>
                     <span>{activity.date}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-0.5 text-xs text-violet-200/60">
                     <svg width="10" height="10" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 1 1 9.9 9.9L10 18.9l-4.95-4.95a7 7 0 0 1 0-9.9zM10 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" clipRule="evenodd" />
                     </svg>
                     <span>{activity.city} &middot; {activity.distanceKm} km</span>
                  </div>
               </div>
               <div className="shrink-0 self-center ml-1">
                  <span className="inline-block rounded-full bg-violet-600/30 border border-violet-400/30 px-3 py-1.5 text-[11px] font-extrabold text-white whitespace-nowrap">
                     {formatPrice(activity.priceFcfa)}
                  </span>
               </div>
            </div>
         </Link>
      </article>
   );
}

/* ─── Sidebar nav item ────────────────────────────────────── */
function SideNavItem({
   label,
   icon,
   active,
   onClick,
}: {
   label: string;
   icon: React.ReactNode;
   active?: boolean;
   onClick: () => void;
}) {
   return (
      <button
         type="button"
         onClick={onClick}
         className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${active
            ? "bg-violet-600/25 border border-violet-500/30 text-white"
            : "text-violet-200/65 hover:bg-white/5 hover:text-white border border-transparent"
            }`}
      >
         <span className={active ? "text-violet-300" : "text-violet-400/60"}>{icon}</span>
         {label}
      </button>
   );
}

/* ─── Tab: Home ───────────────────────────────────────────── */
function HomeTab({
   search,
   setSearch,
   activeCat,
   setActiveCat,
}: {
   search: string;
   setSearch: (v: string) => void;
   activeCat: string;
   setActiveCat: (v: string) => void;
}) {
   const filtered = activities.filter((a) => {
      const matchCat = !activeCat || a.category === activeCat;
      const matchSearch =
         !search ||
         a.title.toLowerCase().includes(search.toLowerCase()) ||
         a.city.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
   });

   return (
      <div>
         <div className="mb-5">
            <div className="relative mb-3">
               <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-violet-300/50 pointer-events-none" aria-hidden="true">
                  <path fillRule="evenodd" d="M8 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM2 8a6 6 0 1 1 10.89 3.476l4.817 4.817a1 1 0 0 1-1.414 1.414l-4.816-4.816A6 6 0 0 1 2 8z" clipRule="evenodd" />
               </svg>
               <input
                  type="search"
                  placeholder="Rechercher une activite..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-2xl bg-white/6 border border-white/10 pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-violet-300/40 focus:outline-none focus:border-violet-400/40 transition"
               />
            </div>
            <div className="flex gap-2 overflow-x-auto scrollbar-none pb-0.5">
               {QUICK_CATS.map((cat) => (
                  <button
                     key={cat.id}
                     type="button"
                     onClick={() => setActiveCat(activeCat === cat.id ? "" : cat.id)}
                     className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition ${activeCat === cat.id
                        ? "bg-violet-500 text-white shadow-lg shadow-violet-500/30"
                        : "bg-white/6 border border-white/10 text-violet-100/80 hover:border-violet-300/30"
                        }`}
                  >
                     {cat.label}
                  </button>
               ))}
            </div>
         </div>

         <p className="text-[11px] uppercase tracking-[0.2em] text-violet-400/80 mb-4 font-semibold">Recommandations</p>

         {filtered.length === 0 ? (
            <div className="rounded-2xl border border-white/8 bg-white/4 py-12 text-center">
               <p className="text-sm text-violet-200/50">Aucune activite trouvee</p>
            </div>
         ) : (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
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

         <div className="mt-6 mb-2">
            <Link
               href="/explore"
               className="flex items-center justify-center gap-2 w-full rounded-2xl border border-violet-400/25 bg-violet-500/10 py-3.5 text-sm font-semibold text-violet-200 hover:bg-violet-500/20 transition"
            >
               Explorer toutes les activites
            </Link>
         </div>
      </div>
   );
}

/* ─── Tab: Favorites ──────────────────────────────────────── */
function FavoritesTab({
   favorites,
   toggleFav,
}: {
   favorites: Set<string>;
   toggleFav: (id: string) => void;
}) {
   const favList = activities.filter((a) => favorites.has(a.id));
   return (
      <div>
         <p className="text-[11px] uppercase tracking-[0.2em] text-violet-400/80 mb-4 font-semibold">Mes favoris</p>
         {favList.length === 0 ? (
            <div className="rounded-2xl border border-white/8 bg-white/4 py-16 text-center">
               <p className="text-2xl mb-3">&#9825;</p>
               <p className="text-sm text-violet-200/50">Aucun favori pour l&apos;instant</p>
               <p className="text-xs text-violet-200/35 mt-1">Ajoutez des activites en cliquant sur le coeur</p>
            </div>
         ) : (
            <div className="space-y-3">
               {favList.map((a) => (
                  <ActivityCompactCard key={a.id} activity={a} isFav onToggleFav={() => toggleFav(a.id)} />
               ))}
            </div>
         )}
      </div>
   );
}

/* ─── Tab: Tickets ────────────────────────────────────────── */
function TicketsTab({
   favorites,
   toggleFav,
}: {
   favorites: Set<string>;
   toggleFav: (id: string) => void;
}) {
   const booked = activities.filter((a) => a.featured);
   return (
      <div>
         <p className="text-[11px] uppercase tracking-[0.2em] text-violet-400/80 mb-4 font-semibold">Mes reservations</p>
         {booked.length === 0 ? (
            <div className="rounded-2xl border border-white/8 bg-white/4 py-16 text-center">
               <p className="text-sm text-violet-200/50">Aucune reservation</p>
            </div>
         ) : (
            <div className="space-y-3">
               {booked.map((a) => (
                  <ActivityCompactCard
                     key={a.id}
                     activity={a}
                     isFav={favorites.has(a.id)}
                     onToggleFav={() => toggleFav(a.id)}
                  />
               ))}
            </div>
         )}
      </div>
   );
}

/* ─── Tab: Profile ────────────────────────────────────────── */
function ProfileTab({
   session,
   onLogout,
}: {
   session: { name: string; email: string };
   onLogout: () => void;
}) {
   const initials = session.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

   return (
      <div className="max-w-md">
         <p className="text-[11px] uppercase tracking-[0.2em] text-violet-400/80 mb-6 font-semibold">Mon profil</p>
         <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center text-xl font-extrabold text-white shadow-lg shadow-violet-500/30">
               {initials}
            </div>
            <div>
               <p className="font-bold text-white text-lg">{session.name}</p>
               <p className="text-sm text-violet-200/65">{session.email}</p>
            </div>
         </div>
         <div className="space-y-3 mb-6">
            <div className="rounded-2xl border border-white/8 bg-[#19133d] p-4">
               <p className="text-xs text-violet-300/60 mb-1">Compte</p>
               <div className="flex items-center justify-between">
                  <span className="text-sm text-white">{session.email}</span>
                  <span className="text-xs text-violet-400/60 bg-violet-500/15 rounded-full px-2 py-0.5">Demo</span>
               </div>
            </div>
            <div className="rounded-2xl border border-white/8 bg-[#19133d] p-4">
               <p className="text-xs text-violet-300/60 mb-1">Localisation preferee</p>
               <p className="text-sm text-white">Yaounde, Cameroun</p>
            </div>
            <div className="rounded-2xl border border-white/8 bg-[#19133d] p-4">
               <p className="text-xs text-violet-300/60 mb-3">Centres d&apos;interet</p>
               <div className="flex flex-wrap gap-2">
                  {categories.slice(0, 4).map((cat) => (
                     <span key={cat.id} className="text-xs rounded-full bg-violet-500/15 border border-violet-400/20 px-3 py-1 text-violet-200">
                        {cat.icon} {cat.label.split(" ")[0]}
                     </span>
                  ))}
               </div>
            </div>
         </div>
         <button
            type="button"
            onClick={onLogout}
            className="w-full rounded-2xl border border-rose-500/30 bg-rose-500/10 py-3 text-sm font-semibold text-rose-300 hover:bg-rose-500/20 transition"
         >
            Se deconnecter
         </button>
      </div>
   );
}

/* ─── Page ────────────────────────────────────────────────── */
export default function DashboardPage() {
   const router = useRouter();

   const [mounted, setMounted] = useState(false);
   const [session, setSession] = useState<MockAuthSession | null>(null);
   const [search, setSearch] = useState("");
   const [activeCat, setActiveCat] = useState("");
   const [activeTab, setActiveTab] = useState<TabId>("home");
   const [favorites, setFavorites] = useState<Set<string>>(new Set());

   useEffect(() => {
      const timer = window.setTimeout(() => {
         setMounted(true);
         const s = readMockSession();
         if (!s) {
            router.replace("/login?redirect=/dashboard");
         } else {
            setSession({ ...s, name: s.name ?? "Utilisateur" });
         }
      }, 0);
      return () => window.clearTimeout(timer);
   }, [router]);

   if (!mounted) return null;
   if (!session) return null;

   const toggleFav = (id: string) =>
      setFavorites((prev) => {
         const next = new Set(prev);
         if (next.has(id)) {
            next.delete(id);
         } else {
            next.add(id);
         }
         return next;
      });

   const handleLogout = () => {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      window.dispatchEvent(new Event(AUTH_EVENT_NAME));
      router.push("/");
   };

   const firstName = session.name?.split(" ")[0] ?? "vous";

   const sideNavItems: { id: TabId; label: string; icon: React.ReactNode }[] = [
      { id: "home", label: "Vue generale", icon: <IconHome /> },
      { id: "favorites", label: "Mes favoris", icon: <IconHeart filled={activeTab === "favorites"} /> },
      { id: "tickets", label: "Mes billets", icon: <IconTicket /> },
      { id: "profile", label: "Mon profil", icon: <IconUser /> },
   ];

   const bottomNavItems: { id: TabId | "explore"; label: string; icon: React.ReactNode }[] = [
      { id: "home", label: "Accueil", icon: <IconHome /> },
      { id: "explore", label: "Explorer", icon: <IconSearch /> },
      { id: "favorites", label: "Favoris", icon: <IconHeart filled={activeTab === "favorites"} /> },
      { id: "tickets", label: "Billets", icon: <IconTicket /> },
      { id: "profile", label: "Profil", icon: <IconUser /> },
   ];

   return (
      <div className="min-h-screen bg-[#0e0a27] md:flex">

         {/* DESKTOP SIDEBAR */}
         <aside className="hidden md:flex md:flex-col md:fixed md:inset-y-0 md:left-0 md:w-64 bg-[#0b0820] border-r border-white/8 z-40">
            <div className="px-5 pt-6 pb-4 border-b border-white/6">
               <Link href="/" className="block">
                  <span className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                     237 VIBES
                  </span>
               </Link>
               <div className="mt-3 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center text-xs font-bold text-white">
                     {firstName.slice(0, 1).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                     <p className="text-sm font-semibold text-white truncate">{firstName}</p>
                     <p className="text-xs text-violet-300/50 truncate">{session.email}</p>
                  </div>
               </div>
            </div>

            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
               {sideNavItems.map((item) => (
                  <SideNavItem
                     key={item.id}
                     label={item.label}
                     icon={item.icon}
                     active={activeTab === item.id}
                     onClick={() => setActiveTab(item.id)}
                  />
               ))}
               <div className="pt-3">
                  <Link
                     href="/explore"
                     className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-violet-200/65 hover:bg-white/5 hover:text-white border border-transparent transition-all"
                  >
                     <span className="text-violet-400/60"><IconSearch /></span>
                     Explorer
                  </Link>
               </div>
            </nav>

            <div className="px-3 pb-5 border-t border-white/6 pt-3">
               <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full rounded-xl px-3 py-2.5 text-sm font-medium text-rose-400/80 hover:text-rose-300 hover:bg-rose-500/8 border border-transparent transition-all text-left"
               >
                  Deconnexion
               </button>
            </div>
         </aside>

         {/* CONTENT AREA */}
         <div className="flex-1 md:ml-64 flex flex-col min-h-screen">

            {/* Mobile top bar */}
            <header className="md:hidden px-4 pt-10 pb-3">
               <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5">
                     <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor" className="text-violet-400 shrink-0" aria-hidden="true">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 1 1 9.9 9.9L10 18.9l-4.95-4.95a7 7 0 0 1 0-9.9zM10 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" clipRule="evenodd" />
                     </svg>
                     <span className="text-sm font-semibold text-white">Yaounde, Cameroun</span>
                  </div>
                  <span className="text-xs font-extrabold tracking-tight bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                     237 VIBES
                  </span>
               </div>
               <p className="text-[13px] text-violet-200/70">Bonjour, {firstName}!</p>
            </header>

            {/* Desktop page title bar */}
            <header className="hidden md:flex items-center justify-between px-8 pt-8 pb-2">
               <div>
                  <p className="text-[11px] uppercase tracking-widest text-violet-400/70">Espace personnel</p>
                  <p className="mt-0.5 text-xl font-extrabold text-white">
                     {activeTab === "home" && ("Bonjour, " + firstName + "!")}
                     {activeTab === "favorites" && "Mes favoris"}
                     {activeTab === "tickets" && "Mes reservations"}
                     {activeTab === "profile" && "Mon profil"}
                  </p>
               </div>
               <div className="flex items-center gap-1.5 text-sm text-violet-200/60">
                  <svg width="13" height="13" viewBox="0 0 20 20" fill="currentColor" className="text-violet-400" aria-hidden="true">
                     <path fillRule="evenodd" d="M5.05 4.05a7 7 0 1 1 9.9 9.9L10 18.9l-4.95-4.95a7 7 0 0 1 0-9.9zM10 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" clipRule="evenodd" />
                  </svg>
                  Yaounde, Cameroun
               </div>
            </header>

            {/* Tab content */}
            <main className="flex-1 px-4 md:px-8 py-4 md:py-6 pb-28 md:pb-8">
               {activeTab === "home" && (
                  <HomeTab
                     search={search}
                     setSearch={setSearch}
                     activeCat={activeCat}
                     setActiveCat={setActiveCat}
                  />
               )}
               {activeTab === "favorites" && (
                  <FavoritesTab favorites={favorites} toggleFav={toggleFav} />
               )}
               {activeTab === "tickets" && (
                  <TicketsTab favorites={favorites} toggleFav={toggleFav} />
               )}
               {activeTab === "profile" && (
                  <ProfileTab session={{ name: session.name ?? "Utilisateur", email: session.email }} onLogout={handleLogout} />
               )}
            </main>
         </div>

         {/* MOBILE BOTTOM NAV */}
         <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0b0820]/95 backdrop-blur-md border-t border-white/8 flex justify-around items-center py-1 px-1">
            {bottomNavItems.map((tab) => {
               const isActive = tab.id !== "explore" && activeTab === tab.id;
               return (
                  <button
                     key={tab.id}
                     type="button"
                     aria-label={tab.label}
                     onClick={() => {
                        if (tab.id === "explore") {
                           router.push("/explore");
                        } else {
                           setActiveTab(tab.id as TabId);
                        }
                     }}
                     className={"flex flex-col items-center gap-0.5 flex-1 py-2 rounded-xl transition-all " + (isActive ? "text-white" : "text-violet-300/45")}
                  >
                     <span className={"flex items-center justify-center w-8 h-8 rounded-full transition-all " + (isActive ? "bg-violet-600/60" : "")}>
                        {tab.icon}
                     </span>
                     <span className={"text-[9px] font-medium leading-none " + (isActive ? "text-violet-200" : "text-violet-300/40")}>
                        {tab.label}
                     </span>
                  </button>
               );
            })}
         </nav>
      </div>
   );
}