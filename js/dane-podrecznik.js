/* Uzupełnienia z „Podręcznika SEP G1 E+D 2026” (opracowanie przygotowane przez ChatGPT,
   10.10.2026). Podręcznik jest celowo ogólny i bez liczb — wartości graniczne bierzemy ze slajdów.
   Stąd: podstawy elektrotechniki, aparatura, protokół z pomiarów, ocena ryzyka, trening ustny. */
"use strict";

/* Nowy moduł: podstawy elektrotechniki — wstawiony za modułem „Napięcia, przewody”. */
MODULY.splice(MODULY.findIndex((m) => m.id === "podstawy") + 1, 0, {
  id: "elektrotechnika",
  ik: "🧠",
  tytul: "Podstawy elektrotechniki i aparatura",
  wstep: "Wielkości i wzory, które warto umieć wyjaśnić komisji, oraz aparaty w rozdzielnicy: MCB, RCD, RCBO, SPD, stycznik, rozłącznik.",
  sekcje: [
    {
      t: "Wielkości elektryczne", zr: "podręcznik",
      h: `
<div class="tabela-wrap"><table>
<tr><th>Wielkość</th><th>Jednostka</th><th>Co to jest</th></tr>
<tr><td>Napięcie U</td><td>V</td><td>różnica potencjałów między dwoma punktami (230 V L–N, 400 V L–L)</td></tr>
<tr><td>Natężenie I</td><td>A</td><td>ilość ładunku przepływającego w jednostce czasu</td></tr>
<tr><td>Rezystancja R</td><td>Ω</td><td>opór wobec przepływu prądu; zależy od materiału, długości, przekroju i temperatury</td></tr>
<tr><td>Impedancja Z</td><td>Ω</td><td>„opór” w obwodzie AC — rezystancja + reaktancja</td></tr>
<tr><td>Moc czynna P</td><td>W</td><td>moc zamieniana na pracę lub ciepło</td></tr>
<tr><td>Moc pozorna S</td><td>VA</td><td>iloczyn wartości skutecznych U·I</td></tr>
<tr><td>Moc bierna Q</td><td>var</td><td>moc „krążąca” w polach elektrycznych i magnetycznych</td></tr>
<tr><td>cos φ</td><td>—</td><td>współczynnik mocy (przesunięcie między U a I)</td></tr>
<tr><td>Energia E</td><td>kWh</td><td>moc × czas — <b>kW to moc, kWh to energia</b></td></tr>
</table></div>
<p>Sieć w Polsce: <b>50 Hz</b>. AC okresowo zmienia kierunek, DC ma stałą biegunowość (np. moduły PV, akumulatory).</p>`,
    },
    {
      t: "Wzory", zr: "podręcznik",
      h: `
<div class="siatka-2">
  <div class="wzor">U = I · R<small>prawo Ohma; I = U/R, R = U/I</small></div>
  <div class="wzor">R = ρ · l / S<small>rezystancja przewodu: rezystywność, długość, przekrój</small></div>
  <div class="wzor">P = U · I · cos φ<small>moc jednofazowa</small></div>
  <div class="wzor">P = √3 · U · I · cos φ<small>moc trójfazowa (U międzyfazowe)</small></div>
  <div class="wzor">E = P · t<small>kWh = kW × h</small></div>
  <div class="wzor">Z<sub>s</sub> · I<sub>a</sub> ≤ U<sub>0</sub><small>samoczynne wyłączenie zasilania</small></div>
</div>
<div class="kafel"><h4>Przykład</h4><p>Odbiornik 1,5 kW pracuje 4 h → <b>6 kWh</b>. Przy 230 V i cos φ = 1 pobiera I = 1500 / 230 ≈ <b>6,5 A</b>.</p></div>
<p><b>Zwarcie</b> — niezamierzone połączenie punktów o różnym potencjale przez małą impedancję. <b>Przeciążenie</b> — prąd większy od dopuszczalnego, bez zwarcia. Silniki mają <b>prąd rozruchowy</b> większy od znamionowego (stąd charakterystyki C i D).</p>`,
    },
    {
      t: "Aparatura w rozdzielnicy", zr: "podręcznik",
      h: `
<div class="siatka-2">
  <div class="kafel"><h4>MCB — wyłącznik nadprądowy</h4><p>chroni przed przeciążeniem i zwarciem wg charakterystyki (B, C, D).</p></div>
  <div class="kafel"><h4>RCD — wyłącznik różnicowoprądowy</h4><p>reaguje na prąd różnicowy. <b>Nie zastępuje MCB</b> — nie chroni przed przeciążeniem i zwarciem.</p></div>
  <div class="kafel"><h4>RCBO</h4><p>jeden aparat = nadprądowy + różnicowoprądowy.</p></div>
  <div class="kafel"><h4>SPD — ogranicznik przepięć</h4><p>ogranicza przepięcia (np. od wyładowań); dobór zależy od układu i koordynacji.</p></div>
  <div class="kafel"><h4>Stycznik</h4><p>łącznik sterowany elektrycznie (cewką), do <b>częstych</b> łączeń, np. silników.</p></div>
  <div class="kafel"><h4>Rozłącznik / odłącznik</h4><p>łączy obwody w określonych warunkach i zapewnia <b>przerwę izolacyjną</b> (zależnie od typu).</p></div>
</div>
<div class="wazne"><b>Selektywność</b>przy zakłóceniu ma zadziałać zabezpieczenie <b>najbliższe miejsca uszkodzenia</b>, a nie główne (np. RCD typu S 300 mA przed 30 mA).
<b>Koordynacja</b> — dobór współpracujących aparatów, żeby razem dawały wymaganą ochronę.</div>
<p>Główne zagrożenia elektryczne: <b>porażenie, łuk elektryczny, pożar, oparzenia i urazy wtórne</b> (upadek).</p>`,
    },
  ],
});

