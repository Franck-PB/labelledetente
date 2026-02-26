import { Suspense } from 'react'
import { SectionContainer } from '@/components/ui/SectionContainer'
import { Body } from '@/components/ui/Typography'
import { ReservationContent } from './ReservationContent'

export const metadata = {
  title: 'Réservation',
  description: 'Choisissez votre expérience et réservez votre massage à domicile en Savoie.',
  robots: { index: false },
}

function ReservationLoading() {
  return (
    <SectionContainer background="cream" width="content" className="pt-28">
      <div className="flex flex-col gap-6 animate-pulse">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-[var(--color-sand-100)] rounded-[var(--radius-xl)] h-48" />
        ))}
      </div>
    </SectionContainer>
  )
}

export default function ReservationPage() {
  return (
    <>
      {/* Progress bar — static shell */}
      <div className="fixed top-0 inset-x-0 z-[var(--z-sticky)] bg-[var(--color-cream-50)] border-b border-[var(--color-linen-200)]">
        <div className="mx-auto max-w-[var(--container-md)] px-[var(--page-gutter-mobile)] h-16 flex items-center justify-between">
          <Body size="sm" className="label-eyebrow">Étape 1/2</Body>
          <span className="label-eyebrow text-[var(--color-accent-600)]">Expérience</span>
        </div>
        <div className="h-0.5 bg-[var(--color-linen-200)]">
          <div className="h-full w-1/2 bg-[var(--color-accent-500)]" />
        </div>
      </div>

      <Suspense fallback={<ReservationLoading />}>
        <ReservationContent />
      </Suspense>
    </>
  )
}
