// All copy and data for the landing page live here so they can be edited
// (and later translated) without touching components.

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
}

export const nav = [
  { href: '#realizacje', label: 'Realizacje' },
  { href: '#uslugi', label: 'Usługi' },
  { href: '#proces', label: 'Proces' },
  { href: '#pracownia', label: 'Pracownia' },
  { href: '#kontakt', label: 'Kontakt' },
]

export const hero = {
  headline: ['Projektujemy', 'i budujemy domy,', 'wnętrza i ogrody.'],
  lead:
    'Pracownia z Nysy, od 2015 roku. Od pierwszej rozmowy przez koncepcję i dokumentację po realizację pod klucz, z jedną osobą do kontaktu i tym samym zespołem na budowie.',
  primary: { label: 'Umów bezpłatną konsultację', href: '#kontakt' },
  secondary: { label: 'Realizacje', href: '#realizacje' },
  image: { src: '/images/hero-stalis', alt: 'Parterowy dom z kamienną elewacją i drewnianym podbiciem dachu, oświetlony o zmierzchu' },
}

export type Category = 'domy' | 'wnętrza' | 'inwestycje' | 'ogrody'

export const categories: { id: Category | 'wszystkie'; label: string }[] = [
  { id: 'wszystkie', label: 'Wszystkie' },
  { id: 'domy', label: 'Domy' },
  { id: 'wnętrza', label: 'Wnętrza' },
  { id: 'inwestycje', label: 'Inwestycje' },
  { id: 'ogrody', label: 'Ogrody' },
]

export interface Project {
  id: string
  title: string
  place: string
  year: string
  category: Category
  kind: string
  area?: string
  status?: string
  description: string
  images: { src: string; alt: string }[]
}