/* Pomiary: oględziny, kolejność faz, protokół. */
MODULY.find((m) => m.id === "pomiary").sekcje.push({
  t: "Oględziny, kolejność faz, protokół", zr: "podręcznik",
  h: `
<div class="tabela-wrap"><table>
<tr><th>Badanie</th><th>Cel</th></tr>
<tr><td><b>Oględziny</b></td><td>stan osłon, oznaczeń, dobór aparatury, uszkodzenia, dokumentacja — <b>przed</b> pomiarami; pomiar nie zastępuje oględzin</td></tr>
<tr><td>Ciągłość PE</td><td>czy tor ochronny jest kompletny</td></tr>
<tr><td>Rezystancja izolacji</td><td>stan izolacji</td></tr>
<tr><td>Pętla zwarcia</td><td>czy zadziała samoczynne wyłączenie — sama liczba Z<sub>s</sub> bez danych zabezpieczenia nic nie mówi</td></tr>
<tr><td>Badanie RCD</td><td>działanie wyłącznika, zależnie od jego typu</td></tr>
<tr><td>Rezystancja uziemienia</td><td>właściwości uziomu (kryterium zależy od funkcji uziomu)</td></tr>
<tr><td><b>Kolejność faz</b></td><td>prawidłowa sekwencja L1–L2–L3 (kierunek obrotów silników)</td></tr>
<tr><td>Polaryzacja</td><td>zgodność połączeń, np. czy łącznik przerywa fazę</td></tr>
</table></div>
<p><b>Badanie odbiorcze</b> — przed oddaniem do użytkowania; <b>okresowe</b> — ocena stanu w czasie eksploatacji.</p>
<div class="wazne"><b>Protokół z pomiarów musi zawierać</b>obiekt i obwód, datę i zakres, metodę, <b>przyrząd z numerem</b>, wyniki, kryteria oceny (wartości dopuszczalne), wnioski i osobę wykonującą (z uprawnieniami). Samo „pozytywny” bez kryterium to błąd. Wynik niejednoznaczny — nie potwierdzać zgodności. Protokoły się przechowuje.</div>`,
});

