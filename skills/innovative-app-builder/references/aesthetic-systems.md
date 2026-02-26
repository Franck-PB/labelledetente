# Aesthetic Systems - Theme Implementations

Complete implementation guides for distinctive design themes that break AI convergence.

## Neo-Brutalism

**Philosophy**: Bold, unapologetic, raw. Thick borders, clashing colors, imperfect alignment.

**Color Palette**:
```css
--primary: #000000;    /* Pure black */
--secondary: #FFFF00;  /* Bright yellow */
--accent: #FF0000;     /* Pure red */
--background: #FFFFFF; /* Pure white */
--border: 4px solid #000000;
```

**Typography**:
- Primary: Montserrat 800-900 (extra bold)
- Secondary: Arial Black
- Size scale: 16px, 24px, 48px, 96px (large jumps)

**Spacing**: Inconsistent (part of aesthetic) - 8px, 20px, 40px, 80px

**Components**:
```tsx
<button className="bg-yellow-400 text-black border-4 border-black px-8 py-4 
                   font-black text-xl hover:translate-x-1 hover:translate-y-1 
                   hover:shadow-[8px_8px_0_0_#000000] transition-all">
  CLICK ME
</button>
```

**Use cases**: Portfolio sites, creative agency, art projects, rebellious brands

---

## Cyberpunk

**Philosophy**: High-tech, low-life. Neon on dark, glitch aesthetics, digital noise.

**Color Palette**:
```css
--primary: #00FFFF;    /* Neon cyan */
--secondary: #FF00FF;  /* Neon magenta */
--accent: #FFFF00;     /* Neon yellow */
--background: #0A0A0A; /* Near black */
--glow: drop-shadow(0 0 10px currentColor);
```

**Typography**:
- Primary: JetBrains Mono 400-700
- Secondary: Orbitron (geometric futuristic)
- Monospace for everything (code aesthetic)

**Effects**:
```css
.glitch {
  animation: glitch 1s infinite;
  text-shadow: 2px 0 #FF00FF, -2px 0 #00FFFF;
}

@keyframes glitch {
  0%, 100% { transform: translate(0); }
  25% { transform: translate(-2px, 2px); }
  50% { transform: translate(2px, -2px); }
  75% { transform: translate(-2px, -2px); }
}

.scanlines {
  background: repeating-linear-gradient(
    0deg,
    rgba(0, 255, 255, 0.05) 0px,
    transparent 2px,
    transparent 4px
  );
}
```

**Components**: Glowing buttons, animated scanlines, terminal-style interfaces, pixelated borders

**Use cases**: Gaming sites, tech startups, developer tools, futuristic apps

---

## Nordic Minimalism

**Philosophy**: Less is more. Natural palette, generous space, calm serenity.

**Color Palette** (Nord theme):
```css
--primary: #2E3440;    /* Polar night */
--secondary: #88C0D0;  /* Frost blue */
--accent: #D08770;     /* Aurora orange */
--background: #ECEFF4; /* Snow storm */
--muted: #4C566A;      /* Polar night light */
```

**Typography**:
- Primary: Inter 300-400-600 (light to semi-bold)
- Large line heights (1.8 for body text)
- Generous letter spacing (0.02em)

**Spacing**: Extremely generous - 16px, 32px, 64px, 128px

**Components**:
```tsx
<div className="bg-white p-16 rounded-3xl shadow-sm border border-gray-100">
  <h2 className="text-4xl font-light text-gray-900 mb-8 tracking-tight">
    Minimal Header
  </h2>
  <p className="text-lg font-light text-gray-600 leading-relaxed">
    Body text with generous spacing and calm presence.
  </p>
</div>
```

**Principles**: White space is design, subtle shadows, soft transitions

**Use cases**: Health/wellness apps, productivity tools, Scandinavian brands, clean SaaS

---

## Glassmorphism

**Philosophy**: Transparency, depth, frosted glass. Light and airy with blur effects.

**Color Palette**:
```css
--primary: rgba(255, 255, 255, 0.25);
--secondary: rgba(224, 224, 255, 0.15);
--accent: rgba(160, 160, 255, 0.3);
--backdrop: backdrop-filter: blur(10px);
--border: 1px solid rgba(255, 255, 255, 0.18);
```

**Background**: Always gradients or images (glassmorphism needs something to blur)
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

**Typography**:
- Primary: Bricolage Grotesque 300-600 (light and airy)
- Subtle text shadows for readability

**Components**:
```tsx
<div className="bg-white/25 backdrop-blur-lg p-8 rounded-2xl 
                border border-white/20 shadow-xl">
  <div className="text-white font-light text-lg">
    Frosted glass effect
  </div>
</div>
```

**CSS Requirements**:
```css
.glass {
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
}
```

**Use cases**: Modern dashboards, music apps, weather apps, premium products

---

## Brutalist Web

**Philosophy**: Raw HTML aesthetic. Defaults on purpose. Challenging conventions.

