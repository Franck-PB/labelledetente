import type { Metadata } from 'next'
import { SectionContainer } from '@/components/ui/SectionContainer'
import { Heading, BrandScript, Eyebrow, Body } from '@/components/ui/Typography'
import { ButtonLink } from '@/components/ui/Button'
import { ImageBlock } from '@/components/ui/ImageBlock'
import { ExperienceCard } from '@/components/ui/ExperienceCard'
import { Divider } from '@/components/ui/Divider'
import { getAllExperiences, getMinPrice } from '@/lib/services'
import { isSectionEnabled, getSiteConfig, getZonesConfig, getHomeConfig, getFaqItems } from '@/lib/config'
import { localBusinessJsonLd, faqPageJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Massage à domicile en Savoie — La Belle Détente',
  description:
    "Massage professionnel à domicile, en résidence ou en hôtel. L'expérience spa haut de gamme, chez vous, en Maurienne et Savoie.",
  openGraph: {
    title: 'Massage à domicile en Savoie — La Belle Détente',
    description:
      "Massage professionnel à domicile, en résidence ou en hôtel. L'expérience spa haut de gamme, chez vous, en Maurienne et Savoie.",
    url: 'https://labelledetente.fr',
  },
}

export default function HomePage() {
  const experiences = getAllExperiences()
  const showFaq = isSectionEnabled('faq')
  const siteConfig = getSiteConfig()
  const zonesConfig = getZonesConfig()
  const homeConfig = getHomeConfig()
  const faqItems = getFaqItems()

  return (
    <>
      {/* JSON-LD — LocalBusiness (always) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd(siteConfig, zonesConfig)) }}
      />

      {/* JSON-LD — FAQPage (conditional on site.config toggle) */}
      {showFaq && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd(faqItems)) }}
        />
      )}

      {/* ── 1. HERO ─────────────────────────────────────────────────── */}
      <section className="relative min-h-[62vh] md:min-h-[70vh] flex flex-col bg-[var(--color-earth-900)]" aria-label="Introduction">
        {/* Background image */}
        <div className="absolute inset-0">
          <ImageBlock
            src={siteConfig.images?.hero ?? '/images/hero-setup.jpg'}
            alt="Massage à domicile — La Belle Détente, Savoie"
            aspect="hero"
            radius="none"
            overlay="none"
            className="object-[center_35%]"
            containerClassName="w-full h-full !aspect-auto absolute inset-0"
          />
          {/* Flat overlay — base darkness for text readability on any image */}
          <div className="absolute inset-0 bg-black/45 pointer-events-none" />
          {/* Atmospheric gradient — depth from top, preserves image at base */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent pointer-events-none" />
        </div>

        {/* Brand mark — upper hero area, below cream header */}
        <div className="relative z-[var(--z-raised)] pt-20 md:pt-24 flex justify-center">
          <p
            className="font-[family-name:var(--font-brand)] text-[var(--color-cream-50)] text-center"
            style={{
              fontSize: 'var(--fs-brand-hero)',
              padding: '0.05em 0.5em 0.2em',
              textShadow: '0 2px 12px rgba(0,0,0,0.45)',
            }}
            aria-hidden="true"
          >
            La Belle Détente
          </p>
        </div>

        {/* Spacer — pushes text block to bottom */}
        <div className="flex-1" />

        {/* Text + CTA block — bottom of hero, intentionally compact */}
        <div className="relative z-[var(--z-raised)] pb-12 md:pb-20 px-[var(--page-gutter-mobile)] md:px-[var(--page-gutter-tablet)] lg:px-[var(--page-gutter-desktop)] max-w-[var(--container-lg)] mx-auto w-full">
          {/* Subtitle — taille proche des boutons, subordinate à la signature */}
          <h1
            className="font-[family-name:var(--font-display)] italic text-[var(--color-cream-100)] drop-shadow-sm mb-3"
            style={{ fontSize: 'var(--fs-body)', lineHeight: 'var(--leading-snug)' }}
          >
            {homeConfig.hero.subtitle}
          </h1>
          {/* Description — encore plus discrète */}
          <p
            className="font-[family-name:var(--font-body)] text-[var(--color-cream-200)] mb-6 max-w-sm"
            style={{ fontSize: 'var(--fs-body-sm)', lineHeight: 'var(--leading-relaxed)' }}
          >
            {homeConfig.hero.description}
          </p>

          {/* Micro-preuves */}
          <ul className="flex flex-col sm:flex-row flex-wrap gap-x-6 gap-y-1.5 mb-8">
            {homeConfig.hero.proofs.map((p) => (
              <li key={p.label} className="flex items-center gap-2">
                <span className="text-[var(--color-cream-200)] text-xs" aria-hidden="true">{p.icon}</span>
                <span
                  className="font-[family-name:var(--font-body)] text-[var(--color-cream-200)]"
                  style={{ fontSize: 'var(--fs-body-sm)' }}
                >
                  {p.label}
                </span>
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row gap-4">
            <ButtonLink href="/reservation" size="lg" withArrow>
              Réserver un massage
            </ButtonLink>
            <ButtonLink
              href="/professionnels"
              variant="outline"
              size="lg"
              className="border-white/70 text-[var(--color-cream-50)] bg-white/15 hover:bg-white/25"
            >
              Espace professionnel
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* ── 2. INTRO ────────────────────────────────────────────────── */}
      <SectionContainer background="white" width="reading" className="text-center">
        <Eyebrow className="mb-4">{homeConfig.intro.eyebrow}</Eyebrow>
        <Heading level={2} italic className="mb-6">
          {homeConfig.intro.heading}
        </Heading>
        <Body size="lg" className="text-[var(--color-text-secondary)]">
          {homeConfig.intro.body}
        </Body>
      </SectionContainer>

      <Divider ornament className="max-w-[var(--container-md)] mx-auto" />

      {/* ── 3. SERVICES NARRATIFS ───────────────────────────────────── */}
      <SectionContainer background="cream" width="wide">
        <div className="flex flex-col gap-10">
          {experiences.map((exp, i) => {
            const minPrice = getMinPrice(exp.id)
            const isEven = i % 2 === 0
            return (
              <article
                key={exp.id}
                className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-12 md:items-center`}
              >
                <div className="w-full md:w-2/5">
                  <ImageBlock
                    src={exp.imageSrc ?? siteConfig.images?.hero ?? ''}
                    alt={exp.name}
                    aspect="landscape"
                    radius="2xl"
                  />
                </div>
                <div className="w-full md:w-3/5 flex flex-col gap-4 text-center md:text-left">
                  <Heading level={2} italic>{exp.name}</Heading>
                  <Body size="lg" className="italic text-[var(--color-text-secondary)]">
                    {exp.emotionalHook}
                  </Body>
                  <ul className="flex flex-col gap-2">
                    {exp.idealFor.map((item) => (
                      <li key={item} className="flex items-center justify-center md:justify-start gap-3">
                        <span className="w-1 h-1 rounded-full bg-[var(--color-accent-400)] flex-shrink-0" aria-hidden="true" />
                        <Body size="sm">{item}</Body>
                      </li>
                    ))}
                  </ul>
                  {minPrice !== null && (
                    <p className="font-[family-name:var(--font-display)] text-[var(--color-stone-500)]" style={{ fontSize: 'var(--fs-body-sm)' }}>
                      À partir de{' '}
                      <span className="font-bold text-[var(--color-accent-600)]" style={{ fontSize: 'var(--fs-h3)' }}>
                        {minPrice}€
                      </span>
                    </p>
                  )}
                </div>
              </article>
            )
          })}
        </div>
      </SectionContainer>

      {/* ── 4. SERVICES APERÇU ──────────────────────────────────────── */}
      <SectionContainer background="white" width="wide">
        <div className="text-center mb-12">
          <Eyebrow className="mb-3">Nos rituels</Eyebrow>
          <Heading level={2} italic>Choisissez votre expérience</Heading>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiences.map((exp, i) => (
            <ExperienceCard
              key={exp.id}
              id={exp.id}
              name={exp.name}
              tagline={exp.tagline}
              emotionalHook={exp.emotionalHook}
              durations={exp.durations}
              variant="navigate"
              featured={i === 0}
              imageSrc={exp.imageSrc}
              imageAlt={exp.name}
            />
          ))}
        </div>

        <div className="mt-10 text-center">
          <ButtonLink href="/prestations" variant="outline" size="md" withArrow>
            Voir tous nos soins
          </ButtonLink>
        </div>
      </SectionContainer>

      {/* ── 5. PREUVES PREMIUM ──────────────────────────────────────── */}
      <SectionContainer background="sand" width="wide">
        <div className="text-center mb-12">
          <Eyebrow className="mb-3">Nos engagements</Eyebrow>
          <Heading level={2} italic>L'excellence à chaque détail</Heading>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {homeConfig.premium.map((p) => (
            <div key={p.title} className="flex flex-col gap-3 text-center">
              <span className="mx-auto text-[var(--color-accent-400)] text-2xl" aria-hidden="true">✦</span>
              <Heading level={3}>{p.title}</Heading>
              <Body muted>{p.body}</Body>
            </div>
          ))}
        </div>
      </SectionContainer>

      {/* ── 6. SECTION PROFESSIONNELS ───────────────────────────────── */}
      <SectionContainer background="accent" width="wide" className="overflow-hidden">
        <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-center">
          <div className="w-full md:w-1/2 flex flex-col gap-6">
            <Eyebrow className="text-[var(--color-earth-700)]">Espace partenaires</Eyebrow>
            <Heading level={2} italic className="text-[var(--color-earth-900)]">
              Sublimez l'expérience de vos hôtes
            </Heading>
            <Body size="lg" className="text-[var(--color-earth-800)]">
              Offrez à votre clientèle un service de bien-être d'exception, directement dans
              le confort de votre établissement. Zéro gestion, service clé en main.
            </Body>
            <div className="flex gap-10 mt-2">
              <div>
                <p className="font-[family-name:var(--font-display)] font-bold text-[var(--color-earth-900)]" style={{ fontSize: 'var(--fs-h2)' }}>5</p>
                <span className="label-eyebrow text-[var(--color-earth-700)]">Partenaires</span>
              </div>
              <div>
                <p className="font-[family-name:var(--font-display)] font-bold text-[var(--color-earth-900)]" style={{ fontSize: 'var(--fs-h2)' }}>5/5</p>
                <span className="label-eyebrow text-[var(--color-earth-700)]">Satisfaction</span>
              </div>
            </div>
            <ButtonLink href="/professionnels" variant="outline" size="md" withArrow className="w-full sm:w-auto self-start border-[var(--color-earth-900)] text-[var(--color-earth-900)] hover:bg-[var(--color-earth-900)]/10">
              Devenir partenaire
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

      {/* ── 7. ZONES D'INTERVENTION ─────────────────────────────────── */}
      <SectionContainer background="cream" width="content" className="text-center">
        <Eyebrow className="mb-4">Secteur d'intervention</Eyebrow>
        <Heading level={2} italic className="mb-6">
          Basée en Maurienne, Savoie
        </Heading>
        <Body className="mb-6 text-[var(--color-text-secondary)] max-w-lg mx-auto">
          {zonesConfig.copy.public}
        </Body>
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {zonesConfig.seoLocations.map((zone) => (
            <span key={zone} className="badge">{zone}</span>
          ))}
        </div>
        <ButtonLink href="/zones" variant="ghost" size="sm" withArrow>
          Voir tous les secteurs
        </ButtonLink>
      </SectionContainer>

      {/* ── 8. FAQ COURTE ───────────────────────────────────────────── */}
      {showFaq && (
        <SectionContainer background="white" width="content">
          <div className="text-center mb-10">
            <Eyebrow className="mb-3">Questions fréquentes</Eyebrow>
            <Heading level={2} italic>Ce que vous souhaitez savoir</Heading>
          </div>
          <div className="flex flex-col divide-y divide-[var(--color-linen-200)]">
            {faqItems.map(({ q, a }) => (
              <div key={q} className="py-6 flex flex-col gap-3">
                <Heading level={3} className="font-[var(--font-weight-semibold)]">{q}</Heading>
                <Body muted>{a}</Body>
              </div>
            ))}
          </div>
        </SectionContainer>
      )}

      {/* ── 9. CTA FINAL ────────────────────────────────────────────── */}
      <SectionContainer background="sand" width="reading" className="text-center">
        <BrandScript size="xl" className="block mb-4">
          {homeConfig.cta.signature}
        </BrandScript>
        <Body size="lg" className="mb-8 text-[var(--color-text-secondary)]">
          {homeConfig.cta.body}
        </Body>
        <ButtonLink href="/reservation" size="lg" withArrow>
          Réserver un massage
        </ButtonLink>
      </SectionContainer>
    </>
  )
}
