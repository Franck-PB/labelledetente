import Link from 'next/link'
import { ImageBlock } from './ImageBlock'
import { Heading, Body, Eyebrow } from './Typography'
import { Button } from './Button'

/* ============================================================
   ExperienceCard — La Belle Détente
   Used in:
   - Booking flow: /reservation (experience selection)
   - Services overview: /prestations
   - Homepage: service slider

   Variants:
   - 'select'   → show "SÉLECTIONNER" button (booking flow)
   - 'navigate' → link to detail page
   - 'compact'  → horizontal layout for slider
   ============================================================ */

interface Duration {
  id: string
  label: string
  price: number
  recommended?: boolean
}

interface ExperienceCardProps {
  id: string
  name: string
  tagline: string
  emotionalHook?: string
  durations: Duration[]
  imageSrc?: string
  imageAlt?: string
  /** Card display variant */
  variant?: 'select' | 'navigate' | 'compact'
  /** Whether to show a "POPULAIRE" badge */
  featured?: boolean
  /** Callback when "SÉLECTIONNER" is clicked (select variant) */
  onSelect?: (id: string) => void
  /** Override the detail page href (navigate variant) */
  href?: string
  className?: string
}

/**
 * ExperienceCard
 *
 * Displays a massage experience with image, name, tagline, price range.
 * Used in booking flow and services overview.
 */
const ExperienceCard = ({
  id,
  name,
  tagline,
  emotionalHook,
  durations,
  imageSrc,
  imageAlt,
  variant = 'navigate',
  featured = false,
  onSelect,
  href,
  className = '',
}: ExperienceCardProps) => {
  const minPrice = Math.min(...durations.map((d) => d.price))
  const detailHref = href ?? `/prestations/${id}`

  return (
    <article
      className={`
        group
        bg-[var(--color-surface)]
        rounded-[var(--radius-xl)]
        overflow-hidden
        shadow-[var(--shadow-card)]
        border border-[var(--color-border-subtle)]
        flex flex-col
        transition-all duration-300 ease-out
        hover:-translate-y-1.5 hover:shadow-[var(--shadow-elevated)]
        ${className}
      `}
    >
      {/* Image */}
      {imageSrc && (
        <div className="relative overflow-hidden">
          <ImageBlock
            src={imageSrc}
            alt={imageAlt ?? name}
            aspect="landscape"
            radius="none"
            priority={featured}
            className="transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
          {featured && (
            <span className="badge absolute top-3 left-3 z-[var(--z-raised)]">
              Populaire
            </span>
          )}
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <div>
          <Heading level={3} className="mb-1">
            {name}
          </Heading>
          <Body size="sm" muted className="line-clamp-2">
            {emotionalHook ?? tagline}
          </Body>
        </div>

        {/* Price hint */}
        <div className="flex items-center gap-1.5 mt-auto pt-2">
          <Eyebrow>À partir de</Eyebrow>
          <span
            className="font-[family-name:var(--font-display)] font-[var(--font-weight-bold)] text-[var(--color-accent-600)]"
            style={{ fontSize: 'var(--fs-body-lg)' }}
          >
            {minPrice}€
          </span>
        </div>

        {/* CTA */}
        {variant === 'select' ? (
          <Button
            variant="outline"
            size="sm"
            className="w-full mt-2"
            onClick={() => onSelect?.(id)}
          >
            Sélectionner
          </Button>
        ) : (
          <Link
            href={detailHref}
            className="
              inline-flex items-center justify-center w-full
              h-10 px-5
              text-[var(--text-xs)] tracking-[0.12em] uppercase
              font-[family-name:var(--font-body)]
              font-[var(--font-weight-semibold)]
              text-[var(--color-earth-800)]
              border border-[var(--color-earth-800)]
              rounded-[var(--radius-md)]
              mt-2
              transition-colors duration-[var(--duration-base)]
              hover:bg-[var(--color-sand-100)]
            "
          >
            Découvrir
          </Link>
        )}
      </div>
    </article>
  )
}

ExperienceCard.displayName = 'ExperienceCard'

export { ExperienceCard }
export type { ExperienceCardProps, Duration }
