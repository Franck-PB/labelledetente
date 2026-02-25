# PRD, La Belle Détente (V1)

## Objectifs
- Conversion particuliers, réservation via Cal.com embed
- Conversion professionnels (Hôtels, EHPAD), formulaire qualifié
- SEO local, Savoie, Maurienne, stations prioritaires

## Cibles
- Particuliers, massage à domicile, ou lieu de séjour
- Responsables d’hébergement (hôtels), direction, réception, conciergerie
- Responsables EHPAD, direction, encadrement

## Parcours
### Particulier
Accueil → Prestations → Choix soin → Réservation (Cal.com) → Confirmation + ajout agenda

### Professionnel
Accueil → Professionnels → Valeur + modalités → Formulaire qualifié → Échange

## Contraintes
- Aucun secret dans GitHub
- Pas d’admin panel
- Contenu piloté par JSON et Markdown
- Sections activables via `content/site.config.json`
- Localisation visible approximative (Maurienne), adresse exacte uniquement en mentions légales
- Images libres de droits uniquement (Pexels, Unsplash)

## Pages
- `/` Accueil
- `/prestations` Carte des soins
- `/reservation` Choix du soin
- `/reservation/[serviceId]` Embed Cal.com filtré, avec fallback
- `/professionnels` Hôtels + EHPAD
- `/contact` Formulaire (pros, demandes spécifiques)
- `/a-propos`
- `/zones`
- `/mentions-legales`
- `/politique-confidentialite`

## Booking, Cal.com
### Règles à configurer côté Cal.com
- Minimum booking notice : 2 heures
- Buffer before event : 30 minutes
- Buffer after event : 30 minutes
- Sync Google Calendar : activé
- Emails de confirmation : activés

### Couplage anti-bug
- Le site utilise des `serviceId` stables
- Le mapping `serviceId` → `calEventSlug` est dans `content/booking.config.json`
- Si slug absent, ou embed échoue, fallback vers l’event général Cal.com

## SEO
### Technique
- Metadata par page, OpenGraph, Twitter cards
- `sitemap.xml`, `robots.txt`, canonical
- JSON-LD `LocalBusiness` + `Service`
- Optimisation images (Next Image), LCP mobile

### Contenu
- Sémantique : massage à domicile, Savoie, Maurienne, massage en hôtel, bien-être, haut de gamme
- Pas d’affichage rayon, mention "basée en Maurienne, Savoie"
- Liste SEO des stations dans `content/zones.json`

## Analytics
- Plausible sur le domaine, sans cookies intrusifs
- Objectifs : clic téléphone, clic réservation, formulaire pros envoyé

## Sécurité, règles "Power of 10" adaptées
Référentiel interne : `notebooklm-note-les-10-commandements-du-code-critique-de-la-nasa-2026-02-25.md`
- Simplicité, fonctions courtes, validations systématiques
- Gestion d’erreurs explicite, pas de comportements implicites
- Zéro secret dans le repo, variables d’environnement documentées
