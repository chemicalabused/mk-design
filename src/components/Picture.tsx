interface Props {
  src: string // base path without extension, e.g. /images/hero-stalis
  alt: string
  className?: string
  sizes?: string
  priority?: boolean
}

export function Picture({ src, alt, className, priority }: Props) {
  return (
    <img
      src={`${src}.webp`}
      alt={alt}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : undefined}
    />
  )
}
