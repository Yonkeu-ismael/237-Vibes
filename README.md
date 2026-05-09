# 237 VIBES - Web PWA (Tout Public)

Prototype phase 1 sans backend, avec donnees mockees.

## Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- PWA: @ducanh2912/next-pwa
- Etat local: Zustand (installe pour la suite)

## Installation

```bash
npm install
```

## Lancer le prototype

```bash
npm run dev
```

Application disponible sur http://localhost:3000

## Vues disponibles

- `/onboarding`
- `/login`
- `/signup`
- `/dashboard`

## Build de verification

```bash
npm run build
```

Note: le build PWA genere automatiquement `public/sw.js` et un fichier `public/workbox-*.js`.
