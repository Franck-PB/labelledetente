import type { Metadata } from 'next'
import { SectionContainer } from '@/components/ui/SectionContainer'
import { Display, Eyebrow, Body } from '@/components/ui/Typography'
import { getSiteConfig } from '@/lib/config'
import { ContactFormSection } from './ContactFormSection'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contactez La Belle Détente pour toute demande professionnelle ou renseignement sur nos prestations de massage à domicile en Savoie.',
  openGraph: {
    title: 'Contact — La Belle Détente',
    description:
      'Contactez La Belle Détente pour toute demande professionnelle ou renseignement sur nos prestations de massage à domicile en Savoie.',
    url: 'https://labelledetente.fr/contact',
  },
}

interface Props {
  searchParams: Promise<{ type?: string }>
}

export default async function ContactPage({ searchParams }: Props) {
  const { brand } = getSiteConfig()
  const params = await searchParams
  const initialType: 'individual' | 'pro' = params.type === 'pro' ? 'pro' : 'individual'

  return (
    <>
      <SectionContainer background="sand" width="reading" className="pt-32 md:pt-40 text-center">
        <Eyebrow className="mb-4">Nous écrire</Eyebrow>
        <Display as="h1" italic className="mb-6">Contact</Display>
        <Body size="lg" className="text-[var(--color-text-secondary)]">
          Pour toute demande professionnelle ou question, nous vous répondons dans les meilleurs délais.
        </Body>
      </SectionContainer>

      <SectionContainer background="white" width="reading">
        {/* Phone */}
        <div className="flex flex-col gap-2 mb-10 pb-10 border-b border-[var(--color-linen-200)]">
          <Eyebrow className="mb-1">Par téléphone</Eyebrow>
          <a
            href={`tel:${brand.phone}`}
            className="
              font-[family-name:var(--font-display)] text-[var(--text-2xl)] italic
              text-[var(--color-accent-600)] hover:text-[var(--color-accent-700)]
              transition-colors duration-[var(--duration-fast)]
            "
          >
            {brand.phone.replace('+33', '0').replace(/(\d{2})(?=\d)/g, '$1 ').trim()}
          </a>
          <Body size="sm" muted>Du lundi au samedi, 9h–19h</Body>
        </div>

        {/* Contact forms */}
        <div>
          <Eyebrow className="mb-6">Par formulaire</Eyebrow>
          <ContactFormSection initialType={initialType} />
        </div>
      </SectionContainer>
    </>
  )
}
