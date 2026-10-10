/* Lekcja o egzaminie (stan prawny 2026) i lekcja o dozorze (D).
   Źródła sprawdzone z tekstem w Dzienniku Ustaw:
   - rozporządzenie MKiŚ z 1.07.2022 r. (Dz.U. 2022 poz. 1392) — kwalifikacje i egzamin,
   - rozporządzenie Ministra Energii z 28.08.2019 r. (Dz.U. 2019 poz. 1830) — BHP przy urządzeniach energetycznych,
   - ustawa Prawo energetyczne, art. 54 — świadectwa ważne 5 lat; bezterminowe straciły ważność 3.07.2026 r.
   Paragrafy podajemy przy faktach, bo komisja lubi pytać „skąd to wiesz”. */
"use strict";

MODULY.unshift({
  id: "egzamin",
  ik: "🎓",
  tytul: "Egzamin E + D w 2026 roku",
  wstep: "Jak wygląda egzamin, co wpisać we wniosek, ile kosztuje i co zmieniło się w 2026 r. Zacznij od tego — wtedy wiesz, pod co się uczysz.",
  sekcje: [
    {
      t: "E i D — czym się różnią", zr: "23 + § 4 rozp. 2022",
      h: `
<div class="siatka-2">
  <div class="kafel"><h4>Eksploatacja (E)</h4><p>Stanowiska osób, które <b>wykonują prace</b>: obsługa, konserwacja, remont, naprawa, montaż, demontaż i czynności kontrolno-pomiarowe.</p></div>
  <div class="kafel"><h4>Dozór (D)</h4><p>Stanowiska osób, które <b>kierują czynnościami</b> osób na stanowiskach E albo <b>sprawują nadzór nad eksploatacją</b> urządzeń, instalacji i sieci.</p></div>
</div>
<div class="wazne"><b>Zdajesz oba — to dwa osobne egzaminy</b>Świadectwo D nie uprawnia do osobistego wykonywania prac. Dla D komisja pyta głównie o przepisy, organizację pracy, dokumentację i odpowiedzialność; dla E — o budowę urządzeń, pomiary, ochronę przeciwporażeniową i bezpieczne wykonywanie prac. BHP, ppoż. i pierwsza pomoc są w obu.</div>`,
    },
    {
      t: "Stan prawny na 2026 rok — co musisz wiedzieć", zr: "uzupełnienie 2026",
      h: `
<div class="wazne czerwone"><b>3 lipca 2026 r. — koniec starych świadectw</b>Świadectwa wydane bezterminowo albo na dłużej niż 5 lat straciły ważność 3 lipca 2026 r. (5 lat po nowelizacji Prawa energetycznego z 20 maja 2021 r.). Kto chce dalej pracować, musi zdać egzamin od nowa.</div>
<div class="tabela-wrap"><table>
<tr><th>Sprawa</th><th>Jak jest</th><th>Podstawa</th></tr>
<tr class="wyr"><td>Ważność świadectwa</td><td><b>5 lat</b> od wydania; nie ma przedłużenia bez egzaminu</td><td>art. 54 Prawa energetycznego</td></tr>
<tr><td>Forma egzaminu</td><td><b>ustny</b> — wiedza teoretyczna i praktyczna; może być zdalnie (wideo)</td><td>§ 10 rozp. 2022</td></tr>
<tr><td>Kto egzaminuje</td><td>skład komisji: <b>co najmniej 3 osoby</b>; wynik większością głosów, przy remisie decyduje przewodniczący</td><td>§ 9, § 11</td></tr>
<tr><td>Powiadomienie</td><td>o terminie, miejscu i zakresie — <b>co najmniej 14 dni</b> przed egzaminem</td><td>§ 10 ust. 2</td></tr>
<tr><td>Na egzamin zabierasz</td><td><b>dokument ze zdjęciem</b></td><td>§ 10 ust. 4</td></tr>
<tr class="wyr"><td>Opłata</td><td><b>10% minimalnego wynagrodzenia</b> z dnia złożenia wniosku; w 2026 r. (4806 zł) to <b>480,60 zł</b> — za każdy egzamin osobno (E i D to dwa)</td><td>§ 14</td></tr>
<tr><td>Świadectwo</td><td>komisja wydaje je w ciągu <b>14 dni</b> od egzaminu</td><td>§ 13</td></tr>
<tr><td>Nie zdał(a)ś</td><td>wynik „negatywny”; nowy wniosek i nowa opłata</td><td>§ 11 ust. 2</td></tr>
<tr><td>Zwrot opłaty</td><td>gdy nie przystąpisz <b>z przyczyn od siebie niezależnych</b> albo wniosek jest błędny (egzaminu nie będzie)</td><td>§ 7 ust. 6, § 12 ust. 3</td></tr>
<tr><td>Dokumentacja</td><td>komisja przechowuje ją 10 lat</td><td>§ 15</td></tr>
</table></div>
<p><b>Bez świadectwa wolno</b> obsługiwać urządzenia elektryczne <b>do 1 kV i do 20 kW</b>, jeśli dokumentacja urządzenia określa zasady obsługi (§ 5). Uwaga: to dotyczy tylko <i>obsługi</i>, nie montażu, napraw ani pomiarów.</p>`,
    },
    {
      t: "Wniosek — co wpisać, żeby zakres był dobry", zr: "§ 7 rozp. 2022 + podręcznik",
      h: `
<p>Wniosek składasz sam(a) albo składa go pracodawca. Musi zawierać m.in. dane osobowe, wykształcenie, posiadane kwalifikacje i przebieg pracy, a także <b>rodzaj urządzeń</b> i <b>zakres</b>. Dołączasz kopię dokumentu potwierdzającego wiedzę (dyplom, świadectwo, albo <b>zaświadczenie pracodawcy o doświadczeniu i stażu</b>) i potwierdzenie opłaty.</p>
<h3>Grupa 1 — punkty, które dotyczą Ciebie</h3>
<div class="tabela-wrap"><table>
<tr><th>Pkt</th><th>Urządzenia</th></tr>
<tr class="wyr"><td>2</td><td>urządzenia, instalacje i sieci elektroenergetyczne o napięciu <b>nie wyższym niż 1 kV</b></td></tr>
<tr><td>3</td><td>powyżej 1 kV do 30 kV</td></tr>
<tr><td>6</td><td>zespoły prądotwórcze o mocy powyżej 50 kW</td></tr>
<tr><td>12</td><td>magazyny energii wprowadzające energię do sieci, o mocy powyżej 10 kW</td></tr>
<tr class="wyr"><td>13</td><td><b>aparatura kontrolno-pomiarowa</b> oraz automatyka, sterowanie i zabezpieczenia urządzeń z pkt 1–12</td></tr>
</table></div>
<p>Pełna lista grupy 1 ma 16 punktów (m.in. 1 — urządzenia prądotwórcze przyłączone do sieci, 7 — elektrotermia, 9 — oświetlenie uliczne, 11 — urządzenia przeciwwybuchowe).</p>
<div class="wazne niebieskie"><b>Zakres czynności</b>Dla „do 1 kV z pomiarami” wpisz pkt <b>2</b> (i ewentualnie <b>13</b>) oraz zakres: <b>obsługa, konserwacja, remont, montaż, kontrolno-pomiarowe</b>. Bez słowa „kontrolno-pomiarowe” na świadectwie nie wolno wykonywać pomiarów ochronnych. W tytule przelewu podaj imię i nazwisko, grupę, punkt i zakres.</div>`,
    },
    {
      t: "Jak odpowiadać komisji", zr: "podręcznik",
      h: `
<p>Egzamin jest rozmową. Komisja sprawdza, czy <b>rozumiesz</b> i <b>pracujesz bezpiecznie</b>, a nie czy wyrecytujesz paragraf. Dobra odpowiedź ma pięć kroków:</p>
<ol class="kroki">
  <li><b>Definicja</b> — co to jest, jednym zdaniem.</li>
  <li><b>Zastosowanie</b> — gdzie i po co się to robi.</li>
  <li><b>Zagrożenia</b> — co może pójść źle.</li>
  <li><b>Bezpieczeństwo</b> — jak tego uniknąć (wyłączyć, zabezpieczyć, sprawdzić…).</li>
  <li><b>Kryterium</b> — liczba albo warunek: „rezystancja izolacji ≥ 1 MΩ”, „Z<sub>s</sub>·I<sub>a</sub> ≤ U<sub>0</sub>”.</li>
</ol>
<div class="wazne"><b>Gdy nie znasz odpowiedzi</b>Powiedz, jak byś to sprawdził(a): w instrukcji eksploatacji, dokumentacji producenta, normie. Nigdy nie zgaduj „na odwagę” przy pytaniach o bezpieczeństwo.</div>
<p>Ćwicz w zakładce <a href="#/ustny">Ustny</a> — tryb „Symulacja komisji” losuje kilka pytań pod rząd i liczy czas.</p>`,
    },
  ],
});

