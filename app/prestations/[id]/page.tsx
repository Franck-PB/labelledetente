import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SectionContainer } from '@/components/ui/SectionContainer'
import { Eyebrow, Body, Display } from '@/components/ui/Typography'
import { ButtonLink } from '@/components/ui/Button'
import { ImageBlock } from '@/components/ui/ImageBlock'
import { Badge } from '@/components/ui/Badge'
import { getAllExperiences, getExperienceById } from '@/lib/services'
import { getSiteConfig } from '@/lib/config'
import { serviceJsonLd, breadcrumbJsonLd } from '@/lib/jsonld'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  return getAllExperiences().map((e) => ({ id: e.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const exp = getExperienceById(id)
  if (!exp) return {}
  const image = exp.imageSrc ?? ''
  return {
    title: exp.name,
    description: exp.emotionalHook,
    openGraph: {
      title: `${exp.name} — Massage à domicile en Savoie`,
      description: exp.emotionalHook,
      url: `https://labelledetente.fr/prestations/${id}`,
      images: [{ url: image, width: 900, height: 675, alt: exp.name }],
    },
  }
}

// Images resolved from service config (exp.imageSrc)

export default async function ExperienceDetailPage({ params }: Props) {
  const { id } = await params
  const exp = getExperienceById(id)
  if (!exp) notFound()

  const siteConfig = getSiteConfig()
  const minPrice = Math.min(...exp.durations.map((d) => d.price))

  const crumbs = [
    { name: 'Accueil', href: '/' },
    { name: 'Nos soins', href: '/prestations' },
    { name: exp.name, href: `/prestations/${id}` },
  ]

  return (
    <>
      {/* JSON-LD — Service */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd(exp, siteConfig.brand.name)) }}
      />
      {/* JSON-LD — BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(crumbs)) }}
      />

      {/* Hero image + title overlay */}
      <section className="relative min-h-[70vh] flex flex-col justify-end bg-[var(--color-earth-900)]">
        <div className="absolute inset-0">
          <ImageBlock
            src={exp.imageSrc ?? ''}
            alt={exp.name}
            aspect="hero"
            radius="none"
            overlay="bottom"
            containerClassName="w-full h-full !aspect-auto absolute inset-0"
          />
        </div>
        <div className="relative z-[var(--z-raised)] px-[var(--page-gutter-mobile)] md:px-[var(--page-gutter-tablet)] pb-12 max-w-[var(--container-md)] mx-auto w-full">
          <Badge className="mb-4">Signature</Badge>
          <Display as="h1" italic className="text-[var(--color-white)] mb-4">{exp.name}</Display>
          <div className="flex items-center gap-4 text-[var(--color-cream-200)]">
            <span className="font-[family-name:var(--font-body)] text-[var(--text-sm)]">
              {exp.durations.map((d) => d.label).join(' · ')}
            </span>
            <span className="w-px h-4 bg-[var(--color-cream-200)]/40" />
            <span className="font-[family-name:var(--font-body)] text-[var(--text-sm)]">
              À partir de {minPrice}€
            </span>
          </div>
        </div>
      </section>

      {/* Body content */}
      <SectionContainer background="white" width="content">
        <div className="flex flex-col gap-10">

          <div>
            <Eyebrow className="mb-3">Le ressenti</Eyebrow>
            <Body size="lg" className="italic text-[var(--color-text-secondary)]">
              {exp.emotionalHook}
            </Body>
          </div>

          <div>
            <Eyebrow className="mb-4">Idéal pour…</Eyebrow>
            <ul className="flex flex-col gap-3">
              {exp.idealFor.map((item) => (
                <li key={item} className="flex items-start gap-4">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--color-accent-400)] flex-shrink-0" />
                  <Body>{item}</Body>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <Eyebrow className="mb-4">Votre moment</Eyebrow>
            <ol className="flex flex-col gap-3">
              {exp.flow.map((step, idx) => (
                <li key={step} className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[var(--color-badge-bg)] text-[var(--color-badge-text)] font-bold text-[var(--text-xs)] flex items-center justify-center font-[family-name:var(--font-body)]">
                    {idx + 1}
                  </span>
                  <Body className="pt-1">{step}</Body>
                </li>
              ))}
            </ol>
          </div>

        </div>
      </SectionContainer>

      {/* Durées + CTA */}
      <SectionContainer background="sand" width="content">
        <Eyebrow className="mb-4 text-center">Choisissez votre durée</Eyebrow>
        <div className="flex flex-col gap-3 max-w-sm mx-auto">
          {exp.durations.map((duration) => (
            <ButtonLink
              key={duration.id}
              href={`/reservation?experience=${exp.id}&duration=${duration.id}`}
              variant={duration.recommended ? 'primary' : 'outline'}
              size="lg"
              className="w-full justify-between"
            >
              <span>{duration.label}</span>
              <span className="font-[family-name:var(--font-display)] text-[var(--text-lg)] font-bold">
                {duration.price}€
              </span>
            </ButtonLink>
          ))}
        </div>
      </SectionContainer>
    </>
  )
}
