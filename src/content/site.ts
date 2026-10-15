// Data for the landing page: contact details, links, media and projects.
// UI copy (headings, intros, labels) lives in src/lib/i18n.tsx in all three
// languages; entries below that render text carry the i18n key or id the
// components build keys from, so adding one means adding its strings there.

export const brand = {
  name: 'M Design House',
  tagline: 'Pracownia architektoniczna z Nysy',
  phone: '+48 797 699 951',
  phoneHref: 'tel:+48797699951',
  whatsapp: 'https://wa.me/48797699951',
  email: 'mdesignhouse.biuro@gmail.com',
  facebook: 'https://www.facebook.com/mdesignhouse.eu',
  // TODO: uzupełnić po otrzymaniu od klienta
  instagram: '' as string,
  address: '' as string, // np. "ul. Piłsudskiego 62/205, 48-303 Nysa"
  company: '' as string, // nazwa firmy do stopki
  nip: '' as string,
  // Web3Forms access key for the contact form (public by design: it can only
  // deliver to the inbox it was issued for). Empty = fall back to mailto:.
  // Get one at https://web3forms.com with the studio's address above.
  formKey: '' as string,
}

export const nav = [
  { href: '#realizacje', key: 'nav.realizations' },
  { href: '#uslugi', key: 'nav.services' },
  { href: '#proces', key: 'nav.process' },
  { href: '#pracownia', key: 'nav.studio' },
  { href: '#kontakt', key: 'nav.contact' },
]

export const hero = {
  // Text: hero.* keys in i18n.tsx.
  primary: { href: '#kontakt' },
  secondary: { href: '#realizacje' },
  image: { src: '/images/hero-pergola-poster', altKey: 'hero.imageAlt' },
  video: '/videos/mdh-hero-loop-pergola.mp4',
}

export type Category = 'domy' | 'wnętrza' | 'inwestycje' | 'ogrody'

export const categories: { id: Category | 'wszystkie'; key: string }[] = [
  { id: 'wszystkie', key: 'projects.all' },
  { id: 'domy', key: 'projects.homes' },
  { id: 'wnętrza', key: 'projects.interiors' },
  { id: 'inwestycje', key: 'projects.investments' },
  { id: 'ogrody', key: 'projects.gardens' },
]

export type ProjectImageType = 'photo' | 'visualization' | 'plan' | 'elevation'

export interface ProjectImage {
  src: string
  alt: string
  type: ProjectImageType
}

export interface ProjectVideo {
  src: string
  startAt: number
  hasAudio?: boolean
  playbackRate?: number
}

export interface Project {
  id: string
  title: string
  place?: string
  year?: string
  category: Category
  kind: string
  area?: string
  status: string
  description: string
  images: ProjectImage[]
  coverImage?: ProjectImage
  videos?: ProjectVideo[]
}

