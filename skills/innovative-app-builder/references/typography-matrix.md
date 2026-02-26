# Typography Matrix - Font Pairings

Strategic font combinations for distinctive design. Organized by aesthetic impact.

## High-Contrast Pairings (RECOMMENDED)

### Display + Monospace
- **Playfair Display** + JetBrains Mono
- **Crimson Pro** + Fira Code
- **DM Serif Display** + Space Mono
- *Use for*: Editorial content, code-heavy sites, tech blogs

### Serif + Geometric Sans
- **Newsreader** + Space Grotesk
- **Crimson Pro** + Work Sans
- **Lora** + Raleway
- *Use for*: Professional sites, magazines, sophisticated brands

### Variable Font Extremes
- **Inter** 100 (thin) + Inter 900 (black)
- **Recursive** 300-900 (explore full range)
- **Roboto Flex** (customize axes)
- *Use for*: When stuck with common fonts, use extreme weights

## Aesthetic-Specific Pairings

### Neo-Brutalism
- **Montserrat Black** (900) + Arial Black
- **Impact** + Helvetica Bold
- All caps, extreme weights, no subtlety

### Cyberpunk
- **JetBrains Mono** + Orbitron
- **Courier Prime** + Audiowide
- Monospace everything, geometric accents

### Nordic Minimal
- **Inter** 300-600 + Inter (same family, light weights)
- **Source Sans 3** 200-400
- Single family, restrained weights

### Glassmorphism
- **Bricolage Grotesque** 300-600
- **Outfit** 200-500
- Light, airy, gentle curves

### Japanese Minimal
- **Crimson Pro** + Noto Sans JP
- **Lora** + Noto Serif JP
- Elegant serifs with Japanese support

### Retro-Futurism
- **Space Grotesk** + Orbitron
- **Audiowide** + Rajdhani
- Geometric, futuristic, 1980s inspired

## Size Scale Systems

### Modular Scale (1.25 ratio)
```css
--text-xs: 0.64rem;   /* 10.24px */
--text-sm: 0.8rem;    /* 12.8px */
--text-base: 1rem;    /* 16px */
--text-lg: 1.25rem;   /* 20px */
--text-xl: 1.563rem;  /* 25px */
--text-2xl: 1.953rem; /* 31.25px */
--text-3xl: 2.441rem; /* 39px */
--text-4xl: 3.052rem; /* 48.83px */
--text-5xl: 3.815rem; /* 61.04px */
```

### Large Jumps (3x+ recommended)
```css
--display: 4rem;    /* 64px - Hero headlines */
--title: 2.5rem;    /* 40px - Section titles */
--body: 1rem;       /* 16px - Body text */
--caption: 0.75rem; /* 12px - Captions */
```

### Weight Extremes
```css
--weight-thin: 100;
--weight-light: 300;
--weight-normal: 400;
--weight-bold: 700;
--weight-black: 900;
```

Use 100 vs 900, not 400 vs 600.

## Loading Fonts

### Google Fonts (Recommended)
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Playfair+Display:wght@700;900&display=swap" rel="stylesheet">
```

```css
font-family: 'Playfair Display', serif;
font-family: 'JetBrains Mono', monospace;
```

### Variable Fonts
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet">
```

```css
.thin { font-weight: 100; }
.black { font-weight: 900; }
```

## Typography Utilities

### Line Height Rules
- Display: 1.0-1.1 (tight, dramatic)
- Headings: 1.2-1.3
- Body: 1.6-1.8 (generous, readable)
- Code: 1.4-1.5

### Letter Spacing
```css
.tight { letter-spacing: -0.05em; } /* Headlines */
.normal { letter-spacing: 0; }
.loose { letter-spacing: 0.05em; }  /* All caps, captions */
```

### Text Shadows (use sparingly)
```css
/* Subtle depth */
text-shadow: 0 1px 2px rgba(0,0,0,0.1);

/* Neon glow (cyberpunk) */
text-shadow: 0 0 10px currentColor, 0 0 20px currentColor;

/* Glitch effect */
text-shadow: 2px 0 #FF00FF, -2px 0 #00FFFF;
```

## Anti-Patterns

**Never use these combinations** (generic AI defaults):
- ❌ Inter + Inter
- ❌ Roboto + Roboto
- ❌ Open Sans + anything
- ❌ Lato + anything
- ❌ System fonts (unless brutalist aesthetic)

**Avoid predictable weights**:
- ❌ 400 (normal) + 600 (semi-bold)
- ✅ 200 (extra-light) + 900 (black)

## Quick Reference Card

| Aesthetic | Primary Font | Weight | Size Jump |
|-----------|-------------|--------|-----------|
| Neo-brutalism | Montserrat | 900 | 3x |
| Cyberpunk | JetBrains Mono | 400-700 | 2x |
| Nordic | Inter | 300-600 | 2x |
| Glassmorphism | Bricolage Grotesque | 300-600 | 2x |
| Brutalist | Times New Roman | 400 | Mixed |
| Japanese | Crimson Pro | 400-600 | 2x |
| Retro-futurism | Space Grotesk | 400-700 | 3x |
| Organic | Newsreader | 400-700 | 2x |

## Testing Checklist

- [ ] No Inter, Roboto, Open Sans, Lato, or system fonts (unless intentional)
- [ ] High contrast between fonts (display vs body)
- [ ] Extreme weights used (100-200 or 800-900)
- [ ] Size jumps are 2x or greater
- [ ] Line height appropriate for content type
- [ ] Fonts loaded efficiently (Google Fonts with display=swap)
- [ ] Fallback fonts specified
- [ ] Distinctive choice that signals quality
