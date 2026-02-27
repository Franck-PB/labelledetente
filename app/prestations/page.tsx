import type { Metadata } from 'next'
import { SectionContainer } from '@/components/ui/SectionContainer'
import { Display, Heading, Eyebrow, Body } from '@/components/ui/Typography'
import { ButtonLink } from '@/components/ui/Button'
import { ImageBlock } from '@/components/ui/ImageBlock'
import { DurationSelector } from '@/components/ui/DurationSelector'
import { getAllExperiences } from '@/lib/services'

export const metadata: Metadata = {
  title: 'Nos soins',
  description:
    "Découvrez nos rituels de massage à domicile : L'Instant des Sommets, Récup'Alpine, L'Ascension Élégante. Tarifs et durées.",
  openGraph: {
    title: 'Nos soins — Massage à domicile en Savoie',
    description:
      "Découvrez nos rituels de massage à domicile : L'Instant des Sommets, Récup'Alpine, L'Ascension Élégante. Tarifs et durées.",
    url: 'https://labelledetente.fr/prestations',
  },
}

export default function PrestationsPage() {
  const experiences = getAllExperiences()

  return (
    <>
      {/* Page header */}
      <SectionContainer background="sand" width="content" className="pt-32 md:pt-40 text-center">
        <Eyebrow className="mb-4">Nos rituels</Eyebrow>
        <Display as="h1" italic className="mb-6">Choisissez votre soin</Display>
        <Body size="lg" className="max-w-lg mx-auto text-[var(--color-text-secondary)]">
          Chaque massage est conçu pour un moment précis. Choisissez celui qui correspond à votre besoin du moment.
        </Body>
      </SectionContainer>

      {/* Services list */}
      <SectionContainer background="white" width="wide">
        <div className="flex flex-col gap-24">
          {experiences.map((exp, i) => {
            const isEven = i % 2 === 0

            return (
              <article
                key={exp.id}
                id={exp.id}
                className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-10 md:gap-16 items-start`}
              >
                {/* Image */}
                <div className="w-full md:w-5/12 md:sticky md:top-24">
                  <ImageBlock
                    src={exp.imageSrc ?? ''}
                    alt={exp.name}
                    aspect="portrait"
                    radius="2xl"
                  />
                </div>

                {/* Content */}
                <div className="w-full md:w-7/12 flex flex-col gap-6">
                  <div>
                    <Eyebrow className="mb-2">Le ressenti</Eyebrow>
                    <Heading level={2} italic className="mb-3">{exp.name}</Heading>
                    <Body size="lg" className="italic text-[var(--color-text-secondary)]">
                      {exp.emotionalHook}
                    </Body>
                  </div>

                  {/* Idéal pour */}
                  <div>
                    <Eyebrow className="mb-3">Idéal pour…</Eyebrow>
                    <ul className="flex flex-col gap-2">
                      {exp.idealFor.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-[var(--color-accent-400)] flex-shrink-0" aria-hidden="true" />
                          <Body size="sm">{item}</Body>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Déroulé */}
                  <div>
                    <Eyebrow className="mb-3">Votre moment</Eyebrow>
                    <ol className="flex flex-col gap-2">
                      {exp.flow.map((step, idx) => (
                        <li key={step} className="flex items-start gap-4">
                          <span className="
                            flex-shrink-0 w-6 h-6 rounded-full
                            bg-[var(--color-badge-bg)] text-[var(--color-badge-text)]
                            font-[family-name:var(--font-body)] text-[var(--text-xs)] font-bold
                            flex items-center justify-center
                          ">
                            {idx + 1}
                          </span>
                          <Body size="sm" className="pt-0.5">{step}</Body>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Duration selector — affichage statique sur cette page */}
                  <DurationSelector options={exp.durations} groupLabel="Durées disponibles" />

                  {/* CTA */}
                  <ButtonLink
                    href={`/reservation?experience=${exp.id}`}
                    size="md"
                    withArrow
                    className="w-full justify-center max-[387px]:tracking-[0.06em] md:w-auto md:self-start md:justify-start"
                  >
                    Choisir cette expérience
                  </ButtonLink>
                </div>
              </article>
            )
          })}
        </div>
      </SectionContainer>
    </>
  )
}
