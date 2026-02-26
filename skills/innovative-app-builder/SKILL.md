---
name: innovative-app-builder
description: Build groundbreaking, distinctive applications that defy AI convergence patterns. Use when creating web/mobile apps, dashboards, landing pages, or any frontend requiring innovation, modern components (Dynamic Islands, text effects, advanced animations), exceptional UX, and market differentiation. Applies to React, Next.js, Vue, Svelte projects needing cutting-edge design systems.
---

# Innovative App Builder

Transform ideas into exceptional applications that stand out from generic AI outputs through systematic innovation, modern component libraries, and strategic design thinking.

## Philosophy

**Break the convergence curse**: Most AI generates predictable interfaces (Inter fonts, purple gradients, cookie-cutter layouts). This skill enforces creative divergence through:
1. **Component Innovation**: Leverage bleeding-edge libraries (cult-ui, motion-primitives, kokonutui)
2. **Design Divergence**: Avoid clichés, embrace distinctive aesthetics
3. **UX Excellence**: Data-driven personas, journey mapping, validation
4. **Knowledge Currency**: Auto-fetch latest components/patterns before building

## Workflow

### Phase 1: Discovery & Research (MANDATORY)
1. **Clarify Project Context** (1-2 key questions only):
   - Target audience and use case?
   - Technical constraints (framework, hosting, timeline)?
   
2. **Fetch Latest Components** (ALWAYS execute before coding):
   ```bash
   python scripts/fetch_components.py --sources cult-ui motion-primitives kokonutui
   ```
   Updates `references/component-catalog.md` with newest patterns

3. **Define UX Strategy** (if user-facing):
   - Run `scripts/ux_analyzer.py` for persona insights
   - Review `references/ux-patterns.md` for journey mapping

### Phase 2: Design Strategy
**Select Aesthetic Direction** (rotate, never default to same):
- **Themes**: Brutalist, Neo-brutalism, Glassmorphism, Cyberpunk, Minimalist Japan, Nordic, Retro-futurism, Organic, Industrial
- **Typography**: Contrast pairs (Display + Mono, Serif + Geometric), extreme weights (100 vs 900), 3x+ size jumps
- **Motion**: Strategic animation (page load choreography, micro-interactions), prefer CSS over JS
- **Backgrounds**: Atmospheric depth (layered gradients, geometric patterns, contextual effects)

**Consult**:
- `references/aesthetic-systems.md` - Theme implementations
- `references/typography-matrix.md` - Font combinations
- `references/animation-patterns.md` - Motion strategies

### Phase 3: Implementation
1. **Initialize with Modern Stack**:
   ```bash
   python scripts/init_project.py --framework [react|nextjs|vue] --theme [selected]
   ```
   
2. **Add Cutting-Edge Components**:
   - Check `references/component-catalog.md` for latest
   - Dynamic Islands (cult-ui) for notifications/status
   - Text effects (motion-primitives) for hero sections
   - Action bars (kokonutui) for search/commands
   
3. **Apply Design System**:
   ```tsx
   // references/design-tokens.md for theme variables
   // references/component-patterns.md for compositions
   ```

4. **Validate Experience**:
   ```bash
   python scripts/validate_ux.py --checklist accessibility performance distinctiveness
   ```

### Phase 4: Polish & Differentiation
- **Avoid convergence**: Scan for Inter/Roboto, purple gradients, standard layouts → replace
- **Add signature elements**: Custom cursors, scroll effects, hover states
- **Performance**: Lighthouse score >90, bundle size <500KB initial
- **Accessibility**: WCAG 2.1 AA minimum, keyboard nav, screen reader tested

## Key Principles

1. **Token Efficiency**: Load only relevant references via progressive disclosure
2. **Always Fresh**: Fetch components BEFORE building, never use stale patterns
3. **Systematic Innovation**: Don't just "be creative" - follow aesthetic frameworks
4. **User-Centric**: Every design choice backed by UX research or established patterns
5. **Production-Ready**: Working code, not concepts - deployable artifacts

## Reference Navigation

**Component Libraries** (auto-updated):
- `references/component-catalog.md` - Latest components from cult-ui, motion-primitives, kokonutui

**Design Systems**:
- `references/aesthetic-systems.md` - Theme implementations and guidelines
- `references/typography-matrix.md` - Font pairings and size scales
- `references/animation-patterns.md` - Motion design patterns
- `references/design-tokens.md` - Color palettes, spacing, shadows

**UX Frameworks**:
- `references/ux-patterns.md` - Journey maps, persona templates, testing protocols
- `references/accessibility-checklist.md` - WCAG compliance patterns

**Frontend Excellence**:
- `references/frontend-aesthetics.md` - Advanced design principles from Anthropic research
- `references/component-patterns.md` - Proven composition strategies

## Automation Scripts

**Component Management**:
- `scripts/fetch_components.py` - Update component catalog from external sources
- `scripts/init_project.py` - Scaffold project with theme and stack

**Quality Assurance**:
- `scripts/validate_ux.py` - Check accessibility, performance, distinctiveness
- `scripts/ux_analyzer.py` - Generate personas and journey maps from user data

**Design Tools**:
- `scripts/theme_generator.py` - Create custom theme tokens
- `scripts/component_finder.py` - Search component catalog by feature

## Anti-Patterns (CRITICAL AVOIDANCE)

**Never use**:
- Default fonts: Inter, Roboto, Arial, Open Sans, Lato, system fonts
- Cliché colors: Purple gradients on white, generic pastels
- Standard layouts: 3-card grids, center hero + features
- Generic animations: Fade-in only, no choreography
- Boring backgrounds: Solid colors, flat gradients

**Instead**:
- Distinctive typography: JetBrains Mono, Bricolage Grotesque, Newsreader, IBM Plex
- Atmospheric palettes: Dark + neon, monochrome + accent, nature-inspired
- Asymmetric layouts: Breaking grids, diagonal compositions, overlapping layers
- Orchestrated motion: Staggered reveals, parallax, physics-based
- Rich backgrounds: Layered gradients, noise textures, geometric patterns

## Quick Command Reference

```bash
# Start new project with innovation focus
python scripts/init_project.py --framework nextjs --theme neo-brutalism

# Fetch latest component updates
python scripts/fetch_components.py --all

# Find components by feature
python scripts/component_finder.py "command palette" "search"

# Validate before deployment
python scripts/validate_ux.py --full

# Generate design tokens for custom theme
python scripts/theme_generator.py --base cyberpunk --accent cyan
```

## Success Metrics

Before considering application complete:
- [ ] Zero generic AI patterns detected (no Inter, no purple gradients, no 3-card grids)
- [ ] At least 2 modern components integrated (Dynamic Island, text effects, etc.)
- [ ] Lighthouse score >90 across all categories
- [ ] WCAG 2.1 AA compliance verified
- [ ] Distinctive aesthetic applied consistently
- [ ] Latest component catalog consulted and used
- [ ] UX validated against persona needs (if applicable)

## Examples of Excellence

**Avoided**: Generic SaaS landing with Inter font, purple gradient hero, 3-card features
**Achieved**: Cyberpunk theme with JetBrains Mono, animated text effects, asymmetric grid, Dynamic Island notifications

**Avoided**: Standard dashboard with Material UI defaults
**Achieved**: Nordic minimalist dashboard with custom motion system, kokonutui action bar, atmospheric backgrounds

**Avoided**: Todo app with basic forms and buttons
**Achieved**: Neo-brutalist todo with bold typography, cult-ui components, physics-based animations
