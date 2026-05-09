import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ActivityCard from "@/components/ActivityCard";
import HomeHeroSearch from "@/components/HomeHeroSearch";
import AnimatedStatValue from "@/components/AnimatedStatValue";
import PaymentLogos from "@/components/PaymentLogos";
import { activities, categories, testimonials } from "@/lib/mock-data";

const featured = activities.filter((a) => a.featured);

export default function HomePage() {
  return (
    <>
      <Navbar />

      {/* ──────────────── HERO ──────────────── */}
      <section className="relative pt-32 pb-20 lg:pt-44 lg:pb-32 overflow-hidden">
        {/* Glow background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 left-1/4 h-[600px] w-[700px] rounded-full bg-violet-700/30 blur-[120px]" />
          <div className="absolute top-20 right-0 h-[400px] w-[500px] rounded-full bg-fuchsia-700/20 blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-1.5 text-xs font-semibold text-violet-300 mb-6">
            🎉 500+ activités disponibles au Cameroun
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Découvrez ce qui vibre
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
              autour de vous
            </span>
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-lg text-violet-100/70 leading-relaxed">
            Restaurants, concerts, culture, loisirs — explorez les meilleures expériences locales
            et réservez en quelques clics avec MTN Mobile Money ou Orange Money.
          </p>

          <HomeHeroSearch />

          {/* Category pills */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {categories.slice(0, 6).map((cat) => (
              <Link
                key={cat.id}
                href={`/explore?cat=${cat.id}`}
                className="rounded-full border border-white/12 bg-white/5 px-4 py-1.5 text-xs font-medium text-violet-100/80 hover:border-violet-400/50 hover:bg-violet-500/15 transition"
              >
                {cat.icon} {cat.label.split(" ")[0]}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────── STATS ──────────────── */}
      <section className="border-y border-white/6 bg-white/3 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {[
              { value: 500, suffix: "+", label: "Activités disponibles" },
              { value: 4, suffix: "", label: "Villes couvertes" },
              { value: 10000, suffix: "+", label: "Utilisateurs actifs" },
              { value: 98, suffix: "%", label: "Satisfaction client" },
            ].map((stat) => (
              <div key={stat.label}>
                <AnimatedStatValue end={stat.value} suffix={stat.suffix} />
                <p className="mt-1 text-sm text-violet-100/60">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────── FEATURED ──────────────── */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-violet-400">Sélection du moment</p>
              <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-white">À l&apos;affiche cette semaine</h2>
            </div>
            <Link href="/explore" className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-violet-300 hover:text-white transition">
              Tout voir →
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((item) => (
              <ActivityCard key={item.id} item={item} />
            ))}
          </div>
          <div className="mt-6 sm:hidden text-center">
            <Link href="/explore" className="text-sm font-semibold text-violet-300">Voir toutes les activités →</Link>
          </div>
        </div>
      </section>

      {/* ──────────────── CATEGORIES ──────────────── */}
      <section className="py-20 bg-white/2">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-violet-400">Parcourir par thème</p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-white">Toutes les catégories</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/explore?cat=${cat.id}`}
                className="group relative flex flex-col items-center justify-center gap-3 rounded-2xl border border-white/8 p-6 text-center transition hover:border-violet-400/40 hover:bg-violet-500/8"
              >
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${cat.color} text-2xl shadow-lg`}>
                  {cat.icon}
                </div>
                <span className="text-sm font-semibold text-white leading-tight">{cat.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────── HOW IT WORKS ──────────────── */}
      <section id="how" className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-violet-400">Simple & rapide</p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-white">Comment ça marche</h2>
            <p className="mt-3 text-violet-100/60">Pas besoin de compte pour explorer. La réservation ne prend que 30 secondes.</p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {[
              {
                step: "01",
                icon: "🔍",
                title: "Explorez librement",
                desc: "Parcourez des centaines d'activités sans créer de compte. Filtrez par ville, catégorie ou budget.",
              },
              {
                step: "02",
                icon: "📅",
                title: "Réservez en 30 secondes",
                desc: "Choisissez votre date, le nombre de places. Créez un compte en quelques secondes si besoin.",
              },
              {
                step: "03",
                icon: "💛",
                title: "Payez avec MTN ou Orange",
                desc: "Réglez via MTN Mobile Money, Orange Money ou carte bancaire. Billet reçu par SMS et email.",
              },
            ].map((item) => (
              <div key={item.step} className="relative flex flex-col gap-4 rounded-2xl border border-white/8 p-7">
                <div className="absolute -top-3 -left-3 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 text-xs font-bold text-white">
                  {item.step}
                </div>
                <div className="text-4xl">{item.icon}</div>
                <h3 className="text-lg font-bold text-white">{item.title}</h3>
                <p className="text-sm text-violet-100/65 leading-6">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────── PAYMENT ──────────────── */}
      <section className="py-14 bg-white/2">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 rounded-2xl border border-white/8 p-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-violet-400">Paiement sécurisé</p>
              <h3 className="mt-2 text-xl font-extrabold text-white">Vos modes de paiement préférés</h3>
              <p className="mt-2 text-sm text-violet-100/65">Tous les paiements sont 100% sécurisés et remboursables en cas d&apos;annulation.</p>
            </div>
            <PaymentLogos />
          </div>
        </div>
      </section>

      {/* ──────────────── TESTIMONIALS ──────────────── */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-violet-400">Ils en parlent</p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-white">Ce que disent nos utilisateurs</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.name} className="flex flex-col gap-4 rounded-2xl border border-white/8 p-6">
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <span key={i} className="text-amber-400 text-sm">★</span>
                  ))}
                </div>
                <p className="text-sm text-violet-100/80 leading-6 italic">&ldquo;{t.text}&rdquo;</p>
                <p className="text-xs font-semibold text-violet-300">{t.name} — {t.city}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────── CTA FINAL ──────────────── */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-700 via-purple-800 to-fuchsia-800 px-8 py-16 text-center">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute top-0 left-1/3 h-72 w-72 rounded-full bg-fuchsia-400/20 blur-[80px]" />
              <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-violet-400/20 blur-[80px]" />
            </div>
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Rejoignez 237 VIBES</h2>
              <p className="mt-4 text-violet-100/80 max-w-xl mx-auto">
                Inscription gratuite. Commencez par explorer — créez un compte uniquement quand vous voulez réserver.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/explore"
                  className="flex h-12 items-center justify-center rounded-xl border border-white/30 bg-white/10 px-8 text-sm font-bold text-white hover:bg-white/20 transition"
                >
                  Explorer sans compte
                </Link>
                <Link
                  href="/signup"
                  className="flex h-12 items-center justify-center rounded-xl border border-cyan-300/40 bg-gradient-to-r from-cyan-500 to-blue-600 px-8 text-sm font-bold text-white shadow-[0_10px_34px_rgba(20,90,210,0.45)] hover:brightness-110 transition"
                >
                  Créer mon compte gratuit →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

