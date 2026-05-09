import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ActivityCard from "@/components/ActivityCard";
import PaymentLogos from "@/components/PaymentLogos";
import ActivityHeroCarousel from "@/components/ActivityHeroCarousel";
import { activities, categories } from "@/lib/mock-data";

export default async function ActivityDetailPage({
   params,
}: {
   params: Promise<{ id: string }>;
}) {
   const { id } = await params;
   const activity = activities.find((a) => a.id === id);
   if (!activity) notFound();

   const cat = categories.find((c) => c.id === activity.category);
   const related = activities.filter((a) => a.id !== id && a.category === activity.category).slice(0, 3);
   const occupancyPct = Math.round(((activity.totalSpots - activity.spotsLeft) / activity.totalSpots) * 100);

   return (
      <>
         <Navbar />
         <div className="pt-20 min-h-screen">
            {/* Hero banner */}
            <div className={`relative h-72 sm:h-96 bg-gradient-to-br ${activity.gradientClass} flex items-end`}>
               {activity.imageUrls ? (
                  <ActivityHeroCarousel title={activity.title} imageUrls={activity.imageUrls} />
               ) : (
                  activity.imageUrl && (
                     <Image
                        src={activity.imageUrl}
                        alt={activity.title}
                        fill
                        priority
                        sizes="100vw"
                        className="absolute inset-0 h-full w-full object-cover"
                     />
                  )
               )}
               <div className="absolute inset-0 bg-gradient-to-t from-[#09061b] via-[#09061b]/40 to-transparent" />
               <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pb-10">
                  <div className="flex flex-wrap gap-2 mb-4">
                     {activity.featured && (
                        <span className="rounded-full bg-amber-400 px-3 py-1 text-xs font-bold text-amber-900">À l&apos;affiche</span>
                     )}
                     {cat && (
                        <span className="rounded-full border border-white/25 bg-black/30 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                           {cat.icon} {cat.label}
                        </span>
                     )}
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-extrabold text-white">{activity.title}</h1>
                  <p className="mt-2 text-violet-100/80">📍 {activity.venue}, {activity.city}</p>
               </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
               <div className="grid gap-10 lg:grid-cols-3">
                  {/* Main content */}
                  <div className="lg:col-span-2 space-y-8">
                     {/* Infos clés */}
                     <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {[
                           { icon: "📅", label: "Date", value: activity.date },
                           { icon: "⭐", label: "Note", value: `${activity.rating} / 5 (${activity.reviewCount} avis)` },
                           { icon: "👥", label: "Places restantes", value: `${activity.spotsLeft} / ${activity.totalSpots}` },
                        ].map((info) => (
                           <div key={info.label} className="rounded-xl border border-white/8 bg-white/4 p-4">
                              <p className="text-xl">{info.icon}</p>
                              <p className="mt-1 text-xs text-violet-100/60">{info.label}</p>
                              <p className="mt-1 text-sm font-semibold text-white">{info.value}</p>
                           </div>
                        ))}
                     </div>

                     {/* Description */}
                     <div>
                        <h2 className="text-lg font-bold text-white mb-3">À propos</h2>
                        <p className="text-sm text-violet-100/75 leading-7">{activity.shortDesc}</p>
                        <p className="mt-4 text-sm text-violet-100/75 leading-7">
                           Rejoignez des centaines de participants pour cette expérience unique. Un moment inoubliable vous attend — réservez dès maintenant pour garantir votre place.
                        </p>
                     </div>

                     {/* Occupancy */}
                     <div className="rounded-xl border border-white/8 bg-white/4 p-5">
                        <div className="mb-3 flex items-center justify-between text-sm">
                           <span className="font-semibold text-white">{activity.spotsLeft} places restantes</span>
                           <span className="text-violet-100/60">{occupancyPct}% réservé</span>
                        </div>
                        <div className="h-2 rounded-full bg-white/10">
                           <div
                              className="h-2 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
                              style={{ width: `${occupancyPct}%` }}
                           />
                        </div>
                        {activity.spotsLeft <= 10 && (
                           <p className="mt-3 text-xs font-semibold text-rose-400">⚠ Presque complet — réservez vite !</p>
                        )}
                     </div>

                     {/* Related */}
                     {related.length > 0 && (
                        <div>
                           <h2 className="text-lg font-bold text-white mb-5">Dans la même catégorie</h2>
                           <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                              {related.map((item) => (
                                 <ActivityCard key={item.id} item={item} />
                              ))}
                           </div>
                        </div>
                     )}
                  </div>

                  {/* Sticky booking panel */}
                  <aside>
                     <div className="sticky top-24 rounded-2xl border border-white/10 bg-gradient-to-b from-[#1c1640]/90 to-[#13102e]/90 p-6 backdrop-blur-sm">
                        <p className="text-xs text-violet-100/60 uppercase tracking-widest">Prix par personne</p>
                        <p className="mt-1 text-4xl font-extrabold text-white">
                           {activity.priceFcfa.toLocaleString("fr-FR")}
                           <span className="ml-1 text-base font-medium text-violet-100/60">FCFA</span>
                        </p>

                        <div className="mt-4 rounded-xl border border-white/8 bg-white/5 p-4 space-y-2 text-sm text-violet-100/75">
                           <div className="flex justify-between">
                              <span>Date</span>
                              <span className="font-semibold text-white">{activity.date.split("·")[0].trim()}</span>
                           </div>
                           <div className="flex justify-between">
                              <span>Lieu</span>
                              <span className="font-semibold text-white">{activity.city}</span>
                           </div>
                           <div className="flex justify-between">
                              <span>Disponibilité</span>
                              <span className={activity.spotsLeft <= 10 ? "font-semibold text-rose-400" : "font-semibold text-emerald-400"}>
                                 {activity.spotsLeft} places
                              </span>
                           </div>
                        </div>

                        {/* CTA — nécessite un compte */}
                        <Link
                           href={`/login?redirect=/activity/${activity.id}`}
                           className="mt-5 flex h-12 w-full items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 font-bold text-white hover:opacity-90 transition"
                        >
                           Réserver ma place
                        </Link>

                        <p className="mt-3 text-center text-xs text-violet-100/50">
                           Un compte est requis pour réserver.{" "}
                           <Link href="/signup" className="text-violet-300 underline underline-offset-2 hover:text-white transition">
                              Inscription gratuite →
                           </Link>
                        </p>

                        <hr className="my-4 border-white/8" />

                        {/* Paiement */}
                        <p className="text-xs text-violet-100/50 mb-3">Modes de paiement acceptés :</p>
                        <PaymentLogos compact />
                     </div>
                  </aside>
               </div>
            </div>
         </div>
         <Footer />
      </>
   );
}
