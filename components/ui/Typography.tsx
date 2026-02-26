import { type CSSProperties, type HTMLAttributes, forwardRef } from 'react'

/* ============================================================
   Typography Primitives — La Belle Détente
   Font sizes use inline style={{ fontSize: 'var(--fs-*)' }} to
   guarantee the browser resolves clamp() dynamically — never via
   Tailwind arbitrary class which may be substituted at build time.
   ============================================================ */

// --------------- Display / Hero headings ---------------

interface DisplayProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2'
  italic?: boolean
}

const Display = forwardRef<HTMLHeadingElement, DisplayProps>(
  ({ as: Tag = 'h1', italic = false, className = '', style, children, ...props }, ref) => (
    <Tag
      ref={ref}
      style={{ fontSize: 'var(--fs-display)', ...style } as CSSProperties}
      className={`
        font-[family-name:var(--font-display)]
        leading-[var(--leading-tight)]
        tracking-[var(--tracking-tight)]
        font-[var(--font-weight-bold)]
        ${italic ? 'italic' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </Tag>
  )
)
Display.displayName = 'Display'

// --------------- Section headings ---------------

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3'
  level?: 1 | 2 | 3
  italic?: boolean
}

const headingSizeVarMap: Record<1 | 2 | 3, string> = {
  1: 'var(--fs-h1)',
  2: 'var(--fs-h2)',
  3: 'var(--fs-h3)',
}

const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ as, level = 2, italic = false, className = '', style, children, ...props }, ref) => {
    const Tag = as ?? (`h${level}` as 'h1' | 'h2' | 'h3')
    return (
      <Tag
        ref={ref}
        style={{ fontSize: headingSizeVarMap[level], ...style } as CSSProperties}
        className={`
          font-[family-name:var(--font-display)]
          leading-[var(--leading-snug)]
          tracking-[var(--tracking-tight)]
          font-[var(--font-weight-bold)]
          ${italic ? 'italic' : ''}
          ${className}
        `}
        {...props}
      >
        {children}
      </Tag>
    )
  }
)
Heading.displayName = 'Heading'

// --------------- Brand script / Satisfy ---------------

interface BrandScriptProps extends HTMLAttributes<HTMLSpanElement> {
  as?: 'span' | 'h1' | 'h2' | 'p'
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const brandSizeVarMap: Record<string, string> = {
  sm:  'var(--fs-h3)',
  md:  'var(--fs-brand-nav)',
  lg:  'var(--fs-h1)',
  xl:  'var(--fs-display)',
}

const BrandScript = forwardRef<HTMLSpanElement, BrandScriptProps>(
  ({ as: Tag = 'span', size = 'md', className = '', style, children, ...props }, ref) => (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      style={{ fontSize: brandSizeVarMap[size], ...style } as CSSProperties}
      className={`
        font-[family-name:var(--font-brand)]
        leading-[var(--leading-snug)]
        ${className}
      `}
      {...props}
    >
      {children}
    </Tag>
  )
)
BrandScript.displayName = 'BrandScript'

// --------------- Eyebrow / Section label ---------------

interface EyebrowProps extends HTMLAttributes<HTMLParagraphElement> {
  as?: 'p' | 'span' | 'div'
}

const Eyebrow = forwardRef<HTMLParagraphElement, EyebrowProps>(
  ({ as: Tag = 'p', className = '', style, children, ...props }, ref) => (
    <Tag
      ref={ref}
      style={{ fontSize: 'var(--fs-eyebrow)', ...style } as CSSProperties}
      className={`label-eyebrow ${className}`}
      {...props}
    >
      {children}
    </Tag>
  )
)
Eyebrow.displayName = 'Eyebrow'

// --------------- Body text ---------------

interface BodyProps extends HTMLAttributes<HTMLParagraphElement> {
  as?: 'p' | 'div' | 'span'
  size?: 'sm' | 'base' | 'lg'
  muted?: boolean
}

const bodySizeVarMap: Record<string, string> = {
  sm:   'var(--fs-body-sm)',
  base: 'var(--fs-body)',
  lg:   'var(--fs-body-lg)',
}

const Body = forwardRef<HTMLParagraphElement, BodyProps>(
  ({ as: Tag = 'p', size = 'base', muted = false, className = '', style, children, ...props }, ref) => (
    <Tag
      ref={ref}
      style={{ fontSize: bodySizeVarMap[size], ...style } as CSSProperties}
      className={`
        font-[family-name:var(--font-body)]
        leading-[var(--leading-relaxed)]
        font-[var(--font-weight-regular)]
        ${muted ? 'text-[var(--color-text-muted)]' : 'text-[var(--color-text-secondary)]'}
        ${className}
      `}
      {...props}
    >
      {children}
    </Tag>
  )
)
Body.displayName = 'Body'

// --------------- Caption / Meta ---------------

interface CaptionProps extends HTMLAttributes<HTMLSpanElement> {
  as?: 'span' | 'p' | 'div'
}

const Caption = forwardRef<HTMLSpanElement, CaptionProps>(
  ({ as: Tag = 'span', className = '', style, children, ...props }, ref) => (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      style={{ fontSize: 'var(--fs-eyebrow)', ...style } as CSSProperties}
      className={`
        font-[family-name:var(--font-body)]
        leading-[var(--leading-normal)]
        text-[var(--color-text-muted)]
        ${className}
      `}
      {...props}
    >
      {children}
    </Tag>
  )
)
Caption.displayName = 'Caption'

export { Display, Heading, BrandScript, Eyebrow, Body, Caption }
export type { DisplayProps, HeadingProps, BrandScriptProps, EyebrowProps, BodyProps, CaptionProps }
