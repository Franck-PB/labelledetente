import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SectionContainer } from '@/components/ui/SectionContainer'
import { Heading, Eyebrow, Body, BrandScript } from '@/components/ui/Typography'
import { CalEmbed } from '@/components/ui/CalEmbed'
import {
  getDurationById,
  getExperienceByDurationId,
  getBookingCalLink,
} from '@/lib/services'

interface Props {
  params: Promise<{ serviceId: string }>
}

export const metadata: Metadata = {
  title: 'Réservation — Choisissez un créneau',
  robots: { index: false },
}

export default async function BookingEmbedPage({ params }: Props) {
  const { serviceId } = await params
  const duration = getDurationById(serviceId)
  const experience = getExperienceByDurationId(serviceId)

  if (!duration || !experience) notFound()

  const calLink = getBookingCalLink(serviceId)

  return (
    <>
      {/* Progress bar — step 2/2 */}
      <div className="fixed top-0 inset-x-0 z-[var(--z-sticky)] bg-[var(--color-cream-50)] border-b border-[var(--color-linen-200)]">
        <div className="mx-auto max-w-[var(--container-md)] px-[var(--page-gutter-mobile)] h-16 flex items-center justify-between">
          <Link
            href="/"
            className="font-[family-name:var(--font-brand)] text-[var(--color-earth-900)] hover:text-[var(--color-accent-600)] transition-colors"
            style={{ fontSize: 'var(--fs-brand-nav)' }}
          >
            La Belle Détente
          </Link>
          <span className="label-eyebrow text-[var(--color-accent-600)]">Étape 2 / 2</span>
        </div>
        {/* Full progress fill */}
        <div className="h-0.5 bg-[var(--color-linen-200)]">
          <div className="h-full w-full bg-[var(--color-accent-500)] transition-all" />
        </div>
      </div>

      <SectionContainer background="cream" width="content" className="pt-28 pb-16">

        {/* Booking summary card */}
        <div className="bg-[var(--color-surface)] rounded-[var(--radius-xl)] p-5 md:p-6 mb-8 border border-[var(--color-linen-200)] shadow-[var(--shadow-soft)]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <Eyebrow className="mb-1">Votre choix</Eyebrow>
              <Heading level={3}>{experience.name}</Heading>
              <Body size="sm" muted className="mt-1">{duration.label}</Body>
            </div>
            <div className="text-right flex-shrink-0">
              <span className="font-[family-name:var(--font-display)] text-[var(--text-3xl)] font-bold text-[var(--color-accent-600)]">
                {duration.price}&nbsp;€
              </span>
            </div>
          </div>
        </div>

        {/* Calendar section */}
        <div>
          <div className="text-center mb-6">
            <BrandScript size="md" className="block mb-1">
              Choisissez votre créneau
            </BrandScript>
            <Body size="sm" muted>
              Sélectionnez une date et une heure disponibles.
            </Body>
          </div>

          {/* Cal.com inline embed */}
          <div className="
            rounded-[var(--radius-xl)] overflow-hidden
            border border-[var(--color-linen-200)]
            shadow-[var(--shadow-card)]
            bg-[var(--color-surface)]
          ">
            <CalEmbed calLink={calLink} minHeight={650} />
          </div>

          {/* Direct link fallback (accessible, always visible) */}
          <p className="mt-4 text-center">
            <Body size="sm" muted as="span">
              Problème d'affichage ?{' '}
            </Body>
            <a
              href={`https://cal.com/${calLink}`}
              target="_blank"
              rel="noopener noreferrer"
              className="
                font-[family-name:var(--font-body)] text-[var(--text-sm)]
                text-[var(--color-accent-600)] hover:text-[var(--color-accent-700)]
                underline underline-offset-2 transition-colors duration-[var(--duration-fast)]
              "
            >
              Ouvrir dans Cal.com →
            </a>
          </p>
        </div>

      </SectionContainer>
    </>
  )
}
