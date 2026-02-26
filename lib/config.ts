/**
 * lib/config.ts
 *
 * Typed readers for all static configuration files.
 * Pages must NEVER import JSON directly — use these helpers.
 *
 * All reads are synchronous (server-only, build-time safe).
 */

import siteConfigRaw  from '@/content/site.config.json'
import zonesRaw       from '@/content/zones.json'
import bookingConfigRaw from '@/content/booking.config.json'
import homeConfigRaw  from '@/content/home.config.json'
import faqRaw         from '@/content/faq.json'

// ─── Types ───────────────────────────────────────────────────────────────────

export interface SiteConfig {
  brand: {
    name: string
    phone: string
    baseAreaLabel: string
    legalAddress: string
    publicLocality: string
  }
  sections: {
    giftCards: boolean
    englishVersion: boolean
    testimonials: boolean
    partners: boolean
    ehpad: boolean
    faq: boolean
  }
  seo: {
    defaultLocale: string
    locales: string[]
    indexBookingPage: boolean
  }
  analytics: {
    provider: string
    domain: string
    enabled: boolean
  }
  images?: {
    hero?: string
    sectionPro?: string
  }
}

export interface ZonesConfig {
  baseLocation: string
  seoLocations: string[]
  copy: {
    public: string
  }
}

export interface BookingConfig {
  provider: string
  username: string
  publicProfile: string
  fallbackEventSlug: string
  fallbackRoute: string
  mapping: Record<string, string>
}

export interface HomeConfig {
  hero: {
    subtitle: string
    description: string
    proofs: { label: string; icon: string }[]
  }
  intro: {
    eyebrow: string
    heading: string
    body: string
  }
  premium: { title: string; body: string }[]
  cta: {
    signature: string
    body: string
  }
}

export interface FaqItem {
  q: string
  a: string
}

// ─── Accessors ───────────────────────────────────────────────────────────────

/**
 * Returns the full site configuration.
 */
export function getSiteConfig(): SiteConfig {
  return siteConfigRaw as SiteConfig
}

/**
 * Returns a specific section toggle.
 * Usage: isSectionEnabled('faq') → true | false
 */
export function isSectionEnabled(key: keyof SiteConfig['sections']): boolean {
  return siteConfigRaw.sections[key]
}

/**
 * Returns zones configuration (SEO locations + public copy).
 */
export function getZonesConfig(): ZonesConfig {
  return zonesRaw as ZonesConfig
}

/**
 * Returns the full booking configuration.
 */
export function getBookingConfig(): BookingConfig {
  return bookingConfigRaw as BookingConfig
}

/**
 * Returns homepage editorial content (texts, proofs, premium items, CTA).
 * Source: content/home.config.json
 */
export function getHomeConfig(): HomeConfig {
  return homeConfigRaw as HomeConfig
}

/**
 * Returns the FAQ items for the homepage and JSON-LD schema.
 * Source: content/faq.json
 */
export function getFaqItems(): FaqItem[] {
  return (faqRaw as { items: FaqItem[] }).items
}

/**
 * Returns the Cal.com calLink string for a given duration ID.
 * Format: "username/event-slug" — used by the Cal.com JS embed.
 * Falls back to fallbackEventSlug if the mapping has no entry.
 *
 * @param durationId - e.g. "summit60", "alpine90"
 */
export function getCalLink(durationId: string): string {
  const config = getBookingConfig()
  const slug = config.mapping[durationId] ?? config.fallbackEventSlug
  return `${config.username}/${slug}`
}

/**
 * Returns the full Cal.com URL for a given duration ID.
 * Used for direct links and fallback anchors.
 *
 * @param durationId - e.g. "summit60", "alpine90"
 */
export function getCalUrl(durationId: string): string {
  const config = getBookingConfig()
  const slug = config.mapping[durationId] ?? config.fallbackEventSlug
  return `${config.publicProfile}/${slug}`
}
