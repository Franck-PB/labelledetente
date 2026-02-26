import type { Metadata } from 'next'
import { SectionContainer } from '@/components/ui/SectionContainer'
import { Display, Heading, Eyebrow, Body } from '@/components/ui/Typography'
import { Badge } from '@/components/ui/Badge'
import { ButtonLink } from '@/components/ui/Button'
import { getZonesConfig, getSiteConfig } from '@/lib/config'

export const metadata: Metadata = {
  title: "Secteur d'intervention",
  description:
    'La Belle Détente intervient à domicile et en établissement en Maurienne, Savoie. Stations desservies : Les Menuires, Courchevel, La Toussuire…',
  openGraph: {
    title: "Secteur d'intervention — La Belle Détente",
    description:
      'La Belle Détente intervient à domicile et en établissement en Maurienne, Savoie. Stations desservies : Les Menuires, Courchevel, La Toussuire…',
    url: 'https://labelledetente.fr/zones',
  },
}

export default function ZonesPage() {
  const zones = getZonesConfig()
  const { brand } = getSiteConfig()

  return (
    <>
      <SectionContainer background="sand" width="content" className="pt-32 md:pt-40 text-center">
        <Eyebrow className="mb-4">Secteur d'intervention</Eyebrow>
        <Display as="h1" italic className="mb-6">
          Basée en {brand.baseAreaLabel}
        </Display>
        <Body size="lg" className="max-w-lg mx-auto text-[var(--color-text-secondary)]">
          {zones.copy.public}
        </Body>
      </SectionContainer>

      <SectionContainer background="white" width="content">
        <div className="text-center mb-10">
          <Eyebrow className="mb-3">Stations desservies</Eyebrow>
          <Heading level={2} italic>Là où vous séjournez</Heading>
        </div>
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {zones.seoLocations.map((loc) => (
            <Badge key={loc} className="text-sm px-4 py-2">
              {loc}
            </Badge>
          ))}
        </div>
        <Body muted className="text-center text-[var(--text-sm)]">
          Vous ne voyez pas votre zone ? Contactez-nous — nous étudions chaque demande.
        </Body>
      </SectionContainer>

      <SectionContainer background="cream" width="reading" className="text-center">
        <Body className="mb-6 text-[var(--color-text-secondary)]">
          Déplacement inclus dans le prix du soin, selon les zones couvertes.
        </Body>
        <ButtonLink href="/reservation" size="md" withArrow>
          Réserver un massage
        </ButtonLink>
      </SectionContainer>
    </>
  )
}
