# ZMIANY — M Design House, wersja źródłowa 52

## Uruchomienie

- **Node.js:** 24.19.0 (wersja użyta do sprawdzenia buildu); **npm:** 11.9.0.
- Instalacja zależności: `npm ci`
- Uruchomienie lokalne: `npm run dev`
- Sprawdzenie typów i build produkcyjny: `npm run build`
- Podgląd zbudowanej wersji: `npm run preview`
- Lint: `npm run lint`

Stos: React 19, TypeScript 6, Vite 8, Tailwind CSS 4 i GSAP. Archiwum nie zawiera `node_modules/` ani `dist/`; zależności instaluje się z `package-lock.json` przez `npm ci`.

## Zmiany względem projektu bazowego

Porównanie z wersją bazową **v49**, commit `d1ceed07b0b241d18169bfcb30f8144246ee2785` z 10.10.2026. Archiwum zawiera bieżący kod **v52**, commit `598b185636ba128c433b94b33da5be498f550005` z 15.10.2026.

- Dodano obsługę języków PL/EN/UK w `src/lib/i18n.tsx`. Wybór języka zapisuje się w `localStorage`; przetłumaczono nawigację, stronę główną, projekty i galerie, usługi, etapy pracy, opis pracowni, kontakt oraz stopkę.
- W przełączniku języka pozostawiono polski, angielski i ukraiński; włoski, hiszpański, niemiecki i rosyjski usunięto.
- Dodano przycisk dźwięku w menu na komputerze i telefonie. Dźwięk można wyciszyć; uruchamia się po pierwszej interakcji użytkownika, zgodnie z ograniczeniami przeglądarek.
- Dodano generowane w przeglądarce tło dźwiękowe: szum wody, trzaski ognia i syntetyczne głosy ptaków. Nie jest to osobny plik audio.
- W bloku „Od projektu do klucza” pozostawiono główne zdjęcie i podmieniono dwa mniejsze: `skrzypiec-etap-instalacji.webp` oraz `skrzypiec-kuchnia-montaz.webp`.
- W galerii projektu „Ogród z pergolą i sadem” ukryto szóste zdjęcie. Plik `projects/ogrod-w-lubrzy-06.webp` został w `public/`, ale nie jest wyświetlany.
- Uspójniono responsywne menu, przełącznik języka i przyciski dźwięku; przetłumaczono również link dostępności „przejdź do treści”.

## Tłumaczenia

Polski jest językiem źródłowym; treści znajdują się głównie w `src/content/site.ts`. Tłumaczenia EN i UK są przygotowane z polskich tekstów przy pomocy ChatGPT i zapisane w `src/lib/i18n.tsx`. Nie korzystają z zewnętrznego API tłumaczeniowego. Zostały sprawdzone pod kątem działania w kodzie i poprawnego buildu, ale nie były redagowane ani weryfikowane przez profesjonalnego tłumacza lub native speakera. Przed publikacją warto zlecić ich korektę.

## Muzyka i licencja

W `public/` nie ma muzyki ani pliku z nagraniem przyrody. `src/components/Nav.tsx` generuje 48-sekundową zapętloną atmosferę w Web Audio API: szum imitujący wodę, trzaski oraz syntetyczne ptasie gwizdy. Nie użyto zewnętrznych nagrań, sampli, bibliotek muzycznych ani cudzych utworów. Kod syntezatora należy do kodu projektu; dźwięk jest generowany w przeglądarce, a nie nagrany w terenie.

## Używane pliki graficzne

Wykaz ustalono na podstawie odwołań w `src/` i `index.html`. `Picture` dopisuje rozszerzenie `.webp`, gdy ścieżka w danych nie zawiera rozszerzenia. Z 197 plików graficznych w `public/images/` kod odwołuje się do 168; pozostałe wymieniono niżej.