export const projects: Project[] = [
  {
    id: 'kosciuszki-25',
    title: 'Klubowy Dom Kościuszki 25',
    place: 'Głuchołazy',
    year: '2026',
    category: 'inwestycje',
    kind: 'Budynek wielorodzinny',
    area: '14 apartamentów',
    description:
      'Kamienica w sercu Głuchołaz, nawiązująca do historycznego charakteru rynku. Parter to 200 m² usług: fitness, gabinet masażu i sala zabaw. Wyżej 14 kameralnych apartamentów z windą, a na dachu 50-metrowy taras widokowy.',
    images: [
      { src: '/images/glucholazy-ulica', alt: 'Biała kamienica z mansardowym dachem przy ulicy Kościuszki' },
      { src: '/images/glucholazy-wnetrze', alt: 'Salon apartamentu ze sztukaterią i jasną podłogą' },
    ],
  },
  {
    id: 'dom-stalis',
    title: 'Dom parterowy z kamieniem i drewnem',
    place: 'okolice Nysy',
    year: '2025',
    category: 'domy',
    kind: 'Dom jednorodzinny',
    area: '180 m²',
    status: 'w budowie',
    description:
      'Parterowy dom o dwuspadowym dachu, z kamiennym filarem i drewnianym podbiciem okapu. Duże przeszklenia otwierają strefę dzienną na taras. Wnętrze utrzymane w beżach z klasycznym sufitem.',
    images: [
      { src: '/images/hero-stalis', alt: 'Elewacja domu o zmierzchu' },
      { src: '/images/stalis-salon', alt: 'Salon w beżach z klasycznym sufitem' },
    ],
  },
  {
    id: 'altea',
    title: 'Apartament nad morzem',
    place: 'Altea, Hiszpania',
    year: '2024',
    category: 'wnętrza',
    kind: 'Wnętrze apartamentu',
    area: '81 m² i 41 m² tarasu',
    description:
      'Śródziemnomorski minimalizm: jasny dąb, biel i mosiężne lampy. Kuchnia otwarta na salon i taras z widokiem na zatokę. Projekt obejmował układ funkcjonalny, dobór mebli i oświetlenia.',
    images: [
      { src: '/images/altea-salon', alt: 'Otwarta kuchnia z salonem i wyjściem na taras' },
      { src: '/images/altea-sypialnia', alt: 'Sypialnia w jasnych barwach' },
    ],
  },
  {
    id: 'dom-prudnik',
    title: 'Dom stodoła na skarpie',
    place: 'Prudnik',
    year: '2025',
    category: 'domy',
    kind: 'Dom jednorodzinny',
    status: 'w budowie',
    description:
      'Prosta bryła stodoły osadzona na zboczu, z drewnianym tarasem i dużymi przeszkleniami od strony ogrodu. W środku otwarta strefa dzienna wokół kaflowego pieca.',
    images: [
      { src: '/images/prudnik-dom', alt: 'Dom w formie stodoły na skarpie z tarasem' },
      { src: '/images/prudnik-salon', alt: 'Wnętrze z kaflowym piecem i drewnianymi drzwiami' },
    ],
  },
  {
    id: 'loft',
    title: 'Bar i restauracja LOFT',
    place: 'Wrocław',
    year: '2024',
    category: 'wnętrza',
    kind: 'Lokal gastronomiczny',
    area: '200 m²',
    description:
      'Industrialne wnętrze w ceglanych murach: czarna stal, drewno i ciepłe światło. Projekt elewacji z szyldem, sali, baru i zaplecza.',
    images: [
      { src: '/images/loft-elewacja', alt: 'Ceglana elewacja lokalu z szyldem LOFT' },
      { src: '/images/loft-wnetrze', alt: 'Sala restauracyjna z cegłą i czarną stalą' },
    ],
  },
  {
    id: 'witolda',
    title: 'Apartament przy Księcia Witolda',
    place: 'Wrocław',
    year: '2023',
    category: 'wnętrza',
    kind: 'Wnętrze mieszkania',
    area: '72 m² i balkon',
    description:
      'Ciemne, nastrojowe wnętrze: skórzana sofa, granatowy aksamit, ciepłe drewno. Sypialnia w głębokich barwach z ukrytym oświetleniem.',
    images: [
      { src: '/images/witolda-salon', alt: 'Salon ze skórzaną sofą i granatowym fotelem' },
      { src: '/images/witolda-sypialnia', alt: 'Ciemna sypialnia z ukrytym oświetleniem' },
    ],
  },
  {
    id: 'dom-110',
    title: 'Dom parterowy 110 m²',
    place: 'Wrocław',
    year: '2026',
    category: 'domy',
    kind: 'Dom jednorodzinny',
    area: '110 m² na działce 6 arów',
    description:
      'Parterowy dom dla rodziny, bez schodów, z minimalistyczną bryłą i dużymi przeszkleniami zacierającymi granicę między wnętrzem a ogrodem. Projekt energooszczędny.',
    images: [
      { src: '/images/wroclaw-110-taras', alt: 'Wieczorny taras domu parterowego' },
      { src: '/images/wroclaw-110-ogrod', alt: 'Ogród z pergolą przy domu' },
    ],
  },
  {
    id: 'ogrod',
    title: 'Ogród z pergolą i strefą wypoczynku',
    place: 'Opolszczyzna',
    year: '2025',
    category: 'ogrody',
    kind: 'Architektura krajobrazu',
    description:
      'Ogród przydomowy zaprojektowany razem z bryłą domu: pergola z jadalnią, rabaty bylinowe, oświetlenie ścieżek i miejsce na wieczorne spotkania.',
    images: [
      { src: '/images/ogrod-pergola', alt: 'Ogród z pergolą i rabatami o zachodzie słońca' },
      { src: '/images/ogrod-plan', alt: 'Widok ogrodu z góry' },
    ],
  },
]

