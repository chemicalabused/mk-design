import { brand, nav } from '../content/site'
import { useLanguage } from '../lib/i18n'
import { BrandIcon } from './BrandIcon'

export function Footer() {
  const { t } = useLanguage()
  const legal = [brand.company, brand.nip && `NIP ${brand.nip}`, brand.address].filter(Boolean)
  return (
    <footer className="bg-graphite text-plaster">
      <div className="container-page flex flex-col gap-6 py-14 sm:gap-10 md:flex-row md:items-start md:justify-between">
        <div>
          <img src="/images/mdh-logo-light.png" alt={brand.name} width={720} height={165} className="h-20 w-auto" />
          <p className="mt-4 max-w-[36ch] text-balance text-sm text-plaster/70">
            {t('footer.tagline')}
          </p>
        </div>
        {/* py-3 below sm: 44px tap targets on phones, as in Contact. */}
        <nav className="flex flex-col text-sm sm:gap-2" aria-label={t('footer.nav')}>
          {nav.map((i) => (
            <a key={i.href} href={i.href} className="self-start py-3 text-plaster/80 hover:text-plaster sm:py-0">
              {t(i.key)}
            </a>
          ))}
        </nav>
        <div className="flex flex-col text-sm text-plaster/80 sm:gap-2">
          <a href={brand.phoneHref} className="link-line-light self-start py-3 sm:py-0">{brand.phone}</a>
          <a href={`mailto:${brand.email}`} className="link-line-light self-start py-3 sm:py-0">{brand.email}</a>
          <a href={brand.facebook} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 self-start py-3 sm:py-0">
            <BrandIcon brand="facebook" />
            <span className="link-line-light">Facebook</span>
          </a>
          {brand.instagram && (
            <a href={brand.instagram} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 self-start py-3 sm:py-0">
              <BrandIcon brand="instagram" />
              <span className="link-line-light">Instagram</span>
            </a>
          )}
        </div>
      </div>
      <div className="container-page">
        <div className="flex flex-col gap-2 border-t border-line-dark py-6 text-xs text-plaster/50 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {brand.name}</p>
          {legal.length > 0 && <p>{legal.join(', ')}</p>}
        </div>
      </div>
    </footer>
  )
}