- `public/images/hero-m-design-house.webp`
- `public/images/hero-pergola-poster.webp`
- `public/images/logo-mark.png`
- `public/images/mdh-logo-dark.png`
- `public/images/mdh-logo-light.png`
- `public/images/projects/altea-01.webp`
- `public/images/projects/altea-02.webp`
- `public/images/projects/altea-03.webp`
- `public/images/projects/altea-04.webp`
- `public/images/projects/apartament-torrevieja-01.webp`
- `public/images/projects/apartament-torrevieja-02.webp`
- `public/images/projects/apartament-torrevieja-03.webp`
- `public/images/projects/apartament-torrevieja-04.webp`
- `public/images/projects/apartament-witolda-bathroom-replacement.webp`
- `public/images/projects/apartament-witolda-wroclaw-01.webp`
- `public/images/projects/apartament-witolda-wroclaw-03.webp`
- `public/images/projects/apartament-witolda-wroclaw-04.webp`
- `public/images/projects/apartament-witolda-wroclaw-05.webp`
- `public/images/projects/apartament-witolda-wroclaw-06.webp`
- `public/images/projects/dom-110-wroclaw-01.webp`
- `public/images/projects/dom-110-wroclaw-02.webp`
- `public/images/projects/dom-110-wroclaw-03.webp`
- `public/images/projects/dom-110-wroclaw-04.webp`
- `public/images/projects/dom-110-wroclaw-05.webp`
- `public/images/projects/dom-110-wroclaw-06.webp`
- `public/images/projects/dom-110-wroclaw-electrical-plan.webp`
- `public/images/projects/dom-110-wroclaw-elevations.webp`
- `public/images/projects/dom-glucholazy-01.webp`
- `public/images/projects/dom-glucholazy-02.webp`
- `public/images/projects/dom-glucholazy-03.webp`
- `public/images/projects/dom-glucholazy-04.webp`
- `public/images/projects/dom-glucholazy-05.webp`
- `public/images/projects/dom-glucholazy-06.webp`
- `public/images/projects/dom-na-stoku-prudnik-01.webp`
- `public/images/projects/dom-na-stoku-prudnik-02.webp`
- `public/images/projects/dom-na-stoku-prudnik-03.webp`
- `public/images/projects/dom-na-stoku-prudnik-04.webp`
- `public/images/projects/dom-na-stoku-prudnik-05.webp`
- `public/images/projects/dom-na-stoku-prudnik-06.webp`
- `public/images/projects/dom-stalis-180-01.webp`
- `public/images/projects/dom-stalis-180-02.webp`
- `public/images/projects/dom-stalis-180-03.webp`
- `public/images/projects/dom-stalis-180-04.webp`
- `public/images/projects/dom-stalis-180-05.webp`
- `public/images/projects/dom-stalis-180-06.webp`
- `public/images/projects/dom-stalis-180-07.webp`
- `public/images/projects/dom-stalis-180-08.webp`
- `public/images/projects/dom-stalis-180-09.webp`
- `public/images/projects/dom-stalis-180-10.webp`
- `public/images/projects/dom-stalis-180-11.webp`
- `public/images/projects/dom-stalis-180-12.webp`
- `public/images/projects/dom-stalis-180-13.webp`
- `public/images/projects/dom-stalis-180-14.webp`
- `public/images/projects/kawalerka-35m-nysa-01.webp`
- `public/images/projects/kawalerka-35m-nysa-02.webp`
- `public/images/projects/kawalerka-35m-nysa-03.webp`
- `public/images/projects/kawalerka-35m-nysa-04.webp`
- `public/images/projects/kawalerka-35m-nysa-05.webp`
- `public/images/projects/klubowy-dom-kosciuszki-25-01.webp`
- `public/images/projects/klubowy-dom-kosciuszki-25-02.webp`
- `public/images/projects/klubowy-dom-kosciuszki-25-03.webp`
- `public/images/projects/klubowy-dom-kosciuszki-25-04.webp`
- `public/images/projects/klubowy-dom-kosciuszki-25-05.webp`
- `public/images/projects/klubowy-dom-kosciuszki-25-06.webp`
- `public/images/projects/kompleks-nad-woda-01.webp`
- `public/images/projects/kompleks-nad-woda-02.webp`
- `public/images/projects/kompleks-nad-woda-03.webp`
- `public/images/projects/kompleks-nad-woda-04.webp`
- `public/images/projects/kompleks-nad-woda-05.webp`
- `public/images/projects/kompleks-nad-woda-06.webp`
- `public/images/projects/kompleks-nad-woda-07.webp`
- `public/images/projects/kompleks-nad-woda-08.webp`
- `public/images/projects/kompleks-nad-woda-09.webp`
- `public/images/projects/kompleks-nad-woda-10.webp`
- `public/images/projects/kompleks-nad-woda-11.webp`
- `public/images/projects/kompleks-nad-woda-12.webp`
- `public/images/projects/loft-wroclaw-01.webp`
- `public/images/projects/loft-wroclaw-02.webp`
- `public/images/projects/loft-wroclaw-03.webp`
- `public/images/projects/loft-wroclaw-04.webp`
- `public/images/projects/mieszkanie-2-pokoje-nysa-01.webp`
- `public/images/projects/mieszkanie-2-pokoje-nysa-02.webp`
- `public/images/projects/mieszkanie-2-pokoje-nysa-03.webp`
- `public/images/projects/mieszkanie-2-pokoje-nysa-04.webp`
- `public/images/projects/mieszkanie-2-pokoje-nysa-05.webp`
- `public/images/projects/mieszkanie-2-pokoje-nysa-06.webp`
- `public/images/projects/ogrod-rezydencjonalny-01.webp`
- `public/images/projects/ogrod-rezydencjonalny-02.webp`
- `public/images/projects/ogrod-rezydencjonalny-03.webp`
- `public/images/projects/ogrod-rezydencjonalny-04.webp`
- `public/images/projects/ogrod-rezydencjonalny-evening.webp`
- `public/images/projects/ogrod-rezydencjonalny-pergola-day.webp`
- `public/images/projects/ogrod-w-lubrzy-01.webp`
- `public/images/projects/ogrod-w-lubrzy-02.webp`
- `public/images/projects/ogrod-w-lubrzy-03.webp`
- `public/images/projects/ogrod-w-lubrzy-04.webp`
- `public/images/projects/ogrod-w-lubrzy-05.webp`
- `public/images/projects/ogrod-w-lubrzy-07.webp`
- `public/images/projects/ogrod-w-lubrzy-08.webp`
- `public/images/projects/ogrod-w-lubrzy-09.webp`
- `public/images/projects/ogrod-w-lubrzy-10.webp`
- `public/images/projects/ogrod-w-lubrzy-11.webp`
- `public/images/projects/ogrod-w-lubrzy-12.webp`
- `public/images/projects/ogrod-w-lubrzy-13.webp`
- `public/images/projects/ogrod-w-lubrzy-14.webp`
- `public/images/projects/ogrod-w-lubrzy-15.webp`
- `public/images/projects/palac-kachanowka-aerial.webp`
- `public/images/projects/palac-kachanowka-cover-new.webp`
- `public/images/projects/palac-kachanowka-elevation-materials.webp`
- `public/images/projects/palac-kachanowka-front-elevation.webp`
- `public/images/projects/palac-kachanowka-front.webp`
- `public/images/projects/palac-kachanowka-landscape-plan.webp`
- `public/images/projects/palac-kachanowka-side-elevation.webp`
- `public/images/projects/park-biala-cerkiew-01.webp`
- `public/images/projects/park-biala-cerkiew-02.webp`
- `public/images/projects/park-biala-cerkiew-03.webp`
- `public/images/projects/park-biala-cerkiew-04.webp`
- `public/images/projects/park-biala-cerkiew-05.webp`
- `public/images/projects/park-biala-cerkiew-07.webp`
- `public/images/projects/park-biala-cerkiew-08.webp`
- `public/images/projects/park-biala-cerkiew-09.webp`
- `public/images/projects/park-biala-cerkiew-concept.webp`
- `public/images/projects/park-biala-cerkiew-overview.webp`
- `public/images/projects/pietrowice-evening.webp`
- `public/images/projects/pietrowice-family-front.webp`
- `public/images/projects/pietrowice-garden.webp`
- `public/images/projects/pietrowice-interior.webp`
- `public/images/projects/pietrowice-pergola.webp`
- `public/images/projects/pietrowice-site-plan.webp`
- `public/images/projects/pietrowice-street.webp`
- `public/images/projects/rezydencja-skrzypiec-01.webp`
- `public/images/projects/rezydencja-skrzypiec-02.webp`
- `public/images/projects/rezydencja-skrzypiec-03.webp`
- `public/images/projects/rezydencja-skrzypiec-04.webp`
- `public/images/projects/rezydencja-skrzypiec-05.webp`
- `public/images/projects/rezydencja-skrzypiec-06.webp`
- `public/images/projects/rezydencja-skrzypiec-07.webp`
- `public/images/projects/rezydencja-skrzypiec-08.webp`
- `public/images/projects/rezydencja-skrzypiec-09.webp`
- `public/images/projects/rezydencja-skrzypiec-10.webp`
- `public/images/projects/rezydencja-skrzypiec-11.webp`
- `public/images/projects/rezydencja-skrzypiec-12.webp`
- `public/images/projects/rezydencja-skrzypiec-13.webp`
- `public/images/projects/rezydencja-skrzypiec-14.webp`
- `public/images/projects/rezydencja-skrzypiec-15.webp`
- `public/images/projects/rezydencja-skrzypiec-16.webp`
- `public/images/projects/rezydencja-skrzypiec-17.webp`
- `public/images/projects/rezydencja-skrzypiec-18.webp`
- `public/images/projects/rezydencja-skrzypiec-19.webp`
- `public/images/projects/rezydencja-skrzypiec-20.webp`
- `public/images/projects/rezydencja-skrzypiec-21.webp`
- `public/images/projects/rezydencja-skrzypiec-22.webp`
- `public/images/projects/rezydencja-skrzypiec-23.webp`
- `public/images/projects/rezydencja-skrzypiec-24.webp`
- `public/images/projects/rezydencja-skrzypiec-25.webp`
- `public/images/projects/rezydencja-skrzypiec-26.webp`
- `public/images/projects/rezydencja-skrzypiec-27.webp`
- `public/images/projects/rezydencja-skrzypiec-28.webp`
- `public/images/projects/rezydencja-skrzypiec-29.webp`
- `public/images/projects/wnetrze-pod-skosami-01.webp`
- `public/images/projects/wnetrze-pod-skosami-02.webp`
- `public/images/projects/wnetrze-pod-skosami-03.webp`
- `public/images/projects/wnetrze-pod-skosami-04.webp`
- `public/images/projects/wnetrze-pod-skosami-dining.webp`
- `public/images/projects/wnetrze-pod-skosami-living-room.webp`
- `public/images/skrzypiec-etap-instalacji.webp`
- `public/images/skrzypiec-kuchnia-montaz.webp`
- `public/images/skrzypiec-kuchnia.webp`

