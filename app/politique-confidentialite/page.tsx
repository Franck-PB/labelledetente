import type { Metadata } from 'next'
import { SectionContainer } from '@/components/ui/SectionContainer'
import { Display, Heading, Eyebrow, Body } from '@/components/ui/Typography'

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  robots: { index: false },
}

export default function PolitiqueConfidentialitePage() {
  return (
    <SectionContainer background="white" width="reading" className="pt-32 md:pt-40">
      <Eyebrow className="mb-4">Données personnelles</Eyebrow>
      <Display as="h1" italic className="mb-10">Politique de confidentialité</Display>

      <div className="flex flex-col gap-8">
        <div>
          <Heading level={2} className="mb-3">Collecte des données</Heading>
          <Body className="text-[var(--color-text-secondary)]">
            Ce site collecte uniquement les données que vous nous transmettez volontairement
            via le formulaire de contact (nom, email, message). Aucune donnée n'est collectée
            sans votre consentement explicite.
          </Body>
        </div>

        <div>
          <Heading level={2} className="mb-3">Cookies et analytics</Heading>
          <Body className="text-[var(--color-text-secondary)]">
            Ce site utilise Plausible Analytics, un outil respectueux de la vie privée
            qui ne dépose aucun cookie et ne collecte aucune donnée personnelle identifiable.
            Aucun consentement préalable n'est requis.
          </Body>
        </div>

        <div>
          <Heading level={2} className="mb-3">Vos droits</Heading>
          <Body className="text-[var(--color-text-secondary)]">
            Conformément au RGPD (Règlement Général sur la Protection des Données),
            vous disposez d'un droit d'accès, de rectification, de portabilité et d'effacement
            de vos données. Pour exercer ces droits, contactez-nous via la page Contact.
          </Body>
        </div>

        <div>
          <Heading level={2} className="mb-3">Hébergement des données</Heading>
          <Body className="text-[var(--color-text-secondary)]">
            Les données transmises via le formulaire de contact sont traitées par notre
            prestataire d'envoi d'emails. Elles ne sont jamais revendues ni transmises
            à des tiers à des fins commerciales.
          </Body>
        </div>
      </div>
    </SectionContainer>
  )
}
