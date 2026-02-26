# UX Patterns - Research & Validation Frameworks

Quick-reference patterns for user-centered design validation.

## User Personas (Data-Driven)

### Persona Template
```yaml
Name: [Archetype name]
Age: [Range]
Role: [Job/context]
Goals:
  - [Primary objective]
  - [Secondary objective]
Tech Comfort: [Low/Medium/High]
Pain Points:
  - [Current friction 1]
  - [Current friction 2]
Behaviors:
  - [Observable pattern 1]
  - [Observable pattern 2]
Quote: "[Represents mindset]"
```

### Quick Generation (No Data)
When no user research exists:
1. Identify 2-3 archetypes based on project goals
2. Base on analogous products (competitor research)
3. Validate assumptions early with real users

## Journey Mapping

### 5-Stage Framework
```
1. AWARENESS → 2. CONSIDERATION → 3. DECISION → 4. ACTION → 5. RETENTION
```

For each stage, identify:
- User actions (what they do)
- Touchpoints (where interaction happens)
- Emotions (how they feel)
- Pain points (what frustrates)
- Opportunities (how to improve)

### Rapid Journey Map
```
Stage: [Name]
Actions: [Bullet list of user behaviors]
Pain: [Primary friction]
Fix: [Design solution]
```

## Accessibility Checklist (WCAG 2.1 AA)

### Visual
- [ ] Color contrast ≥4.5:1 for normal text
- [ ] Color contrast ≥3:1 for large text (18pt+)
- [ ] Don't rely solely on color for meaning
- [ ] Text resizable to 200% without horizontal scroll

### Keyboard
- [ ] All interactive elements keyboard accessible
- [ ] Focus indicators visible
- [ ] Logical tab order
- [ ] No keyboard traps

### Screen Readers
- [ ] Alt text for images
- [ ] Semantic HTML (nav, main, header, footer)
- [ ] ARIA labels where needed
- [ ] Headings in logical order (h1, h2, h3...)

### Forms
- [ ] Labels associated with inputs
- [ ] Error messages clear and actionable
- [ ] Required fields indicated
- [ ] Form validation accessible

## Usability Testing (Quick Protocol)

### 5-User Test
Sufficient to find 85% of usability issues:
1. **Recruit**: 5 users matching target persona
2. **Tasks**: 3-5 realistic scenarios
3. **Observe**: Watch without helping
4. **Note**: Confusion points, errors, comments
5. **Synthesize**: Identify patterns (3+ users = issue)

### Task Template
```
Scenario: [Context-setting story]
Task: [What user should accomplish]
Success: [How you measure completion]
Time: [Expected duration]
```

## Performance Targets

User perception thresholds:
- **100ms**: Feels instant
- **300ms**: Perceptible delay
- **1000ms**: User loses flow
- **10s**: User abandons

### Core Web Vitals
- LCP (Largest Contentful Paint): <2.5s
- FID (First Input Delay): <100ms
- CLS (Cumulative Layout Shift): <0.1

## Heuristic Evaluation (Nielsen's 10)

Quick quality checks:
1. **Visibility**: System status clear?
2. **Match**: Real-world language?
3. **Control**: User-initiated actions?
4. **Consistency**: Predictable patterns?
5. **Prevention**: Errors blocked?
6. **Recognition**: Options visible vs memorized?
7. **Flexibility**: Shortcuts for experts?
8. **Aesthetics**: Minimal clutter?
9. **Recovery**: Good error messages?
10. **Help**: Documentation accessible?

## Mobile-First Considerations

### Touch Targets
- Minimum: 44x44px (Apple) / 48x48px (Android)
- Spacing: 8px between targets
- Thumb zones: Bottom 1/3 most accessible

### Responsive Breakpoints
```css
/* Mobile first */
@media (min-width: 640px)  { /* sm */ }
@media (min-width: 768px)  { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
```

## Quick Validation Script

Run before launch:
1. [ ] Can 3 target users complete core task?
2. [ ] Lighthouse score >90 all categories?
3. [ ] Keyboard navigation works completely?
4. [ ] Color contrast passes WCAG AA?
5. [ ] Mobile experience tested on device?
6. [ ] Load time <3s on 3G?
7. [ ] Error states handled gracefully?

## When to Use Scripts

**ux_analyzer.py**: When you have user data to generate personas
**validate_ux.py**: Before deployment, check accessibility/performance

## Resources

- WCAG Guidelines: https://www.w3.org/WAI/WCAG21/quickref/
- Lighthouse: Built into Chrome DevTools
- Nielsen Norman Group: https://www.nngroup.com/articles/
- A11y Project: https://www.a11yproject.com/
