"use client";

import Link from "next/link";
import { FormEvent, Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AUTH_EVENT_NAME, AUTH_STORAGE_KEY, isDemoUser } from "@/lib/mock-auth";

function LoginContent() {
   const router = useRouter();
   const searchParams = useSearchParams();
   const [email, setEmail] = useState("demo@237vibes.cm");
   const [password, setPassword] = useState("12345678");
   const [error, setError] = useState("");

   const onSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (!isDemoUser(email)) {
         setError("Utilisez demo@237vibes.cm pour la connexion mock.");
         return;
      }

      setError("");

      localStorage.setItem(
         AUTH_STORAGE_KEY,
         JSON.stringify({
            email: email.trim().toLowerCase(),
            name: "Aminatou",
            loggedInAt: new Date().toISOString(),
         }),
      );
      window.dispatchEvent(new Event(AUTH_EVENT_NAME));

      const redirectTarget = searchParams.get("redirect") ?? "/dashboard";
      router.push(redirectTarget.startsWith("/") ? redirectTarget : "/dashboard");
   };

   return (
      <main className="app-shell flex flex-1 flex-col justify-center gap-5">
         <section className="rounded-3xl card-soft p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-violet-200/70">Connexion</p>
            <h1 className="mt-2 text-3xl font-extrabold">Heureux de vous revoir</h1>
            <p className="mt-2 text-sm text-violet-100/70">Prototype sans backend: soumettez le formulaire pour simuler une session.</p>

            <form className="mt-6 space-y-4" onSubmit={onSubmit}>
               <label className="block text-sm text-violet-100/80">
                  Email
                  <input
                     className="input-ui mt-2"
                     placeholder="votre@email.com"
                     type="email"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                  />
               </label>

               <label className="block text-sm text-violet-100/80">
                  Mot de passe
                  <input
                     className="input-ui mt-2"
                     placeholder="********"
                     type="password"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                  />
               </label>

               {error && <p className="text-xs font-medium text-rose-300">{error}</p>}

               <button type="submit" className="btn-primary flex h-12 w-full items-center justify-center rounded-xl">
                  Se connecter
               </button>
            </form>
         </section>

         <p className="text-center text-sm text-violet-100/80">
            Nouveau sur 237 VIBES?{" "}
            <Link href="/signup" className="font-semibold text-pink-300 underline underline-offset-4">
               Creer un compte
            </Link>
         </p>
      </main>
   );
}

export default function LoginPage() {
   return (
      <Suspense fallback={<main className="app-shell flex flex-1 flex-col justify-center gap-5" />}>
         <LoginContent />
      </Suspense>
   );
}