/* Dozór: ocena ryzyka i reagowanie. */
MODULY.find((m) => m.id === "dozor").sekcje.push({
  t: "Ocena ryzyka i reagowanie na zagrożenie", zr: "podręcznik",
  h: `
<ul>
  <li><b>Ocena ryzyka</b> — identyfikuje zagrożenia i wyznacza środki ochronne, organizację pracy i sposób reagowania.</li>
  <li><b>Upoważnienie do pracy</b> — formalne dopuszczenie do określonych czynności w danej firmie (świadectwo SEP go nie zastępuje, tak jak nie zastępuje szkolenia stanowiskowego).</li>
  <li><b>D nie upoważnia automatycznie do pracy jako E</b> — do osobistego wykonywania prac potrzebne są kwalifikacje E.</li>
  <li>Instrukcje eksploatacji się <b>aktualizuje</b> (zmiany techniczne, ryzyka, przepisy); dokumentacja producenta określa wymagania dla konkretnego urządzenia.</li>
</ul>
<div class="wazne czerwone"><b>Zagrożenie → wstrzymanie pracy → zabezpieczenie → zgłoszenie</b>Osoba dozoru nie dopuszcza prac bez kwalifikacji, bez oceny zagrożeń ani przy nieusuniętych nieprawidłowościach. Przed przywróceniem urządzenia do eksploatacji — potwierdzenie spełnienia wymagań przez upoważnione osoby.</div>`,
});

/* Egzamin: podstawa prawna, zakres, trening ustny, plan nauki. */
MODULY.find((m) => m.id === "egzamin").sekcje.push(
  {
    t: "Zakres świadectwa — sprawdź wniosek", zr: "podręcznik",
    h: `
<p>Świadectwo określa <b>grupę</b>, <b>stanowisko</b> (E lub D), <b>rodzaje urządzeń</b> i <b>rodzaje czynności</b>. Samo „do 1 kV” nie obejmuje automatycznie wszystkich urządzeń i czynności. Zakres wiedzy dla E i D: <b>§ 6 rozporządzenia z 1 lipca 2022 r. (Dz.U. 2022 poz. 1392)</b>.</p>
<ul>
  <li>czy wniosek obejmuje <b>E i D</b>,</li>
  <li>czy zaznaczono urządzenia <b>do 1 kV</b>,</li>
  <li>czy wskazano <b>prace kontrolno-pomiarowe</b>,</li>
  <li>czy potrzebne są inne urządzenia (agregaty, PV, magazyny energii),</li>
  <li>jakie dokumenty wymaga komisja.</li>
</ul>
<p>Ukończenie kursu ≠ zdanie egzaminu. Nie ma jednej ogólnopolskiej, oficjalnej listy pytań — każda komisja pyta po swojemu, w granicach zgłoszonego zakresu.</p>`,
  },
  {
    t: "Jak odpowiadać komisji", zr: "podręcznik",
    h: `
<ol class="kroki">
  <li><b>Definicja</b> — czym to jest.</li>
  <li><b>Zastosowanie</b> — do czego służy.</li>
  <li><b>Zagrożenia</b> — co może pójść źle.</li>
  <li><b>Bezpieczeństwo</b> — jakie warunki trzeba spełnić.</li>
  <li><b>Kryterium / przykład</b> — liczba z normy, jeśli ją znasz. <b>Jeśli nie znasz progu — nie zgaduj.</b></li>
</ol>
<p>Ćwicz w zakładce <a href="#/ustny">Trening ustny</a>: losowe pytanie, odpowiadasz na głos 60–90 s, potem porównujesz z modelową odpowiedzią.</p>
<h3>Plan nauki na 10 dni</h3>
<div class="tabela-wrap"><table>
<tr><th>Dzień</th><th>Temat</th></tr>
<tr><td>1–2</td><td>podstawy, jednostki, obliczenia, napięcia</td></tr>
<tr><td>3–4</td><td>układy sieci, aparatura, oznaczenia</td></tr>
<tr><td>5–6</td><td>ochrona przeciwporażeniowa, BHP, pierwsza pomoc</td></tr>
<tr><td>7–8</td><td>pomiary: wartości, metody, protokoły</td></tr>
<tr><td>9</td><td>dozór, organizacja pracy, dokumentacja</td></tr>
<tr><td>10</td><td>fiszki + 2 testy próbne + trening ustny</td></tr>
</table></div>`,
  },
);