## Używane pliki wideo

W katalogu `public/videos/` znajduje się 24 filmów; do bieżącego interfejsu odwołuje się 18.

- **Finalne tło strony głównej:** `public/videos/mdh-hero-loop-pergola.mp4`.
- **Plakat/obraz zastępczy tła:** `public/images/hero-pergola-poster.webp`.
- `public/videos/mdh-hero-loop.mp4` i `public/videos/mdh-hero-loop-compare.mp4` są alternatywami do porównania, wybieranymi parametrami `?background=landscape` i `?background=compare`; nie są domyślnym tłem.
- Filmy projektowe:
- `public/videos/apartament-altea-tour.mp4`
- `public/videos/apartament-torrevieja-tour.mp4`
- `public/videos/apartament-witolda-morning.mp4`
- `public/videos/dom-110-wroclaw-combined-muted.mp4`
- `public/videos/dom-glucholazy-jednorodzinny.mp4`
- `public/videos/dom-na-stoku-prudnik-interior-muted.mp4`
- `public/videos/dom-stalis-180-loop-from-2s-to-7s.mp4`
- `public/videos/klubowy-dom-kosciuszki-25-loop-from-3_5s.mp4`
- `public/videos/kompleks-nad-woda-joined.mp4`
- `public/videos/loft-wroclaw-tour.mp4`
- `public/videos/mdh-hero-loop-pergola.mp4`
- `public/videos/ogrod-lubrza-pergola-sad.mp4`
- `public/videos/ogrod-rezydencjonalny-tour.mp4`
- `public/videos/palac-kachanowka-new.mp4`
- `public/videos/park-biala-cerkiew-loop-from-3s.mp4`
- `public/videos/rezydencja-skrzypiec-loop-v3.mp4`

