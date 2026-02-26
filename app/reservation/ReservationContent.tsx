'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { SectionContainer } from '@/components/ui/SectionContainer'
import { Heading, Eyebrow, Body, BrandScript } from '@/components/ui/Typography'
import Image from 'next/image'
import { DurationSelector } from '@/components/ui/DurationSelector'
import { ButtonLink } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { getAllExperiences } from '@/lib/services'


export function ReservationContent() {
  const searchParams = useSearchParams()
  const experiences = getAllExperiences()

  const defaultExp = searchParams.get('experience') ?? experiences[0]?.id ?? ''
  const initialExp = experiences.find((e) => e.id === defaultExp) ?? experiences[0]
  const defaultDur =
    searchParams.get('duration') ??
    initialExp?.durations.find((d) => d.recommended)?.id ??
    initialExp?.durations[0]?.id ??
    ''

  const [selectedExpId, setSelectedExpId] = useState<string>(initialExp?.id ?? '')
  const [selectedDurationId, setSelectedDurationId] = useState<string>(defaultDur)

  const selectedExp = experiences.find((e) => e.id === selectedExpId) ?? null
  const selectedDuration = selectedExp?.durations.find((d) => d.id === selectedDurationId) ?? null

  const handleSelectExperience = (id: string) => {
    const exp = experiences.find((e) => e.id === id)
    if (!exp) return
    setSelectedExpId(id)
    const rec = exp.durations.find((d) => d.recommended) ?? exp.durations[0]
    if (rec) setSelectedDurationId(rec.id)
  }

  return (
    <>
      <SectionContainer background="cream" width="content" className="pt-28">
        <div className="text-center mb-10">
          <BrandScript size="lg" className="block mb-2">Votre expérience</BrandScript>
          <Body className="text-[var(--color-text-secondary)]">
            Choisissez le rituel qui apportera confort à votre corps et esprit.
          </Body>
        </div>

        {/* Experience cards */}
        <div className="flex flex-col gap-6">
          {experiences.map((exp, i) => {
            const isSelected = selectedExpId === exp.id
            return (
              <div
                key={exp.id}
                className={`
                  bg-[var(--color-surface)] rounded-[var(--radius-xl)]
                  border-2 transition-all duration-[var(--duration-base)] cursor-pointer
                  ${isSelected
                    ? 'border-[var(--color-accent-500)] shadow-[var(--shadow-card)]'
                    : 'border-[var(--color-border-subtle)] hover:border-[var(--color-sand-300)]'
                  }
                `}
                onClick={() => { if (!isSelected) handleSelectExperience(exp.id) }}
                role="radio"
                aria-checked={isSelected}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleSelectExperience(exp.id)
                  }
                }}
              >
                {/* Image — outer clippe, inner déborde pour montrer plus de contenu (dezoom) */}
                <div
                  className="relative overflow-hidden rounded-t-[var(--radius-xl)]"
                  style={{ aspectRatio: '5/2' }}
                >
                  {i === 0 && (
                    <Badge className="absolute top-3 left-3 z-10">Populaire</Badge>
                  )}
                  <div className="absolute" style={{ inset: '-8%' }}>
                    <Image
                      src={exp.imageSrc ?? '/images/hero-setup.jpg'}
                      alt={exp.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 600px"
                    />
                  </div>
                </div>

                {/* Info */}
                <div className="p-5 flex flex-col gap-3">
                  <Heading level={3}>{exp.name}</Heading>

                  {/* Accroche émotionnelle */}
                  <Body size="sm" muted>{exp.emotionalHook}</Body>

                  {/* Descriptif — pour qui / quand */}
                  <ul className="flex flex-col gap-1">
                    {exp.idealFor.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-[var(--color-accent-400)] flex-shrink-0" aria-hidden="true" />
                        <span
                          className="font-[family-name:var(--font-body)] text-[var(--color-text-secondary)]"
                          style={{ fontSize: 'var(--fs-body-sm)' }}
                        >
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {isSelected ? (
                    <div className="flex flex-col gap-4 pt-1 border-t border-[var(--color-linen-200)]">
                      <DurationSelector
                        options={exp.durations}
                        value={selectedDurationId}
                        onChange={setSelectedDurationId}
                      />
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          <Eyebrow className="text-[var(--color-stone-500)]">Total estimé</Eyebrow>
                          <span className="font-[family-name:var(--font-display)] text-[var(--text-xl)] font-bold text-[var(--color-earth-900)]">
                            {selectedDuration ? `${selectedDuration.price}€` : '—'}
                          </span>
                        </div>
                        <ButtonLink
                          href={`/reservation/${selectedDurationId}`}
                          variant="primary"
                          size="md"
                          withArrow
                        >
                          Réserver
                        </ButtonLink>
                      </div>
                    </div>
                  ) : (
                    <button
                      className="
                        w-full h-10 rounded-[var(--radius-md)]
                        border border-[var(--color-earth-800)]
                        font-[family-name:var(--font-body)] text-[var(--text-xs)]
                        tracking-[0.12em] uppercase font-semibold
                        text-[var(--color-earth-800)]
                        hover:bg-[var(--color-sand-100)]
                        transition-colors duration-[var(--duration-fast)]
                      "
                      onClick={(e) => {
                        e.stopPropagation()
                        handleSelectExperience(exp.id)
                      }}
                    >
                      Sélectionner
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </SectionContainer>
    </>
  )
}