export const projects: Project[] = [
  {
    id: 'rezydencja-skrzypiec',
    title: 'Rezydencja w Skrzypcu',
    place: 'Skrzypiec',
    year: '2023',
    category: 'domy',
    kind: 'Projekt i realizacja',
    area: '750 m²',
    status: 'Realizacja',
    description:
      'Rezydencja o powierzchni 750 m² łączy reprezentacyjną, klasyczną bryłę z nowoczesnym układem wnętrz. Jasna elewacja i czerwona dachówka tworzą ponadczasową kompozycję, a oranżeria otwiera dom na ogród. Wnętrza obejmują przestronną strefę dzienną, kuchnię z wyspą oraz prywatną strefę SPA.',
    coverImage: { src: '/images/projects/rezydencja-skrzypiec-13', alt: 'Wizualizacja frontu rezydencji z jasną elewacją i czerwonym dachem', type: 'visualization' },
    videos: [
      { src: '/videos/rezydencja-skrzypiec-loop-v3.mp4', startAt: 0, playbackRate: 1 },
    ],
    images: [
      { src: '/images/projects/rezydencja-skrzypiec-01', alt: 'Ukończona rezydencja w Skrzypcu, widok od frontu', type: 'photo' },
      { src: '/images/projects/rezydencja-skrzypiec-02', alt: 'Elewacja i ogród rezydencji', type: 'photo' },
      { src: '/images/projects/rezydencja-skrzypiec-03', alt: 'Kuchnia z wyspą i kamiennym blatem', type: 'photo' },
      { src: '/images/projects/rezydencja-skrzypiec-04', alt: 'Jadalnia z drewnianą ścianą akcentową', type: 'photo' },
      { src: '/images/projects/rezydencja-skrzypiec-05', alt: 'Koncepcja strefy kąpielowej z wanną wolnostojącą', type: 'visualization' },
      { src: '/images/projects/rezydencja-skrzypiec-06', alt: 'Koncepcja salonu z drewnianymi belkami i kamienną ścianą', type: 'visualization' },
      { src: '/images/projects/rezydencja-skrzypiec-07', alt: 'Kuchnia z wyspą i zabudową w jasnej, oliwkowej tonacji', type: 'visualization' },
      { src: '/images/projects/rezydencja-skrzypiec-08', alt: 'Salon z kominkiem, dużymi przeszkleniami i wyjściem na ogród', type: 'visualization' },
      { src: '/images/projects/rezydencja-skrzypiec-09', alt: 'Otwarta strefa dzienna z drewnianymi belkami stropowymi', type: 'visualization' },
      { src: '/images/projects/rezydencja-skrzypiec-10', alt: 'Kamienna ściana i schody z podświetleniem stopni', type: 'visualization' },
      { src: '/images/projects/rezydencja-skrzypiec-11', alt: 'Zespół domów z jasnymi elewacjami i dachami z czerwonej dachówki', type: 'visualization' },
      { src: '/images/projects/rezydencja-skrzypiec-12', alt: 'Łazienka z wanną wolnostojącą, prysznicem i kamiennymi płytami', type: 'visualization' },
      { src: '/images/projects/rezydencja-skrzypiec-13', alt: 'Wizualizacja frontu rezydencji z zadaszonym tarasem', type: 'visualization' },
      { src: '/images/projects/rezydencja-skrzypiec-14', alt: 'Łazienka z kamienną zabudową i podświetlanym lustrem', type: 'visualization' },
      { src: '/images/projects/rezydencja-skrzypiec-15', alt: 'Strefa kąpielowa z wanną i prysznicem przy oknie', type: 'visualization' },
      { src: '/images/projects/rezydencja-skrzypiec-16', alt: 'Wnętrze rezydencji na etapie prac instalacyjnych', type: 'photo' },
      { src: '/images/projects/rezydencja-skrzypiec-17', alt: 'Instalacja wentylacyjna w trakcie realizacji wnętrza', type: 'photo' },
      { src: '/images/projects/rezydencja-skrzypiec-18', alt: 'Rezydencja w trakcie budowy, widok od strony ogrodu', type: 'photo' },
      { src: '/images/projects/rezydencja-skrzypiec-19', alt: 'Murowanie i montaż dachu w trakcie realizacji domu', type: 'photo' },
      { src: '/images/projects/rezydencja-skrzypiec-20', alt: 'Front rezydencji w trakcie prac elewacyjnych', type: 'photo' },
      { src: '/images/projects/rezydencja-skrzypiec-21', alt: 'Korytarz w trakcie prowadzenia instalacji', type: 'photo' },
      { src: '/images/projects/rezydencja-skrzypiec-22', alt: 'Wnętrze na etapie prac murarskich i instalacyjnych', type: 'photo' },
      { src: '/images/projects/rezydencja-skrzypiec-23', alt: 'Budynek podczas realizacji, widok na elewację i dach', type: 'photo' },
      { src: '/images/projects/rezydencja-skrzypiec-24', alt: 'Montaż okna w trakcie realizacji rezydencji', type: 'photo' },
      { src: '/images/projects/rezydencja-skrzypiec-25', alt: 'Ogrzewanie podłogowe i instalacje przed wykonaniem posadzki', type: 'photo' },
      { src: '/images/projects/rezydencja-skrzypiec-26', alt: 'Kuchnia z wyspą podczas prac wykończeniowych', type: 'photo' },
      { src: '/images/projects/rezydencja-skrzypiec-27', alt: 'Korytarz rezydencji w trakcie prac wykończeniowych', type: 'photo' },
      { src: '/images/projects/rezydencja-skrzypiec-28', alt: 'Zabudowa kuchni i wyspa w trakcie wykończenia wnętrza', type: 'photo' },
      { src: '/images/projects/rezydencja-skrzypiec-29', alt: 'Elewacja rezydencji w Skrzypcu w świetle dziennym', type: 'photo' },
    ],
  },
  {
    id: 'dom-stalis-180',
    title: 'Dom parterowy z kamieniem i drewnem',
    category: 'domy',
    kind: 'Dom jednorodzinny',
    area: '180 m²',
    status: 'Projekt domu',
    description:
      'Parterowy dom z dachem dwuspadowym łączy jasny tynk, kamienne akcenty i ciepłe drewno pod okapem. Duże przeszklenia doświetlają otwartą strefę dzienną i prowadzą na zadaszony taras. Układ obejmuje prywatną sypialnię z łazienką i garderobą oraz dodatkowe pokoje i zaplecze gospodarcze.',
    coverImage: { src: '/images/projects/dom-stalis-180-07', alt: 'Dzienna wizualizacja domu z białą elewacją, kamieniem i drewnem', type: 'visualization' },
    videos: [
      { src: '/videos/dom-stalis-180-loop-from-2s-to-7s.mp4', startAt: 0 },
    ],
    images: [
      { src: '/images/projects/dom-stalis-180-07', alt: 'Dzienna wizualizacja domu z białą elewacją, kamieniem i drewnem', type: 'visualization' },
      { src: '/images/projects/dom-stalis-180-01', alt: 'Dom parterowy z kamiennym akcentem w świetle wieczornym', type: 'visualization' },
      { src: '/images/projects/dom-stalis-180-02', alt: 'Dzienna wizualizacja domu z zadaszonym tarasem', type: 'visualization' },
      { src: '/images/projects/dom-stalis-180-03', alt: 'Dom na etapie budowy, konstrukcja dachu', type: 'photo' },
      { src: '/images/projects/dom-stalis-180-04', alt: 'Budynek w trakcie realizacji', type: 'photo' },
      { src: '/images/projects/dom-stalis-180-05', alt: 'Jasna strefa dzienna z salonem i jadalnią', type: 'visualization' },
      { src: '/images/projects/dom-stalis-180-06', alt: 'Sypialnia w stonowanej palecie', type: 'visualization' },
      { src: '/images/projects/dom-stalis-180-08', alt: 'Dzienny widok domu od strony zadaszonego tarasu', type: 'visualization' },
      { src: '/images/projects/dom-stalis-180-09', alt: 'Wieczorna wizualizacja domu z ciepłym oświetleniem elewacji', type: 'visualization' },
      { src: '/images/projects/dom-stalis-180-10', alt: 'Oświetlony dom z kamiennymi akcentami i drewnem po zmroku', type: 'visualization' },
      { src: '/images/projects/dom-stalis-180-11', alt: 'Jasna kuchnia z wyspą i widokiem na ogród', type: 'visualization' },
      { src: '/images/projects/dom-stalis-180-12', alt: 'Plan parteru z układem strefy dziennej i pomieszczeń prywatnych', type: 'plan' },
      { src: '/images/projects/dom-stalis-180-13', alt: 'Salon z kominkiem, dużymi przeszkleniami i widokiem na ogród', type: 'visualization' },
      { src: '/images/projects/dom-stalis-180-14', alt: 'Salon połączony z jadalnią w jasnej klasycznej aranżacji', type: 'visualization' },
      { src: '/images/projects/dom-stalis-180-07', alt: 'Rzut funkcjonalny domu parterowego', type: 'plan' },
    ],
  },
  {
    id: 'dom-na-stoku-prudnik',
    title: 'Nowoczesny dom na stoku',
    place: 'Prudnik',
    category: 'domy',
    kind: 'Dom jednorodzinny',
    status: 'Projekt z dokumentacją i wizualizacjami',
    description:
      'Dom o formie nowoczesnej stodoły został dopasowany do opadającej działki. Drewniana elewacja, kamienne akcenty i duże przeszklenia łączą bryłę z krajobrazem. Pod wysuniętą częścią tarasu zaplanowano osłonięte miejsce wypoczynku, a we wnętrzu — wysoką strefę dzienną z charakterystycznym piecem kaflowym.',
    coverImage: { src: '/images/projects/dom-na-stoku-prudnik-04', alt: 'Filmowa wizualizacja jasnego wnętrza domu z piecem kaflowym i rodziną', type: 'visualization' },
    videos: [
      { src: '/videos/dom-na-stoku-prudnik-interior-muted.mp4', startAt: 0, hasAudio: false },
    ],
    images: [
      { src: '/images/projects/dom-na-stoku-prudnik-01', alt: 'Dom na pochyłej działce z tarasem i panoramicznym przeszkleniem', type: 'visualization' },
      { src: '/images/projects/dom-na-stoku-prudnik-02', alt: 'Boczna elewacja domu z kamiennymi akcentami', type: 'visualization' },
      { src: '/images/projects/dom-na-stoku-prudnik-03', alt: 'Dom na etapie prac elewacyjnych', type: 'photo' },
      { src: '/images/projects/dom-na-stoku-prudnik-04', alt: 'Strefa dzienna z wysokim sufitem i piecem kaflowym', type: 'visualization' },
      { src: '/images/projects/dom-na-stoku-prudnik-05', alt: 'Wieczorna odsłona strefy dziennej', type: 'visualization' },
      { src: '/images/projects/dom-na-stoku-prudnik-06', alt: 'Rzut funkcjonalny domu', type: 'plan' },
    ],
  },
  {
    id: 'apartament-altea',
    title: 'Apartament nad Morzem Śródziemnym',
    place: 'Altea, Hiszpania',
    category: 'wnętrza',
    kind: 'Projekt wnętrza apartamentu',
    area: '81 m² + taras 41,3 m²',
    status: 'Wizualizacje projektu',
    description:
      'Jasny apartament w Altei zaprojektowano jako spokojne, funkcjonalne miejsce do życia i wypoczynku. Otwarta strefa dzienna łączy salon z kuchnią i wyspą, a naturalne drewno, kamień i beże budują ciepłą śródziemnomorską paletę. W układzie przewidziano dwie sypialnie, łazienkę, pomieszczenie gospodarcze i przestronny taras.',
    videos: [
      { src: '/videos/apartament-altea-tour.mp4', startAt: 0 },
    ],
    images: [
      { src: '/images/projects/altea-01', alt: 'Salon z aneksem kuchennym i wyjściem na taras w Altei', type: 'visualization' },
      { src: '/images/projects/altea-02', alt: 'Strefa dzienna apartamentu z widokiem na zieleń', type: 'visualization' },
      { src: '/images/projects/altea-03', alt: 'Sypialnia z naturalnymi materiałami i widokiem na taras', type: 'visualization' },
      { src: '/images/projects/altea-04', alt: 'Rzut funkcjonalny apartamentu w Altei', type: 'plan' },
    ],
  },
  {
    id: 'klubowy-dom-kosciuszki-25',
    title: 'Klubowy Dom Kościuszki 25',
    place: 'Głuchołazy',
    year: '2026',
    category: 'inwestycje',
    kind: 'Koncepcja budynku mieszkalno-usługowego',
    area: '14 apartamentów · 200 m² usług',
    status: 'Koncepcja architektoniczna',
    description:
      'Projekt przy ulicy Kościuszki 25 nawiązuje do miejskiej pierzei Głuchołaz, łącząc kamieniczny charakter z nowoczesnym układem funkcji. Założenie obejmuje lokale usługowe na parterze, kameralne apartamenty, windę oraz taras widokowy na dachu. Jasna elewacja i duże okna porządkują skalę budynku od strony ulicy.',
    coverImage: { src: '/images/projects/klubowy-dom-kosciuszki-25-01', alt: 'Wizualizacja Domu Klubowego Kościuszki 25 w Głuchołazach', type: 'visualization' },
    videos: [
      { src: '/videos/klubowy-dom-kosciuszki-25-loop-from-3_5s.mp4', startAt: 0 },
    ],
    images: [
      { src: '/images/projects/klubowy-dom-kosciuszki-25-01', alt: 'Wizualizacja Domu Klubowego Kościuszki 25 w Głuchołazach', type: 'visualization' },
      { src: '/images/projects/klubowy-dom-kosciuszki-25-02', alt: 'Koncepcja budynku mieszkalno-usługowego po zmroku', type: 'visualization' },
      { src: '/images/projects/klubowy-dom-kosciuszki-25-03', alt: 'Ujęcie z góry kompleksu przy miejskiej ulicy', type: 'visualization' },
      { src: '/images/projects/klubowy-dom-kosciuszki-25-04', alt: 'Wnętrze części mieszkalnej budynku', type: 'visualization' },
      { src: '/images/projects/klubowy-dom-kosciuszki-25-05', alt: 'Łazienka apartamentu', type: 'visualization' },
      { src: '/images/projects/klubowy-dom-kosciuszki-25-06', alt: 'Rzut kondygnacji budynku', type: 'plan' },
    ],
  },
  {
    id: 'apartament-witolda-wroclaw',
    title: 'Apartament przy Księcia Witolda',
    place: 'Wrocław',
    category: 'wnętrza',
    kind: 'Projekt wnętrza mieszkania',
    area: '72,03 m² + balkon 10,17 m²',
    status: 'Projekt i aranżacja wnętrza',
    description:
      'Wnętrze oparte na spokojnej bazie szarości i naturalnego drewna uzupełniają ciemna skóra oraz głębokie błękity. Otwarta część dzienna łączy salon z jadalnią i kuchnią, a układ mieszkania obejmuje dwie sypialnie, garderobę i dwie łazienki. Każda strefa została zaplanowana z myślą o wygodzie codziennego użytkowania.',
    videos: [
      { src: '/videos/apartament-witolda-morning.mp4', startAt: 0 },
    ],
    images: [
      { src: '/images/projects/apartament-witolda-wroclaw-01', alt: 'Strefa dzienna apartamentu przy ulicy Księcia Witolda', type: 'visualization' },
      { src: '/images/projects/apartament-witolda-bathroom-replacement', alt: 'Łazienka z wolnostojącą wanną i prysznicem typu walk-in', type: 'visualization' },
      { src: '/images/projects/apartament-witolda-wroclaw-03', alt: 'Kuchnia z ciemną zabudową i drewnianym blatem', type: 'photo' },
      { src: '/images/projects/apartament-witolda-wroclaw-04', alt: 'Łazienka z prysznicem typu walk-in', type: 'photo' },
      { src: '/images/projects/apartament-witolda-wroclaw-05', alt: 'Sypialnia w stonowanej palecie barw', type: 'visualization' },
      { src: '/images/projects/apartament-witolda-wroclaw-06', alt: 'Rzut mieszkania z układem funkcjonalnym', type: 'plan' },
    ],
  },
  {
    id: 'dom-110-wroclaw',
    title: 'Dom parterowy otwarty na ogród',
    place: 'Wrocław',
    year: '2026',
    category: 'domy',
    kind: 'Dom jednorodzinny',
    area: '110 m² · działka 6 arów',
    status: 'Projekt domu',
    description:
      'Parterowy dom o powierzchni 110 m² skupia codzienne życie wokół jasnej strefy dziennej i bezpośredniego wyjścia na taras. Prosta bryła, duże przeszklenia i pergola łączą wnętrze z ogrodem, a czytelny układ bez schodów odpowiada na potrzeby rodziny na różnych etapach życia.',
    coverImage: { src: '/images/projects/dom-110-wroclaw-01', alt: 'Dom parterowy otwarty na ogród', type: 'visualization' },
    videos: [
      { src: '/videos/dom-110-wroclaw-combined-muted.mp4', startAt: 0, hasAudio: false },
    ],
    images: [
      { src: '/images/projects/dom-110-wroclaw-01', alt: 'Dom parterowy z ogrodem — widok od frontu', type: 'visualization' },
      { src: '/images/projects/dom-110-wroclaw-02', alt: 'Taras z pergolą i otwarciem na ogród', type: 'visualization' },
      { src: '/images/projects/dom-110-wroclaw-03', alt: 'Wieczorne oświetlenie domu i tarasu', type: 'visualization' },
      { src: '/images/projects/dom-110-wroclaw-04', alt: 'Salon połączony z jadalnią', type: 'visualization' },
      { src: '/images/projects/dom-110-wroclaw-05', alt: 'Dom i ogród zimą', type: 'photo' },
      { src: '/images/projects/dom-110-wroclaw-06', alt: 'Rzut funkcjonalny domu parterowego', type: 'plan' },
      { src: '/images/projects/dom-110-wroclaw-electrical-plan', alt: 'Rzut domu z rozmieszczeniem gniazd i punktów elektrycznych', type: 'plan' },
      { src: '/images/projects/dom-110-wroclaw-elevations', alt: 'Elewacje domu parterowego otwartego na ogród', type: 'elevation' },
    ],
  },
  {
    id: 'dom-glucholazy',
    title: 'Dom jednorodzinny z garażem dwustanowiskowym',
    place: 'Głuchołazy',
    category: 'domy',
    kind: 'Dom jednorodzinny',
    area: '225 m²',
    status: 'W trakcie realizacji',
    description:
      'Piętrowy dom o powierzchni 225 m² łączy jasną, oszczędną bryłę z ciemnym dachem i garażem na dwa samochody. Otwarta strefa dzienna z kuchnią i jadalnią wychodzi na ogród przez duże przeszklenia. Galeria zestawia wizualizacje projektu z wybranymi zdjęciami z budowy.',
    videos: [
      { src: '/videos/dom-glucholazy-jednorodzinny.mp4', startAt: 0 },
    ],
    images: [
      { src: '/images/projects/dom-glucholazy-01', alt: 'Wizualizacja domu z garażem dwustanowiskowym', type: 'visualization' },
      { src: '/images/projects/dom-glucholazy-02', alt: 'Dom w trakcie budowy, widok od strony elewacji frontowej', type: 'photo' },
      { src: '/images/projects/dom-glucholazy-03', alt: 'Konstrukcja dachu na etapie budowy', type: 'photo' },
      { src: '/images/projects/dom-glucholazy-04', alt: 'Otwarta strefa dzienna z kuchnią i jadalnią', type: 'visualization' },
      { src: '/images/projects/dom-glucholazy-05', alt: 'Łazienka z wolnostojącą wanną', type: 'visualization' },
      { src: '/images/projects/dom-glucholazy-06', alt: 'Rzut parteru domu', type: 'plan' },
    ],
  },
  {
    id: 'loft-wroclaw',
    title: 'LOFT Bar & Restaurant',
    place: 'Wrocław',
    year: '2024',
    category: 'wnętrza',
    kind: 'Projekt lokalu gastronomicznego',
    area: '200 m²',
    status: 'Projekt wnętrza i elewacji',
    description:
      'Projekt łączy ceglaną elewację i czarną stal z ciepłym światłem oraz drewnem. Wnętrze podzielono na kameralne loże, otwartą salę z dużymi przeszkleniami i zaplecze gastronomiczne. Układ funkcjonalny porządkuje ruch gości i pracę lokalu.',
    videos: [
      { src: '/videos/loft-wroclaw-tour.mp4', startAt: 0 },
    ],
    images: [
      { src: '/images/projects/loft-wroclaw-01', alt: 'Elewacja lokalu LOFT Bar & Restaurant we Wrocławiu', type: 'visualization' },
      { src: '/images/projects/loft-wroclaw-02', alt: 'Sala restauracyjna z cegłą, czarną stalą i ciepłym światłem', type: 'visualization' },
      { src: '/images/projects/loft-wroclaw-03', alt: 'Wnętrze restauracji z widokiem na ogród', type: 'visualization' },
      { src: '/images/projects/loft-wroclaw-04', alt: 'Rzut funkcjonalny restauracji i układ ścian', type: 'plan' },
    ],
  },
  {
    id: 'apartament-torrevieja',
    title: 'Apartament w słonecznej Torrevieja',
    place: 'Torrevieja, Hiszpania',
    category: 'wnętrza',
    kind: 'Projekt wnętrza apartamentu',
    area: '60 m²',
    status: 'Wizualizacje projektu',
    description:
      'Jasna, otwarta strefa dzienna łączy kuchnię, jadalnię i salon. Prosta biała zabudowa stanowi tło dla dekoracyjnej, kolorowej mozaiki inspirowanej południowym charakterem miejsca. Funkcjonalny układ mieści wszystkie codzienne strefy bez wizualnego przeciążenia niewielkiej przestrzeni.',
    videos: [
      { src: '/videos/apartament-torrevieja-tour.mp4', startAt: 0 },
    ],
    images: [
      { src: '/images/projects/apartament-torrevieja-01', alt: 'Strefa dzienna apartamentu w Torrevieja', type: 'visualization' },
      { src: '/images/projects/apartament-torrevieja-02', alt: 'Jadalnia i salon z kolorową mozaiką kuchenną', type: 'visualization' },
      { src: '/images/projects/apartament-torrevieja-03', alt: 'Kuchnia i jadalnia w jasnym apartamencie', type: 'visualization' },
      { src: '/images/projects/apartament-torrevieja-04', alt: 'Rzut funkcjonalny apartamentu o powierzchni 60 m²', type: 'plan' },
    ],
  },
  {
    id: 'mieszkanie-2-pokoje-nysa',
    title: 'Mieszkanie z dwiema sypialniami',
    place: 'Nysa',
    category: 'wnętrza',
    kind: 'Projekt wnętrza mieszkania',
    status: 'Projekt aranżacji',
    description:
      'Jasne mieszkanie łączy naturalne drewno, spokojne kolory i dyskretne oświetlenie liniowe. Otwarta kuchnia płynnie przechodzi w salon i jadalnię, a w sypialni znalazło się miejsce na pojemną zabudowę i stanowisko do pracy. Galeria pokazuje koncepcję wnętrza, plan oraz stan mieszkania przed pracami.',
    images: [
      { src: '/images/projects/mieszkanie-2-pokoje-nysa-01', alt: 'Salon z aneksem kuchennym w mieszkaniu w Nysie', type: 'visualization' },
      { src: '/images/projects/mieszkanie-2-pokoje-nysa-02', alt: 'Sypialnia z zabudową na wymiar i miejscem do pracy', type: 'visualization' },
      { src: '/images/projects/mieszkanie-2-pokoje-nysa-03', alt: 'Łazienka z prysznicem i mozaiką', type: 'visualization' },
      { src: '/images/projects/mieszkanie-2-pokoje-nysa-04', alt: 'Jasny korytarz z zabudową i lustrzanymi frontami', type: 'visualization' },
      { src: '/images/projects/mieszkanie-2-pokoje-nysa-05', alt: 'Mieszkanie przed rozpoczęciem prac', type: 'photo' },
      { src: '/images/projects/mieszkanie-2-pokoje-nysa-06', alt: 'Rzut mieszkania z układem elektryki', type: 'plan' },
    ],
  },
  {
    id: 'kawalerka-35m-nysa',
    title: 'Kawalerka z pomysłem na 35 m²',
    place: 'Nysa',
    category: 'wnętrza',
    kind: 'Projekt wnętrza mieszkania',
    area: '35 m²',
    status: 'Projekt aranżacji',
    description:
      'Kompaktowe mieszkanie zorganizowano wokół otwartej strefy dziennej i wielofunkcyjnej zabudowy. Jasna paleta, ukryte przechowywanie i geometryczne oświetlenie pomagają zachować poczucie przestrzeni. Rzut pokazuje precyzyjnie zaplanowany układ mebli i instalacji.',
    images: [
      { src: '/images/projects/kawalerka-35m-nysa-01', alt: 'Strefa dzienna kompaktowej kawalerki o powierzchni 35 m²', type: 'visualization' },
      { src: '/images/projects/kawalerka-35m-nysa-02', alt: 'Kuchnia i strefa dzienna w trakcie realizacji', type: 'photo' },
      { src: '/images/projects/kawalerka-35m-nysa-03', alt: 'Strefa sypialniana i zabudowa meblowa', type: 'photo' },
      { src: '/images/projects/kawalerka-35m-nysa-04', alt: 'Łazienka z podświetlanym lustrem i zabudową', type: 'photo' },
      { src: '/images/projects/kawalerka-35m-nysa-05', alt: 'Rzut funkcjonalny kawalerki', type: 'plan' },
    ],
  },
  {
    id: 'wnetrze-pod-skosami',
    title: 'Wnętrze pod skosami',
    place: 'Nysa',
    category: 'wnętrza',
    kind: 'Projekt wnętrza',
    status: 'Koncepcja i rzut funkcjonalny',
    description:
      'Otwarta strefa dzienna wykorzystuje wysokość poddasza i eksponuje drewnianą konstrukcję dachu. Jasne drewno, cegła i czarne detale porządkują kompozycję, a przemyślany układ mieści wypoczynek, jadalnię i kącik do pracy. W galerii znajduje się również rzut oraz koncepcja łazienki.',
    images: [
      { src: '/images/projects/wnetrze-pod-skosami-01', alt: 'Otwarta strefa dzienna pod drewnianą konstrukcją dachu', type: 'visualization' },
      { src: '/images/projects/wnetrze-pod-skosami-02', alt: 'Kameralny kąt wypoczynkowy na poddaszu', type: 'visualization' },
      { src: '/images/projects/wnetrze-pod-skosami-03', alt: 'Łazienka z prysznicem typu walk-in i drewnianą zabudową', type: 'visualization' },
      { src: '/images/projects/wnetrze-pod-skosami-04', alt: 'Rzut funkcjonalny mieszkania na poddaszu', type: 'plan' },
      { src: '/images/projects/wnetrze-pod-skosami-living-room', alt: 'Salon pod skosami z drewnianą konstrukcją dachu', type: 'visualization' },
      { src: '/images/projects/wnetrze-pod-skosami-dining', alt: 'Otwarta strefa dzienna z aneksem kuchennym pod skosami', type: 'visualization' },
    ],
  },
  {
    id: 'ogrod-rezydencjonalny',
    title: 'Ogród rezydencjonalny',
    category: 'ogrody',
    kind: 'Projekt ogrodu',
    status: 'Koncepcja i plan nasadzeń',
    description:
      'Geometryczna kompozycja nawierzchni spotyka się tu z miękkimi liniami rabat i wielopiętrową zielenią. Pergola osłania strefę jadalnianą, a mniejsze miejsca odpoczynku prowadzą w głąb ogrodu. Materiały obejmują wizualizację, układ nasadzeń oraz plan zagospodarowania.',
    videos: [
      { src: '/videos/ogrod-rezydencjonalny-tour.mp4', startAt: 0 },
    ],
    images: [
      { src: '/images/projects/ogrod-rezydencjonalny-01', alt: 'Widok ogrodu z centralną rabatą i strefą wypoczynku', type: 'visualization' },
      { src: '/images/projects/ogrod-rezydencjonalny-02', alt: 'Koncepcja zagospodarowania ogrodu z góry', type: 'plan' },
      { src: '/images/projects/ogrod-rezydencjonalny-03', alt: 'Plan nasadzeń i materiałów ogrodowych', type: 'plan' },
      { src: '/images/projects/ogrod-rezydencjonalny-04', alt: 'Rzut ogrodu z układem ścieżek i stref', type: 'plan' },
      { src: '/images/projects/ogrod-rezydencjonalny-pergola-day', alt: 'Dzienna strefa wypoczynku pod pergolą w ogrodzie rezydencjonalnym', type: 'visualization' },
      { src: '/images/projects/ogrod-rezydencjonalny-evening', alt: 'Wieczorny ogród z oświetloną pergolą i ścieżkami', type: 'visualization' },
    ],
  },
  {
    id: 'ogrod-w-lubrzy',
    title: 'Ogród z pergolą i sadem',
    place: 'Lubrza',
    year: '2024',
    category: 'ogrody',
    kind: 'Projekt ogrodu',
    area: '35 arów',
    status: 'Projekt zagospodarowania terenu',
    description:
      'Projekt porządkuje 35-arową posesję w strefy reprezentacyjne, wypoczynkowe i użytkowe. Drewniane pergole, kamienne ścieżki i ceglane akcenty nawiązują do wiejskiego charakteru miejsca, a uporządkowany sad i miękkie rabaty nadają ogrodowi własny rytm.',
    videos: [
      { src: '/videos/ogrod-lubrza-pergola-sad.mp4', startAt: 0 },
    ],
    images: [
      { src: '/images/projects/ogrod-w-lubrzy-01', alt: 'Ogród w Lubrzy z pergolą i wielopoziomowymi nasadzeniami', type: 'visualization' },
      { src: '/images/projects/ogrod-w-lubrzy-02', alt: 'Wieczorne ujęcie ogrodu z góry', type: 'visualization' },
      { src: '/images/projects/ogrod-w-lubrzy-03', alt: 'Taras wypoczynkowy przy istniejącym domu', type: 'visualization' },
      { src: '/images/projects/ogrod-w-lubrzy-04', alt: 'Ścieżka ogrodowa prowadzona przez drewnianą pergolę', type: 'visualization' },
      { src: '/images/projects/ogrod-w-lubrzy-05', alt: 'Rzut koncepcyjny ogrodu', type: 'plan' },
      { src: '/images/projects/ogrod-w-lubrzy-07', alt: 'Strefa jadalniana pod pergolą otwarta na ogród', type: 'visualization' },
      { src: '/images/projects/ogrod-w-lubrzy-08', alt: 'Widok z góry na ogród, ścieżki i taras', type: 'visualization' },
      { src: '/images/projects/ogrod-w-lubrzy-09', alt: 'Pergola i rabaty w słonecznej części ogrodu', type: 'visualization' },
      { src: '/images/projects/ogrod-w-lubrzy-10', alt: 'Drewniana pergola przy tarasie i kwitnących rabatach', type: 'visualization' },
      { src: '/images/projects/ogrod-w-lubrzy-11', alt: 'Ścieżka ogrodowa pod drewnianą konstrukcją pergoli', type: 'visualization' },
      { src: '/images/projects/ogrod-w-lubrzy-12', alt: 'Altana ogrodowa otoczona rabatami i ścieżkami', type: 'visualization' },
      { src: '/images/projects/ogrod-w-lubrzy-13', alt: 'Wieczorny widok ogrodu z ciepłym oświetleniem pergoli', type: 'visualization' },
      { src: '/images/projects/ogrod-w-lubrzy-14', alt: 'Nocny widok z góry na oświetlony ogród', type: 'visualization' },
      { src: '/images/projects/ogrod-w-lubrzy-15', alt: 'Zimowy ogród i oświetlona altana', type: 'visualization' },
    ],
  },
  {
    id: 'kompleks-nad-woda',
    title: 'Kompleks wielofunkcyjny nad wodą',
    category: 'inwestycje',
    kind: 'Projekt wielofunkcyjny',
    status: 'Koncepcja architektoniczna',
    description:
      'Koncepcja łączy apartamenty, lokale usługowe, restaurację i strefy rekreacji w jednym założeniu nad wodą. Tarasowe ogrody, basen i duże przeszklenia otwierają architekturę na krajobraz. Projektujemy nie tylko budynki, lecz także pomysły i inwestycje naszych klientów. Jeśli planujesz obiekt deweloperski lub większy kompleks, przeprowadzimy Cię przez cały proces — od pierwszej koncepcji i układu funkcji, przez projekt architektoniczny i dokumentację, aż po koordynację kolejnych etapów realizacji.',
    coverImage: { src: '/images/projects/kompleks-nad-woda-03', alt: 'Nocna wizualizacja kompleksu widzianego z oddali', type: 'visualization' },
    videos: [
      { src: '/videos/kompleks-nad-woda-joined.mp4', startAt: 0 },
    ],
    images: [
      { src: '/images/projects/kompleks-nad-woda-01', alt: 'Widok z góry na kompleks nad wodą i otaczającą zieleń', type: 'visualization' },
      { src: '/images/projects/kompleks-nad-woda-02', alt: 'Budynek wielofunkcyjny od strony miejskiego placu', type: 'visualization' },
      { src: '/images/projects/kompleks-nad-woda-03', alt: 'Wieczorna wizualizacja kompleksu i oświetlonej ulicy', type: 'visualization' },
      { src: '/images/projects/kompleks-nad-woda-04', alt: 'Basen i taras wypoczynkowy nad wodą', type: 'visualization' },
      { src: '/images/projects/kompleks-nad-woda-05', alt: 'Salon apartamentu z widokiem na wodę', type: 'visualization' },
      { src: '/images/projects/kompleks-nad-woda-06', alt: 'Kuchnia apartamentu z wyspą i panoramicznym widokiem', type: 'visualization' },
      { src: '/images/projects/kompleks-nad-woda-07', alt: 'Przeszklona strefa fitness z widokiem na rzekę', type: 'visualization' },
      { src: '/images/projects/kompleks-nad-woda-08', alt: 'Detal fasady i parteru usługowego', type: 'visualization' },
      { src: '/images/projects/kompleks-nad-woda-09', alt: 'Widok kompleksu od strony nabrzeża', type: 'visualization' },
      { src: '/images/projects/kompleks-nad-woda-10', alt: 'Rysunek elewacji budynku', type: 'elevation' },
      { src: '/images/projects/kompleks-nad-woda-11', alt: 'Hol wejściowy kompleksu z recepcją i windami', type: 'visualization' },
      { src: '/images/projects/kompleks-nad-woda-12', alt: 'Wnętrze centrum handlowego z pasażem i ruchomymi schodami', type: 'visualization' },
    ],
  },
  {
    id: 'park-biala-cerkiew',
    title: 'Park miejski w Białej Cerkwi',
    place: 'Biała Cerkiew, Ukraina',
    category: 'ogrody',
    kind: 'Projekt przestrzeni publicznej',
    status: 'Koncepcja architektoniczna',
    description:
      'Koncepcja parku dziecięcego w Białej Cerkwi łączy miejsca zabawy i aktywności z zielonymi strefami odpoczynku. Aleje spacerowe, place zabaw, elementy wodne, kawiarnia i miejsca spotkań tworzą przyjazną przestrzeń dla mieszkańców w różnym wieku. Projekt obejmuje układ krajobrazowy oraz dobór małej architektury i wyposażenia.',
    coverImage: { src: '/images/projects/park-biala-cerkiew-01', alt: 'Mostek nad wodą i kwitnące rabaty w parku miejskim', type: 'visualization' },
    videos: [
      { src: '/videos/park-biala-cerkiew-loop-from-3s.mp4', startAt: 0 },
    ],
    images: [
      { src: '/images/projects/park-biala-cerkiew-01', alt: 'Mostek nad wodą i kwitnące rabaty w parku miejskim', type: 'visualization' },
      { src: '/images/projects/park-biala-cerkiew-concept', alt: 'Pełna koncepcja parku: plan generalny, układ stref, ścieżki i wizualizacje', type: 'plan' },
      { src: '/images/projects/park-biala-cerkiew-overview', alt: 'Panorama parku z alejami, zielenią i miejscami do wypoczynku', type: 'visualization' },
      { src: '/images/projects/park-biala-cerkiew-02', alt: 'Widok z góry na układ ścieżek, fontannę i strefy rekreacji', type: 'visualization' },
      { src: '/images/projects/park-biala-cerkiew-03', alt: 'Plac zabaw i ścieżka rowerowa wśród drzew', type: 'visualization' },
      { src: '/images/projects/park-biala-cerkiew-04', alt: 'Kawiarnia i miejsca odpoczynku przy wodzie', type: 'visualization' },
      { src: '/images/projects/park-biala-cerkiew-05', alt: 'Rysunki techniczne elementów wyposażenia parku', type: 'elevation' },
      { src: '/images/projects/park-biala-cerkiew-07', alt: 'Drewniane urządzenia zabawowe i strefa rekreacji', type: 'visualization' },
      { src: '/images/projects/park-biala-cerkiew-08', alt: 'Jesienny park wieczorem po deszczu, z fontanną i podświetlonymi alejami', type: 'visualization' },
      { src: '/images/projects/park-biala-cerkiew-09', alt: 'Zimowa odsłona parku z oświetlonymi alejami i śniegiem', type: 'visualization' },
    ],
  },
  {
    id: 'kameralne-osiedle-pietrowice',
    title: 'Kameralne osiedle domów',
    place: 'Pietrowice',
    category: 'inwestycje',
    kind: 'Koncepcja zespołu domów jednorodzinnych',
    area: '3 działki po ok. 9,7 ara',
    status: 'Koncepcja architektoniczna',
    description:
      'Koncepcja kameralnego zespołu domów w zabudowie bliźniaczej o spójnej, nowoczesnej formie. Dachy dwuspadowe, jasne elewacje, drewniane akcenty i prywatne ogrody nadają całości uporządkowany charakter. Układ działek i dojazdu zapewnia każdemu domowi własną przestrzeń, taras i wygodne połączenie z drogą.',
    images: [
      { src: '/images/projects/pietrowice-street', alt: 'Zespół jasnych domów bliźniaczych przy drodze osiedlowej', type: 'visualization' },
      { src: '/images/projects/pietrowice-family-front', alt: 'Wejście do domu bliźniaczego z rodziną na ścieżce', type: 'visualization' },
      { src: '/images/projects/pietrowice-pergola', alt: 'Taras z drewnianą pergolą przy domu bliźniaczym', type: 'visualization' },
      { src: '/images/projects/pietrowice-evening', alt: 'Domy bliźniacze w wieczornym świetle', type: 'visualization' },
      { src: '/images/projects/pietrowice-garden', alt: 'Ogród z tarasem, basenem i strefą wypoczynku', type: 'visualization' },
      { src: '/images/projects/pietrowice-site-plan', alt: 'Widok z góry na układ działek i domów', type: 'plan' },
      { src: '/images/projects/pietrowice-interior', alt: 'Salon połączony z kuchnią i jadalnią', type: 'visualization' },
    ],
  },
  {
    id: 'palac-kachanowka',
    title: 'Pałac w Kachanówce',
    place: 'Kachanówka',
    category: 'inwestycje',
    kind: 'Koncepcja rezydencjonalna',
    status: 'Wizualizacja',
    description:
      'Filmowa prezentacja pałacu i otaczającego go ogrodu, pokazana w zimowej i dziennej odsłonie. Trzy ujęcia łączą się w jedną płynną sekwencję, która podkreśla architekturę rezydencji i charakter miejsca.',
    coverImage: { src: '/images/projects/palac-kachanowka-cover-new', alt: 'Pałac w Kachanówce widziany przez otwartą bramę', type: 'visualization' },
    videos: [
      { src: '/videos/palac-kachanowka-new.mp4', startAt: 0 },
    ],
    images: [
      { src: '/images/projects/palac-kachanowka-front', alt: 'Dzienna wizualizacja pałacu od strony głównego wejścia', type: 'visualization' },
      { src: '/images/projects/palac-kachanowka-aerial', alt: 'Widok z góry na pałac i otaczający go ogród', type: 'visualization' },
      { src: '/images/projects/palac-kachanowka-landscape-plan', alt: 'Plan zagospodarowania terenu pałacu i parku', type: 'plan' },
      { src: '/images/projects/palac-kachanowka-front-elevation', alt: 'Elewacja frontowa pałacu', type: 'elevation' },
      { src: '/images/projects/palac-kachanowka-elevation-materials', alt: 'Elewacja pałacu z paletą materiałów i kolorów', type: 'elevation' },
      { src: '/images/projects/palac-kachanowka-side-elevation', alt: 'Elewacja boczna pałacu z ukształtowaniem terenu', type: 'elevation' },
    ],
  },
]

export const caseStudy = {
  // Text: case.* keys in i18n.tsx.
  images: [
    { src: '/images/skrzypiec-kuchnia', altKey: 'case.image1Alt' },
    { src: '/images/skrzypiec-etap-instalacji', altKey: 'case.image2Alt' },
    { src: '/images/skrzypiec-kuchnia-montaz', altKey: 'case.image3Alt' },
  ],
}

// Each id renders services.<id> and services.<id>Text.
export const services = ['architecture', 'interiors', 'landscape', 'delivery'] as const

// Each id renders process.<id> and process.<id>Text.
export const process = ['consult', 'concept', 'docs', 'execution'] as const

// Keys of the studio paragraphs and principles (each principle also has
// <key>Text).
export const studio = {
  bio: ['studio.bio1', 'studio.bio2', 'studio.bio3'],
  principles: ['studio.principle1', 'studio.principle2', 'studio.principle3'],
}

// Contact form scope chips; each id renders scope.<id>.
export const scopes = ['home', 'interior', 'garden', 'investment', 'turnkey'] as const
export type Scope = (typeof scopes)[number]
