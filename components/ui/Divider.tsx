/* ============================================================
   Divider — La Belle Détente
   Decorative horizontal rule. Warm-toned, subtle.
   ============================================================ */

interface DividerProps {
  /** Optional decorative dot in center */
  ornament?: boolean
  className?: string
}

/**
 * Divider
 * Horizontal separator between content blocks.
 */
const Divider = ({ ornament = false, className = '' }: DividerProps) => {
  if (ornament) {
    return (
      <div className={`flex items-center gap-4 ${className}`}>
        <div className="flex-1 h-px bg-[var(--color-border)]" />
        <span
          className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-400)]"
          aria-hidden="true"
        />
        <div className="flex-1 h-px bg-[var(--color-border)]" />
      </div>
    )
  }

  return <hr className={`divider border-none ${className}`} />
}

Divider.displayName = 'Divider'

export { Divider }
export type { DividerProps }
