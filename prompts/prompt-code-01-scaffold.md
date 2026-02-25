# prompt-code-01-scaffold.md

# Mission (Itération 1 — Scaffold)

Tu es un architecte front-end senior. Objectif : initialiser un projet Next.js (App Router) TypeScript + Tailwind, avec une structure “content-driven” et une base de qualité production.

## Contexte
Projet : site premium full-responsive “La Belle Détente”
- Stack : Next.js App Router, TypeScript, Tailwind
- Déploiement : Vercel
- Repo : GitHub (aucun secret dans le repo)

## Exigences non négociables
- Zéro secret dans Git, fournir `.env.example` si nécessaire
- Composants petits, lisibles, sans logique métier dans les pages
- Préparer l’architecture pour lire du contenu depuis `/content` (JSON + Markdown) mais ne pas implémenter la lecture maintenant (ce sera itération 2)
- SEO-ready : structure metadata, layout stable, routes propres
- Accessibilité : bases (labels, focus visibles, navigation clavier)
- Mobile-first

## Routes à créer (pages vides + titres + layout)
- `/` (Accueil)
- `/prestations`
- `/reservation`
- `/reservation/[serviceId]`
- `/professionnels`
- `/contact`
- `/zones`
- `/a-propos`
- `/mentions-legales`
- `/politique-confidentialite`

Chaque page doit afficher au minimum :
- un H1 provisoire
- un texte placeholder
- un lien de retour pertinent

## Layout global
Créer :
- `app/layout.tsx` : layout global
- `components/Header.tsx` : navigation + CTA (placeholder)
- `components/Footer.tsx` : footer minimal + liens légaux

Header attendu (desktop + mobile) :
- lien Accueil
- liens : Prestations, Réservation, Professionnels, Contact
- CTA primaire : “Réserver un massage” → `/reservation`
- CTA secondaire : “Collaborer” → `/professionnels` (texte exact à garder)

## Structure repo attendue
Créer les dossiers (même si encore vides) :
- `/components`
- `/content`
- `/content/pages`
- `/lib`
- `/scripts`
- `/docs`
- `/prompts`

Créer :
- `README.md` : installation, dev, build, déploiement Vercel
- `.env.example` : vide ou placeholders
- `.gitignore` si nécessaire

## Qualité
Configurer :
- ESLint (Next)
- Prettier (config simple)
- scripts npm : `dev`, `build`, `lint`, `format`

## Sortie attendue
- Le projet compile (`pnpm build`)
- Les routes existent et sont navigables
- UI basique responsive (sans design final)
- Aucune dépendance inutile ajoutée
