import Image, { type ImageProps } from 'next/image'

/* ============================================================
   ImageBlock — La Belle Détente
   Wrapper for Next/Image with preset aspect ratios and
   rounded corners consistent with the design system.
   ============================================================ */

type AspectRatio = 'portrait' | 'landscape' | 'square' | 'hero' | 'wide'
type Radius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

const aspectRatioMap: Record<AspectRatio, string> = {
  portrait: 'aspect-[3/4]',
  landscape: 'aspect-[4/3]',
  square: 'aspect-square',
  hero: 'aspect-[9/16]',
  wide: 'aspect-[16/9]',
}

const radiusMap: Record<Radius, string> = {
  none: 'rounded-none',
  sm: 'rounded-[var(--radius-sm)]',
  md: 'rounded-[var(--radius-md)]',
  lg: 'rounded-[var(--radius-lg)]',
  xl: 'rounded-[var(--radius-xl)]',
  '2xl': 'rounded-[var(--radius-2xl)]',
}

interface ImageBlockProps extends Omit<ImageProps, 'className'> {
  /** Controls aspect ratio of the container */
  aspect?: AspectRatio
  /** Border radius of the image */
  radius?: Radius
  /** Optional overlay (gradient for text legibility) */
  overlay?: 'none' | 'bottom' | 'full'
  className?: string
  containerClassName?: string
}

/**
 * ImageBlock
 * Renders a Next/Image inside an aspect-ratio container.
 * All images are object-fit: cover by default.
 *
 * Usage:
 *   <ImageBlock
 *     src="/photo.jpg"
 *     alt="Massage signature"
 *     aspect="portrait"
 *     radius="xl"
 *     overlay="bottom"
 *   />
 */
const ImageBlock = ({
  aspect = 'landscape',
  radius = 'lg',
  overlay = 'none',
  className = '',
  containerClassName = '',
  alt,
  ...imageProps
}: ImageBlockProps) => {
  const overlayClass = {
    none: '',
    bottom:
      'after:absolute after:inset-x-0 after:bottom-0 after:h-1/2 after:bg-gradient-to-t after:from-[rgba(28,18,10,0.7)] after:to-transparent after:rounded-b-[inherit]',
    full:
      'after:absolute after:inset-0 after:bg-[rgba(28,18,10,0.45)] after:rounded-[inherit]',
  }[overlay]

  return (
    <div
      className={`
        relative overflow-hidden
        ${aspectRatioMap[aspect]}
        ${radiusMap[radius]}
        ${overlayClass}
        ${containerClassName}
      `}
    >
      <Image
        alt={alt}
        fill
        className={`object-cover ${className}`}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        {...imageProps}
      />
    </div>
  )
}

ImageBlock.displayName = 'ImageBlock'

export { ImageBlock }
export type { ImageBlockProps }
