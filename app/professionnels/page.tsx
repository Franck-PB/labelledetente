import type { Metadata } from 'next'
import { SectionContainer } from '@/components/ui/SectionContainer'
import { Display, Heading, Eyebrow, Body } from '@/components/ui/Typography'
import { ButtonLink } from '@/components/ui/Button'
import { ImageBlock } from '@/components/ui/ImageBlock'
import { ProContactForm } from '@/components/ui/ProContactForm'
import { isSectionEnabled, getSiteConfig } from '@/lib/config'

export const metadata: Metadata = {
  title: 'Espace Professionnel',
  description:
    'Service bien-être clé en main pour hôtels, résidences et EHPAD en Maurienne et Savoie. Gestion allégée, matériel fourni.',
  openGraph: {
    title: 'Espace Professionnel — La Belle Détente',
    description:
      'Service bien-être clé en main pour hôtels, résidences et EHPAD en Maurienne et Savoie. Gestion allégée, matériel fourni.',
    url: 'https://labelledetente.fr/professionnels',
  },
}

const BENEFITS = [
  {
    icon: '◇',
    title: 'Gestion allégée',
    body: 'Vous gérez librement la prise de rendez-vous de vos clients sur le créneau convenu, nous apportons le matériel et l\'expertise. Vous récoltez les retours positifs.',
  },
  {
    icon: '◇',
    title: 'Service Clé en Main',
    body: "Élodie arrive avec tout l'équipement nécessaire : table chauffante, huiles bio, linge de luxe. Aucune logistique à prévoir.",
  },
  {
    icon: '◇',
    title: 'Valeur Ajoutée',
    body: "Augmentez la satisfaction client et le prestige de votre établissement avec une offre bien-être haut de gamme.",
  },
]

export default function ProfessionnelsPage() {
  const showEhpad = isSectionEnabled('ehpad')
  const siteConfig = getSiteConfig()

  return (
    <>
      {/* Hero */}
      <SectionContainer background="sand" width="wide" className="pt-32 md:pt-40">
        <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-center">
          <div className="w-full md:w-1/2 flex flex-col gap-6">
            <Eyebrow>Espace partenaires</Eyebrow>
            <Display as="h1" italic>
              Sublimez<br />l'expérience<br />de vos hôtes
            </Display>
            <Body size="lg" className="text-[var(--color-text-secondary)]">
              Offrez à votre clientèle un service de bien-être d'exception, directement
              dans le confort de votre établissement.
            </Body>
            <ButtonLink href="#partenariat" size="lg" withArrow className="self-start">
              Nous écrire
            </ButtonLink>
          </div>
          <div className="w-full md:w-1/2">
            <ImageBlock
              src={siteConfig.images?.sectionPro ?? '/images/section-pro.jpg'}
              alt="Partenariat professionnel — La Belle Détente"
              aspect="landscape"
              radius="2xl"
            />
          </div>
        </div>
      </SectionContainer>

      {/* Benefits */}
      <SectionContainer background="white" width="wide">
        <div className="text-center mb-12">
          <Eyebrow className="mb-3">Ce que nous apportons</Eyebrow>
          <Heading level={2} italic>Un partenariat sans contrainte</Heading>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BENEFITS.map((b) => (
            <div
              key={b.title}
              className="
                flex flex-col items-center text-center gap-4 p-6
                bg-[var(--color-cream-100)] rounded-[var(--radius-xl)]
                transition-all duration-300 ease-out
                hover:-translate-y-1.5 hover:shadow-[var(--shadow-elevated)]
              "
            >
              <span className="text-[var(--color-accent-400)] text-xl" aria-hidden="true">{b.icon}</span>
              <Heading level={3}>{b.title}</Heading>
              <Body muted>{b.body}</Body>
            </div>
          ))}
        </div>
      </SectionContainer>

      {/* Hôtels section */}
      <SectionContainer background="cream" width="content">
        <div className="text-center mb-10">
          <Eyebrow className="mb-3">Hôtellerie & résidences</Eyebrow>
          <Heading level={2} italic>Une expertise dédiée à l'hôtellerie de luxe</Heading>
        </div>
        <Body size="lg" className="text-center text-[var(--color-text-secondary)] mb-8 max-w-lg mx-auto">
          La Belle Détente collabore avec les plus prestigieux chalets et hôtels de Savoie.
          Élodie vous fait profiter de son expérience acquise dans les plus grands établissements.
        </Body>

        {/* Stats */}
        <div className="flex justify-center gap-16 mb-10">
          <div className="text-center">
            <p className="font-[family-name:var(--font-display)] text-[var(--fs-h1)] font-bold text-[var(--color-earth-900)]">5</p>
            <span className="label-eyebrow">Partenaires</span>
          </div>
          <div className="text-center">
            <p className="font-[family-name:var(--font-display)] text-[var(--fs-h1)] font-bold text-[var(--color-earth-900)]">5/5</p>
            <span className="label-eyebrow">Satisfaction</span>
          </div>
        </div>

        {/* Modalités */}
        <div className="flex flex-col gap-3">
          {[
            'Créneaux organisés sur place',
            'Matériel entièrement fourni',
            'Planning simple géré par la praticienne',
            "Conditions définies lors d'un échange",
          ].map((item) => (
            <div key={item} className="flex items-center gap-3 py-3 border-b border-[var(--color-linen-200)] last:border-none">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-400)] flex-shrink-0" aria-hidden="true" />
              <Body>{item}</Body>
            </div>
          ))}
        </div>
      </SectionContainer>

      {/* EHPAD section */}
      {showEhpad && (
        <SectionContainer background="white" width="content">
          <div className="text-center mb-10">
            <Eyebrow className="mb-3">EHPAD & établissements de soin</Eyebrow>
            <Heading level={2} italic>Un accompagnement respectueux et discret</Heading>
          </div>
          <Body size="lg" className="text-center text-[var(--color-text-secondary)] mb-8 max-w-lg mx-auto">
            Apporter confort et apaisement dans un cadre respectueux, discret, et adapté au
            rythme de chaque résident.
          </Body>
          <div className="flex flex-col gap-3 max-w-sm mx-auto">
            {[
              "Organisation adaptée au rythme de l'établissement",
              "Échanges en amont avec l'équipe encadrante",
              'Techniques douces et adaptées',
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 py-3 border-b border-[var(--color-linen-200)] last:border-none">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-400)] flex-shrink-0" aria-hidden="true" />
                <Body>{item}</Body>
              </div>
            ))}
          </div>
        </SectionContainer>
      )}

      {/* Contact form — pro mode, no switcher */}
      <SectionContainer background="sand" width="content" id="partenariat">
        <div className="text-center mb-10">
          <Eyebrow className="mb-3">Démarrer la conversation</Eyebrow>
          <Heading level={2} italic>Écrivez-nous</Heading>
          <Body className="mt-4 text-[var(--color-text-secondary)] max-w-md mx-auto">
            Décrivez votre projet. Nous revenons vers vous sous 48h.
          </Body>
        </div>
        <ProContactForm />
      </SectionContainer>
    </>
  )
}
