import type { Metadata } from 'next'
import { SectionContainer } from '@/components/ui/SectionContainer'
import { Display, Heading, Eyebrow, Body } from '@/components/ui/Typography'
import { ImageBlock } from '@/components/ui/ImageBlock'
import { ButtonLink } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'À propos',
  description:
    'La Belle Détente — une praticienne passionnée, basée en Maurienne, Savoie, qui apporte son expertise spa directement chez vous.',
  openGraph: {
    title: 'À propos — La Belle Détente',
    description:
      'La Belle Détente — une praticienne passionnée, basée en Maurienne, Savoie, qui apporte son expertise spa directement chez vous.',
    url: 'https://labelledetente.fr/a-propos',
  },
}

export default function AProposPage() {
  return (
    <>
      <SectionContainer background="sand" width="wide" className="pt-32 md:pt-40">
        <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-center">
          <div className="w-full md:w-1/2">
            <ImageBlock
              src="/images/service-facial.jpg"
              alt="Soin du visage — La Belle Détente"
              aspect="portrait"
              radius="2xl"
            />
          </div>
          <div className="w-full md:w-1/2 flex flex-col gap-6">
            <Eyebrow>Notre histoire</Eyebrow>
            <Display as="h1" italic>La Belle Détente</Display>
            <Body size="lg" className="italic text-[var(--color-text-secondary)]">
              Une praticienne passionnée, basée en cœur de Maurienne.
            </Body>
            <Body className="text-[var(--color-text-secondary)]">
              La Belle Détente est née d'une conviction : que le soin de qualité ne devrait
              pas exiger un déplacement. Formée en établissements spa haut de gamme,
              la praticienne apporte son expertise directement chez vous — dans votre maison,
              votre résidence de vacances, ou votre établissement.
            </Body>
            <Body className="text-[var(--color-text-secondary)]">
              Chaque intervention est préparée avec soin : matériel professionnel, huiles
              biologiques, linge de qualité. Votre confort et votre tranquillité sont la
              priorité absolue.
            </Body>
          </div>
        </div>
      </SectionContainer>

      <SectionContainer background="white" width="content">
        <div className="text-center mb-10">
          <Eyebrow className="mb-3">Valeurs</Eyebrow>
          <Heading level={2} italic>Ce qui nous guide</Heading>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {[
            { v: 'Excellence', t: 'Des techniques apprises en spa haut de gamme, appliquées avec précision.' },
            { v: 'Discrétion', t: 'Votre espace, votre intimité. Chaque intervention est silencieuse et respectueuse.' },
            { v: 'Authenticité', t: "Un service humain, personnalisé, sans scripts — juste de l'attention." },
          ].map(({ v, t }) => (
            <div key={v} className="flex flex-col gap-3">
              <Heading level={3} italic>{v}</Heading>
              <Body muted>{t}</Body>
            </div>
          ))}
        </div>
      </SectionContainer>

      <SectionContainer background="sand" width="reading" className="text-center">
        <Body size="lg" className="mb-8 text-[var(--color-text-secondary)]">
          Envie de nous rencontrer ou de poser une question ?
        </Body>
        <ButtonLink href="/contact" variant="outline" size="md" withArrow>
          Nous contacter
        </ButtonLink>
      </SectionContainer>
    </>
  )
}
