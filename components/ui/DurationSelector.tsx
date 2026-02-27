'use client'

import { useState } from 'react'

/* ============================================================
   DurationSelector — La Belle Détente
   Radio button group for selecting massage duration + price.
   Extracted from Stitch reservation flow (Stich1.jpg right panel):
   - Radio pill showing "60 min" / "90 min" with price on the right
   - Selected state: filled background
   - Recommended option can be pre-selected
   ============================================================ */

interface DurationOption {
  id: string
  label: string
  price: number
  recommended?: boolean
}

interface DurationSelectorProps {
  options: DurationOption[]
  /** Controlled value */
  value?: string
  /** Callback when selection changes */
  onChange?: (id: string) => void
  /** Accessible label for the group */
  groupLabel?: string
  className?: string
}

/**
 * DurationSelector
 *
 * Renders a list of radio button rows, each showing:
 * [radio] [duration label] ............. [price]
 *
 * Usage:
 *   <DurationSelector
 *     options={experience.durations}
 *     value={selectedId}
 *     onChange={setSelectedId}
 *   />
 */
const DurationSelector = ({
  options,
  value,
  onChange,
  groupLabel = 'Choisissez votre durée',
  className = '',
}: DurationSelectorProps) => {
  const defaultId = options.find((o) => o.recommended)?.id ?? options[0]?.id
  const [internalValue, setInternalValue] = useState<string>(defaultId ?? '')

  const selectedId = value ?? internalValue

  const handleChange = (id: string) => {
    setInternalValue(id)
    onChange?.(id)
  }

  return (
    <fieldset className={`border-none p-0 m-0 ${className}`}>
      <legend className="label-eyebrow mb-4">{groupLabel}</legend>

      <div className="flex flex-col gap-2" role="radiogroup" aria-label={groupLabel}>
        {options.map((option) => {
          const isSelected = selectedId === option.id

          return (
            <label
              key={option.id}
              className={`
                flex items-center justify-between
                h-12 px-4
                rounded-[var(--radius-md)]
                border cursor-pointer
                transition-all duration-[var(--duration-fast)]
                ease-[var(--ease-smooth)]
                ${
                  isSelected
                    ? 'border-[var(--color-accent-500)] bg-[var(--color-badge-bg)]'
                    : 'border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-sand-300)]'
                }
              `}
            >
              {/* Radio + label */}
              <div className="flex items-center gap-3">
                {/* Custom radio */}
                <span
                  className={`
                    flex-shrink-0 w-5 h-5 rounded-full border-2
                    flex items-center justify-center
                    transition-colors duration-[var(--duration-fast)]
                    ${
                      isSelected
                        ? 'border-[var(--color-accent-500)]'
                        : 'border-[var(--color-linen-400)]'
                    }
                  `}
                  aria-hidden="true"
                >
                  {isSelected && (
                    <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-accent-500)]" />
                  )}
                </span>

                {/* Native radio (visually hidden, accessible) */}
                <input
                  type="radio"
                  name="duration"
                  value={option.id}
                  checked={isSelected}
                  onChange={() => handleChange(option.id)}
                  className="sr-only"
                />

                <span
                  className={`
                    font-[family-name:var(--font-body)]
                    text-[var(--text-sm)]
                    font-[var(--font-weight-medium)]
                    ${isSelected ? 'text-[var(--color-earth-900)]' : 'text-[var(--color-text-secondary)]'}
                  `}
                >
                  {option.label}
                </span>

                {option.recommended && (
                  <span className="badge max-[364px]:hidden">Recommandé</span>
                )}
              </div>

              {/* Price */}
              <span
                className={`
                  font-[family-name:var(--font-display)]
                  text-[var(--text-base)]
                  font-[var(--font-weight-bold)]
                  ${isSelected ? 'text-[var(--color-accent-600)]' : 'text-[var(--color-stone-600)]'}
                `}
              >
                {option.price}€
              </span>
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}

DurationSelector.displayName = 'DurationSelector'

export { DurationSelector }
export type { DurationSelectorProps, DurationOption }