## Grafika obecna w `public/`, ale nieużywana w interfejsie

Te pliki pozostawiono w archiwum jako wcześniejsze, pomocnicze lub wycofane z widoku. Wśród nich są starsze logotypy i obrazy robocze. `apartament-witolda-wroclaw-02.webp` zastąpiono ujęciem `apartament-witolda-bathroom-replacement.webp`. `ogrod-w-lubrzy-06.webp` usunięto z galerii na życzenie właściciela, ale plik zachowano w źródłach.

- `public/images/altea-salon.webp`
- `public/images/altea-sypialnia.webp`
- `public/images/glucholazy-ulica.webp`
- `public/images/glucholazy-wnetrze.webp`
- `public/images/hero-stalis.jpg`
- `public/images/hero-stalis.webp`
- `public/images/loft-elewacja.webp`
- `public/images/loft-wnetrze.webp`
- `public/images/logo-light.png`
- `public/images/logo.png`
- `public/images/m-design-house-logo.png`
- `public/images/nysa-kaw-foto.webp`
- `public/images/nysa-kaw-render.webp`
- `public/images/ogrod-pergola.webp`
- `public/images/ogrod-plan.webp`
- `public/images/palac-kaczanowka.webp`
- `public/images/park-biala-cerkiew.webp`
- `public/images/projects/apartament-witolda-wroclaw-02.webp`
- `public/images/projects/ogrod-w-lubrzy-06.webp`
- `public/images/projects/park-biala-cerkiew-06.webp`
- `public/images/prudnik-dom.webp`
- `public/images/prudnik-salon.webp`
- `public/images/skrzypiec-dom.webp`
- `public/images/skrzypiec-jadalnia.webp`
- `public/images/stalis-salon.webp`
- `public/images/witolda-salon.webp`
- `public/images/witolda-sypialnia.webp`
- `public/images/wroclaw-110-ogrod.webp`
- `public/images/wroclaw-110-taras.webp`

