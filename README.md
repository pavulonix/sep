# SEP — nauka (grupa 1, E + D)

Prywatna strona do nauki na egzamin kwalifikacyjny SEP: eksploatacja (E) i dozór (D), urządzenia do 1 kV.
Adres docelowy: **https://sep.sys4ops.com** — dostęp **tylko z domowego IP** (filtr w Caddym), `noindex`.

## Skąd treść

- 80 zdjęć slajdów ze szkolenia (`OneDrive - PowerOps/sep materiały`, 10.10.2026) — przepisane i przerysowane
  (schematy jako SVG w `js/rysunki.js`). Pominięte: zaświadczenie z danymi osobowymi (PESEL), zrzut zamówienia
  ze sklepu, logo, duplikat slajdu. Przy każdej sekcji jest numer zdjęcia („slajd 17”).
- „Podręcznik SEP G1 E+D 2026” (PDF przygotowany przez ChatGPT) — sprawdzony: bez błędów, ale ogólny i bez liczb.
  Wzięte z niego: podstawy elektrotechniki, aparatura (RCBO, SPD…), protokół, ocena ryzyka, pytania ustne.
- Części oznaczone **„uzupełnienie”** pochodzą spoza materiałów (głównie zakres D — organizacja pracy
  wg rozporządzenia BHP z 28.08.2019). Przed egzaminem porównać z aktualnym tekstem przepisów.

## Budowa

Statyczny HTML/CSS/JS, bez frameworków i CDN-ów. Kolejność skryptów w `index.html` ma znaczenie:

| Plik | Zawartość |
| --- | --- |
| `js/rysunki.js` | schematy SVG (układy sieci, RCD, łazienka, uziemienie, gniazdo, MCB, reguła 9…) |
| `js/dane-moduly.js`, `dane-moduly2.js` | moduły nauki ze slajdów |
| `js/dane-dozor.js` | moduł „Egzamin” (wstawiany na początek) i „Dozór (D)” |
| `js/dane-test.js` | fiszki (`FISZKI`) i pytania testowe (`PYTANIA`) |
| `js/dane-podrecznik.js` | uzupełnienia z podręcznika + pytania ustne (`USTNE`) |
| `js/app.js` | routing `#/…`, postęp (localStorage), fiszki, test, trening ustny, ściąga, kalkulatory |

Postęp nauki zapisuje się w przeglądarce (`localStorage`, klucze `sep.*`) — na innym urządzeniu zaczyna się od zera.

## Podgląd lokalny

Dowolny serwer statyczny w katalogu repo, np. `npx serve .` albo `python -m http.server`.
