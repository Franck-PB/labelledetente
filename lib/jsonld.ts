/**
 * lib/jsonld.ts
 *
 * JSON-LD structured data generators.
 * Each function returns a plain object ready for JSON.stringify().
 * Inject via <script type="application/ld+json"> in page components.
 *
 * Schemas used:
 * - LocalBusiness  → homepage, every page via layout
 * - Service        → /prestations/[id]
 * - FAQPage        → homepage (conditional)
 * - BreadcrumbList → detail pages
 */

import type { Experience } from './services'
import type { SiteConfig, ZonesConfig, FaqItem } from './config'

const BASE_URL = 'https://labelledetente.fr'

// ─── LocalBusiness ────────────────────────────────────────────────────────────

/**
 * LocalBusiness schema for La Belle Détente.
 * Used on the homepage and injected globally.
 */
export function localBusinessJsonLd(config: SiteConfig, zones: ZonesConfig) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${BASE_URL}/#business`,
    name: config.brand.name,
    description:
      'Massage professionnel à domicile, en résidence de vacances ou en hôtel. Prestations haut de gamme en Maurienne et Savoie.',
    url: BASE_URL,
    telephone: config.brand.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: config.brand.legalAddress,
      addressLocality: 'Saint-Étienne-de-Cuines',
      addressRegion: 'Savoie',
      postalCode: '73130',
      addressCountry: 'FR',
    },
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Maurienne' },
      { '@type': 'AdministrativeArea', name: 'Savoie' },
      ...zones.seoLocations.map((loc) => ({
        '@type': 'Place',
        name: loc,
      })),
    ],
    priceRange: '€€',
    image: `${BASE_URL}/og-image.jpg`,
    sameAs: [],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '19:00',
      },
    ],
  }
}

// ─── Service ─────────────────────────────────────────────────────────────────

/**
 * Service schema for a massage experience.
 * Used on /prestations/[id].
 */
export function serviceJsonLd(exp: Experience, businessName: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: exp.name,
    description: exp.emotionalHook,
    provider: {
      '@type': 'LocalBusiness',
      '@id': `${BASE_URL}/#business`,
      name: businessName,
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Maurienne, Savoie',
    },
    url: `${BASE_URL}/prestations/${exp.id}`,
    offers: exp.durations.map((d) => ({
      '@type': 'Offer',
      name: d.label,
      price: String(d.price),
      priceCurrency: 'EUR',
      url: `${BASE_URL}/reservation?experience=${exp.id}&duration=${d.id}`,
    })),
  }
}

// ─── FAQPage ─────────────────────────────────────────────────────────────────

/**
 * FAQPage schema.
 * Used on the homepage FAQ section.
 */
export function faqPageJsonLd(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: a,
      },
    })),
  }
}

// ─── BreadcrumbList ───────────────────────────────────────────────────────────

interface Crumb {
  name: string
  href: string
}

/**
 * BreadcrumbList schema for detail pages.
 * Usage: breadcrumbJsonLd([
 *   { name: 'Accueil', href: '/' },
 *   { name: 'Nos soins', href: '/prestations' },
 *   { name: 'L\'Instant des Sommets', href: '/prestations/summits' },
 * ])
 */
export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map(({ name, href }, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name,
      item: `${BASE_URL}${href}`,
    })),
  }
}