export const caseStudy = {
  heading: 'Od projektu do klucza',
  text: [
    'Nie oddajemy projektu i nie znikamy. Ten sam zespół, który rysuje koncepcję, prowadzi budowę i odbiera prace. Klient rozmawia z jedną osobą od pierwszego spotkania do wręczenia kluczy.',
    'Rezydencja w Skrzypcu to 750 m² zaprojektowanych i zbudowanych przez nas: od fundamentów, przez instalacje, po marmurową wyspę w kuchni.',
  ],
  caption: 'Rezydencja 750 m², Skrzypiec. Projekt i realizacja, oddana 2023.',
  images: [
    { src: '/images/skrzypiec-kuchnia', alt: 'Kuchnia z marmurową wyspą i szklanymi lampami' },
    { src: '/images/skrzypiec-jadalnia', alt: 'Jadalnia z drewnianymi lamelami' },
    { src: '/images/skrzypiec-dom', alt: 'Zbudowana rezydencja z czerwonym dachem wśród pól' },
  ],
}

export const services = [
  {
    title: 'Architektura',
    text: 'Domy jednorodzinne i rezydencje, budynki wielorodzinne, osiedla i elewacje. Koncepcja, projekt budowlany i wykonawczy, uzgodnienia.',
  },
  {
    title: 'Wnętrza',
    text: 'Mieszkania, apartamenty i lokale usługowe. Układ, materiały, meble na wymiar, oświetlenie. Także dobór mebli i dodatków do gotowego wnętrza.',
  },
  {
    title: 'Ogrody i krajobraz',
    text: 'Ogrody, tarasy, nawierzchnie, zieleń i światło zewnętrzne. Projektowane razem z domem, nie po nim.',
  },
  {
    title: 'Realizacja i nadzór',
    text: 'Budowa pod klucz własnym zespołem, nadzór autorski, kosztorys, harmonogram i koordynacja wykonawców.',
  },
]

export const process = [
  {
    title: 'Konsultacja',
    text: 'Bezpłatne spotkanie w Nysie lub online. Rozmawiamy o działce, budżecie i tym, jak chcecie mieszkać.',
  },
  {
    title: 'Koncepcja',
    text: 'Układ, bryła, wizualizacje 3D. Poprawiamy, aż powiecie: to jest to.',
  },
  {
    title: 'Dokumentacja',
    text: 'Projekt budowlany i wykonawczy, pozwolenia, specyfikacja materiałów i kosztorys.',
  },
  {
    title: 'Realizacja',
    text: 'Budowa i wykończenie pod klucz albo nadzór autorski nad wybranym przez Was wykonawcą.',
  },
]

export const studio = {
  name: 'Petro Mikula',
  role: 'Projektant, założyciel M Design House',
  portrait: { src: '/images/petro-mikula', alt: 'Petro Mikula, portret' },
  bio: [
    'Projektuję przestrzenie, które łączą formę, funkcję i dobre rzemiosło. Każdy projekt traktuję jak osobne zadanie: z własnym detalem, ergonomią i doborem materiałów.',
    'Prowadzę pracownię w Nysie od 2015 roku. Projektuję domy, inwestycje i wnętrza na Opolszczyźnie, we Wrocławiu i w Hiszpanii, a moja ekipa buduje to, co narysuję.',
  ],
  earlier: {
    heading: 'Wcześniejsze prace',
    text: 'Zanim powstała pracownia w Nysie: rekonstrukcja zespołu pałacowo-parkowego w Kaczanówce i park miejski w Białej Cerkwi.',
    images: [
      { src: '/images/palac-kaczanowka', alt: 'Pałac z zieloną kopułą w parku' },
      { src: '/images/park-biala-cerkiew', alt: 'Park miejski z mostkami i fontannami z lotu ptaka' },
    ],
  },
}

export const contact = {
  heading: 'Porozmawiajmy o Waszym projekcie',
  text: 'Napiszcie, co chcecie zbudować lub urządzić. Odpowiadamy w ciągu dwóch dni roboczych z propozycją terminu bezpłatnej konsultacji.',
  scopes: ['Dom', 'Wnętrze', 'Ogród', 'Inwestycja', 'Budowa pod klucz'],
}
