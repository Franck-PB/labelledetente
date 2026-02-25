# prompt-code-03-booking.md

## Mission
Implémenter la réservation Cal.com avec embed par événement, et fallback.

## Règles
- /reservation montre les services bookables, depuis services.json
- /reservation/[serviceId] lit booking.config.json pour obtenir calEventSlug
- Si slug manquant, ou embed échoue, afficher un bouton vers booking général
- Aucun secret, aucune clé API
- Le mapping est stable, serviceId immuable

## UX
- Afficher nom du soin, durée, prix, puis calendrier
- Mobile-first
