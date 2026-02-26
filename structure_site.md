# La Belle Détente — Structure du site

> Document de référence pour identifier rapidement chaque section, son rôle, sa source de données et comment la modifier.

> **Règle d'or :** seuls les fichiers dans `content/` (JSON) et `public/images/` sont lus par le site. Les fichiers `.md` dans `content/pages/` étaient des ébauches de planification — ils ont été archivés dans `Inutile/` et ne modifient rien sur le site.

---

## Table des matières

1. [Architecture générale](#1-architecture-générale)
2. [Fichiers de contenu — source de vérité](#2-fichiers-de-contenu--source-de-vérité)
3. [Images](#3-images)
4. [Pages et leurs blocs](#4-pages-et-leurs-blocs)
5. [Composants réutilisables](#5-composants-réutilisables)
6. [Design system (tokens CSS)](#6-design-system-tokens-css)
7. [Guide des modifications courantes](#7-guide-des-modifications-courantes)

---

## 1. Architecture générale

```
Elodie/
├── app/                  ← Pages Next.js (App Router)
├── components/
│   ├── layout/           ← Header, Footer (enveloppent toutes les pages)
│   └── ui/               ← Composants réutilisables (boutons, cartes, typographie…)
├── content/              ← Données métier en JSON (source de vérité)
├── lib/                  ← Logique d'accès aux données (jamais importé directement dans les pages)
├── public/images/        ← Images servies au navigateur
├── app/globals.css       ← Tokens de design (couleurs, typographie, espacements)
└── Inutile/              ← Fichiers archivés, non utilisés (exclus de Git)
```

**Règle fondamentale :** les pages ne lisent jamais les JSON directement — elles passent par les fonctions de `/lib`. Ainsi, si la structure du JSON change, seul `/lib` est à modifier.

---

## 2. Fichiers de contenu — source de vérité

### `content/services_v2.json` — Les soins proposés

C'est **le fichier central**. Il définit les 3 expériences de massage et leurs durées.

```
services_v2.json
└── experiences[]
    ├── id           → identifiant technique  ("summits", "alpine", "elegance")
    ├── imageSrc     → chemin de l'image      ("/images/service-summits.jpg")
    ├── name         → nom affiché            ("L'Instant des Sommets")
    ├── tagline      → accroche courte        (carte de soin)
    ├── emotionalHook→ description narrative  (section Ressenti, page détail)
    ├── idealFor[]   → liste "Idéal pour…"   (section Ressenti, page détail)
    ├── flow[]       → étapes de la séance    (page détail uniquement)
    └── durations[]
        ├── id         → identifiant durée    ("summit60", "summit90")
        ├── label      → affiché              ("60 minutes")
        ├── price      → en euros             (80)
        └── recommended→ durée mise en avant  (true/false)
```

**Lu par :** `lib/services.ts` → toutes les pages via `getAllExperiences()`, `getExperienceById()`, etc.

---

### `content/home.config.json` — Textes éditoriaux de la page d'accueil

Tous les textes modifiables de la page d'accueil (hors soins et zones).

```
home.config.json
├── hero
│   ├── subtitle    → sous-titre h1 sur la photo   ("Votre parenthèse de bien-être absolu")
│   ├── description → ligne d'accroche             ("L'expérience spa haut de gamme…")
│   └── proofs[]    → micro-preuves avec icône      [{ label, icon }]
├── intro
│   ├── eyebrow     → étiquette                    ("Le luxe de la sérénité")
│   ├── heading     → titre de section             ("Une praticienne qui vient à vous")
│   └── body        → paragraphe                   ("Imaginez un espace de soin…")
├── premium[]       → 3 engagements qualité         [{ title, body }]
└── cta
    ├── signature   → texte en police Satisfy       ("Prenez soin de vous")
    └── body        → paragraphe sous la signature
```

**Lu par :** `lib/config.ts` → `getHomeConfig()` → `app/page.tsx`

---

### `content/faq.json` — Questions fréquentes

```
faq.json
└── items[]
    ├── q  → question
    └── a  → réponse
```

**Lu par :** `lib/config.ts` → `getFaqItems()` → `app/page.tsx` (section FAQ + JSON-LD FAQPage)

---

### `content/site.config.json` — Configuration globale

```
site.config.json
├── brand
│   ├── name           → "La Belle Détente"
│   ├── phone          → "+33744436483"
│   ├── baseAreaLabel  → "Maurienne, Savoie"
│   ├── legalAddress   → adresse légale (mentions légales)
│   └── publicLocality → "Maurienne, Savoie" (affiché dans le footer)
├── sections           → interrupteurs on/off par section
│   ├── faq            → true  (affiche la FAQ sur la page d'accueil)
│   ├── partners       → true  (section partenaires pros)
│   ├── ehpad          → true  (mention dans la page professionnels)
│   ├── giftCards      → false (désactivé)
│   ├── testimonials   → false (désactivé)
│   └── englishVersion → false (désactivé)
├── seo
│   └── indexBookingPage → false (la page /reservation n'est pas indexée)
├── analytics
│   └── domain         → "labelledetente.fr" (Plausible)
└── images
    ├── hero           → "/images/hero-setup.jpg"
    └── sectionPro     → "/images/section-pro.jpg"
```

**Lu par :** `lib/config.ts` → `getSiteConfig()`, `isSectionEnabled()`.

---

### `content/booking.config.json` — Intégration Cal.com

```
booking.config.json
├── provider     → "cal.com"
├── username     → "franck-d-6eq1wk"
├── mapping      → durée ID → slug Cal.com
│   ├── summit60   → "30min"
│   ├── alpine60   → "30min"
│   └── …          → tous pointent sur "30min" pour l'instant
└── fallbackEventSlug → "30min" (si durée inconnue)
```

**À mettre à jour** quand Cal.com aura des créneaux spécifiques par durée.
**Lu par :** `lib/config.ts` → `getCalLink()`, `getCalUrl()`.

---

### `content/zones.json` — Secteur d'intervention

```
zones.json
├── baseLocation    → "Maurienne, Savoie"
├── seoLocations[]  → ["Les Menuires", "Courchevel", …] (pour le SEO)
└── copy.public     → texte affiché sur la page /zones
```

---

## 3. Images

Toutes les images de production sont dans **`public/images/`** :

| Fichier | Utilisé pour | Modifiable dans |
|---------|-------------|-----------------|
| `hero-setup.jpg` | Photo principale (hero page d'accueil) | `site.config.json` → `images.hero` |
| `section-pro.jpg` | Photo section partenaires (accueil + page pros) | `site.config.json` → `images.sectionPro` |
| `service-summits.jpg` | Soin "L'Instant des Sommets" | `services_v2.json` → `imageSrc` |
| `service-alpine.jpg` | Soin "Récup'Alpine" | `services_v2.json` → `imageSrc` |
| `service-elegance.jpg` | Soin "L'Ascension Élégante" | `services_v2.json` → `imageSrc` |

> **Photos originales de la marque** disponibles dans `Inutile/temporary_screenshots/picture_to_use/` — elles devront remplacer les images actuelles lors de la phase finale. Il suffit de les copier dans `public/images/` et de mettre à jour les chemins dans `services_v2.json` et `site.config.json`.

---

## 4. Pages et leurs blocs

### Page d'accueil `/` — `app/page.tsx`

#### Bloc 1 — HERO
- **Rôle :** première impression, image plein écran avec marque en superposition
- **Image :** `site.config.json → images.hero` (actuellement `hero-setup.jpg`)
- **Texte principal :** « La Belle Détente » → signature en police Satisfy (`BrandScript`)
- **Sous-titre h1 :** « Votre parenthèse de bien-être absolu » → codé en dur dans `page.tsx`
- **Description :** une ligne d'accroche → codée en dur dans `page.tsx`
- **Micro-preuves :** 3 points (Déplacement inclus, Matériel professionnel, Basée en Maurienne) → tableau `PROOFS` dans `page.tsx`
- **Boutons :** Réserver / Espace professionnel → liens hardcodés
- **Overlay :** `bg-black/45` + gradient `from-black/40` pour lisibilité

---

#### Bloc 2 — INTRO
- **Rôle :** accroche éditoriale centrée, transition entre le hero et les soins
- **Contenu :** hardcodé dans `page.tsx` ("`Imaginez un espace de soin…`")
- **Formatage :** `SectionContainer` background blanc, width `reading` (48rem), centré

---

#### Bloc 3 — LE RESSENTI (section narrative des soins)
- **Rôle :** présentation immersive de chaque soin avec photo portrait + texte côte à côte
- **Source de données :** `services_v2.json` via `getAllExperiences()`
- **Image :** `services_v2.json → imageSrc` (portrait, `radius-2xl`, alternance gauche/droite)
- **Texte :** `emotionalHook` (description narrative en italique), `idealFor[]` (liste à puces), prix minimum
- **Layout :** `md:flex-row` / `md:flex-row-reverse` en alternance pair/impair
  - Mobile (< 768px) : empilé, texte **centré**
  - Desktop (≥ 768px) : côte à côte, hauteur identique (`md:items-stretch`), texte réparti sur toute la hauteur (`md:justify-between`)

---

#### Bloc 4 — NOS RITUELS (cartes de soins)
- **Rôle :** grille de présentation rapide des soins avec CTA "Découvrir"
- **Source de données :** `services_v2.json` via `getAllExperiences()`
- **Composant :** `ExperienceCard` variant `navigate` → lien vers `/prestations/[id]`
- **Layout :** grille `1 col → 2 col (sm) → 3 col (lg)`
- **Données affichées :** image, nom (`name`), accroche (`emotionalHook`), prix minimum

---

#### Bloc 5 — NOS ENGAGEMENTS (preuves premium)
- **Rôle :** 3 engagements qualité en colonnes
- **Contenu :** tableau `PREMIUM` hardcodé dans `page.tsx`
- **Formatage :** fond sable (`SectionContainer background="sand"`), grille 3 colonnes centrée, icône ✦

---

#### Bloc 6 — ESPACE PARTENAIRES
- **Rôle :** section B2B avec photo + texte, lien vers `/professionnels`
- **Image :** `site.config.json → images.sectionPro` (actuellement `section-pro.jpg`)
- **Contenu :** hardcodé dans `page.tsx` (texte et stats "5 partenaires, 5/5 satisfaction")
- **Formatage :** fond accent caramel (`SectionContainer background="accent"`)
- **Condition :** visible si `site.config.json → sections.partners = true`

---

#### Bloc 7 — SECTEUR D'INTERVENTION
- **Rôle :** zones géographiques desservies avec badges
- **Source de données :** tableau hardcodé dans `page.tsx` pour les badges (Les Menuires, Courchevel…)
- **Lien :** vers `/zones` pour voir tout le secteur
- **Formatage :** `SectionContainer background="cream"`, centré

> **Amélioration possible :** lire les zones depuis `zones.json → seoLocations[]` plutôt que le tableau hardcodé.

---

#### Bloc 8 — QUESTIONS FRÉQUENTES
- **Rôle :** 3 questions/réponses pour rassurer avant réservation
- **Condition :** visible si `site.config.json → sections.faq = true`
- **Contenu :** tableau `FAQ_SHORT` hardcodé dans `page.tsx`
- **Formatage :** accordéon simple (sans interaction), séparateurs linens

---

#### Bloc 9 — CTA FINAL "Prenez soin de vous"
- **Rôle :** appel à l'action terminal, élégant
- **Contenu :** hardcodé dans `page.tsx`
- **Formatage :** `SectionContainer background="sand"`, centré, signature Satisfy (`BrandScript size="xl"`)

---

### Page Prestations `/prestations` — `app/prestations/page.tsx`

Grille de toutes les expériences avec cartes détaillées. Données depuis `services_v2.json`.

### Page Détail d'un soin `/prestations/[id]` — `app/prestations/[id]/page.tsx`

Fiche complète d'un soin : photo hero, `emotionalHook`, `idealFor[]`, `flow[]`, durées avec tarifs, CTA réservation. ID résolu depuis `services_v2.json`.

### Page Réservation `/reservation` — `app/reservation/page.tsx` + `ReservationContent.tsx`

- **Rôle :** étape 1 du tunnel → sélection du soin et de la durée
- **Composant client :** `ReservationContent.tsx` (nécessite `useSearchParams` → wrappé dans `<Suspense>`)
- **Paramètre URL optionnel :** `?experience=alpine` → présélectionne un soin
- **Données :** `getAllExperiences()` + `DurationSelector`
- **Navigation :** → `/reservation/[durationId]` après sélection

### Page Calendrier `/reservation/[serviceId]` — `app/reservation/[serviceId]/page.tsx`

- **Rôle :** étape 2 → embed Cal.com pour choisir le créneau
- **Composant :** `CalEmbed` (client component, chargement lazy du script Cal.com)
- **Slug Cal.com :** résolu via `getBookingCalLink(durationId)` → `booking.config.json → mapping`

### Page Professionnels `/professionnels`

Présentation de l'offre B2B (hôtels, résidences, EHPAD). Formulaire de contact pro vers `/contact?type=pro`.

### Page Contact `/contact` — `app/contact/page.tsx` + `ContactFormSection.tsx`

- **Rôle :** formulaire de prise de contact (particulier ou professionnel)
- **Sélection de l'onglet :** `?type=pro` dans l'URL → onglet "Professionnel" présélectionné (lu dans le Server Component, passé en prop)
- **Actions serveur :** `app/contact/actions.ts` → validation Zod + envoi via Resend
- **Anti-spam :** champ honeypot `_hp` (CSS caché) + timestamp `_t` (délai 3s–1h)
- **Variables d'environnement requises :** `RESEND_API_KEY`, `RESEND_FROM`, `CONTACT_EMAIL`

### Page Zones `/zones`

Carte et liste du secteur d'intervention. Données depuis `zones.json`.

### Pages légales

`/mentions-legales` et `/politique-confidentialite` → contenu statique hardcodé.

### Pages SEO générées

- `/robots.txt` → `app/robots.ts`
- `/sitemap.xml` → `app/sitemap.ts`

---

## 5. Composants réutilisables

Tous importables depuis `@/components/ui` (export barrel dans `components/ui/index.ts`).

### Typographie — `Typography.tsx`

> Les tailles de police utilisent `style={{ fontSize: 'var(--fs-*)' }}` (inline style) pour garantir que le `clamp()` est résolu dynamiquement par le navigateur et que le texte grandit proportionnellement à la largeur d'écran.

| Composant | Usage | Police | Taille fluide |
|-----------|-------|--------|---------------|
| `Display` | Titre hero principal | Playfair Display | `--fs-display` |
| `Heading level={1\|2\|3}` | Titres de sections | Playfair Display | `--fs-h1/h2/h3` |
| `BrandScript size="sm\|md\|lg\|xl"` | Signature "La Belle Détente" uniquement | Satisfy | `--fs-h3/brand-nav/h1/display` |
| `Eyebrow` | Étiquette uppercase au-dessus des titres | Playfair Display | `--fs-eyebrow` |
| `Body size="sm\|base\|lg"` | Corps de texte | Playfair Display | `--fs-body-sm/body/body-lg` |
| `Caption` | Texte secondaire petit (footer, métas) | Playfair Display | `--fs-eyebrow` |

### SectionContainer — `SectionContainer.tsx`

Wrapper de section avec gestion de la largeur maximale et du fond.

```tsx
<SectionContainer
  width="reading"   // reading (48rem) | content (68rem) | wide (92rem) | full
  background="cream" // default | cream | sand | white | dark | accent
  className="..."
>
```

### Boutons — `Button.tsx`

```tsx
<Button variant="primary|outline|ghost" size="sm|md|lg" withArrow>...</Button>
<ButtonLink href="/..." variant="primary" size="lg" withArrow>...</ButtonLink>
```

### ImageBlock — `ImageBlock.tsx`

Wrapper autour de `next/image` avec ratio et arrondi configurables.

```tsx
<ImageBlock
  src="/images/service-summits.jpg"
  alt="..."
  aspect="portrait|landscape|wide|hero"
  radius="none|sm|md|lg|xl|2xl"
  overlay="none|dark|gradient"
/>
```

### ExperienceCard — `ExperienceCard.tsx`

Carte d'expérience. Données depuis `services_v2.json` via `getAllExperiences()`.

```tsx
<ExperienceCard
  variant="navigate"  // navigate (lien) | select (radio booking) | compact
  featured={true}     // affiche le badge "Populaire"
  id={exp.id}
  name={exp.name}
  emotionalHook={exp.emotionalHook}
  durations={exp.durations}
  imageSrc={exp.imageSrc}
/>
```

### DurationSelector — `DurationSelector.tsx`

Groupe radio pour choisir une durée avec son prix. Utilisé dans `/reservation`.

### StickyBookingCTA — `StickyBookingCTA.tsx`

Bouton "Réserver" fixé en bas, visible sur mobile uniquement, caché sur les routes `/reservation/*`.

### CalEmbed — `CalEmbed.tsx`

Embed Cal.com via script JS. Composant `'use client'` avec chargement `lazyOnload`.

### Formulaires — `FormField.tsx`, `IndividualContactForm.tsx`, `ProContactForm.tsx`

Formulaire de contact avec validation Zod côté serveur et envoi par Resend.

---

## 6. Design system (tokens CSS)

Défini dans `app/globals.css`. Deux blocs distincts :

### `@theme {}` — Tokens Tailwind (couleurs, espacements, rayons)

Utilisés dans les classes Tailwind : `bg-[var(--color-cream-50)]`, `rounded-[var(--radius-xl)]`…

| Catégorie | Exemples de variables |
|-----------|----------------------|
| Fond | `--color-cream-50`, `--color-cream-100` |
| Texte | `--color-earth-900`, `--color-stone-600` |
| Accent/CTA | `--color-accent-400`, `--color-accent-600` |
| Bordures | `--color-linen-200`, `--color-linen-300` |
| Rayons | `--radius-sm` → `--radius-2xl`, `--radius-full` |
| Ombres | `--shadow-soft`, `--shadow-card`, `--shadow-elevated` |
| Z-index | `--z-sticky`, `--z-overlay`, `--z-modal` |

### `:root {}` — Échelle typographique fluide (hors @theme)

Ces variables contiennent des `clamp()` résolus dynamiquement par le navigateur.

```css
--fs-display:    clamp(2rem,   7vw,   12rem);  /* Hero titre */
--fs-h2:         clamp(1.5rem, 4vw,    7rem);  /* Titres de section */
--fs-body:       clamp(1rem,   1.75vw, 2.5rem);/* Corps de texte */
--fs-brand-hero: clamp(2.5rem, 10vw,  16rem);  /* Signature hero */
```

> **Important :** ne pas déplacer ces variables dans `@theme {}` — Tailwind pourrait substituer les valeurs à la compilation et bloquer le scaling fluide.

---

## 7. Guide des modifications courantes

### Ajouter ou modifier un soin

1. Éditer **`content/services_v2.json`**
2. Ajouter une image dans **`public/images/`** et mettre à jour `imageSrc`
3. Si le soin a un slug Cal.com spécifique, ajouter le mapping dans **`content/booking.config.json`**
4. Aucun code à modifier — les pages se mettent à jour automatiquement

### Modifier les tarifs

Éditer **`content/services_v2.json`** → `durations[].price`. Toutes les pages reflètent le changement.

### Changer les photos

| Photo à changer | Fichier à modifier |
|----------------|-------------------|
| Hero page d'accueil | `content/site.config.json → images.hero` + remplacer l'image dans `public/images/` |
| Photo section partenaires | `content/site.config.json → images.sectionPro` |
| Photo d'un soin | `content/services_v2.json → experiences[].imageSrc` |

> Les photos originales de la marque (Élodie) sont dans `Inutile/temporary_screenshots/picture_to_use/`. Pour les utiliser :
> 1. Copier le fichier voulu dans `public/images/`
> 2. Mettre à jour le chemin dans le JSON correspondant

### Activer/désactiver une section

Éditer **`content/site.config.json → sections`** :

```json
"sections": {
  "faq": true,       // FAQ sur la page d'accueil
  "partners": true,  // Section partenaires sur l'accueil
  "giftCards": false // Désactivé (pas de bons cadeaux)
}
```

### Modifier les zones d'intervention

Éditer **`content/zones.json → seoLocations[]`**.
Les badges sur la page d'accueil (section "Secteur d'intervention") sont actuellement hardcodés dans `app/page.tsx` — à synchroniser manuellement si les zones changent.

### Modifier les informations de contact (téléphone, adresse)

Éditer **`content/site.config.json → brand`**.

### Configurer Cal.com (nouveaux créneaux)

Quand un créneau spécifique est créé sur Cal.com pour chaque durée, mettre à jour le mapping dans **`content/booking.config.json`** :
```json
"mapping": {
  "summit60":  "instant-des-sommets-60min",
  "summit90":  "instant-des-sommets-90min"
}
```

### Modifier les textes de la page d'accueil (intro, CTA, preuves)

Éditer **`content/home.config.json`** — sous-titre hero, description, proofs, texte intro, engagements, signature et corps du CTA final.

### Ajouter une question FAQ

Éditer **`content/faq.json`** → ajouter un objet `{ "q": "Question ?", "a": "Réponse." }` dans le tableau `items`.

### Changer les variables d'environnement

Fichier **`.env.local`** (non versionné, à ne jamais committer) :
- `RESEND_API_KEY` — clé API Resend pour l'envoi d'emails
- `RESEND_FROM` — adresse expéditeur (doit être vérifiée sur Resend)
- `CONTACT_EMAIL` — adresse de réception des formulaires