## Wideo obecne w `public/`, ale nieużywane w interfejsie

To wersje robocze lub wcześniejsze montaże. Aktywna wersja danego projektu znajduje się po prawej:

| Wersja nieużywana | Status / wersja aktywna |
|---|---|
| `dom-na-stoku-prudnik-interior.mp4` | zastąpiona wersją bez rosyjskiej narracji `dom-na-stoku-prudnik-interior-muted.mp4` |
| `dom-stalis-180-loop.mp4` | zastąpiona wycinkiem od 2. do 7. sekundy `dom-stalis-180-loop-from-2s-to-7s.mp4` |
| `klubowy-dom-kosciuszki-25-loop-from-3s.mp4` | wcześniejsze cięcie; aktywne `klubowy-dom-kosciuszki-25-loop-from-3_5s.mp4` |
| `park-biala-cerkiew-loop.mp4` | zastąpione wersją `park-biala-cerkiew-loop-from-3s.mp4` |
| `rezydencja-skrzypiec-loop.mp4` | oryginał; aktywne `rezydencja-skrzypiec-loop-v3.mp4` |
| `rezydencja-skrzypiec-loop-v2.mp4` | wersja pośrednia; finalna `rezydencja-skrzypiec-loop-v3.mp4` |

## Skrypty i uwagi dla programisty

- `scripts/images.mjs` przygotowuje obrazy za pomocą Sharp. W archiwum są gotowe obrazy w `public/`, ale pominięto archiwum oryginalnych materiałów `design/reference/`, którego ścieżek używa skrypt. Do ponownego generowania grafik trzeba odzyskać pliki źródłowe wymienione w skrypcie.
- W `design/` znajdują się brief, opis struktury i notatki dotyczące selekcji portfolio.
- `index.html`, `robots.txt` i `sitemap.xml` w aktualnym źródle wskazują domenę `m-design-house.extepdigitalwork.chatgpt.site`. Przy przeniesieniu na `mdesignhouse.eu` programista powinien zaktualizować canonical, Open Graph/JSON-LD, sitemap i adres sitemap w `robots.txt`.
- `.openai/hosting.json` zawiera identyfikator projektu Sites i katalog builda `dist`; to metadane hostingu, nie klucz ani hasło.

Archiwum pomija `node_modules/`, `dist/`, `.git/`, pliki `.env*`, klucze i hasła, `site.zip` oraz lokalne ustawienia edytorów. Zawiera `package.json`, `package-lock.json`, źródła, `public/`, konfiguracje Vite/TypeScript i skrypty projektu.
