# prompt-code-02-content-toggles.md

## Mission
Brancher le site sur le contenu dans /content, et implémenter les toggles.

## Détails
- Lire content/site.config.json, content/services.json, content/zones.json
- Lire content/pages/*.md
- Implémenter lib/config.ts et lib/services.ts
- Valider les JSON via zod à la lecture, sinon erreurs claires
- Les pages doivent utiliser la lib, jamais lire le JSON brut

## Toggle
- Désactiver sections, pages, et version EN
