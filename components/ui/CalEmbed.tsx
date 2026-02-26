'use client'

import { useEffect, useRef } from 'react'

/* ============================================================
   CalEmbed — La Belle Détente
   Renders a Cal.com inline booking calendar.

   Official Cal.com bootstrap pattern (from their embed dashboard):
   - window.Cal is a PLAIN OBJECT (not callable)
   - window.Cal.init(slug, opts) creates the namespace queue
   - window.Cal.ns[slug]("inline"|"ui", opts) queues commands
   - embed.js processes the queue when it loads
   ============================================================ */

interface CalEmbedProps {
  calLink: string
  minHeight?: number
}

interface CalNsFn {
  (...args: unknown[]): void
  q: unknown[][]
}

interface CalObject {
  init: (slug: string, opts?: Record<string, unknown>) => CalNsFn
  ns: Record<string, CalNsFn>
  loaded?: boolean
  q: unknown[][]
}

declare global {
  interface Window {
    Cal?: CalObject
  }
}

export function CalEmbed({ calLink, minHeight = 650 }: CalEmbedProps) {
  const eventSlug = calLink.split('/').pop() ?? calLink
  const containerId = `my-cal-inline-${eventSlug}`
  const initialized = useRef(false)

  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

    // Official Cal.com bootstrap (mirrors their embed dashboard snippet exactly)
    ;(function (C: CalObject, A: string, L: string) {
      const p = (slug: string, ar: unknown[]) => {
        ar.unshift(A)
        if (C.loaded) return
        C.q.push(ar)
      }
      C.loaded = false
      C.q = []
      C.ns = {}

      // Dynamically load embed.js — it will process C.q when ready
      const s = document.createElement('script')
      s.src = L
      s.async = true
      document.head.appendChild(s)

      // C.init(slug) creates a per-namespace queue — returns the ns function
      C.init = (slug: string) => {
        const ns: CalNsFn = ((...args: unknown[]) => p(slug, [...args])) as CalNsFn
        ns.q = []
        C.ns[slug] = ns
        return ns
      }
    })(
      (window.Cal = (window.Cal ?? {}) as CalObject),
      'init',
      'https://app.cal.com/embed/embed.js',
    )

    // Use .init() — window.Cal is a plain object, NOT callable
    window.Cal!.init(eventSlug, { origin: 'https://app.cal.com' })

    window.Cal!.ns[eventSlug]('inline', {
      elementOrSelector: `#${containerId}`,
      config: { layout: 'month_view' },
      calLink,
    })

    window.Cal!.ns[eventSlug]('ui', {
      hideEventTypeDetails: false,
      layout: 'month_view',
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      id={containerId}
      style={{ width: '100%', overflow: 'scroll', minHeight: `${minHeight}px` }}
      aria-label="Calendrier de réservation"
    />
  )
}