MODULY.push({
  id: "dozor",
  ik: "🧑‍💼",
  tytul: "Dozór (D): organizacja bezpiecznej pracy",
  wstep: "Funkcje przy pracy na polecenie pisemne, jak przebiega praca od polecenia do zakończenia, czego nie wolno, jakie dokumenty prowadzi pracodawca. Wszystko według rozporządzenia BHP z 28 sierpnia 2019 r.",
  sekcje: [
    {
      t: "Osoba uprawniona i osoba upoważniona", zr: "§ 2, § 5, § 6 rozp. 2019",
      h: `
<div class="siatka-2">
  <div class="kafel"><h4>Osoba uprawniona</h4><p>ma <b>kwalifikacje potwierdzone świadectwem</b> (Prawo energetyczne).</p></div>
  <div class="kafel"><h4>Osoba upoważniona</h4><p>osoba uprawniona, którą <b>pracodawca wyznaczył pisemnie</b> do określonych czynności lub prac.</p></div>
</div>
<ul>
  <li><b>Prace eksploatacyjne wykonują osoby upoważnione</b> (§ 6). Samo świadectwo to za mało — potrzebne jest upoważnienie pracodawcy.</li>
  <li>Pracodawca prowadzi <b>wykaz osób upoważnionych</b>: imię i nazwisko, zakres i okres upoważnienia (§ 5).</li>
  <li>Osoby <b>bez kwalifikacji</b> mogą pracować <b>tylko pod nadzorem osoby upoważnionej</b>: uczniowie w ramach przyuczenia, przedstawiciele organów nadzoru i serwisanci wykonujący specjalistyczne prace.</li>
  <li><b>Prace pomocnicze</b> (budowlane, malarskie, porządkowe, transportowe…) mogą robić osoby bez kwalifikacji — wykaz takich prac ustala pracodawca. Takie osoby mogą być w zespole.</li>
</ul>`,
    },
    {
      t: "Cztery funkcje przy pracy na polecenie pisemne", zr: "20 + § 2 pkt 8–12 rozp. 2019",
      h: `
<div class="tabela-wrap"><table>
<tr><th>Funkcja</th><th>Kto wyznacza</th><th>Świadectwo</th><th>Co robi</th></tr>
<tr class="wyr"><td><b>Poleceniodawca</b></td><td>pracodawca</td><td><b>D</b></td><td>wydaje polecenie pisemne</td></tr>
<tr class="wyr"><td><b>Koordynujący</b></td><td>poleceniodawca</td><td><b>D</b></td><td>koordynuje prace związane z ruchem urządzeń: kolejność łączeń, zezwolenia na przygotowanie i likwidację strefy, zezwolenie na uruchomienie</td></tr>
<tr><td><b>Dopuszczający</b></td><td>poleceniodawca (upoważnia pracodawca)</td><td><b>E</b></td><td>przygotowuje i przekazuje strefę pracy, dopuszcza zespół, likwiduje strefę po pracy</td></tr>
<tr><td><b>Kierujący zespołem</b></td><td>poleceniodawca</td><td><b>E</b> + umiejętności zawodowe</td><td>dobiera ludzi, przejmuje strefę, instruuje zespół, pilnuje bezpiecznego wykonania</td></tr>
</table></div>
<p><b>Zespół</b> to co najmniej <b>dwie osoby</b>. Prace szczególnie niebezpieczne wykonuje zespół — żeby była asekuracja (§ 27 ust. 4). W każdym zespole wyznacza się kierującego (§ 31).</p>
<div class="wazne czerwone"><b>Łączenie funkcji (§ 30 ust. 3)</b>Jedna osoba może pełnić <b>najwyżej dwie funkcje</b>. <b>Nie wolno łączyć funkcji dopuszczającego i kierującego zespołem</b> — wyjątek: technologia prac pod napięciem.</div>`,
    },
    {
      t: "Polecenie pisemne — kiedy i co zawiera", zr: "21 + § 27–29 rozp. 2019",
      h: `
<p>Na <b>polecenie pisemne</b> wykonuje się prace, które stwarzają możliwość <b>szczególnego zagrożenia dla zdrowia lub życia</b>. Rozporządzenie wymienia 18 rodzajów takich prac (lista w lekcji „Przepisy”), a <b>szczegółowy wykaz ustala i aktualizuje pracodawca</b> — na podstawie oceny ryzyka.</p>
<h3>Polecenie pisemne zawiera co najmniej (§ 28)</h3>
<ol class="kroki">
  <li>numer polecenia,</li>
  <li>osoby wyznaczone do organizowania i wykonania pracy,</li>
  <li>zakres prac i strefę pracy,</li>
  <li>warunki i środki ochronne do bezpiecznego przygotowania i wykonania pracy,</li>
  <li>termin rozpoczęcia i zakończenia, przerwy i warunki wznowienia po przerwie.</li>
</ol>
<p>Wydaje je pracodawca lub osoba przez niego upoważniona. Pracodawca przechowuje polecenie <b>co najmniej 90 dni</b> od zakończenia pracy.</p>
<h3>Bez polecenia pisemnego wolno (§ 29)</h3>
<ul>
  <li>ratować <b>zdrowie lub życie ludzkie albo środowisko</b>,</li>
  <li><b>zabezpieczać mienie</b> przed zniszczeniem — osoby uprawnione,</li>
  <li>wykonywać prace eksploatacyjne <b>określone w instrukcji eksploatacji</b> — osoby uprawnione i upoważnione.</li>
</ul>
<div class="wazne niebieskie"><b>A „polecenie ustne”?</b>Obecne rozporządzenie (2019) go nie przewiduje — dzieli prace na wykonywane na polecenie pisemne i pozostałe. Polecenia ustne były w starym rozporządzeniu z 2013 r.; niektóre zakłady nadal opisują je w swoich instrukcjach. Na egzaminie mów o stanie z 2019 r.</div>`,
    },
    {
      t: "Przebieg pracy krok po kroku", zr: "§ 30 rozp. 2019",
      h: `
${RYS.przebieg()}
<ol class="kroki">
  <li><b>Koordynujący</b> ustala zakres i kolejność łączeń, wydaje zezwolenie na przygotowanie strefy pracy.</li>
  <li><b>Dopuszczający przygotowuje strefę</b>: uzyskuje zezwolenie na łączenia, wyłącza urządzenia i zabezpiecza przed uruchomieniem, sprawdza usunięcie zagrożeń (napięcie, ciśnienie, gaz, temperatura), oznacza strefę znakami, <b>zapoznaje kierującego z zagrożeniami</b> (udokumentowane).</li>
  <li><b>Dopuszczający dopuszcza zespół</b>: sprawdza przygotowanie strefy, wskazuje ją, robi <b>instruktaż o zagrożeniach</b>, potwierdza dopuszczenie na piśmie, zgłasza koordynującemu.</li>
  <li><b>Kierujący zespołem</b>: dobiera osoby, sprawdza i <b>przejmuje strefę</b>, zapoznaje każdego członka zespołu z zagrożeniami i metodami pracy (udokumentowane), pilnuje środków ochrony, zapewnia bezpieczne wykonanie.</li>
  <li><b>Zakończenie</b>: sprawdzenie, że praca skończona i narzędzia usunięte → zespół opuszcza strefę → usunięcie środków ochronnych → informacja o gotowości urządzeń do ruchu. Koordynujący zezwala na uruchomienie.</li>
</ol>
<h3>Przerwa w pracy (§ 31)</h3>
<ul>
  <li>Kierujący <b>opuszcza strefę → praca stoi</b>, a zespół wychodzi ze strefy.</li>
  <li>Po przerwie potrzebne jest <b>ponowne dopuszczenie</b> — chyba że w czasie przerwy nie pogorszyły się zabezpieczenia ani warunki pracy.</li>
  <li>Przed każdym wznowieniem kierujący <b>sprawdza zabezpieczenia strefy</b>.</li>
</ul>
<div class="wazne czerwone"><b>W czasie pracy zabronione (§ 32)</b>Rozszerzanie pracy poza zakres i strefę z polecenia oraz zmiany w zastosowanych zabezpieczeniach (chyba że polecenie to przewiduje).</div>`,
    },
    {
      t: "Przygotowanie strefy przy urządzeniach wyłączonych", zr: "02, 71 + § 24–26 rozp. 2019",
      h: `
<p>Prace przy urządzeniach elektroenergetycznych wykonuje się <b>pod napięciem</b>, <b>w pobliżu napięcia</b> albo <b>przy wyłączonym napięciu</b> (§ 23). Przy pracy na wyłączonym: wyłącz tak, żeby napięcie nie mogło się pojawić (§ 24), a potem (§ 25):</p>
<ol class="kroki">
  <li><b>zabezpiecz przed przypadkowym lub celowym załączeniem</b> — sposób określa instrukcja eksploatacji,</li>
  <li><b>oznacz w widoczny sposób wszystkie miejsca odłączenia</b>,</li>
  <li><b>sprawdź brak napięcia</b> na odłączonych urządzeniach,</li>
  <li><b>uziem</b> odłączone urządzenia, jeśli wymaga tego technologia prac,</li>
  <li><b>oznacz strefę pracy</b> znakami bezpieczeństwa.</li>
</ol>
<p>Uziemienia rozmieszcza się tak, żeby praca odbywała się <b>w strefie ograniczonej uziemieniami</b> i żeby <b>co najmniej jedno uziemienie było widoczne z miejsca pracy</b>. Jeśli się nie da — dodatkowe środki z instrukcji (a praca jest wtedy na polecenie pisemne).</p>
<div class="wazne"><b>„Pięć zasad” ze szkoleń</b>Na kursach uczy się wersji z normy PN-EN 50110: wyłącz → zabezpiecz → sprawdź brak napięcia → uziem i zewrzyj → osłoń sąsiednie części pod napięciem. Sens jest ten sam — na egzaminie możesz podać obie.</div>
<p><b>Sprzęt ochronny elektroizolacyjny i wskaźniki napięcia</b> się ewidencjonuje i poddaje okresowym próbom według dokumentacji producenta (§ 26). Sprzęt po terminie badań traktuj jak niesprawny.</p>`,
    },
    {
      t: "Dokumenty, które musi mieć pracodawca", zr: "§ 4, § 33 rozp. 2019",
      h: `
<div class="siatka-2">
  <div class="kafel"><h4>Instrukcja eksploatacji (§ 4)</h4><p>charakterystyka urządzeń; automatyka, pomiary, zabezpieczenia; rysunki i schematy po polsku; uruchamianie, obsługa, zatrzymanie; postępowanie przy awarii; <b>terminy przeglądów, prób i pomiarów</b>; BHP i ppoż.; zagrożenia; organizacja prac; środki ochronne; wymagania kwalifikacyjne. Pracodawca ją <b>na bieżąco aktualizuje</b>.</p></div>
  <div class="kafel"><h4>Instrukcja organizacji bezpiecznej pracy (§ 33)</h4><p>funkcje (poleceniodawca, koordynujący, dopuszczający, kierujący) z wymaganymi kwalifikacjami; zasady wydawania, obiegu i przechowywania poleceń; <b>zasady łączenia funkcji</b>; ewidencja i badania sprzętu ochronnego; wykaz prac pomocniczych; prace sprzętem zmechanizowanym i pod napięciem; <b>wzór polecenia pisemnego</b>.</p></div>
</div>
<p>Do tego: <b>wykaz osób upoważnionych</b> (§ 5), <b>wykaz prac na polecenie pisemne</b> (§ 27 ust. 3), <b>wykaz prac pomocniczych</b> (§ 6 ust. 3), protokoły pomiarów i przeglądów, dokumentacja techniczna. Urządzenia oznakowuje się jednoznacznie i zabezpiecza przed dostępem osób nieupoważnionych (§ 7). Nie wolno eksploatować urządzeń bez przewidzianych dla nich urządzeń ochronnych (§ 8).</p>`,
    },
    {
      t: "Obowiązki i odpowiedzialność osoby dozoru", zr: "Kodeks pracy art. 212 + uzupełnienie",
      h: `
<p>Osoba kierująca pracownikami (Kodeks pracy, art. 212) ma obowiązek m.in.:</p>
<ul>
  <li><b>organizować stanowiska i pracę</b> zgodnie z przepisami i zasadami BHP,</li>
  <li>dbać o <b>sprawność środków ochrony</b> i ich stosowanie zgodnie z przeznaczeniem,</li>
  <li>organizować, przygotowywać i prowadzić prace tak, by <b>chronić przed wypadkami</b>,</li>
  <li>dbać o bezpieczny stan pomieszczeń i wyposażenia,</li>
  <li><b>egzekwować przestrzeganie przepisów BHP</b>,</li>
  <li>zapewniać wykonanie zaleceń lekarza sprawującego opiekę profilaktyczną.</li>
</ul>
<p>W praktyce osoba dozoru pilnuje też, żeby pracowali ludzie z <b>aktualnym świadectwem, badaniami lekarskimi i szkoleniem BHP</b>, oraz <b>terminów przeglądów i pomiarów</b> (instalacja elektryczna w budynku — co najmniej co 5 lat, Prawo budowlane art. 62).</p>
<div class="wazne"><b>Gdy pojawia się zagrożenie</b>Wstrzymaj pracę, wyprowadź ludzi ze strefy, zabezpiecz miejsce, zgłoś przełożonemu. Pracownik ma prawo powstrzymać się od pracy grożącej bezpośrednio życiu lub zdrowiu (Kodeks pracy, art. 210), zawiadamiając przełożonego — zachowuje prawo do wynagrodzenia.</div>`,
    },
  ],
});