**Color Palette**:
```css
--primary: #000000;
--secondary: #0000EE;    /* Browser default link blue */
--background: #FFFFFF;
--visited: #551A8B;      /* Browser default visited */
```

**Typography**:
- Primary: Times New Roman (or similar serif)
- Secondary: Courier (monospace)
- Mixing serif and mono intentionally

**Elements**:
- Underlined links (default browser style)
- Unstyled lists
- Visible borders
- Mix of font sizes without hierarchy
- Tables without styling
- Forms with default appearance

**Anti-design**:
```html
<div style="border: 1px solid black; padding: 10px;">
  <h1>Raw Header</h1>
  <p>Unstyled paragraph with <a href="#">default link</a></p>
  <table border="1">
    <tr><td>Cell</td><td>Cell</td></tr>
  </table>
</div>
```

**Use cases**: Artist portfolios, experimental projects, anti-corporate statements

---

## Japanese Minimalism

**Philosophy**: Wabi-sabi. Beauty in imperfection. Zen simplicity.

**Color Palette**:
```css
--primary: #1A1A1A;    /* Sumi ink */
--secondary: #F5F5F5;  /* Rice paper */
--accent: #C41E3A;     /* Cinnabar red */
--natural: #8B7355;    /* Wood brown */
```

**Typography**:
- Primary: Crimson Pro (elegant serif)
- Japanese text: Noto Sans JP
- Vertical text option: `writing-mode: vertical-rl`

**Spacing**: Asymmetric, intentional emptiness
- Golden ratio proportions (1:1.618)
- Off-center alignments

**Components**:
```tsx
<div className="bg-gray-50 min-h-screen p-24">
  <div className="max-w-2xl">
    <h1 className="text-6xl font-serif text-gray-900 mb-16 tracking-tight">
      侘寂
    </h1>
    <p className="text-lg text-gray-700 leading-loose">
      Content with generous whitespace and thoughtful typography.
    </p>
  </div>
</div>
```

**Principles**: Simplicity (kanso), naturalness (shizen), profound grace (yugen)

**Use cases**: Tea companies, meditation apps, craft brands, cultural sites

---

## Retro-Futurism

**Philosophy**: 1980s vision of the future. Geometric shapes, grid patterns, bold colors.

**Color Palette**:
```css
--primary: #FF6B35;    /* Retro orange */
--secondary: #00CFC1;  /* Teal */
--accent: #8B5CF6;     /* Purple */
--background: #1A1A2E; /* Dark blue-black */
--grid: #FF6B35;       /* Glowing grid lines */
```

**Typography**:
- Primary: Space Grotesk (geometric, futuristic)
- Secondary: Orbitron
- All caps for headers

**Effects**:
```css
.retro-grid {
  background-image: 
    linear-gradient(#FF6B35 2px, transparent 2px),
    linear-gradient(90deg, #FF6B35 2px, transparent 2px);
  background-size: 50px 50px;
  transform: perspective(500px) rotateX(60deg);
}

.retro-text {
  text-shadow: 
    0 0 10px #FF6B35,
    0 0 20px #FF6B35,
    0 0 30px #FF6B35;
}
```

**Components**: Neon outlines, perspective grids, chrome gradients, synthwave aesthetics

**Use cases**: Gaming, music production, retro brands, nostalgic products

---

## Organic/Natural

**Philosophy**: Inspired by nature. Curves, earthy tones, textures.

**Color Palette**:
```css
--primary: #2D5F2E;    /* Forest green */
--secondary: #8B7355;  /* Earth brown */
--accent: #E8B86D;     /* Golden hour */
--background: #FAF7F2; /* Cream */
```

**Typography**:
- Primary: Newsreader (elegant, organic serif)
- Body: Georgia, Garamond
- Handwritten accents: Caveat, Pacifico

**Shapes**: Rounded corners (border-radius: 2rem+), blob shapes, irregular edges

**Textures**:
```css
.paper-texture {
  background-image: url('data:image/svg+xml,...'); /* Noise/grain */
  background-color: #FAF7F2;
}

.organic-shape {
  border-radius: 63% 37% 54% 46% / 55% 48% 52% 45%;
}
```

**Use cases**: Food brands, eco-products, wellness, natural cosmetics

---

## Implementation Strategy

1. **Choose ONE theme** for the project (don't mix)
2. **Commit fully** to the aesthetic principles
3. **Apply consistently** across all components
4. **Customize** the base palette to brand needs
5. **Test** against convergence checklist (no Inter, no purple gradients, etc.)

## Anti-Convergence Rotation

To avoid new patterns of convergence, rotate through themes:
- Project 1: Cyberpunk
- Project 2: Nordic
- Project 3: Neo-brutalism
- Project 4: Glassmorphism
- Project 5: Japanese Minimal
- ...continue rotating...

Never use the same theme twice in a row. Inject surprise choices.
