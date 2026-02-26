import { type HTMLAttributes } from 'react'

/* ============================================================
   Badge — La Belle Détente
   Pill-shaped tag for labels: "SIGNATURE", "POPULAIRE", etc.
   ============================================================ */

type BadgeVariant = 'default' | 'accent' | 'dark'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
}

const variantMap: Record<BadgeVariant, string> = {
  default: 'bg-[var(--color-badge-bg)] text-[var(--color-badge-text)]',
  accent: 'bg-[var(--color-accent-600)] text-[var(--color-white)]',
  dark: 'bg-[var(--color-earth-900)] text-[var(--color-cream-50)]',
}

/**
 * Badge
 * Inline pill label. Uppercase, tracked, small.
 *
 * Usage:
 *   <Badge>Populaire</Badge>
 *   <Badge variant="accent">Signature</Badge>
 */
const Badge = ({ variant = 'default', className = '', children, ...props }: BadgeProps) => (
  <span
    className={`badge ${variantMap[variant]} ${className}`}
    {...props}
  >
    {children}
  </span>
)

Badge.displayName = 'Badge'

export { Badge }
export type { BadgeProps }