/* Pytania ustne z podręcznika (wybór — z pominięciem oczywistości), z modelowymi odpowiedziami. */
const USTNE = [
  ["Czym różni się stanowisko E od D?", "E — eksploatacja: obsługa, konserwacja, remonty, montaż, prace kontrolno-pomiarowe w zakresie ze świadectwa. D — kierowanie pracami tych osób i nadzór nad eksploatacją. D nie upoważnia automatycznie do osobistego wykonywania prac E."],
  ["Jak długo ważne jest świadectwo kwalifikacyjne?", "5 lat (z uwzględnieniem przepisów szczególnych)."],
  ["Jak sprawdzisz, czy instalacja zapewnia ochronę przeciwporażeniową?", "Dokumentacja → oględziny → pomiary (ciągłość PE, izolacja, pętla zwarcia, RCD, uziemienie) → porównanie wyników z kryteriami normy dla danego układu sieci i zabezpieczenia → protokół. Wykonują osoby uprawnione."],
  ["Co zrobisz, gdy wynik pomiaru jest nieprawidłowy?", "Nie uznaję instalacji za zgodną; opisuję niezgodność w protokole, zgłaszam ją, w razie zagrożenia wyłączam / zabezpieczam obwód zgodnie z procedurą."],
  ["Jakie obowiązki ma osoba dozoru?", "Organizacja i nadzór bezpiecznej eksploatacji: kwalifikacje ludzi, ocena zagrożeń, polecenia i dopuszczenia, instrukcje, dokumentacja, terminy badań, reakcja na awarie i wypadki."],
  ["Jak reagujesz na porażenie prądem?", "Najpierw własne bezpieczeństwo — uwolnienie spod napięcia (wyłączenie), nie dotykam porażonego pod napięciem; 112; ocena przytomności i oddechu (widzę, słyszę, czuję); RKO 30:2, 100–120/min, AED."],
  ["Co opisuje prawo Ohma?", "U = I · R — napięcie jest równe iloczynowi prądu i rezystancji (przy stałej rezystancji)."],
  ["Czym różni się kW od kWh?", "kW to moc, kWh to energia (moc × czas), np. 2 kW przez 3 h = 6 kWh."],
  ["Co to jest impedancja?", "Uogólniony opór w obwodzie prądu przemiennego — rezystancja i reaktancja razem, w omach."],
  ["Co to jest cos φ?", "Współczynnik mocy — związany z przesunięciem fazowym między napięciem a prądem; P = U·I·cos φ."],
  ["Co to jest zwarcie, a co przeciążenie?", "Zwarcie — połączenie punktów o różnym potencjale przez małą impedancję (bardzo duży prąd). Przeciążenie — prąd większy od dopuszczalnego dla obwodu, bez zwarcia."],
  ["Od czego zależy rezystancja przewodu?", "Od materiału (rezystywności), długości, przekroju i temperatury: R = ρ·l/S."],
  ["Czy RCD zastępuje wyłącznik nadprądowy?", "Nie. Typowy RCD nie chroni przed przeciążeniem i zwarciem. Oba aparaty łączy RCBO."],
  ["Czy RCD 30 mA gwarantuje bezpieczeństwo?", "Nie — to ochrona uzupełniająca w poprawnie zaprojektowanej instalacji (podstawowa i przy uszkodzeniu muszą być zapewnione)."],
  ["Do czego służy SPD?", "Do ograniczania przepięć (np. od wyładowań atmosferycznych)."],
  ["Co to jest selektywność zabezpieczeń?", "Przy zwarciu lub upływie ma zadziałać zabezpieczenie najbliższe miejsca uszkodzenia, a nie wyższe w hierarchii — np. RCD S 300 mA przed 30 mA."],
  ["Co to jest stycznik?", "Łącznik sterowany elektrycznie (cewką), przeznaczony do częstych łączeń — np. silników."],
  ["Co to jest połączenie wyrównawcze?", "Połączenie części przewodzących (rury, konstrukcje, PE) z szyną wyrównawczą, żeby nie było między nimi niebezpiecznych różnic potencjałów."],
  ["Wymień pięć zasad bezpiecznej pracy przy urządzeniach wyłączonych.", "1) wyłączyć, 2) zabezpieczyć przed ponownym załączeniem, 3) sprawdzić brak napięcia, 4) uziemić i zewrzeć, 5) osłonić sąsiednie części czynne / wyznaczyć strefę."],
  ["Dlaczego trzeba sprawdzić brak napięcia, skoro łącznik jest wyłączony?", "Bo położenie łącznika nie dowodzi braku napięcia (zasilanie z innej strony, uszkodzony styk, napięcie indukowane)."],
  ["Czym gasić urządzenia elektryczne pod napięciem?", "Środkiem dopuszczonym do urządzeń pod napięciem (np. gaśnica proszkowa, CO₂, mgłowa — do 1000 V z odległości min. 1 m). Nigdy wodą ze zwykłej gaśnicy; najpierw wyłączyć napięcie, alarmować."],
  ["Jakie są główne zagrożenia elektryczne?", "Porażenie, łuk elektryczny, pożar, oparzenia i urazy wtórne (upadek z wysokości)."],
  ["Co to jest instrukcja eksploatacji?", "Dokument pracodawcy określający zasady bezpiecznej obsługi, konserwacji, remontów, przeglądów i postępowania w razie awarii dla danych urządzeń; aktualizowany."],
  ["Po co ocena ryzyka?", "Żeby rozpoznać zagrożenia i dobrać środki ochronne, organizację pracy i sposób reagowania."],
  ["Czym różni się badanie odbiorcze od okresowego?", "Odbiorcze — przed oddaniem do użytkowania (potwierdzenie wymagań); okresowe — ocena stanu w trakcie eksploatacji, co najmniej co 5 lat."],
  ["Co musi zawierać protokół z pomiarów?", "Obiekt i obwód, datę, zakres, metodę, przyrząd (z numerem), wyniki, kryteria oceny, wnioski i dane osoby z uprawnieniami."],
  ["Czy jedna wartość Zs wystarczy do oceny?", "Nie — trzeba znać zabezpieczenie (typ, In), jego prąd zadziałania Ia i wymagany czas; dopiero Zs ≤ U0/Ia daje ocenę."],
  ["Czy dla każdego uziomu obowiązuje ta sama granica rezystancji?", "Nie — zależy od funkcji uziomu i układu (zalecenia: budynek ≤ 10 Ω, stacja ≤ 1 Ω)."],
  ["Po co sprawdza się kolejność faz?", "Żeby potwierdzić właściwą sekwencję L1–L2–L3 — od niej zależy np. kierunek obrotów silników."],
  ["Co robi osoba dozoru po wykryciu zagrożenia?", "Wstrzymuje niebezpieczne prace, zabezpiecza miejsce i uruchamia procedurę zgłoszenia."],
  ["Czy świadectwo kwalifikacyjne zastępuje szkolenie stanowiskowe?", "Nie — obowiązki szkoleniowe (BHP, stanowiskowe) i upoważnienia pracodawcy pozostają osobno."],
  ["Kiedy wstrzymuje się eksploatację urządzenia?", "Gdy stwierdzone zagrożenie wymaga wyłączenia lub innego zabezpieczenia — zgodnie z instrukcją i procedurą."],
];

