import type { ImgHTMLAttributes } from 'react'

interface Props extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt' | 'loading' | 'decoding'> {
  src: string // base path without extension, e.g. /images/hero-stalis
  alt: string
  priority?: boolean
}

export function Picture({ src, alt, className, priority, ...rest }: Props) {
  return (
    <img
      {...rest}
      src={`${src}.webp`}
      alt={alt}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : undefined}
    />
  )
}
