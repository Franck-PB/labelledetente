import { type ButtonHTMLAttributes, forwardRef } from 'react'
import Link from 'next/link'

/* ============================================================
   Button Primitives — La Belle Détente
   Variants extracted from Stitch designs:
   - primary: warm caramel/brown CTA (e.g. "CHOISIR CETTE EXPÉRIENCE")
   - outline: bordered, transparent bg (e.g. "COLLABORER AVEC LA BELLE DÉTENTE")
   - ghost: text-only, minimal footprint
   ============================================================ */

type Variant = 'primary' | 'outline' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

const variantStyles: Record<Variant, string> = {
  primary: `
    bg-[var(--color-cta)]
    text-[var(--color-text-on-accent)]
    border border-transparent
    hover:bg-[var(--color-cta-hover)]
    active:scale-[0.98]
    focus-visible:ring-2
    focus-visible:ring-[var(--color-accent-500)]
    focus-visible:ring-offset-2
  `,
  outline: `
    bg-transparent
    text-[var(--color-earth-800)]
    border border-[var(--color-earth-800)]
    hover:bg-[var(--color-sand-100)]
    active:scale-[0.98]
    focus-visible:ring-2
    focus-visible:ring-[var(--color-accent-500)]
    focus-visible:ring-offset-2
  `,
  ghost: `
    bg-transparent
    text-[var(--color-accent-600)]
    border border-transparent
    hover:text-[var(--color-accent-700)]
    hover:bg-[var(--color-cream-100)]
    active:scale-[0.98]
    focus-visible:ring-2
    focus-visible:ring-[var(--color-accent-500)]
    focus-visible:ring-offset-2
  `,
}

const sizeStyles: Record<Size, string> = {
  sm: 'h-10 px-5 text-[var(--text-xs)] gap-2',
  md: 'h-12 px-7 text-[var(--text-xs)] gap-2.5',
  lg: 'h-14 px-9 text-[var(--text-sm)] gap-3',
}

const baseStyles = `
  inline-flex items-center justify-center
  font-[family-name:var(--font-body)]
  font-[var(--font-weight-semibold)]
  letter-spacing-[var(--tracking-widest)]
  tracking-[0.12em]
  uppercase
  rounded-[var(--radius-md)]
  transition-all
  duration-[var(--duration-base)]
  ease-[var(--ease-smooth)]
  cursor-pointer
  select-none
  whitespace-nowrap
  disabled:opacity-50
  disabled:cursor-not-allowed
  disabled:pointer-events-none
`

// ------ Button (native <button>) ------

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  /** Show trailing arrow → */
  withArrow?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', withArrow = false, className = '', children, ...props }, ref) => (
    <button
      ref={ref}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
      {withArrow && <ArrowIcon />}
    </button>
  )
)
Button.displayName = 'Button'

// ------ ButtonLink (renders as <a> via Next Link) ------

interface ButtonLinkProps {
  href: string
  variant?: Variant
  size?: Size
  withArrow?: boolean
  className?: string
  children: React.ReactNode
  /** Open in new tab */
  external?: boolean
}

const ButtonLink = ({
  href,
  variant = 'primary',
  size = 'md',
  withArrow = false,
  className = '',
  children,
  external = false,
}: ButtonLinkProps) => (
  <Link
    href={href}
    className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
  >
    {children}
    {withArrow && <ArrowIcon />}
  </Link>
)
ButtonLink.displayName = 'ButtonLink'

// ------ Arrow icon (used internally) ------

const ArrowIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M2 7h10M7 2l5 5-5 5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export { Button, ButtonLink }
export type { ButtonProps, ButtonLinkProps }
