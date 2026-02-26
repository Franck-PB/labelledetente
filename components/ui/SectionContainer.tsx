import { type HTMLAttributes, forwardRef } from 'react'

type Width = 'reading' | 'content' | 'wide' | 'full'
type Background = 'default' | 'cream' | 'sand' | 'white' | 'dark' | 'accent'

interface SectionContainerProps extends HTMLAttributes<HTMLElement> {
  as?: 'section' | 'div' | 'article' | 'aside' | 'main'
  /** Controls max-width of the inner content wrapper */
  width?: Width
  /** Section background variant */
  background?: Background
  /** Remove default vertical padding */
  noPadding?: boolean
  /** Remove horizontal gutters (for full-bleed sections) */
  noGutter?: boolean
}

const maxWidthMap: Record<Width, string> = {
  reading: 'max-w-[48rem]',    // 768px — comfortable long-form reading
  content: 'max-w-[68rem]',    // 1088px — standard content
  wide: 'max-w-[92rem]',       // 1472px — wide editorial layout (desktop priority)
  full: 'max-w-none',
}

const backgroundMap: Record<Background, string> = {
  default: 'bg-[var(--color-background)]',
  cream: 'bg-[var(--color-cream-100)]',
  sand: 'bg-[var(--color-sand-100)]',
  white: 'bg-[var(--color-surface)]',
  dark: 'bg-[var(--color-earth-900)] text-[var(--color-cream-50)]',
  accent: 'bg-[var(--color-accent-400)] text-[var(--color-earth-900)]',
}

/**
 * SectionContainer
 *
 * The structural wrapper for every page section.
 * Enforces consistent horizontal gutters and vertical rhythm.
 *
 * Usage:
 *   <SectionContainer background="cream" width="content">
 *     ...content
 *   </SectionContainer>
 */
const SectionContainer = forwardRef<HTMLElement, SectionContainerProps>(
  (
    {
      as: Tag = 'section',
      width = 'wide',
      background = 'default',
      noPadding = false,
      noGutter = false,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const paddingClass = noPadding ? '' : 'section-gap'
    const gutterClass = noGutter
      ? ''
      : 'px-[var(--page-gutter-mobile)] md:px-[var(--page-gutter-tablet)] lg:px-[var(--page-gutter-desktop)]'

    return (
      <Tag
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ref={ref as any}
        className={`${backgroundMap[background]} ${paddingClass} ${className}`}
        {...props}
      >
        <div className={`mx-auto w-full ${maxWidthMap[width]} ${gutterClass}`}>
          {children}
        </div>
      </Tag>
    )
  }
)

SectionContainer.displayName = 'SectionContainer'

export { SectionContainer }
export type { SectionContainerProps }
