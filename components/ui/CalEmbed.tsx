'use client'

import { useEffect, useRef } from 'react'
import Script from 'next/script'

/* ============================================================
   CalEmbed — La Belle Détente
   Renders a Cal.com inline booking calendar.

   Follows the official Cal.com embed pattern exactly:
   - Bootstrap script creates a command queue (Cal.q)
   - Commands are queued immediately, processed once script loads
   - Namespace = event slug (e.g. "30min")
   - Origin = https://app.cal.com (required)
   ============================================================ */

interface CalEmbedProps {
  /**
   * Cal.com calLink — format: "username/event-slug"
   * Example: "franck-d-6eq1wk/30min"
   */
  calLink: string
  /** Minimum container height in px (default: 650) */
  minHeight?: number
}

// Cal.com global type — mirrors the queue-based API
type CalApi = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (...args: any[]): void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ns: Record<string, (...args: any[]) => void>
  loaded?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  q: any[]
}

declare global {
  interface Window {
    Cal?: CalApi
  }
}

/**
 * CalEmbed
 *
 * Renders the Cal.com inline calendar for the given calLink.
 *
 * Uses the official bootstrap + queue pattern:
 * commands are enqueued before the script finishes loading,
 * then executed when the embed JS is ready.
 *
 * Usage:
 *   <CalEmbed calLink="franck-d-6eq1wk/30min" />
 */
export function CalEmbed({ calLink, minHeight = 650 }: CalEmbedProps) {
  // Extract the event slug (everything after the last "/")
  const eventSlug = calLink.split('/').pop() ?? calLink
  const containerId = `my-cal-inline-${eventSlug}`
  const initialized = useRef(false)

  const initEmbed = () => {
    if (initialized.current || !window.Cal) return
    initialized.current = true

    // Mirrors official Cal.com embed code exactly
    window.Cal('init', eventSlug, { origin: 'https://app.cal.com' })

    window.Cal.ns[eventSlug]('inline', {
      elementOrSelector: `#${containerId}`,
      config: {
        layout: 'month_view',
        useSlotsViewOnSmallScreen: 'true',
      },
      calLink,
    })

    window.Cal.ns[eventSlug]('ui', {
      hideEventTypeDetails: false,
      layout: 'month_view',
    })
  }

  // Also attempt init on mount in case the script was already loaded
  // (e.g. navigating back to this page)
  useEffect(() => {
    if (window.Cal?.loaded) {
      initEmbed()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {/*
        Official Cal.com bootstrap script.
        Creates the command queue pattern: Cal.q[]
        Then loads the actual embed JS from app.cal.com.
      */}
      <Script
        id={`cal-bootstrap-${eventSlug}`}
        strategy="lazyOnload"
        src="https://app.cal.com/embed/embed.js"
        onLoad={initEmbed}
      />

      {/* Cal.com mounts the calendar inside this div */}
      <div
        id={containerId}
        style={{ width: '100%', height: '100%', overflow: 'scroll', minHeight: `${minHeight}px` }}
        aria-label="Calendrier de réservation"
      />
    </>
  )
}
