---
name: frontend-design
description: Create distinctive, production-grade frontend interfaces with high design quality. Use this skill when the user asks to build web components, pages, artifacts, posters, or applications (examples include websites, landing pages, dashboards, React components, HTML/CSS layouts, or when styling/beautifying any web UI). Generates creative, polished code and UI design that avoids generic AI aesthetics.
license: Complete terms in LICENSE.txt
---

This skill guides creation of distinctive, production-grade frontend interfaces that avoid generic "AI slop" aesthetics. Implement real working code with exceptional attention to aesthetic details and creative choices.

The user provides frontend requirements: a component, page, application, or interface to build. They may include context about the purpose, audience, or technical constraints.

## Design Thinking

Before coding, understand the context and commit to a BOLD aesthetic direction:
- **Purpose**: What problem does this interface solve? Who uses it?
- **Tone**: Pick an extreme: brutally minimal, maximalist chaos, retro-futuristic, organic/natural, luxury/refined, playful/toy-like, editorial/magazine, brutalist/raw, art deco/geometric, soft/pastel, industrial/utilitarian, etc. There are so many flavors to choose from. Use these for inspiration but design one that is true to the aesthetic direction.
- **Constraints**: Technical requirements (framework, performance, accessibility).
- **Differentiation**: What makes this UNFORGETTABLE? What's the one thing someone will remember?

**CRITICAL**: Choose a clear conceptual direction and execute it with precision. Bold maximalism and refined minimalism both work - the key is intentionality, not intensity.

Then implement working code (HTML/CSS/JS, React, Vue, etc.) that is:
- Production-grade and functional
- Visually striking and memorable
- Cohesive with a clear aesthetic point-of-view
- Meticulously refined in every detail

### Practical UX & Accessibility Foundations (to refine the chosen direction)

Even the strongest aesthetic fails if users can't interact smoothly.

**Non-negotiable UX rules:**
- Minimum font size 15–16px for body text, real device-tested
- Interactive zones at least 44px height/touch-friendly
- Visible focus states, full keyboard navigation
- Contrast AA minimum for text and interactive elements
- Motion respects `prefers-reduced-motion`, no mandatory autoplay
- Never hide critical interactions behind hover-only triggers on mobile

✓ A bold aesthetic is compatible with usability  
✘ Sacrificing usability is **lazy design**, not creative design


## Frontend Aesthetics Guidelines

Focus on:
- **Typography**: Choose fonts that are beautiful, unique, and interesting. Avoid generic fonts like Arial and Inter; opt instead for distinctive choices that elevate the frontend's aesthetics; unexpected, characterful font choices. Pair a distinctive display font with a refined body font.
- **Color & Theme**: Commit to a cohesive aesthetic. Use CSS variables for consistency. Dominant colors with sharp accents outperform timid, evenly-distributed palettes.
- **Motion**: Use animations for effects and micro-interactions. Prioritize CSS-only solutions for HTML. Use Motion library for React when available. Focus on high-impact moments: one well-orchestrated page load with staggered reveals (animation-delay) creates more delight than scattered micro-interactions. Use scroll-triggering and hover states that surprise.
- **Spatial Composition**: Unexpected layouts. Asymmetry. Overlap. Diagonal flow. Grid-breaking elements. Generous negative space OR controlled density.
- **Backgrounds & Visual Details**: Create atmosphere and depth rather than defaulting to solid colors. Add contextual effects and textures that match the overall aesthetic. Apply creative forms like gradient meshes, noise textures, geometric patterns, layered transparencies, dramatic shadows, decorative borders, custom cursors, and grain overlays.

NEVER use generic AI-generated aesthetics like overused font families (Inter, Roboto, Arial, system fonts), cliched color schemes (particularly purple gradients on white backgrounds), predictable layouts and component patterns, and cookie-cutter design that lacks context-specific character.

Interpret creatively and make unexpected choices that feel genuinely designed for the context. No design should be the same. Vary between light and dark themes, different fonts, different aesthetics. NEVER converge on common choices (Space Grotesk, for example) across generations.

**IMPORTANT**: Match implementation complexity to the aesthetic vision. Maximalist designs need elaborate code with extensive animations and effects. Minimalist or refined designs need restraint, precision, and careful attention to spacing, typography, and subtle details. Elegance comes from executing the vision well.

### States & Real Product Scenarios

Great UI anticipates reality, not only perfect data.

Design visual and behavioral handling for:
- **Loading:** skeletons reflecting final layout, animated subtly (not flashy)
- **Empty states:** clear messaging + call to action guiding first action
- **Error states:** human tone, fix-path suggestions, never blame the user
- **Success/feedback:** micro-interactions, contextual toasts, not modal spam
- **Offline/degraded mode:** sync indicators, cached content where possible

> A product without states is a mockup, not a frontend.

## Design System & Tokens

Aesthetic cohesion must be mechanically enforceable, not just aspirational.

**Design tokens control the visual universe:**
- Color palette (base, surface, accent, semantic)
- Typography scale (Display, Heading, Body, Mono)
- Spacing scale (4–8–12–16–24–32 or similar)
- Border radius system (xs–s–m–l)
- Shadows & depth layers (surface levels, elevation)
- `z-index` hierarchy defined once, reused everywhere

**UI primitives (foundation components):**
Button, Input, Card, Modal, Tabs, Tag, Badge, Tooltip, Toast, Drawer

**Rule:**  
> Everything else is a composition of primitives,  
> never reinventing them unless the aesthetic direction evolves.

This is what makes redesigns possible without rewriting every page.

## Responsive & Multi-Device Philosophy

Design for fingers first, mouse second.

**Adaptive patterns:**
- Mobile layout ≠ reduced desktop; rethink hierarchy
- Hover states are enhancements, not requirements
- CTA always reachable in thumb zone on phones
- Fluid grids with breakpoints tuned to content, not hard device ranges

## Performance & Motion Discipline

Beauty collapses if the interface lags.

**Guidelines:**
- Prefer subtle micro-interactions over constant animation
- Use blur & shadow effects sparingly (high GPU cost)
- Optimize images (WebP/AVIF), lazy load non-critical assets
- Purposeful motion: reveal context, guide attention, never distract

## Security & Data Integrity in Frontend

Frontend is not "just visuals": it is a data exposure surface.

**Absolute rules:**
- Never expose API keys or secrets in client code
- Avoid raw HTML injection (sanitize if unavoidable)
- Disable buttons during async operations to prevent duplicate actions
- Display generic error wording, avoid leaking system details
- Form validation runs client-side first, server-side always

Good design protects the user as much as it delights them.

## Maintainability & Architecture

Creativity scales only with structure.

**Structure patterns:**
- Divide components into `ui/` (primitives) and `app/` (compositions)
- Keep presentation components stateless whenever possible
- Co-locate style with component logic if using CSS-in-JS or utilities
- Document primitives for future designers/devs; think Storybook

A beautiful architecture is invisible but always felt.

## Microcopy & Tone of Voice

Words shape experience as much as visuals.

**Principles:**
- Precision over verbosity
- Active, concrete verbs
- Human tone: "Try again" > "Error code 0042"
- Placeholder text with meaning, not lorem ipsum
- Localisable strings, avoid hardcoded sentences



Remember: Claude is capable of extraordinary creative work. Don't hold back, show what can truly be created when thinking outside the box and committing fully to a distinctive vision.
