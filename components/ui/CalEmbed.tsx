'use client'

import { useState } from 'react'

/* ============================================================
   CalEmbed — La Belle Détente
   Inline booking calendar via iframe (React iframe pattern).
   Supports ?duration param — skeleton overlay on load.
   ============================================================ */

interface CalEmbedProps {
  calLink: string
  minHeight?: number
  duration?: number
}

export function CalEmbed({ calLink, minHeight = 650, duration }: CalEmbedProps) {
  const [ready, setReady] = useState(false)

  const src = `https://cal.com/${calLink}?embed=true&layout=month_view${duration ? `&duration=${duration}` : ''}`

  return (
    <div className="relative" style={{ minHeight: `${minHeight}px` }}>

      {/* Skeleton — visible tant que l'iframe n'est pas chargée */}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-[var(--radius-xl)] overflow-hidden transition-opacity duration-500"
        style={{ opacity: ready ? 0 : 1, pointerEvents: ready ? 'none' : 'auto' }}
      >
        {/* Message d'attente */}
        <div className="flex justify-center pt-8 pb-2">
          <p
            className="text-[var(--color-accent-600)]"
            style={{
              fontFamily: 'var(--font-brand)',
              fontSize: 'var(--fs-brand-nav)',
            }}
          >
            Je recherche les créneaux disponibles…
          </p>
        </div>

        {/* Header skeleton */}
        <div className="p-6 border-b border-[var(--color-linen-200)]">
          <div className="h-5 w-32 rounded-full bg-[var(--color-linen-200)] animate-pulse mb-3" />
          <div className="flex gap-2">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="h-4 w-8 rounded bg-[var(--color-linen-200)] animate-pulse" />
            ))}
          </div>
        </div>
        {/* Grid skeleton */}
        <div className="p-6 grid grid-cols-7 gap-2">
          {[...Array(35)].map((_, i) => (
            <div
              key={i}
              className="aspect-square rounded-full bg-[var(--color-linen-200)] animate-pulse"
              style={{ animationDelay: `${(i % 7) * 60}ms` }}
            />
          ))}
        </div>
      </div>

      {/* Iframe Cal.com — fade in au chargement */}
      <iframe
        src={src}
        title="Calendrier de réservation"
        onLoad={() => setReady(true)}
        className="w-full rounded-[var(--radius-xl)] transition-opacity duration-500"
        style={{
          minHeight: `${minHeight}px`,
          border: 'none',
          opacity: ready ? 1 : 0,
        }}
        allow="payment"
      />

    </div>
  )
}
