import type { ImgHTMLAttributes } from 'react'
import { srcSetFor } from '../lib/images'

interface Props extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt' | 'loading' | 'decoding'> {
  src: string // base path without extension, e.g. /images/hero-stalis
  alt: string
  priority?: boolean
  // Rendered width hint for srcset, e.g. "(min-width: 640px) 50vw, 100vw".
  sizes?: string
}

export function Picture({ src, alt, className, priority, sizes, ...rest }: Props) {
  const srcSet = srcSetFor(src)
  return (
    <img
      {...rest}
      src={`${src}.webp`}
      srcSet={srcSet}
      sizes={srcSet ? (sizes ?? '100vw') : undefined}
      alt={alt}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : undefined}
    />
  )
}