/* Pytania testowe i fiszki z zakresu podręcznika (wymaga dane-test.js wcześniej). */
PYTANIA.push(
  { m: "elektrotechnika", p: "Odbiornik o mocy 2 kW pracował 3 godziny. Zużył energię:", odp: ["0,67 kWh", "5 kWh", "6 kWh", "6 kW"], ok: 2, w: "E = P · t = 2 kW · 3 h = 6 kWh." },
  { m: "elektrotechnika", p: "Prąd odbiornika rezystancyjnego 2,3 kW zasilanego napięciem 230 V wynosi:", odp: ["1 A", "10 A", "23 A", "100 A"], ok: 1, w: "I = P / U = 2300 / 230 = 10 A (cos φ = 1)." },
  { m: "elektrotechnika", p: "Moc czynną odbiornika trójfazowego oblicza się ze wzoru:", odp: ["P = U·I", "P = 3·U·I", "P = √3·U·I·cos φ", "P = U²·R"], ok: 2, w: "U — napięcie międzyfazowe, I — prąd przewodowy." },
  { m: "elektrotechnika", p: "Rezystancja przewodu rośnie, gdy:", odp: ["rośnie przekrój", "rośnie długość", "maleje temperatura", "zmienia się kolor izolacji"], ok: 1, w: "R = ρ·l/S — proporcjonalna do długości, odwrotnie do przekroju." },
  { m: "elektrotechnika", p: "Czy wyłącznik różnicowoprądowy (RCD) zastępuje wyłącznik nadprądowy?", odp: ["tak, zawsze", "nie — nie chroni przed przeciążeniem i zwarciem", "tak, jeśli ma 30 mA", "tylko w TN-S"], ok: 1, w: "Obie funkcje łączy aparat RCBO." },
  { m: "elektrotechnika", p: "Aparat łączący funkcję nadprądową i różnicowoprądową to:", odp: ["SPD", "RCBO", "MCB", "stycznik"], ok: 1, w: "RCBO = RCD + MCB w jednej obudowie." },
  { m: "elektrotechnika", p: "SPD służy do:", odp: ["pomiaru izolacji", "ograniczania przepięć", "zabezpieczenia przed przeciążeniem", "kompensacji mocy biernej"], ok: 1, w: "Surge Protective Device — ogranicznik przepięć." },
  { m: "elektrotechnika", p: "Selektywność zabezpieczeń oznacza, że przy zakłóceniu zadziała:", odp: ["zabezpieczenie główne", "zabezpieczenie najbliższe miejsca uszkodzenia", "wszystkie naraz", "żadne"], ok: 1, w: "Wyłączony zostaje tylko uszkodzony obwód." },
  { m: "pomiary", p: "Protokół z pomiarów z samą adnotacją „pozytywny” bez kryteriów oceny jest:", odp: ["wystarczający", "niepoprawny", "wymagany przez normę", "dopuszczalny dla D"], ok: 1, w: "Protokół musi mieć metodę, przyrząd, wyniki, kryteria, ocenę i osobę." },
  { m: "pomiary", p: "Badanie kolejności faz jest istotne m.in. dla:", odp: ["oświetlenia", "kierunku obrotów silników", "gniazd 230 V", "RCD typu AC"], ok: 1, w: "Zamiana dwóch faz zmienia kierunek wirowania silnika." },
  { m: "dozor", p: "Czy świadectwo D upoważnia automatycznie do osobistego wykonywania prac E?", odp: ["tak", "nie", "tylko do 1 kV", "tylko przy pomiarach"], ok: 1, w: "Do osobistego wykonywania prac potrzebny zakres E." },
  { m: "dozor", p: "Prawidłowa reakcja osoby dozoru na zagrożenie w trakcie prac to:", odp: ["dokończyć pracę szybciej", "wstrzymać pracę, zabezpieczyć, zgłosić", "zgłosić po zakończeniu", "zignorować, jeśli brak wypadku"], ok: 1, w: "Zagrożenie → wstrzymanie → zabezpieczenie → zgłoszenie." },
);
FISZKI.push(
  { m: "elektrotechnika", p: "Prawo Ohma?", o: "U = I · R." },
  { m: "elektrotechnika", p: "Moc 1-fazowa i 3-fazowa?", o: "P = U·I·cos φ; P = √3·U·I·cos φ (U międzyfazowe)." },
  { m: "elektrotechnika", p: "kW a kWh?", o: "kW — moc, kWh — energia (moc × czas)." },
  { m: "elektrotechnika", p: "RCBO, SPD, stycznik?", o: "RCBO — RCD + MCB; SPD — ogranicznik przepięć; stycznik — łącznik sterowany cewką do częstych łączeń." },
  { m: "elektrotechnika", p: "Selektywność?", o: "Działa zabezpieczenie najbliższe miejsca uszkodzenia." },
  { m: "pomiary", p: "Co musi być w protokole z pomiarów?", o: "Obiekt/obwód, data, zakres, metoda, przyrząd z numerem, wyniki, kryteria, ocena, osoba z uprawnieniami." },
);
