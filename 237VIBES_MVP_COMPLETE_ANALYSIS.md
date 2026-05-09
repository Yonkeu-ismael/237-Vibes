# 237 VIBES - MVP Web Responsive PWA
## Analyse Complète & Architecture Modulaire

**Date**: Avril 2026  
**Promoteurs**: Saïd Lathifa & Aminatou Abdoulaye  
**Type**: SARL/SAS  
**Secteurs**: Technologies Mobiles, Tourisme & Loisirs  
**Stade**: Création / Pré-lancement  

---

## 📋 Table des Matières

1. [Vue d'ensemble du Projet](#vue-densemble)
2. [Analyse de Marché](#analyse-de-marché)
3. [Architecture Technique & Tech Stack](#architecture-technique)
   - [Web PWA — Next.js (Tout Public)](#-stack-web-pwa-tout-public)
   - [Backoffice Admin — Multi-Partenaire](#-stack-backoffice-admin-multi-partenaire)
4. [UI/UX Design Reference](#uiux-design-reference)
5. [User Journeys & Flows](#user-journeys--flows-principaux)
6. [Responsive Design & Mobile-First](#responsive-design--mobile-first-strategy)
7. [Module 1 : Authentification & Utilisateurs](#module-1--authentification--utilisateurs)
8. [Module 2 : Découverte & Recherche d'Activités](#module-2--découverte--recherche)
9. [Module 3 : Géolocalisation & Carte Interactive](#module-3--géolocalisation--carte)
10. [Module 4 : Réservation & Booking](#module-4--réservation--booking)
11. [Module 5 : Paiement Intégré](#module-5--paiement-intégré)
12. [Module 6 : Dashboard Prestataires (Backoffice)](#module-6--dashboard-prestataires)
13. [Module 7 : Engagement & Communauté](#module-7--engagement--communauté)
14. [Module 8 : Admin & Modération (Backoffice)](#module-8--admin--modération)
15. [Module 9 : PWA & Offline First](#module-9--pwa--offline-first)
16. [Infrastructure & DevOps](#infrastructure--devops)
17. [Plan de Développement](#plan-de-développement)

---

## 🎯 Vue d'Ensemble

### Problématique Centrale
**Comment assurer la visibilité de 237VIBES et inciter efficacement les utilisateurs ainsi que les prestataires locaux à adopter la plateforme ?**

### Mission
Transformer la manière dont les Camerounais découvrent, réservent et vivent leurs activités locales.

### Proposition de Valeur
- ✅ **Pour les utilisateurs**: Accès centralisé à toutes les activités locales, réservation instantanée, paiement sécurisé
- ✅ **Pour les prestataires**: Augmentation de visibilité, gestion simplifiée des réservations, accès à de nouveaux clients
- ✅ **Pour l'écosystème**: Digitalisation des services de loisirs camerounais

---

## 📊 Analyse de Marché

### Contexte Camerounais
- **Population**: Jeunes fortement connectés consommateurs de contenu digital
- **Canaux dominants**: WhatsApp, Instagram, TikTok, Facebook
- **Problématique actuelle**: Information dispersée via réseaux sociaux et bouche-à-oreille

### Analyse SWOT

#### Forces
- ✅ Innovation locale adaptée au marché camerounais
- ✅ Simplicité d'utilisation
- ✅ Centralisation des activités
- ✅ Réservation et paiement intégrés
- ✅ Géolocalisation en temps réel

#### Faiblesses
- ⚠️ Nouvelle marque
- ⚠️ Ressources financières limitées
- ⚠️ Faible notoriété initiale

#### Opportunités
- 📈 Croissance du digital au Cameroun
- 📈 Forte consommation mobile
- 📈 Besoin réel de centralisation des services

#### Menaces
- 🔴 Concurrence indirecte des réseaux sociaux
- 🔴 Résistance au changement des habitudes de consommation
- 🔴 Dépendance à la confiance numérique

### Objectifs de Campagne (3 mois)
1. **10 000 téléchargements** via forte présence digitale
2. **100 prestataires partenaires** intégrés
3. **Taux d'engagement élevé** sur réseaux sociaux
4. **Communauté digitale active** autour de la marque

### Publics Cibles

#### Utilisateurs (Côté Demande)
- Jeunes adultes (18-35 ans)
- Étudiants
- Jeunes professionnels
- Familles
- Amateurs de sorties culturelles
- Touristes et visiteurs

#### Prestataires (Côté Offre)
- 🍽️ Restaurants
- 🎪 Organisateurs d'événements
- 🎯 Centres de loisirs
- 🎨 Espaces culturels
- 🏨 Structures touristiques
- 🎭 Prestataires d'activités diverses

#### Influenceurs (Relais d'Influence)
- Influenceurs digitaux
- Créateurs de contenu lifestyle
- Leaders d'opinion jeunes

---

## 🏗️ Architecture Technique & Tech Stack

> **Vision globale** : deux produits distincts partageant la même API backend.
> - **Web PWA** → grand public, mobile-first, optimisée SEO & performance
> - **Backoffice Admin** → partenaires & admins, interface de gestion riche

```
┌─────────────────────────────────────────────────────────────┐
│                  ÉCOSYSTÈME 237 VIBES                       │
├────────────────────┬────────────────────────────────────────┤
│  🌐 Web PWA        │  🖥️ Backoffice Admin                   │
│  (Tout public)     │  (Prestataires + Admins)               │
│                    │                                        │
│  Next.js 14+       │  Next.js 14+ (App Router)              │
│  React 18          │  React 18 + shadcn/ui                  │
│  Tailwind CSS      │  Tailwind CSS                          │
│  PWA / Offline     │  Dashboard riche                       │
├────────────────────┴────────────────────────────────────────┤
│              🔌 API REST / WebSocket                        │
│              NestJS (TypeScript)                            │
├─────────────────────────────────────────────────────────────┤
│  PostgreSQL 15+  │  Redis  │  Elasticsearch  │  S3          │
└─────────────────────────────────────────────────────────────┘
```

---

### 🌐 Stack Web PWA (Tout Public)

#### Framework Principal
```
Framework: Next.js 14+ (App Router, React 18, TypeScript)

Pourquoi Next.js vs Angular :
  - SSR/SSG natif → SEO parfait pour découverte Google
  - Performance Lighthouse 90+ out-of-the-box
  - PWA via next-pwa (service worker, offline, installable)
  - Image optimization automatique (WebP, AVIF)
  - Déploiement Vercel en 0 config
  - Routing file-based, simple à maintenir
  - Taille bundle bien inférieure à Angular
  - Énorme écosystème React
```

#### Technologies Clés — Web PWA
| Composant | Technologie | Raison |
|-----------|-------------|--------|
| **Framework** | Next.js 14 (App Router) | SSR, SEO, performance |
| **UI Library** | React 18 + Tailwind CSS | Flexibilité, mobile-first |
| **Composants UI** | shadcn/ui + Radix UI | Accessibilité, customisable |
| **State Management** | Zustand | Léger, simple, suffisant |
| **Data Fetching** | TanStack Query (React Query) | Cache, sync serveur |
| **Forms** | React Hook Form + Zod | Validation légère |
| **Géolocalisation** | Mapbox GL JS | Cartes interactives, clustering |
| **Paiement** | Stripe.js + MTN MoMo SDK | Paiements africains |
| **PWA** | next-pwa (Workbox) | Offline-first, installable |
| **Storage local** | IndexedDB (idb) + localStorage | Données offline |
| **Temps réel** | Socket.io-client | Notifications live |
| **Animations** | Framer Motion | UX fluide, mobile |
| **Analytics** | Vercel Analytics + Mixpanel | Tracking léger |
| **Testing** | Vitest (unit) + Playwright (E2E) | Rapide, moderne |

---

### 🖥️ Stack Backoffice Admin (Multi-Partenaire)

#### Framework Principal
```
Framework: Next.js 14 (App Router) + React 18 + TypeScript

Même stack que la PWA publique :
  - Partage de composants, hooks, types
  - Un seul pipeline CI/CD
  - Une seule codebase TypeScript
  - Déploiement sur sous-domaine: admin.237vibes.cm
```

#### Technologies Clés — Backoffice
| Composant | Technologie | Raison |
|-----------|-------------|--------|
| **Framework** | Next.js 14 (App Router) | Même stack, cohérence |
| **UI Components** | shadcn/ui + Tailwind CSS | Dashboard riche |
| **Data Tables** | TanStack Table v8 | Tables paginées, triables |
| **Charts & Stats** | Recharts / Chart.js | Courbes revenus, bookings |
| **Forms complexes** | React Hook Form + Zod | Multi-step, validation |
| **Data Fetching** | TanStack Query | Cache, optimistic updates |
| **State** | Zustand | Auth, tenant context |
| **Rich Text** | Tiptap Editor | Description activités |
| **File Upload** | react-dropzone + Presigned S3 | Galerie photos |
| **Calendar** | FullCalendar React | Disponibilités, agenda |
| **Export** | react-pdf + ExcelJS | Rapports, factures PDF |
| **Permissions** | CASL | Multi-rôles fine-grained |
| **Testing** | Vitest + Playwright | Même pipeline |

#### Architecture Multi-Partenaire
```
Isolation des données par Partner/Tenant :

┌─────────────────────────────────────────────┐
│  Backoffice — Rôles & Accès                 │
├───────────────┬─────────────────────────────┤
│  SUPER_ADMIN  │  Plateforme complète         │
│               │  Tous les partenaires        │
│               │  Config système              │
│               │  Analytics global            │
├───────────────┼─────────────────────────────┤
│  PARTNER_     │  Ses propres données         │
│  ADMIN        │  Ses prestataires            │
│               │  Ses reportings              │
│               │  Facturation                 │
├───────────────┼─────────────────────────────┤
│  PROVIDER     │  Ses activités uniquement    │
│  (Prestataire)│  Ses réservations            │
│               │  Ses revenus                 │
├───────────────┼─────────────────────────────┤
│  MODERATOR    │  Contenu & signalements      │
│               │  Pas d'accès financier       │
└───────────────┴─────────────────────────────┘

Isolation technique :
- Chaque Partner a un partnerId en base
- Toutes les requêtes filtrées par partnerId
- JWT contient { userId, role, partnerId }
- Row-Level Security PostgreSQL
```

#### Fonctionnalités Backoffice par Rôle
```
SUPER_ADMIN :
  - Dashboard global (KPIs plateforme)
  - Gestion partenaires (create, suspend, configure)
  - Gestion prestataires tous partenaires
  - Commissions & financier global
  - Modération contenu
  - Configuration plateforme
  - Support & tickets

PARTNER_ADMIN :
  - Dashboard partenaire (KPIs propres)
  - Gestion ses prestataires
  - Gestion ses activités
  - Rapports & analytics partenaire
  - Paiements & factures
  - Paramètres compte partenaire

PROVIDER (Prestataire) :
  - Dashboard personnel (revenus, bookings)
  - Créer/éditer ses activités
  - Calendrier disponibilités
  - Liste réservations
  - Avis clients reçus
  - Paiements reçus & historique

MODERATOR :
  - File de modération (signalements)
  - Approbation nouvelles activités
  - Suppression contenu
  - Journal modération
```

### Stack Backend (API REST + Real-time)

#### Framework Principal
```
Framework: NestJS (TypeScript)
Raison:
  - Architecture modulaire scalable
  - Excellent support TypeORM
  - Guards/Interceptors pour sécurité
  - Built-in validation et documentation
```

#### Technologies Clés
| Composant | Technologie | Raison |
|-----------|-------------|--------|
| **Runtime** | Node.js 20+ LTS | Performance, écosystème NPM |
| **Framework** | NestJS 10+ | Architecture enterprise-ready |
| **ORM** | TypeORM + PostgreSQL | Data persistence robuste |
| **API** | REST + GraphQL (optionnel) | Flexibilité requêtes |
| **Authentication** | JWT + OAuth2 (Google/Facebook) | Sécurité standardisée |
| **Real-time** | Socket.io | Notifications push |
| **File Upload** | Multer + AWS S3 | Stockage scalable |
| **Email** | Nodemailer + SendGrid | Communication asynchrone |
| **Search** | Elasticsearch | Recherche activités performante |
| **Caching** | Redis | Performance requêtes fréquentes |
| **Queue** | Bull/RabbitMQ | Jobs asynchrones |
| **Validation** | class-validator + Joi | Validation schema |
| **Logging** | Winston + ELK Stack | Monitoring & debugging |
| **Testing** | Jest | Unit & integration tests |

### Base de Données

#### PostgreSQL 15+
```
Raison:
- Stabilité et fiabilité
- Support JSON native (flexible schema)
- Full-text search
- PostGIS pour géospatial queries
- Transactions ACID
- Backup recovery mature
```

#### Schéma Principal
```
- Users (Authentification)
- Activities (Annonces d'activités)
- Bookings (Réservations)
- Payments (Transactions)
- Reviews & Ratings (Évaluations)
- Providers (Prestataires)
- Categories (Catégories d'activités)
- Locations (Lieux/Géolocalisation)
- Images (Stockage fichiers)
```

### Infrastructure & Hosting

| Composant | Solution | Raison |
|-----------|----------|--------|
| **Frontend Hosting** | Vercel / Netlify | Deploy automatique, CDN global |
| **Backend Hosting** | AWS EC2 / DigitalOcean / Heroku | Scalabilité, pricing africain-friendly |
| **Base de Données** | AWS RDS / DigitalOcean Managed DB | Backup automatique, failover |
| **File Storage** | AWS S3 / Cloudinary | Stockage d'images optimisé |
| **CDN** | CloudFlare | Performance globale |
| **DNS** | Route53 / CloudFlare | Routing intelligent |

---

## 🎨 UI/UX Design Reference

### Mockups & Wireframes Produits

#### Écran 1 : Localisation & Découverte
```
Interface:
- Location picker (Online/Offline switch)
- Search bar prédominant
- Categories tabs: Events, Music, Food, Sports, Movies
- Event cards avec image, titre, lieu, prix
- Nombre d'événements: "10,000 Events"
- Design: Dark theme avec accents violets/magenta
```

#### Écran 2 : Favoris & Collections
```
Interface:
- Header "Favorites" avec onglets Events/Organisers
- Event cards en grille:
  * Image grande
  * Titre: "Tracking your health through numbers"
  * Lieu avec pin
  * Prix: $120.00
  * "Get Now" CTA button
  * Like button
- Design: Purple/Magenta sur fond noir
```

#### Écran 3 : Onboarding & Intérêts
```
Screen 1 - Choose Interests:
- "Choose your interests" heading
- Grid d'intérêts: 
  * Explore Africa (green)
  * Discover African food recipes
  * Engage in live cooking sessions
  * Learn African crafts
  * Discover at Barbershop
- CTA: "Explore" button

Screen 2 - Community Focus:
- "Connect, Learn and Explore"
- Description: Connect with vibrant community, authentic recipes
- Images grid mostrando contenu africain
- CTA: "Continue" button
```

#### Écran 4 : Détail & Carte
```
Screen 1 - Event List & Search:
- Search bar en haut
- Filters: All Events, Music, Sports, Healthy, Booking
- Event cards avec images colorées
- "10,675 events" dans la région

Screen 2 - Detail Page:
- Image banner grande
- Title: "Drink & Draw at The Living Gallery"
- By Living Gallery
- Date/Time: Wednesday, 27 Nov 2022, 07:00 PM
- About section avec "Read more" link
- Location map
- "Buy Ticket" CTA violet

Screen 3 - Map View:
- Map interactive avec marqueurs d'événements
- Clustering des événements
- Each marker avec icon de catégorie
- Active event highlighted
- Filter tab pour catégories
- "10,675 events" indicator
```

### Design System 237 VIBES

#### Couleurs Primaires
```
- Primary Purple: #7C3AED (action buttons, highlights)
- Dark Purple: #5B21B6 (darker overlays)
- Accent Magenta: #EC4899 (attention grabbers)
- Light Purple: #DDD6FE (backgrounds)
- Black: #000000 (main background)
- White: #FFFFFF (text)
- Green Accent: #10B981 (success, positive)
```

#### Typography
```
- Headings: Bold, 28-32px (main titles)
- Subheadings: Semi-bold, 20-24px
- Body: Regular, 14-16px
- Captions: Regular, 12-14px
- Font Family: Inter / System fonts
```

#### Components
```
- Button Primary: Purple (#7C3AED), 48px height, rounded
- Button Secondary: Ghost, outline style
- Cards: Rounded 12px, shadow light
- Search Input: Rounded 12px, icon left
- Badges: Colorful with icons
- Chip tags: Multiple selection
```

---

## � User Journeys & Flows Principaux

### Journey 1: Découverte & Réservation (Utilisateur Final)

```
START: Homepage
   ↓
[Option A] Via Search
  ├─ Enter keywords (ex: "Restaurant Yaoundé")
  ├─ Select filters (prix, horaires, ratings)
  └─ Results list
   ↓
[Option B] Via Carte
  ├─ Enable GPS
  ├─ See nearby activities
  ├─ Tap on marker
  └─ Details page
   ↓
[Option C] Via Catégories
  ├─ Tap category (ex: 🍽️ Restauration)
  ├─ Filter by location/price
  └─ Activity cards
   ↓
Activity Detail Page
  ├─ View images/description
  ├─ Check availability
  ├─ Read reviews (4.8/5 ⭐)
  ├─ Tap "Reserve Now"
   ↓
Booking Flow
  ├─ Select date/time
  ├─ Enter number of guests
  ├─ Add special requests (optional)
  ├─ Review total price
  ├─ Tap "Confirm Booking"
   ↓
Payment Flow
  ├─ Select payment method:
  │  ├─ MTN Money
  │  ├─ Orange Money
  │  ├─ Stripe/Card
  │  └─ Wallet
  ├─ Confirm amount (15,000 FCFA)
  ├─ Complete payment (OTP/3D Secure)
   ↓
Confirmation Page
  ├─ Booking confirmed ✓
  ├─ E-ticket generated & downloadable
  ├─ Calendar reminder added
  ├─ SMS/Email sent
   ↓
END: My Bookings view
```

### Journey 2: Provider Registration & Activity Creation

```
START: Provider Sign-up
   ↓
Select "Sign up as Provider"
   ↓
Business Information
  ├─ Business name
  ├─ Business category (Restaurant, Event organizer, etc)
  ├─ Description
  ├─ Logo/Cover image upload
   ↓
Location Setup
  ├─ Primary location
  ├─ Service radius
  ├─ Multiple locations option
   ↓
Banking Information
  ├─ Account holder name
  ├─ Bank account / Mobile Money
  ├─ Tax ID (optional)
   ↓
Verification
  ├─ Email verification
  ├─ Phone verification (SMS)
  ├─ Document upload (Kbis, license)
   ↓
Dashboard Activation
   ↓
Create First Activity
  ├─ Activity title
  ├─ Category selection
  ├─ Description (rich text editor)
  ├─ Upload images (gallery - 5+ recommended)
  ├─ Price setting
  ├─ Capacity / Max guests
  ├─ Availability:
  │  ├─ Opening hours
  │  ├─ Closed days
  │  ├─ Special dates
  ├─ Cancellation policy
  ├─ Additional rules/notes
   ↓
Preview & Publish
  ├─ Review all info
  ├─ Set as "Draft" or "Published"
   ↓
END: Activity live on platform
```

### Journey 3: Search & Filter Deep Dive

```
SEARCH BAR EXPERIENCE:

1. User taps search
2. Suggestions appear:
   ├─ Recent searches
   ├─ Popular nearby
   ├─ Trending searches
   └─ AI autocomplete

3. Type "restaurant" → Results
   ├─ Restaurants in current city
   ├─ Sort: Relevance/Rating/Price

4. Apply Filters Panel:
   ├─ 🗺️ Location
   │  ├─ Current location
   │  ├─ Other cities
   │  └─ Distance radius (1-50km)
   ├─ 💰 Price Range
   │  └─ Slider (0 - 100,000 FCFA)
   ├─ ⭐ Rating
   │  └─ 4.0+, 4.5+, 4.8+
   ├─ 🕐 Availability
   │  ├─ Available now
   │  ├─ Select date/time
   ├─ 🏷️ Category
   │  └─ Cuisine type, Ambiance, etc
   └─ 📊 View: List / Map / Grid

5. Results Display:
   ├─ Cards mostrando:
   │  ├─ Image
   │  ├─ Title
   │  ├─ Rating + # avis
   │  ├─ Distance
   │  ├─ Price
   │  └─ Tags (New, Popular, etc)
   ├─ Sort options dropdown
   └─ Infinite scroll pagination

6. Tap card → Detail page
```

---

## �📱 Module 1 : Authentification & Utilisateurs

### Fonctionnalités Clés

#### Registration & Onboarding
```
FLOW D'ONBOARDING UTILISATEUR:

1️⃣ Welcome Screen
   "Bienvenue sur 237VIBES!"
   Logos sociaux: Google, Facebook
   "Continue with email" option

2️⃣ Email/Phone Entry
   Input email ou téléphone
   OTP verification (SMS/Email)
   Resend option après 30s

3️⃣ Profile Creation
   Avatar upload (camera/gallery)
   Full name input
   City/Location picker (Yaoundé, Douala, etc)
   Phone number confirmation

4️⃣ Interests Selection (Onboarding Pages)
   Grid d'intérêts:
   - 🍽️ Restauration
   - 🎪 Événements
   - 🎯 Loisirs
   - 🎨 Culture
   - 🏨 Tourisme
   - ⚽ Sports
   Multi-select avec checkmarks

5️⃣ Account Type Selection
   Radio buttons:
   - Utilisateur Final
   - Prestataire (Pro)
   
   Si Prestataire:
   - Business name
   - Business category
   - Business location
   - Tax ID (optionnel)

6️⃣ Notification Preferences
   Toggle notifications:
   - Push notifications
   - Email alerts
   - SMS reminders
   - Weekly digest

7️⃣ Ready to Go!
   Summary preview
   "Start Exploring" CTA
   Redirect à homepage
```

#### Authentication
```
- Login/Password
- Social Login (Google, Facebook)
- SMS OTP pour USSD (MTN, Orange)
- Remember me (30 jours)
- Password recovery (email link)
- Biometric (Face ID, Fingerprint) optionnel
```

#### Authorization & Roles
```
Roles:
- ADMIN: Gestion complète plateforme
- PROVIDER: Gestion ses activités
- USER: Utilisateur final
- MODERATOR: Modération contenu

Permissions:
- Create/Edit/Delete activités (pour PROVIDER)
- Browse/Search (pour USER)
- Moderation (pour MODERATOR)
- Platform management (pour ADMIN)
```

#### Profil Utilisateur
```
Attributs utilisateur:
- Identité (nom, email, téléphone)
- Localisation (ville, coordonnées GPS)
- Préférences (catégories d'activités)
- Historique (activités visitées, favorites)
- Paramètres notifs
- Moyen de paiement enregistré
- Badges & Achievements
- Suivis (followers/following)
```

### API Endpoints

```
POST   /auth/register          - Créer compte
POST   /auth/verify            - Vérifier email/OTP
POST   /auth/login             - Connexion
POST   /auth/social-login      - Login OAuth
POST   /auth/refresh-token     - Renouveler token JWT
POST   /auth/logout            - Déconnexion
POST   /auth/forgot-password   - Récupération mot de passe
POST   /auth/reset-password    - Reset mot de passe

GET    /users/:id              - Profil utilisateur
PUT    /users/:id              - Mettre à jour profil
DELETE /users/:id              - Supprimer compte
GET    /users/:id/favorites    - Activités favorites
POST   /users/:id/favorites    - Ajouter favorite
GET    /users/:id/bookings     - Historique réservations
```

### Sécurité

```
- Hachage mot de passe: bcrypt (12+ rounds)
- JWT: Expiration 24h (access) + 7j (refresh)
- HTTPS obligatoire
- CORS bien configuré
- Rate limiting: 5 tentatives login / 15 min
- 2FA optionnel pour prestataires
- Données sensibles chiffrées (PII)
```

---

## 🔍 Module 2 : Découverte & Recherche d'Activités

### Fonctionnalités Clés

#### Exploration & Browsing
```
- Homepage avec activités en tendance
- Découverte par catégorie:
  - Restauration 🍽️
  - Événements 🎪
  - Loisirs 🎯
  - Culture 🎨
  - Tourisme 🏨
  - Sports ⚽
  - etc.
- Caroussel activités proches
- Filtres sophistiqués
```

#### Recherche Avancée
```
Filtres:
- Localisation (rayon km)
- Catégorie
- Plage de prix
- Horaires
- Notation/Avis
- Disponibilité
- Type d'activité
- Nombre de places
- Durée/Calendrier
```

#### Détail Activité
```
Affichage:
- Titre et description
- Images/Galerie
- Prix et tarification
- Localisation sur carte
- Horaires d'ouverture
- Prestataire info
- Notes/Avis clients
- Disponibilité calendrier
- Nombre de places restantes
- Conditions d'annulation
- Partage social
- Call-to-action "Réserver"
```

#### Favoris & Listes
```
- Marquer comme favorite
- Créer listes personnalisées
  - "Weekend Yaoundé"
  - "Sorties en amoureux"
  - "Activités famille"
- Partage listes
- Synchronisation entre appareils
```

### API Endpoints

```
GET    /activities              - Liste activités avec pagination
GET    /activities/trending     - Activités populaires
GET    /activities/nearby       - Activités à proximité (GPS)
GET    /activities/:id          - Détail activité
GET    /activities/:id/reviews  - Avis activité
GET    /categories              - Liste catégories
GET    /search                  - Recherche full-text
GET    /locations               - Villes/Régions
POST   /favorites               - Ajouter favorite
DELETE /favorites/:id           - Retirer favorite
GET    /favorites               - Mes favorites
```

### Optimisations Performance

```
- Lazy loading images
- Pagination (20-50 items/page)
- Caching Redis (24h)
- Elasticsearch indexing
- Full-text search optimisé
- Dénormalisation données fréquentes
```

---

## 🗺️ Module 3 : Géolocalisation & Carte Interactive

### Fonctionnalités Clés

#### Carte Interactive
```
Framework: Mapbox GL / Google Maps

Affichages:
- Activités en temps réel sur carte
- Clustering pour performance
- Fitlters par type/catégorie
- Heatmap populaires
- Direction vers activité
- Rayon de recherche (1-50 km)
```

#### Localisation Utilisateur
```
- Permission GPS requise
- Activités "près de moi"
- Distance affichée
- Temps de trajet estimé
- Mode offline (cache data)
```

#### Itinéraires
```
- Intégration Google Maps
- Navigation turn-by-turn
- Modes: auto, transport, à pied
- Sauvegarde favoris lieux
```

### API Endpoints

```
GET    /locations/nearby          - Activités à proximité
GET    /locations/:id             - Détail lieu
POST   /geocoding/reverse          - Reverse geocoding (GPS → adresse)
POST   /geocoding/forward          - Forward geocoding (adresse → GPS)
GET    /map/tiles                  - Tuiles Mapbox
GET    /directions                 - Itinéraires
```

### Considérations Techniques

```
- Utilisation PostGIS (PostgreSQL)
- Caching tuiles (CDN)
- Offline map avec service worker
- Gestion batterie (mode normal/économie)
- Consentement utilisateur (Privacy)
```

---

## 📅 Module 4 : Réservation & Booking

### Workflow de Réservation

```
1. Utilisateur sélectionne activité
   ↓
2. Choix date/heure/nombre participants
   ↓
3. Vérification disponibilités
   ↓
4. Récapitulatif réservation
   ↓
5. Confirmation et paiement
   ↓
6. E-ticket généré
   ↓
7. Notification prestataire
```

### Modèle de Données Booking

```typescript
Booking {
  id: UUID
  userId: UUID
  activityId: UUID
  providerId: UUID
  
  // Détails réservation
  bookingDate: DateTime      // Date activité
  participantCount: Int      // Nombre de personnes
  participants: Participant[]
  startTime: Time
  endTime: Time
  
  // Pricing
  unitPrice: Decimal
  quantity: Int
  subtotal: Decimal
  tax: Decimal
  fees: Decimal
  total: Decimal
  
  // Status
  status: PENDING | CONFIRMED | COMPLETED | CANCELLED
  paymentStatus: PENDING | PAID | FAILED | REFUNDED
  cancellationReason: String
  
  // Metadata
  createdAt: DateTime
  confirmedAt: DateTime
  completedAt: DateTime
  cancelledAt: DateTime
  updatedAt: DateTime
}
```

### Fonctionnalités

#### Gestion Réservations
```
- Réserver activité
- Ajouter participants
- Appliquer codes promo
- Annuler réservation (24h avant)
- Modifier réservation (places, date)
- Historique réservations
- E-tickets PDF
```

#### Disponibilités
```
- Calendrier d'availabilité
- Slots par horaire
- Nombre max participants
- Blocages (maintenance, privé)
- Prénotation possible
```

#### Notifications
```
- Confirmation réservation
- Rappel 24h avant
- Rappel 2h avant
- Accès e-ticket
- Avis demandé post-activité
```

### API Endpoints

```
POST   /bookings                    - Créer réservation
GET    /bookings/:id                - Détail réservation
PUT    /bookings/:id                - Modifier réservation
DELETE /bookings/:id                - Annuler réservation
GET    /bookings                    - Mes réservations
GET    /activities/:id/availability - Calendrier dispo
POST   /bookings/:id/ticket         - Générer e-ticket
POST   /bookings/:id/cancel         - Annuler avec raison
```

---

## 💳 Module 5 : Paiement Intégré

### Méthodes de Paiement

#### Mobile Money (Priorité Afrique)
```
- MTN Money (Cameroun, Congo, Mali, Gabon...)
- Orange Money (Cameroun, Senegal...)
- Moov Money
- Airtel Money
- Wave
```

#### Cartes Bancaires
```
- Visa / Mastercard
- Intégration Stripe
- 3D Secure
```

#### E-wallets
```
- Google Pay
- Apple Pay
- PayPal
```

### Flow de Paiement

```
1. Confirmation booking
   ↓
2. Sélection méthode paiement
   ↓
3. Montant affiche TTC
   ↓
4. Redirection gateway paiement
   ↓
5. Authentification (OTP, 3D Secure)
   ↓
6. Confirmation paiement
   ↓
7. Webhook notification
   ↓
8. E-ticket généré
   ↓
9. Email confirmation
```

### Sécurité & Conformité

```
- PCI DSS Level 1 (Stripe)
- Chiffrement SSL/TLS
- Tokenization cartes (pas de stockage)
- Fraud detection (Stripe Radar)
- Logs transactions
- Remboursement facile
- Audit trails
```

### Modèle Économique

```
Commission Platform: 
- 5-10% par transaction
- Rémunération prestataire: 90-95%

Frais:
- Stripe: 2.9% + 0.30$
- Mobile Money: 2-5% (négociable)
- Fees globaux: 1-3% à charge client

Payout Prestataires:
- Hebdomadaire (minimum 1000 FCFA)
- Virement bancaire
```

### API Endpoints

```
POST   /payments/initiate            - Initier paiement
GET    /payments/:id/status          - Status paiement
POST   /payments/:id/confirm         - Confirmer paiement
POST   /payments/:id/refund          - Rembourser
GET    /payments                     - Historique paiements
POST   /payments/webhook/stripe      - Webhook Stripe
POST   /payments/webhook/mtn         - Webhook MTN
```

---

## 🏢 Module 6 : Dashboard Prestataires

### Fonctionnalités

#### Gestion Activités
```
- Créer/Éditer activités
- Upload photos/vidéos
- Gestion prix et tarifs
- Calendrier disponibilités
- Codes promo/réductions
- Brouillons (draft)
```

#### Gestion Réservations
```
- Tableau de bord réservations
- Filter par statut/date
- Confirmation réservation
- Annulation avec raison
- Liste participants
- Envoi rappels automatiques
```

#### Statistiques & Analytics
```
- Total revenus (mois/année)
- Nombre réservations
- Taux occupation
- Avis moyens
- Tendance réservations
- Taux d'annulation
- Peak hours
```

#### Paiements & Factures
```
- Historique paiements reçus
- Factures générées
- Retours d'argent
- Rapports fiscaux
- Remises programmées
```

#### Communication
```
- Messages clients
- Notifications réservations
- Avis/Reviews clients
- Réponses aux avis
```

#### Paramètres Compte
```
- Profil professionnel
- Infos bancaires (IBAN/Mobile Money)
- Documents (Kbis, licence)
- Paramètres notifications
- Politique annulation
```

### Interface

```
Dashboard Principal:
┌─────────────────────────────────┐
│ Accueil Dashboard              │
├─────────────────────────────────┤
│ KPIs (revenus, bookings, note) │
│                               │
│ Réservations récentes         │
│ Activités en vedette          │
│ Messages nouveaux             │
│ Avis récents                  │
└─────────────────────────────────┘

Sous-sections:
- Mes Activités
- Réservations
- Statistiques
- Paiements
- Communications
- Paramètres
```

---

## 👥 Module 7 : Engagement & Communauté

### Fonctionnalités

#### Avis & Évaluations
```
- Rating 1-5 étoiles
- Commentaire texte
- Photos d'expérience
- Date d'activité
- Vérification d'achat (badge)
- Modération contenu
- Réponses prestataire
```

#### Partage Social
```
- Share Facebook/Twitter
- Share WhatsApp
- Copy link
- Generate share quote
- QR code
```

#### Système de Notation
```
Global Rating = 
  (Quality × 0.4) + 
  (Service × 0.3) + 
  (Value × 0.3)
```

#### Signalements & Modération
```
- Report avis inapproprié
- Report contenu offensant
- Report spam
- System flagging (ML)
- Admin review
- Suppression content
```

### Gamification

```
Points & Badges:
- First review: +50 points
- 10 reviews: "Critic" badge
- 100 reviews: "Expert" badge
- Perfect score: ⭐ Featured
- Helpful votes: +10 points

Leaderboard:
- Top reviewers
- Top providers
- Weekly trending
```

---

## 🛡️ Module 8 : Admin & Modération

### Fonctionnalités Admin

#### Dashboard Administration
```
- Utilisateurs actifs
- Total transactions
- Revenu platforme
- Nouvelles activités
- Signalements en attente
```

#### Gestion Utilisateurs
```
- Suspendre/Bloquer compte
- Vérifier documents prestataires
- Voir activité utilisateur
- Force delete (RGPD)
- Vérifier identité
```

#### Gestion Activités
```
- Approuver nouvelles activités
- Supprimer activités illégales
- Flaguer doublons
- Vérifier conformité
- Archiver activités
```

#### Modération
```
- Review signalements
- Supprimer avis/messages
- Ban utilisateurs toxiques
- Répondre disputes
- Archive logs modération
```

#### Gestion Financière
```
- Voir toutes transactions
- Remboursements manuels
- Ajustements commissions
- Rapports fiscaux
- Audits traces
```

#### Paramètres Plateforme
```
- Configuration globale
- Frais/Commissions
- Catégories d'activités
- Politique conditions
- Maintenance mode
```

---

## 📴 Module 9 : PWA & Offline First

### Progressive Web App

#### Installation
```
- "Add to home screen" iOS/Android
- Icon app 192x192, 512x512
- Web manifest.json
- Splash screen
- Theme colors
```

#### Service Worker
```
Caching Strategy:

1. Shell Caching (App structure)
   - HTML/CSS/JS assets
   - Icônes/Fonts
   - Validity: 30 jours

2. Network First (Dynamic content)
   - API calls
   - Fallback cache
   - Timeout: 5 secondes

3. Cache First (Static assets)
   - Images
   - Videos
   - Validity: 90 jours

4. Stale While Revalidate
   - Data lists
   - Serve old + update

Update Strategy:
- Check every 6h
- Auto-update en background
- Skip waiting (user action)
```

#### Offline Capabilities
```
Fonctionnalités disponibles:
- ✅ Consultation activités sauvegardées
- ✅ Historique réservations
- ✅ Favoris
- ✅ Recherche dans cache
- ✅ Lectures notes/images

Fonctionnalités syncronisées:
- ❌ Nouvelles réservations (queued)
- ❌ Paiements (queued)
- ❌ Chat temps réel
- ❌ Avis/reviews
```

#### Notification Push
```
Permission + Subscribe:
- Nouvelles réservations confirmées
- Rappels activités
- Avis attentifs
- Offres personnalisées
- Updates plateforme

Implementation:
- Web Push API
- Firebase Cloud Messaging
- OneSignal SDK
```

#### Performance

```
Metrics Cibles:
- Lighthouse: 90+
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1
- FCP (First Contentful Paint): < 1.8s

Optimisations:
- Code splitting
- Tree shaking
- Image optimization (WebP)
- Minification CSS/JS
- Gzip compression
- Resource hints (preload/prefetch)
```

---

## 🚀 Infrastructure & DevOps

### Architecture Déploiement

```
┌─────────────────────────────────┐
│    🌐 Web PWA (Next.js)          │
│  (Tout public - Responsive)      │
└────────────────┬────────────────┘
                 │ HTTPS
    ┌────────────┴────────────┐
    │                         │
┌───▼────────────┐    ┌──────▼──────┐
│   CloudFlare   │    │ CDN Globale  │
│   (DDoS/SSL)   │    │(Images/CSS)  │
└───┬────────────┘    └──────┬──────┘
    │                        │
    └────────┬───────────────┘
             │
    ┌────────▼──────────┐
    │  API Gateway      │
    │  (Load Balancer)  │
    └────────┬──────────┘
             │
    ┌────────▼─────────────┐
    │  Container Cluster   │
    │  (Kubernetes/Docker) │
    │  - Backend Services  │
    │  - Worker Jobs       │
    └────────┬─────────────┘
             │
    ┌────────┼──────────────────┐
    │        │                  │
┌───▼──┐  ┌──▼────┐       ┌────▼─────┐
│ PgSQL│  │Redis  │       │Elasticsearch
└──────┘  └───────┘       └───────────┘
```

### CI/CD Pipeline

```
GitHub Push
    ↓
┌─ GitHub Actions
│  - Lint (ESLint, Prettier)
│  - Test (Jest, Cypress)
│  - Build (Next.js, Turbopack)
│  - Security scan (Snyk)
    ↓
Build Pass?
    ├─ YES → Build Docker Image
    │        Push to Docker Registry
    │        Deploy to Staging
    │        Run E2E tests
    │        Deploy to Production
    │
    └─ NO → Notify Slack/Email

Environments:
- Development (local)
- Staging (full pre-prod)
- Production (live)
```

### Monitoring & Logging

```
Monitoring:
- Datadog / New Relic
- Metrics: CPU, RAM, Disk, Network
- Error rate, Response time
- Database connections
- API health checks

Logging:
- ELK Stack (Elasticsearch/Logstash/Kibana)
- Structured logging (JSON)
- Log levels (ERROR, WARN, INFO, DEBUG)
- Centralized logs

Alerting:
- PagerDuty
- High error rate (> 1%)
- Response time (> 5s)
- Database down
- OOM / High CPU
```

### Backups & Disaster Recovery

```
Database Backups:
- Hourly incremental
- Daily full backup
- 30 jours retention
- Multi-region replication

RTO (Recovery Time Objective): 1 heure
RPO (Recovery Point Objective): 1 heure

Disaster Recovery:
- Active-Passive failover
- Hot standby database
- Geo-redundancy
```

### Sécurité Infrastructure

```
Network Security:
- VPC/Private subnets
- Security Groups (Firewall rules)
- WAF (Web Application Firewall)
- DDoS protection (CloudFlare)
- IP Whitelisting (Admin)

Data Security:
- Encryption at-rest (AES-256)
- Encryption in-transit (TLS 1.3)
- Database encryption
- Tokenization paiements

Secrets Management:
- AWS Secrets Manager
- HashiCorp Vault
- Environment variables
- Rotation 90 jours
```

---

## 📈 Plan de Développement

### Phase 1 : MVP Core (Semaines 1-8)

#### Sprint 1-2 : Setup & Architecture (Semaines 1-2)
- [x] Setup repositories (Frontend/Backend)
- [x] CI/CD pipeline
- [x] Database schema design
- [x] API design & documentation (OpenAPI)
- [x] UI Component library (Storybook)
- Effort: 2 développeurs full-stack

#### Sprint 3-4 : Authentification & API Core (Semaines 3-4)
- [x] Module authentification (JWT, OAuth)
- [x] CRUD activités
- [x] User profiles
- [x] Role-based access control
- Effort: 2-3 développeurs backend, 1 frontend

#### Sprint 5-6 : Recherche & Découverte (Semaines 5-6)
- [x] Search/Filter activités
- [x] Homepage + Browsing
- [x] Favoris & Listes
- [x] Pagination & performance
- Effort: 2 développeurs frontend

#### Sprint 7-8 : Booking & Paiement (Semaines 7-8)
- [x] Booking workflow
- [x] Réservations gestion
- [x] Stripe intégration
- [x] Payment processing
- Effort: 2 développeurs full-stack

#### Livrables Phase 1
```
✅ Web app responsive (80% features)
✅ API production-ready
✅ Database normalized
✅ Authentication & Authorization
✅ 100+ test coverage
✅ Documentation API
✅ Deployed to staging
```

### Phase 2 : Features Avancées (Semaines 9-14)

#### Sprint 9-10 : Géolocalisation & Carte
- [x] Mapbox/Google Maps intégration
- [x] GPS positioning
- [x] Nearby activities
- [x] Directions

#### Sprint 11 : Dashboard Prestataires
- [x] Activity management
- [x] Reservations dashboard
- [x] Analytics & stats
- [x] Payout management

#### Sprint 12-13 : Avis & Engagement
- [x] Reviews system
- [x] Rating & moderation
- [x] Social sharing
- [x] Gamification

#### Sprint 14 : PWA & Offline
- [x] Service worker
- [x] Offline mode
- [x] Push notifications
- [x] App install

### Phase 3 : Optimisation & Launch (Semaines 15-16)

#### Sprint 15 : Quality & Sécurité
- [x] Security audit
- [x] Penetration testing
- [x] Performance optimization
- [x] Load testing (1000 concurrent users)

#### Sprint 16 : Launch Préparation
- [x] Mobile Money intégration (MTN)
- [x] Monitoring setup
- [x] Support team training
- [x] Go-live checklist
- [x] Soft launch (closed beta)

### Roadmap Post-MVP (3-6 mois)

#### Q2 2026
```
- Android/iOS apps natives (React Native/Flutter)
- Advanced analytics (attribution, cohort)
- Recommendation engine (ML)
- Admin moderation tools
- More payment methods
```

#### Q3 2026
```
- Expansion régionale (Congo, Gabon, Mali)
- Social features (groupe, events)
- Creator program (influenceurs)
- B2B integrations (hotels, tour operators)
- API marketplace
```

---

## 📊 Métriques de Succès

### User Acquisition

```
Target Phase 1 (16 semaines):
- 1,000 utilisateurs actifs
- 500 prestataires
- 5,000+ activités

Target Phase 2 (6 mois):
- 10,000 utilisateurs actifs
- 100+ prestataires (cible campagne)
- 50,000+ activités
```

### Engagement

```
Targets:
- Daily Active Users (DAU): 20% of MAU
- Monthly Active Users (MAU): cohort retention
- Avg session: 5-10 minutes
- Bookings per MAU: 0.5-1
- Repeat booking rate: 30%
```

### Conversion

```
Targets:
- Install to signup: 30%
- Signup to booking: 10%
- Booking to payment: 98%
- Avg Order Value: 15,000 FCFA
- Revenue/user/month: 2,500 FCFA
```

### Qualité

```
Targets:
- Platform uptime: 99.9%
- API response time: <500ms (p95)
- App crash rate: <0.1%
- Customer support response: <2h
- Net Promoter Score (NPS): >50
```

---

## 🎯 Stratégie de Marketing Digital

### Phase 1 : Teasing (Semaines 1-4)

```
Contenu intrigant:
"Et si tu ratais ce qui se passe autour de toi?"

Canaux:
- Instagram Stories/Reels
- TikTok teaser videos
- WhatsApp broadcast
- Facebook ads (lookalike audiences)

Budget: 15% total (202.5k FCFA)
```

### Phase 2 : Révélation (Semaines 5-8)

```
Annonce officielle:
- Vidéo promotional 60s
- Press release
- Influencer seeding

Canaux:
- YouTube ads
- Facebook/Instagram carousel ads
- Influencer takeovers
- Blog posts

Budget: 35% total (472.5k FCFA)
```

### Phase 3 : Activation (Semaines 9-12)

```
Challenges:
- TikTok challenges (#237VibersChallenge)
- Instagram story polls
- Campus activations
- Demo installations

Canaux:
- Meta ads (retargeting)
- Campus ambassadors
- Local partnerships
- Referral program

Budget: 35% total (472.5k FCFA)
```

### Phase 4 : Fidélisation (Semaines 13-16)

```
Program:
- Loyalty rewards
- Early bird discounts
- Community building
- Regular engagement content

Canaux:
- Email newsletters
- Push notifications
- Community groups (WhatsApp)
- Regular live streams

Budget: 15% total (202.5k FCFA)
```

---

## 💡 Recommandations Additionnelles

### Quick Wins (Phase 0)

```
1. Landing page (1 semaine)
   - Teasing campaign
   - Email subscription
   - Analytics setup

2. Waitlist (2 semaines)
   - Early sign-ups
   - Viral loops (share to unlock)
   - Referral program

3. Beta launch (4 semaines)
   - 100-200 early users
   - Feedback collection
   - Bug fixing
   - Testimonials/case studies
```

### Sustainability

```
Charging Model:
- Commission 5-10% per booking
- Featured activity listings
- Sponsored search results
- Premium provider membership

Unit Economics:
- CAC (Customer Acquisition Cost): 500-1000 FCFA
- LTV (Lifetime Value): 10,000+ FCFA
- Payback period: 3-4 mois
```

### Croissance & Scale

```
Expansion Strategy:
- Prove model Yaoundé (16 semaines)
- Expand to Douala (semaine 20+)
- Then: Gabon, Congo, Mali
- Pan-African platform (Year 2)

Partnership Opportunities:
- Hotels & tour operators
- Airlines & transport
- Insurance companies
- Corporate events
```

---

## ✅ Checklist Lancement

### Technical Readiness
- [ ] Database schema final
- [ ] API 80%+ developed
- [ ] Frontend UI components built
- [ ] Authentication working
- [ ] Payment integration tested
- [ ] Notification system setup
- [ ] Analytics configured
- [ ] Monitoring dashboards ready
- [ ] Backup/Recovery procedures
- [ ] Security audit passed

### Product Readiness
- [ ] Logo & brand identity
- [ ] App store screenshots
- [ ] Privacy policy & ToS written
- [ ] Support FAQ documented
- [ ] Onboarding walkthrough
- [ ] Error handling/feedback
- [ ] Performance optimized
- [ ] Accessibility (WCAG)

### Operational Readiness
- [ ] Support team trained
- [ ] Escalation procedures
- [ ] Content moderation rules
- [ ] Payment provider accounts
- [ ] Admin tools functional
- [ ] Reporting & analytics

### Legal & Compliance
- [ ] RGPD compliance
- [ ] Payment PCI compliance
- [ ] Terms of Service finalized
- [ ] Privacy Policy reviewed
- [ ] Insurance coverage
- [ ] Tax registration

---

## 📞 Next Steps

### Semaine 1
1. Formaliser l'équipe (CTO, PM, Lead Dev)
2. Finaliser requirements document
3. Créer repositories GitHub
4. Setup infrastructure AWS/DigitalOcean

### Semaine 2-3
1. Design system finalisé (Figma)
2. API OpenAPI spec
3. Database schema reviewed
4. Development environment setup

### Semaine 4+
1. Sprint planning
2. Daily standups
3. Bi-weekly demos
4. Continuous deployment

---

**Document Généré**: Avril 2026  
**Status**: Pré-lancement MVP  
**Prochaine Révision**: Fin Phase 1
