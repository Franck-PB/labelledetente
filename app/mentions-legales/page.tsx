import type { Metadata } from 'next'
import { SectionContainer } from '@/components/ui/SectionContainer'
import { Display, Heading, Eyebrow, Body } from '@/components/ui/Typography'
import { getSiteConfig } from '@/lib/config'

export const metadata: Metadata = {
  title: 'Mentions légales',
  robots: { index: false },
}

export default function MentionsLegalesPage() {
  const { brand } = getSiteConfig()

  return (
    <SectionContainer background="white" width="reading" className="pt-32 md:pt-40">
      <Eyebrow className="mb-4">Informations légales</Eyebrow>
      <Display as="h1" italic className="mb-10">Mentions légales</Display>

      <div className="flex flex-col gap-8">
        <div>
          <Heading level={2} className="mb-3">Éditeur du site</Heading>
          <Body className="text-[var(--color-text-secondary)]">
            {brand.name}<br />
            {brand.legalAddress}<br />
            {brand.phone}
          </Body>
        </div>

        <div>
          <Heading level={2} className="mb-3">Hébergement</Heading>
          <Body className="text-[var(--color-text-secondary)]">
            Vercel Inc.<br />
            440 N Barranca Ave #4133, Covina, CA 91723, USA
          </Body>
        </div>

        <div>
          <Heading level={2} className="mb-3">Propriété intellectuelle</Heading>
          <Body className="text-[var(--color-text-secondary)]">
            L'ensemble des contenus présents sur ce site (textes, images, éléments graphiques)
            sont la propriété exclusive de {brand.name}, sauf mention contraire.
            Toute reproduction est interdite sans autorisation préalable.
          </Body>
        </div>

        <div>
          <Heading level={2} className="mb-3">Données personnelles</Heading>
          <Body className="text-[var(--color-text-secondary)]">
            Les données collectées via le formulaire de contact sont utilisées uniquement
            pour répondre à vos demandes. Aucune donnée n'est transmise à des tiers.
            Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression.
          </Body>
        </div>
      </div>
    </SectionContainer>
  )
}
