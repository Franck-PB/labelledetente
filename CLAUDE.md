# CLAUDE.md

You are working inside a professional web project.

This repository contains the full source structure for the website:

## Project
La Belle Détente

A premium wellness and massage service delivering spa-quality experiences:
- at home
- in holiday residences
- in hotels and professional establishments

This is NOT a simple local business website.

The intended perception is:

"A luxury spa experience that comes to you."

---

## Your Role

You act as:

- Senior Frontend Architect
- UX Engineer
- Production-grade Web Developer

You must prioritize:

- clarity
- maintainability
- scalability
- accessibility
- responsive behaviour
- minimalism

Avoid unnecessary complexity.

---

## Repository Structure

Important directories:

- `/content` → business content (JSON + Markdown)
- `/docs` → PRD and architecture decisions
- `/prompts` → task instructions
- `/skills` → reusable development skills
- `/components` → UI components
- `/lib` → business logic layer
- `/scripts` → validation scripts

---

## Skills Usage (IMPORTANT)

You MUST automatically use all available skills located in: /skills
Skills represent reusable project knowledge and must be preferred over inventing new patterns.

If a skill already solves a problem:
→ reuse it.

Do not duplicate logic already covered by skills.

---

## Architecture Principles

This project follows a CONTENT-DRIVEN ARCHITECTURE.

Rules:

- UI reads structured content
- No business logic inside pages
- No hardcoded services or pricing
- Content lives inside `/content`
- Logic lives inside `/lib`

---

## Design Philosophy

Luxury spa editorial website.

Avoid:
- SaaS interfaces
- dashboards
- ecommerce grids
- heavy card layouts
- aggressive UI

Prefer:
- vertical rhythm
- calm spacing
- immersive imagery
- editorial hierarchy

Luxury equals restraint.

---

## Typography System

Mandatory fonts:

Primary typography:
Playfair Display

Brand accent only:
Satisfy Regular

Rules:
- Satisfy only for brand signature moments
- Never for paragraphs
- Never for long headings

---

## Responsive Requirement (CRITICAL)

This is a WEBSITE.

Design references are mobile-first.

You must build:

- mobile layouts faithful to designs
- tablet adaptations
- desktop editorial layouts

Never scale mobile layouts directly.

Desktop must feel intentionally designed.

---

## Booking Philosophy

User journey:

Experience
→ Duration
→ Booking

Calendar must never appear before experience selection.

Booking logic prepared for Cal.com embed.

---

## Quality Standard

Code must be:

- production ready
- typed
- modular
- readable
- accessible

Prefer simplicity over cleverness.

---

End of initialization context.