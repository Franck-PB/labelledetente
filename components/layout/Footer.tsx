import Link from 'next/link'
import { BrandScript, Caption } from '@/components/ui/Typography'
import { getSiteConfig } from '@/lib/config'

const FOOTER_LINKS = [
  { href: '/a-propos', label: 'À propos' },
  { href: '/prestations', label: 'Nos soins' },
  { href: '/professionnels', label: 'Espace Professionnel' },
  { href: '/contact', label: 'Contact' },
]

const LEGAL_LINKS = [
  { href: '/mentions-legales', label: 'Mentions légales' },
  { href: '/politique-confidentialite', label: 'Confidentialité' },
]

export function Footer() {
  const { brand } = getSiteConfig()
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[var(--color-accent-700)] text-[var(--color-cream-50)]">
      <div className="mx-auto max-w-[var(--container-xl)] px-[var(--page-gutter-mobile)] md:px-[var(--page-gutter-tablet)] lg:px-[var(--page-gutter-desktop)] py-16">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">

          {/* Brand column */}
          <div className="flex flex-col gap-4">
            <BrandScript size="lg" className="text-[var(--color-cream-50)]">
              La Belle Détente
            </BrandScript>
            <Caption as="p" className="text-[var(--color-stone-400)] leading-relaxed max-w-xs">
              Massage professionnel à domicile, en résidence de vacances ou en hôtel.{' '}
              Prestations haut de gamme en {brand.publicLocality}.
            </Caption>

            {/* Contact */}
            <a
              href={`tel:${brand.phone}`}
              className="
                inline-flex items-center gap-2
                font-[family-name:var(--font-body)] text-[var(--text-sm)]
                text-[var(--color-cream-50)] hover:text-[var(--color-white)]
                transition-colors duration-[var(--duration-fast)]
              "
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 2h3l1 3-1.5 1.5a10 10 0 004 4L10 9l3 1v3a1 1 0 01-1 1C5.4 14 0 8.6 0 2a1 1 0 011-1h1z" fill="currentColor"/>
              </svg>
              {brand.phone.replace('+33', '0').replace(/(\d{2})(?=\d)/g, '$1 ').trim()}
            </a>
          </div>

          {/* Navigation column */}
          <div>
            <p className="label-eyebrow text-[var(--color-stone-400)] mb-5">Navigation</p>
            <ul className="flex flex-col gap-3">
              {FOOTER_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="
                      font-[family-name:var(--font-body)] text-[var(--text-sm)]
                      text-[var(--color-stone-400)] hover:text-[var(--color-cream-50)]
                      transition-colors duration-[var(--duration-fast)]
                    "
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Zone column */}
          <div>
            <p className="label-eyebrow text-[var(--color-stone-400)] mb-5">Secteur</p>
            <Caption as="p" className="text-[var(--color-stone-400)] leading-relaxed">
              Basée en {brand.baseAreaLabel}.<br />
              Déplacements à domicile et en établissements touristiques des vallées et stations.
            </Caption>
            <Link
              href="/zones"
              className="
                inline-block mt-4
                font-[family-name:var(--font-body)] text-[var(--text-xs)]
                tracking-[var(--tracking-wide)] uppercase
                text-[var(--color-accent-400)] hover:text-[var(--color-accent-300)]
                transition-colors duration-[var(--duration-fast)]
              "
            >
              Voir le secteur →
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-[var(--color-accent-600)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <Caption className="text-[var(--color-stone-500)]">
            © {year} {brand.name}. Tous droits réservés.
          </Caption>
          <div className="flex items-center gap-6">
            {LEGAL_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="
                  font-[family-name:var(--font-body)] text-[var(--text-xs)]
                  text-[var(--color-stone-500)] hover:text-[var(--color-stone-400)]
                  transition-colors duration-[var(--duration-fast)]
                "
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  )
}
