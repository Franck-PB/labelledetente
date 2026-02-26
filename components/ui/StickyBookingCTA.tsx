'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

/* ============================================================
   StickyBookingCTA — La Belle Détente
   Per PRD:
   - Visible on mobile ONLY
   - Appears after user scrolls past the hero section
   - Hidden on /reservation and /reservation/*
   - Fixed to the bottom of viewport
   ============================================================ */

interface StickyBookingCTAProps {
  /** px threshold after which the CTA appears (default: 400) */
  scrollThreshold?: number
  /** Optional estimated price label */
  priceLabel?: string
}

// Routes where the CTA must be hidden
const HIDDEN_ROUTES = ['/reservation']

/**
 * StickyBookingCTA
 *
 * Renders a fixed bottom bar on mobile:
 * [icon] Réserver un massage    [RÉSERVER →]
 *
 * Disappears on reservation pages and above 768px breakpoint.
 * Mount once in the root layout; it manages its own visibility.
 */
const StickyBookingCTA = ({
  scrollThreshold = 400,
  priceLabel,
}: StickyBookingCTAProps) => {
  const pathname = usePathname()
  const [visible, setVisible] = useState(false)

  // Check if current route should hide the CTA
  const isHiddenRoute = HIDDEN_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + '/')
  )

  useEffect(() => {
    if (isHiddenRoute) return

    const handleScroll = () => {
      setVisible(window.scrollY > scrollThreshold)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isHiddenRoute, scrollThreshold])

  if (isHiddenRoute) return null

  return (
    <div
      className={`
        fixed bottom-0 inset-x-0
        z-[var(--z-sticky)]
        md:hidden
        transition-transform duration-[var(--duration-base)]
        ease-[var(--ease-smooth)]
        ${visible ? 'translate-y-0' : 'translate-y-full'}
      `}
      aria-hidden={!visible}
    >
      {/* Safe area for notch / home indicator */}
      <div
        className="
          flex items-center justify-between
          bg-[var(--color-earth-900)]
          text-[var(--color-cream-50)]
          px-5 pt-4 pb-[calc(1rem+env(safe-area-inset-bottom,0px))]
          shadow-[var(--shadow-elevated)]
        "
      >
        {/* Left: label + optional price */}
        <div className="flex flex-col gap-0.5">
          {priceLabel && (
            <span className="label-eyebrow text-[var(--color-stone-400)]">
              Total estimé
            </span>
          )}
          <span
            className="
              font-[family-name:var(--font-body)]
              text-[var(--text-sm)]
              font-[var(--font-weight-medium)]
              text-[var(--color-cream-50)]
            "
          >
            {priceLabel ? (
              <span className="font-[family-name:var(--font-display)] text-[var(--text-xl)] font-bold">
                {priceLabel}
              </span>
            ) : (
              'Réserver un massage'
            )}
          </span>
        </div>

        {/* Right: CTA button */}
        <Link
          href="/reservation"
          className="
            inline-flex items-center gap-2
            bg-[var(--color-cta)] hover:bg-[var(--color-cta-hover)]
            text-[var(--color-white)]
            font-[family-name:var(--font-body)]
            text-[var(--text-xs)] tracking-[0.12em] uppercase
            font-[var(--font-weight-semibold)]
            h-11 px-6 rounded-[var(--radius-md)]
            transition-colors duration-[var(--duration-fast)]
            focus-visible:outline-none focus-visible:ring-2
            focus-visible:ring-[var(--color-accent-400)]
            focus-visible:ring-offset-2
            focus-visible:ring-offset-[var(--color-earth-900)]
          "
        >
          Réserver
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path
              d="M1.5 6h9M6 1.5l4.5 4.5L6 10.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
    </div>
  )
}

StickyBookingCTA.displayName = 'StickyBookingCTA'

export { StickyBookingCTA }
export type { StickyBookingCTAProps }
