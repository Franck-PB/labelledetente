'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BrandScript } from '@/components/ui/Typography'
import { ButtonLink } from '@/components/ui/Button'

const NAV_LINKS = [
  { href: '/prestations', label: 'Nos soins' },
  { href: '/professionnels', label: 'Professionnels' },
  { href: '/zones', label: 'Secteur' },
  { href: '/a-propos', label: 'À propos' },
  { href: '/contact', label: 'Contact' },
]

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => { setMenuOpen(false) }, [pathname])

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-[var(--z-sticky)] bg-[var(--color-cream-50)] border-b border-[var(--color-linen-200)] shadow-[var(--shadow-soft)]">
        <div className="mx-auto max-w-[var(--container-xl)] px-[var(--page-gutter-mobile)] md:px-[var(--page-gutter-tablet)] lg:px-[var(--page-gutter-desktop)]">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* Logo */}
            <Link
              href="/"
              className="flex flex-col leading-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-500)] rounded-sm"
              aria-label="La Belle Détente — Accueil"
            >
              <BrandScript size="md" className="text-[var(--color-earth-900)]">
                La Belle Détente
              </BrandScript>
              <span className="font-[family-name:var(--font-body)] text-[0.6rem] tracking-[var(--tracking-widest)] uppercase text-[var(--color-stone-500)]">
                Savoie
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8" aria-label="Navigation principale">
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`
                    font-[family-name:var(--font-body)]
                    text-[var(--fs-nav)]
                    transition-colors duration-[var(--duration-fast)]
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-500)] rounded-sm
                    ${pathname === href
                      ? 'text-[var(--color-accent-600)]'
                      : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                    }
                  `}
                >
                  {label}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:block">
              <ButtonLink href="/reservation" size="sm" withArrow>
                Réserver
              </ButtonLink>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden flex flex-col gap-1.5 p-2 rounded-[var(--radius-sm)] transition-colors duration-[var(--duration-fast)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-500)] text-[var(--color-earth-900)]"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              <span className={`block w-6 h-0.5 bg-current transition-all duration-[var(--duration-base)] ${menuOpen ? 'translate-y-2 rotate-45' : ''}`} />
              <span className={`block w-6 h-0.5 bg-current transition-all duration-[var(--duration-base)] ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-6 h-0.5 bg-current transition-all duration-[var(--duration-base)] ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
            </button>

          </div>
        </div>
      </header>

      {/* Mobile menu drawer */}
      <div
        className={`
          fixed inset-0 z-[var(--z-overlay)] md:hidden
          transition-opacity duration-[var(--duration-base)]
          ${menuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}
        `}
        aria-hidden={!menuOpen}
      >
        <div
          className="absolute inset-0 bg-[var(--color-earth-900)]/40 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />
        <nav
          className={`
            absolute top-0 right-0 h-full w-72
            bg-[var(--color-cream-50)]
            flex flex-col
            transition-transform duration-[var(--duration-base)] ease-[var(--ease-smooth)]
            ${menuOpen ? 'translate-x-0' : 'translate-x-full'}
          `}
          aria-label="Menu mobile"
        >
          <div className="flex items-center justify-between px-6 h-16 border-b border-[var(--color-linen-200)]">
            <BrandScript size="md" className="text-[var(--color-earth-900)]">
              La Belle Détente
            </BrandScript>
            <button
              onClick={() => setMenuOpen(false)}
              className="p-2 text-[var(--color-stone-600)] hover:text-[var(--color-earth-900)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-500)] rounded-sm"
              aria-label="Fermer le menu"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <ul className="flex flex-col px-6 py-8 gap-1 flex-1">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`
                    block py-3 px-2
                    font-[family-name:var(--font-display)] text-[var(--text-xl)] italic
                    border-b border-[var(--color-linen-200)]
                    transition-colors duration-[var(--duration-fast)]
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-500)] rounded-sm
                    ${pathname === href ? 'text-[var(--color-accent-600)]' : 'text-[var(--color-earth-900)] hover:text-[var(--color-accent-600)]'}
                  `}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="px-6 pb-8">
            <ButtonLink href="/reservation" size="md" withArrow className="w-full justify-center">
              Réserver un massage
            </ButtonLink>
          </div>
        </nav>
      </div>
    </>
  )
}
