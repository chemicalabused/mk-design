import { brand, nav } from '../content/site'
import { useLanguage } from '../lib/i18n'

export function Footer() {
  const { t } = useLanguage()
  const legal = [brand.company, brand.nip && `NIP ${brand.nip}`, brand.address].filter(Boolean)
  return (
    <footer className="bg-graphite text-plaster">
      <div className="container-page flex flex-col gap-10 py-14 md:flex-row md:items-start md:justify-between">
        <div>
          <img src="/images/mdh-logo-light.png" alt={brand.name} className="h-20 w-auto" />
          <p className="mt-4 max-w-[36ch] text-sm text-plaster/70">
            {t('footer.tagline')}
          </p>
        </div>
        <nav className="flex flex-col gap-2 text-sm" aria-label={t('footer.nav')}>
          {nav.map((i) => (
            <a key={i.href} href={i.href} className="text-plaster/80 hover:text-plaster">
              {t(({ Realizacje: 'nav.realizations', Usługi: 'nav.services', Proces: 'nav.process', Pracownia: 'nav.studio', Kontakt: 'nav.contact' } as Record<string, string>)[i.label])}
            </a>
          ))}
        </nav>
        <div className="flex flex-col gap-2 text-sm text-plaster/80">
          <a href={brand.phoneHref}>{brand.phone}</a>
          <a href={`mailto:${brand.email}`}>{brand.email}</a>
          <a href={brand.facebook} target="_blank" rel="noreferrer">Facebook</a>
          {brand.instagram && (
            <a href={brand.instagram} target="_blank" rel="noreferrer">Instagram</a>
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
