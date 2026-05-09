import Link from "next/link";

export default function SignupPage() {
   return (
      <main className="app-shell flex flex-1 flex-col justify-center gap-5">
         <section className="rounded-3xl card-soft p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-violet-200/70">Inscription</p>
            <h1 className="mt-2 text-3xl font-extrabold">Creer votre compte</h1>
            <p className="mt-2 text-sm text-violet-100/70">Demarrage rapide pour tester le prototype PWA avec donnees mockees.</p>

            <form className="mt-6 space-y-4">
               <label className="block text-sm text-violet-100/80">
                  Nom complet
                  <input className="input-ui mt-2" placeholder="Jean Dupont" type="text" />
               </label>

               <label className="block text-sm text-violet-100/80">
                  Email
                  <input className="input-ui mt-2" placeholder="vous@email.com" type="email" />
               </label>

               <label className="block text-sm text-violet-100/80">
                  Telephone
                  <input className="input-ui mt-2" placeholder="6XX XXX XXX" type="tel" />
               </label>

               <label className="block text-sm text-violet-100/80">
                  Mot de passe
                  <input className="input-ui mt-2" placeholder="********" type="password" />
               </label>

               <Link href="/dashboard" className="btn-primary flex h-12 items-center justify-center rounded-xl">
                  Creer mon compte
               </Link>
            </form>
         </section>

         <p className="text-center text-sm text-violet-100/80">
            Vous avez deja un compte?{" "}
            <Link href="/login" className="font-semibold text-pink-300 underline underline-offset-4">
               Se connecter
            </Link>
         </p>
      </main>
   );
}
