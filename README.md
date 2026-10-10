# SEP — nauka (grupa 1, E + D)

Prywatna strona do nauki na egzamin kwalifikacyjny SEP: eksploatacja (E) i dozór (D), urządzenia do 1 kV.
Adres docelowy: **https://sep.sys4ops.com** — dostęp **tylko z domowego IP** (filtr w Caddym), `noindex`.

## Skąd treść

- 80 zdjęć slajdów ze szkolenia (`OneDrive - PowerOps/sep materiały`, 10.10.2026) — przepisane i przerysowane
  (schematy jako SVG w `js/rysunki.js`). Pominięte: zaświadczenie z danymi osobowymi (PESEL), zrzut zamówienia
  ze sklepu, logo, duplikat slajdu. Przy każdej sekcji jest numer zdjęcia („slajd 17”).
- „Podręcznik SEP G1 E+D 2026” (PDF przygotowany przez ChatGPT) — sprawdzony: bez błędów, ale ogólny i bez liczb.
  Wzięte z niego: podstawy elektrotechniki, aparatura (RCBO, SPD…), protokół, ocena ryzyka, pytania ustne.
- Teksty rozporządzeń z Dziennika Ustaw (kwalifikacje 2022, BHP 2019) — na nich oparta lekcja o egzaminie
  (stan na 2026: bezterminowe świadectwa nieważne od 3.07.2026) i lekcja o dozorze. Przy faktach są paragrafy.
- bardzo-latwo.pl (październik 2026) — tematy, których brakowało: AFDD, typy SPD, czasy zadziałania RCD,
  przeglądy okresowe (art. 62 Prawa budowlanego), kilka źródeł zasilania (PV, magazyn, agregat, UPS), gaszenie.
- Kroki spoza slajdów mają w stopce źródło („uzupełnienie”, paragraf albo serwis).

## Budowa

Statyczny HTML/CSS/JS, bez frameworków i CDN-ów. Kolejność skryptów w `index.html` ma znaczenie:

| Plik | Zawartość |
| --- | --- |
| `js/rysunki.js` | schematy SVG (układy sieci, RCD, łazienka, uziemienie, gniazdo, MCB, reguła 9…) |
| `js/dane-moduly.js`, `dane-moduly2.js` | moduły nauki ze slajdów |
| `js/dane-dozor.js` | moduł „Egzamin” (wstawiany na początek) i „Dozór (D)” |
| `js/dane-test.js` | fiszki (`FISZKI`) i pytania testowe (`PYTANIA`) |
| `js/dane-podrecznik.js` | uzupełnienia z podręcznika + pytania ustne (`USTNE`) |
| `js/dane-2026.js` | pytania, fiszki i pytania ustne do lekcji Egzamin i Dozór (sprawdzone z rozporządzeniami) |
| `js/dane-uzupelnienia.js` | kroki dopisane do lekcji (AFDD, SPD, RCD, przeglądy, PV/magazyn/agregat, gaszenie) |
| `js/kurs.js` | plan kursu: części, kolejność lekcji, cele, zakres E / D / E+D (`ZAKRES`, pole `dla` w kroku) |
| `js/app.js` | routing `#/…`: pulpit, kurs, lekcja krok po kroku z mini-testem, powtórki (pudełka Leitnera), test E/D, symulacja komisji, ściąga, kalkulatory, źródła |

Postęp nauki zapisuje się w przeglądarce (`localStorage`, klucze `sep.*`) — na innym urządzeniu zaczyna się od zera.

## Podgląd lokalny

Dowolny serwer statyczny w katalogu repo, np. `npx serve .` albo `python -m http.server`.
