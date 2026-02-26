# Animation Patterns - Motion Design Strategies

Orchestrated motion that adds polish without bloat. Prefer CSS over JS when possible.

## Strategic Animation Framework

**Rule**: Animate high-impact moments, not everything.

### Priority Hierarchy
1. **Page load** - First impression, orchestrated reveal
2. **User interaction** - Buttons, forms, micro-interactions
3. **State changes** - Modals, alerts, transitions
4. **Scroll effects** - Parallax, reveals (use sparingly)

## CSS-Only Patterns (Preferred for HTML)

### Page Load Orchestration
```css
/* Staggered reveal with fade-in */
.element {
  opacity: 0;
  animation: fadeInUp 0.6s ease-out forwards;
}

.element-1 { animation-delay: 0ms; }
.element-2 { animation-delay: 100ms; }
.element-3 { animation-delay: 200ms; }
.element-4 { animation-delay: 300ms; }

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### Hover States
```css
/* Lift on hover */
.card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0,0,0,0.15);
}

/* Scale on hover */
.button {
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.button:hover {
  transform: scale(1.05);
}
```

### Loading States
```css
/* Pulse animation */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.loading {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Spinner */
@keyframes spin {
  to { transform: rotate(360deg); }
}

.spinner {
  animation: spin 1s linear infinite;
}
```

## React Motion Library (motion-primitives)

### Text Effects
```tsx
import { TextEffect } from "@/components/ui/text-effect"

// Per-character animation
<TextEffect per="char" preset="fade-in-blur">
  Animate your ideas
</TextEffect>

// Per-word with custom delay
<TextEffect per="word" preset="slide" delay={0.1}>
  Word by word reveal
</TextEffect>

// Custom speed
<TextEffect speedReveal={2} speedSegment={1.5}>
  Controlled animation speed
</TextEffect>
```

### Scroll-Triggered
```tsx
import { ScrollProgress } from "@/components/ui/scroll-progress"

<ScrollProgress className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-magenta-500" />
```

### Number Animations
```tsx
import { AnimatedNumber } from "@/components/ui/animated-number"

<AnimatedNumber value={1234} />
```

## Timing Functions (Easing)

```css
/* Sharp and snappy - UI interactions */
transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

/* Smooth and natural - Page transitions */
transition-timing-function: cubic-bezier(0.4, 0, 0.6, 1);

/* Bouncy and playful - Attention-grabbing */
transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);

/* Ease-out - Entering elements */
transition-timing-function: cubic-bezier(0, 0, 0.2, 1);

/* Ease-in - Exiting elements */
transition-timing-function: cubic-bezier(0.4, 0, 1, 1);
```

## Duration Guidelines

```css
/* Ultra fast - Micro-interactions */
transition-duration: 150ms;

/* Fast - Standard interactions */
transition-duration: 200ms;

/* Medium - State changes */
transition-duration: 300ms;

/* Slow - Complex transitions */
transition-duration: 500ms;

/* Very slow - Dramatic reveals */
transition-duration: 800ms;
```

**Rule**: Faster for small elements, slower for large/complex changes.

## Theme-Specific Patterns

### Neo-Brutalism
```css
/* Sharp, immediate transitions */
.element {
  transition: transform 0.15s cubic-bezier(0.4, 0, 0.2, 1);
}

.element:hover {
  transform: translate(4px, 4px);
  box-shadow: -4px -4px 0 0 #000;
}
```

### Cyberpunk
```css
/* Glitch effect */
@keyframes glitch {
  0%, 100% { transform: translate(0); }
  25% { transform: translate(-2px, 2px); clip-path: inset(10% 0 85% 0); }
  50% { transform: translate(2px, -2px); clip-path: inset(75% 0 20% 0); }
  75% { transform: translate(-2px, -2px); clip-path: inset(40% 0 50% 0); }
}

/* Scanline effect */
.scanlines {
  animation: scanline 8s linear infinite;
}

@keyframes scanline {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
}
```

### Nordic Minimalism
```css
/* Gentle, slow transitions */
.element {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.6, 1);
}

.element:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0,0,0,0.05);
}
```

### Glassmorphism
```css
/* Float animation */
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.floating {
  animation: float 3s ease-in-out infinite;
}

/* Shimmer effect */
@keyframes shimmer {
  0% { background-position: -100% 0; }
  100% { background-position: 200% 0; }
}

.shimmer {
  background: linear-gradient(90deg, 
    transparent 0%, 
    rgba(255,255,255,0.2) 50%, 
    transparent 100%);
  background-size: 200% 100%;
  animation: shimmer 2s linear infinite;
}
```

## Performance Optimizations

### Use GPU-Accelerated Properties
```css
/* ✅ FAST - Uses GPU */
transform: translateX(10px);
transform: scale(1.1);
opacity: 0.5;

/* ❌ SLOW - Triggers layout/paint */
left: 10px;
width: 110%;
background-color: red;
```

### Will-Change Hint
```css
/* Prepare for animation */
.animated-element {
  will-change: transform, opacity;
}

/* Remove after animation completes */
.animated-element.complete {
  will-change: auto;
}
```

### Reduce Motion for Accessibility
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Anti-Patterns to Avoid

❌ **Animating everything**
- Result: Visual chaos, poor performance
- Fix: Animate 3-5 key moments

❌ **Slow animations (>1s)**
- Result: Users wait, frustration
- Fix: Keep under 500ms for UI interactions

❌ **No easing**
- Result: Robotic, unnatural motion
- Fix: Use cubic-bezier for smooth acceleration

❌ **Layout-triggering animations**
- Result: Janky, 30fps instead of 60fps
- Fix: Use transform and opacity only

❌ **Animations on page scroll**
- Result: Performance issues on mobile
- Fix: Use IntersectionObserver, animate sparingly

## Quick Reference

```bash
# Fast micro-interaction
transition: transform 0.15s cubic-bezier(0.4, 0, 0.2, 1);

# Standard button hover
transition: transform 0.2s ease-out;

# Page load stagger
animation: fadeIn 0.6s ease-out forwards;
animation-delay: calc(var(--index) * 100ms);

# Loading spinner
animation: spin 1s linear infinite;

# Floating element
animation: float 3s ease-in-out infinite;
```

## Testing Checklist

- [ ] Animations complete in <500ms
- [ ] 60fps on mid-range devices
- [ ] Respects prefers-reduced-motion
- [ ] Enhances experience, doesn't distract
- [ ] Uses GPU-accelerated properties (transform, opacity)
- [ ] Stagger delays feel natural (100-200ms gaps)
- [ ] Purpose is clear (not animation for animation's sake)

## Resources

- Easings.net: https://easings.net
- Cubic Bezier Generator: https://cubic-bezier.com
- Motion-Primitives: https://motion-primitives.com
- Framer Motion: https://www.framer.com/motion
