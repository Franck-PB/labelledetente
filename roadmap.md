# Roadmap (agent codeur)

## 1, Setup
- Init Next.js App Router, TypeScript
- Tailwind
- ESLint, Prettier
- Structure dossiers : app, components, content, lib, scripts, docs

## 2, Contenu
- Charger JSON, Markdown
- Implémenter toggles via `content/site.config.json`
- Créer lib `lib/services.ts` et `lib/config.ts` pour encapsuler lectures et validations

## Phase UI — Design System First (MANDATORY)

Before assembling pages, the agent must:

1. Extract visual rules from Stitch designs
2. Define the design system
3. Create reusable UI primitives

### Design System includes:
- typography scale
- spacing system
- container widths
- color tokens
- border radius
- button variants
- section rhythm

---

### Required Base Components

Create first:

- SectionContainer
- Typography components
- Button variants
- ImageBlock
- ExperienceCard
- DurationSelector
- StickyBookingCTA

Pages MUST NOT be created before these components exist.

---

Goal:
Prevent layout duplication and ensure visual consistency across the entire website.

## 3, UI
- Layout, header, footer, mobile-first
- Pages : home, prestations, professionnels, réservation, contact, zones, à-propos
- Composants : ServiceCard, CTA, FAQ, Section, CalEmbed
## Sticky CTA Mobile
- Implémenter StickyBookingCTA
- Visible uniquement mobile
- Caché sur routes réservation
- Redirige vers /reservation

## 4, Booking
- `/reservation` liste des massages bookables
- `/reservation/[serviceId]` embed Cal.com via slug mapping
- Fallback vers booking général si mapping absent

## 5, SEO et perf
- Metadata par page
- JSON-LD
- Sitemap, robots
- Next Image, lazy
- Accessibilité

## 6, Formulaires
- Contact pros, demandes spécifiques
- Anti-spam, rate limit
- Envoi email via provider (Resend recommandé)
- Messages de succès clairs

## 7, Validation
- Script `pnpm validate` (zod) : contenus, mapping, sections
- Script `pnpm lint`, `pnpm test` (si tests)
- Lighthouse mobile

## 8, Déploiement
- Vercel via GitHub
- Domaine + Plausible
