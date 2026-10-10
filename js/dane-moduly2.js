/* Moduły 5–10. Dopisywane do MODULY z dane-moduly.js. */
"use strict";

MODULY.push(
  /* ===================================================================== 5 */
  {
    id: "zabezpieczenia",
    ik: "🔒",
    tytul: "Wyłączniki, bezpieczniki, RCD",
    wstep: "Budowa i charakterystyki wyłącznika nadprądowego, oznaczenia wkładek bezpiecznikowych oraz wyłącznik różnicowoprądowy.",
    sekcje: [
      {
        t: "Wyłącznik nadprądowy (typu S / DS) — budowa", zr: "50",
        h: `
<div class="siatka-2">
<ol>
  <li>dźwignia napędowa</li><li>zamek</li><li>styk stały i styk ruchomy</li><li>zaciski przyłączowe</li>
  <li><b>wyzwalacz termobimetalowy</b> — od <b>przeciążeń</b></li><li>wkręt regulacyjny</li>
  <li><b>wyzwalacz elektromagnetyczny</b> — od <b>zwarć</b></li><li><b>komora gaszeniowa</b> — gasi łuk elektryczny</li>
</ol>
<div class="wazne"><b>Dwa wyzwalacze</b>bimetal (termiczny) = przeciążenie, działa z opóźnieniem;<br>elektromagnes = zwarcie, działa natychmiast.</div>
</div>`,
      },
      {
        t: "Charakterystyki A, B, C, D", zr: "47",
        h: `
<figure class="rys">${RYS.mcb()}</figure>
<div class="tabela-wrap"><table>
<tr><th>Typ</th><th>Próg niezadziałania</th><th>Próg zadziałania</th><th>Typowe zastosowanie (uzupełnienie)</th></tr>
<tr><td><b>A</b></td><td class="num">2 I<sub>n</sub></td><td class="num">3 I<sub>n</sub></td><td>obwody elektroniki, długie przewody</td></tr>
<tr class="wyr"><td><b>B</b></td><td class="num">3 I<sub>n</sub></td><td class="num">5 I<sub>n</sub></td><td>gniazda, oświetlenie w mieszkaniach</td></tr>
<tr><td><b>C</b></td><td class="num">5 I<sub>n</sub></td><td class="num">10 I<sub>n</sub></td><td>silniki, odbiorniki z rozruchem</td></tr>
<tr><td><b>D</b></td><td class="num">10 I<sub>n</sub></td><td class="num">20 I<sub>n</sub></td><td>duże prądy rozruchowe, transformatory</td></tr>
</table></div>
<p>Część przeciążeniowa (bimetal): przy <b>1,13 I<sub>n</sub></b> nie zadziała przez 1 h, przy <b>1,45 I<sub>n</sub></b> zadziała w ciągu 1 h.</p>
<div class="wazne"><b>Do obliczeń pętli zwarcia</b>za I<sub>a</sub> bierze się próg pewnego zadziałania: np. B16 → I<sub>a</sub> = 5 × 16 = 80 A; C16 → 160 A.</div>`,
      },
      {
        t: "Bezpieczniki — oznaczenia wkładek", zr: "51, 53, 78",
        h: `
<div class="tabela-wrap"><table>
<tr><th>Symbol</th><th>Charakterystyka</th><th>Do czego</th></tr>
<tr><td><b>gF, gN</b></td><td>pełnozakresowa <b>szybka</b></td><td>przewody, instalacje</td></tr>
<tr class="wyr"><td><b>gL, gG</b></td><td>pełnozakresowa <b>zwłoczna</b></td><td>ogólnego przeznaczenia (najczęstsza)</td></tr>
<tr><td><b>gD</b></td><td>pełnozakresowa zwłoczna</td><td>—</td></tr>
<tr><td><b>gM</b></td><td>pełnozakresowa zwłoczna</td><td>ochrona <b>silników</b></td></tr>
<tr><td><b>gTr</b></td><td>pełnozakresowa zwłoczna</td><td>ochrona <b>transformatorów</b></td></tr>
<tr><td><b>aM</b></td><td><b>niepełnozakresowa</b></td><td>ochrona <b>silników</b> (tylko od zwarć)</td></tr>
</table></div>
<p><b>g</b> = pełnozakresowa (przeciążenia i zwarcia), <b>a</b> = niepełnozakresowa (tylko zwarcia). Rodzaje wkładek: gwintowe <b>Bi (D, DII)</b>, cylindryczne, <b>nożowe WT (NH)</b>.</p>
<h3>Odczyt I<sub>a</sub> z charakterystyki</h3>
<p>Na osi czasu wybierz wymagany czas wyłączenia (<b>0,4 s</b> lub <b>5 s</b>), idź poziomo do krzywej wkładki, potem w dół na oś prądu. Przykład ze slajdu (wkładka 80 A): dla 5 s → I<sub>a</sub> = 250 A, dla 0,4 s → I<sub>a</sub> = 470 A. Im krótszy czas, tym większy prąd potrzebny do zadziałania.</p>`,
      },
      {
        t: "Wyłącznik różnicowoprądowy (RCD) — budowa i zasada", zr: "40, 45, 48",
        h: `
<div class="siatka-2">
  <figure class="rys">${RYS.rcd(false)}<figcaption>Stan normalny</figcaption></figure>
  <figure class="rys">${RYS.rcd(true)}<figcaption>Uszkodzenie — prąd ucieka przez człowieka/ziemię</figcaption></figure>
</div>
<p><b>Budowa:</b> 1. styki prądowe, 2. cewka wyzwalacza (przekaźnik), 3. <b>przekładnik Ferrantiego</b> (sumujący, obejmuje L i N), 4. obwód testowania (przycisk T z rezystorem).</p>
<p><b>Zasada:</b> przekładnik porównuje prąd płynący do odbiornika (I<sub>1</sub>) z powracającym (I<sub>2</sub>). Gdy część prądu ucieka do ziemi (prąd upływu / rażenia I<sub>Δ</sub>), pojawia się różnica → przekaźnik otwiera styki.</p>
<div class="siatka-2">
  <div class="kafel"><h4>Przeciwporażeniowy</h4><p class="duza num">I<sub>Δn</sub> ≤ 30 mA</p></div>
  <div class="kafel"><h4>Przeciwpożarowy</h4><p class="duza num">I<sub>Δn</sub> ≤ 500 mA</p></div>
</div>`,
      },
      {
        t: "Podział RCD", zr: "36, 46",
        h: `
<div class="siatka-3">
  <div class="kafel"><h4>Czułość I<sub>Δn</sub></h4><p><b>wysokoczułe</b> ≤ 30 mA<br><b>średnioczułe</b> 30–500 mA<br><b>niskoczułe</b> &gt; 500 mA</p></div>
  <div class="kafel"><h4>Rodzaj wykrywanego prądu</h4><p><b>AC</b> — przemienny sinusoidalny<br><b>A</b> — + wyprostowany jednopołówkowo i impulsowy<br><b>B</b> — + prąd stały</p></div>
  <div class="kafel"><h4>Czas działania</h4><p><b>bezzwłoczne</b><br><b>zwłoczne (selektywne) typu S</b> — gdy potrzebna selektywność (np. 300 mA S przed 30 mA)</p></div>
</div>
<div class="wazne"><b>Zakres zadziałania</b>RCD 30 mA musi zadziałać przy prądzie różnicowym między <b>0,5 I<sub>Δn</sub> a I<sub>Δn</sub></b>, czyli <span class="zapamietaj">15–30 mA</span>. Poniżej 15 mA nie powinien wyłączać.</div>
<div class="wazne zielone"><b>Przycisk TEST</b>Należy go naciskać <b>raz w miesiącu</b>, żeby sprawdzić, czy wyłącznik działa.</div>`,
      },
    ],
  },

  /* ===================================================================== 6 */
  {
    id: "pomiary",
    ik: "📏",
    tytul: "Pomiary i badania instalacji",
    wstep: "Co, czym i jak się mierzy przy sprawdzaniu instalacji do 1 kV — oraz jakie wyniki są dobre.",
    sekcje: [
      {
        t: "Podstawa: PN-HD 60364-6 i terminy badań", zr: "61, 73",
        h: `
<p><b>PN-HD 60364-6</b> — Sprawdzanie: wymagania dla sprawdzania <b>odbiorczego</b> i <b>okresowego</b>.</p>
<div class="wazne"><b>Badania okresowe</b>Prawo budowlane: nie rzadziej niż <span class="zapamietaj">co 5 lat</span>.
Norma zaleca częściej, a przy szczególnym zagrożeniu nawet <b>co rok</b>: miejsca z ryzykiem porażenia, pożaru lub wybuchu, instalacje nn i WN w jednym miejscu,
obiekty komunalne, <b>tereny budowy</b>, miejsca, gdzie używa się sprzętu przenośnego.</div>
<p>Częstość ustala się z uwzględnieniem rodzaju instalacji, jej zastosowania, jakości konserwacji i wpływów zewnętrznych.</p>`,
      },
      {
        t: "Pomiar napięcia (i prądu)", zr: "70",
        h: `
<div class="siatka-2">
  <div class="kafel"><h4>Woltomierz</h4><p>Zawsze <b>równolegle</b> do elementu, na którym mierzymy napięcie (DC lub AC).</p></div>
  <div class="kafel"><h4>Amperomierz (uzupełnienie)</h4><p>Zawsze <b>szeregowo</b> w obwodzie — prąd musi przez niego przepłynąć.</p></div>
</div>`,
      },
      {
        t: "Ciągłość przewodów ochronnych i wyrównawczych", zr: "17",
        h: `
<div class="siatka-3">
  <div class="kafel"><h4>Źródło</h4><p class="duza num">4–24 V</p><p>DC lub AC, w stanie bez obciążenia</p></div>
  <div class="kafel"><h4>Prąd pomiarowy</h4><p class="duza num">≥ 200 mA</p><p>(stąd nazwa przyrządu „R200”)</p></div>
  <div class="kafel"><h4>Wynik</h4><p class="duza num">≤ 1 Ω</p><p>cały sprawdzany odcinek</p></div>
</div>
<p>Czas przepływu prądu ≥ 10 s. Dopuszczalny błąd roboczy ±30% w zakresie 0,2–2 Ω. Mierzy się m.in. połączenia z główną szyną wyrównawczą (GSW) i rurami.</p>`,
      },
      {
        t: "Rezystancja izolacji", zr: "18, 24, 25",
        h: `
<figure class="rys">${RYS.izolacja()}<figcaption>Badanie izolacji ochronnej: zwarte L1, L2, L3, N kontra PE</figcaption></figure>
<ol class="kroki">
  <li>Odłącz instalację od napięcia i <b>odłącz odbiorniki</b>.</li>
  <li>Mierz megaomomierzem między fazami: <b>L1–L2, L2–L3, L3–L1</b>.</li>
  <li>Między fazami a N: <b>L1–N, L2–N, L3–N</b>.</li>
  <li>Izolacja ochronna: <b>L1+L2+L3+N zwarte ↔ PE</b>.</li>
  <li>Czas pomiaru: <b>60 s</b>.</li>
</ol>
<div class="tabela-wrap"><table>
<tr><th>Obwód</th><th>Napięcie probiercze DC</th><th>Min. rezystancja izolacji</th></tr>
<tr><td>SELV, PELV</td><td class="num">250 V</td><td class="num">≥ 0,5 MΩ</td></tr>
<tr class="wyr"><td>do 500 V (np. 230/400 V)</td><td class="num">500 V</td><td class="num">≥ 1,0 MΩ</td></tr>
<tr><td>powyżej 500 V</td><td class="num">1000 V</td><td class="num">≥ 1,0 MΩ</td></tr>
</table></div>
<p>Gdy w obwody są na stałe włączone urządzenia elektroniczne — mierzy się między połączonymi przewodami fazowymi i neutralnym a ziemią. Przyrządy: induktorowy miernik izolacji (korbka) lub elektroniczny tester (np. Sonel MIC).</p>`,
      },
      {
        t: "Impedancja pętli zwarcia — skuteczność ochrony", zr: "74, 75, 76",
        h: `
<p>Warunek w układzie TN: zwarcie fazy z PE (PEN) musi wywołać prąd co najmniej równy prądowi wyłączającemu I<sub>a</sub> zabezpieczenia (bezpiecznik, wyłącznik nadprądowy, RCD).</p>
<div class="wzor">Z<sub>s</sub> ≤ U<sub>0</sub> / I<sub>a</sub> &nbsp; ⇔ &nbsp; I<sub>k</sub> ≥ I<sub>a</sub><small>U<sub>0</sub> = 230 V, Z<sub>s</sub> — zmierzona impedancja pętli, I<sub>a</sub> — prąd zadziałania w wymaganym czasie (0,4 s w obwodach odbiorczych do 32 A)</small></div>
<h3>Przykład ze szkolenia</h3>
<div class="kafel">
<p>Obwód zabezpieczony wkładką <b>gF25</b>. Z tabeli producenta prąd wyłączający w 0,4 s: <b>I<sub>a</sub> = 93 A</b>.</p>
<p>Z<sub>s dop</sub> = 230 V / 93 A = <b>2,47 Ω</b>. Zmierzono <b>Z<sub>s</sub> = 0,72 Ω</b> (I<sub>k</sub> ≈ 310 A).</p>
<p>0,72 Ω ≤ 2,47 Ω → <b style="color:var(--zielony)">ochrona skuteczna — TAK</b>.</p>
</div>
<div class="tabela-wrap"><table>
<tr><th>gF I<sub>n</sub></th><th>I<sub>a</sub> dla 0,2 s</th><th>I<sub>a</sub> dla 0,4 s</th><th>I<sub>a</sub> dla 5 s</th></tr>
<tr><td>20 A</td><td class="num">85 A</td><td class="num">74 A</td><td class="num">50 A</td></tr>
<tr class="wyr"><td>25 A</td><td class="num">110 A</td><td class="num">93 A</td><td class="num">62,5 A</td></tr>
<tr><td>32 A</td><td class="num">140 A</td><td class="num">120 A</td><td class="num">80 A</td></tr>
</table></div>
<p>Policz sam w <a href="#/narzedzia">kalkulatorze pętli zwarcia</a>.</p>`,
      },
      {
        t: "Badanie wyłączników różnicowoprądowych", zr: "77",
        h: `
<ol class="kroki">
  <li>sprawdzenie <b>doboru</b> wyłącznika,</li>
  <li>sprawdzenie połączeń przewodów <b>L, N, PE</b>,</li>
  <li>sprawdzenie działania przyciskiem <b>TEST</b>,</li>
  <li>prąd narastający <b>0 … 0,5 I<sub>Δn</sub></b> — wyłącznik <b>nie może</b> zadziałać,</li>
  <li>prąd narastający <b>0,5 I<sub>Δn</sub> &lt; I<sub>Δ</sub> ≤ I<sub>Δn</sub></b> — wyłącznik <b>musi</b> zadziałać (dla 30 mA: 15–30 mA),</li>
  <li>pomiar <b>czasu zadziałania</b>,</li>
  <li>pomiar <b>napięcia dotykowego</b> bez wyzwalania: U<sub>d</sub> ≤ U<sub>L</sub>.</li>
</ol>
<div class="wazne niebieskie"><b>Uwaga</b>W trakcie <b>badań okresowych</b> pomiar czasu zadziałania RCD <b>nie jest wymagany</b>.</div>`,
      },
    ],
  },

  /* ===================================================================== 7 */
  {
    id: "uziemienia",
    ik: "🌍",
    tytul: "Uziomy i pomiar uziemień",
    wstep: "Po co uziom, jakie ma mieć wartości i trzy metody pomiaru rezystancji uziemienia.",
    sekcje: [
      {
        t: "Uziom obiektu budowlanego", zr: "14",
        h: `
<p><b>Zapewnia:</b> poprawną pracę instalacji, działanie ochrony przeciwporażeniowej, wyrównanie potencjałów i odprowadzenie przepięć od wyładowań, odprowadzenie prądów zwarciowych doziemnych i upływowych, bezpieczne rozproszenie prądu pioruna z instalacji odgromowej (LPS).</p>
<div class="siatka-2">
  <div class="kafel"><h4>Typ A (PN-EN 62305-3)</h4><p>uziomy <b>poziome i pionowe</b> instalowane na zewnątrz obiektu</p></div>
  <div class="kafel"><h4>Typ B</h4><p>uziom <b>otokowy, kratowy lub fundamentowy</b></p></div>
</div>
<div class="siatka-2" style="margin-top:12px">
  <div class="kafel"><h4>Budynek (uziom fundamentowy)</h4><p class="duza num">≤ 10 Ω</p><p>zalecana rezystancja</p></div>
  <div class="kafel"><h4>Stacja transformatorowa</h4><p class="duza num">≤ 1 Ω</p><p>zalecana rezystancja</p></div>
</div>
<p><b>U<sub>d</sub></b> — napięcie dotykowe (ręka–stopy), <b>U<sub>k</sub></b> — napięcie krokowe (między stopami), <b>U<sub>L</sub></b> — napięcie bezpieczne. Muszą być U<sub>d</sub> &lt; U<sub>L</sub> i U<sub>k</sub> &lt; U<sub>L</sub>.</p>`,
      },
      {
        t: "Pomiar rezystancji uziemienia — metoda techniczna / trójprzewodowa", zr: "06, 09, 72",
        h: `
<p>Mierzy się <b>po wykonaniu uziemienia</b> i <b>okresowo</b> w eksploatacji (korozja, warunki atmosferyczne). Wynik potwierdza warunki ochrony <b>przeciwporażeniowej, odgromowej i przeciwprzepięciowej</b>.</p>
<figure class="rys">${RYS.uziemienie3p()}</figure>
<div class="wzor">R<sub>x</sub> = U<sub>x</sub> / I<sub>A</sub> &nbsp;[Ω]</div>
<ol class="kroki">
  <li>Badany uziom → gniazdo <b>E</b>.</li>
  <li>Sonda napięciowa <b>S</b> w odległości <b>20 m</b> od uziomu → gniazdo S.</li>
  <li>Sonda prądowa <b>H</b> w odległości <b>40 m</b> → gniazdo H.</li>
  <li>Funkcja <b>RE3p</b>, START → wynik R<sub>E</sub> oraz rezystancje sond R<sub>S</sub>, R<sub>H</sub>.</li>
</ol>
<div class="wazne"><b>Ziemia odniesienia</b>Sondę S ustawia się w strefie stałego (zerowego) potencjału — ok. <span class="zapamietaj">62%</span> odległości E–H (strefa 52–72%). Leje potencjałowe uziomu i sondy H nie mogą na siebie zachodzić.
Odległość sond od uziomu: co najmniej <b>5 × a</b>, gdzie a — największy wymiar uziomu.</div>`,
      },
      {
        t: "Metoda dwucęgowa", zr: "79",
        h: `
<p>Jedne cęgi <b>indukują napięcie</b> w pętli: uziom badany R<sub>x</sub> + pozostałe uziomy połączone równolegle (np. przez GSW, R<sub>B</sub> stacji). Drugie cęgi <b>mierzą prąd</b> o częstotliwości innej niż sieciowa.</p>
<ul>
  <li>Wynik to R<sub>x</sub> + R<sub>e</sub> (wypadkowa reszty) — <b>zawyżony</b>, czyli błąd w kierunku bezpiecznym.</li>
  <li>Jeżeli wynik nie przekracza wartości dopuszczalnej, dokładniejszy pomiar nie jest potrzebny.</li>
  <li>Zaleta: bez rozłączania złącza kontrolnego i bez wbijania sond. Wymaga zamkniętej pętli (kilka uziomów).</li>
</ul>`,
      },
      {
        t: "Rezystancja uziemienia z pomiaru pętli zwarcia", zr: "80",
        h: `
<p>Wg PN-HD 60364-6: przy <b>odłączonym zasilaniu</b> instalacji chronionej przez badane uziemienie, przyrząd podłączony od strony zasilania wyłączonego wyłącznika głównego; badany uziom <b>odłączony</b> od reszty instalacji uziemiającej.</p>
<div class="wazne czerwone"><b>Uwaga</b>Pomiar „na żywej” instalacji (zwłaszcza starszym przyrządem) może spowodować pojawienie się niebezpiecznego napięcia na częściach przewodzących dostępnych. Metoda mniej dokładna niż szpilkowa — czasem jedyna możliwa.</div>`,
      },
    ],
  },

  /* ===================================================================== 8 */
  {
    id: "bhp",
    ik: "⛑️",
    tytul: "Bezpieczna praca przy urządzeniach",
    wstep: "Sprawdzanie braku napięcia, uziemianie miejsca pracy, strefy pracy i sprzęt ochronny.",
    sekcje: [
      {
        t: "Sprawdzanie braku napięcia", zr: "71",
        h: `
<p><b>Sprzęt:</b> wskaźniki obecności niskiego napięcia, wskaźniki drążkowe nn i WN, wskaźniki WN z drążkiem izolacyjnym.</p>
<ul>
  <li>Przy WN — wskaźniki <b>akustyczne lub akustyczno-optyczne z samokontrolą</b>.</li>
  <li>Wskaźnik <b>bez samokontroli</b> — tylko gdy można sprawdzić jego działanie <b>bezpośrednio przed i po użyciu</b> na urządzeniu pod napięciem.</li>
  <li>Wskaźniki WN na drążkach o odpowiednim napięciu znamionowym; <b>nie trzymać poza ogranicznikiem uchwytu</b>.</li>
</ul>
<div class="wazne czerwone"><b>Nie wolno</b>sprawdzać braku napięcia tylko na podstawie wskaźników stałych (np. szynowych) ani odczytu przyrządów pomiarowych.</div>
<p>Przykład testera: IP65, kategoria pomiarowa <b>CAT IV 600 V / CAT III 1000 V</b>. Wskaźniki napięcia — norma PN-EN 61243-1.</p>`,
      },
      {
        t: "Uziemianie miejsca pracy", zr: "02",
        h: `
<ol class="kroki">
  <li>Uziemiacze dobrane do <b>prądu zwarciowego</b> możliwego w miejscu pracy.</li>
  <li>Uziemienie zakłada się <b>bezpośrednio po sprawdzeniu braku napięcia</b>.</li>
  <li>Zakładanie: najpierw <b>zacisk uziemiający do uziomu</b>, potem drążkiem izolacyjnym zaciski fazowe.</li>
  <li>Zdejmowanie — w <b>odwrotnej kolejności</b>.</li>
</ol>
<ul>
  <li>Uziemiacze przenośne <b>po obu stronach</b> miejsca pracy, co najmniej jeden <b>widoczny</b> z miejsca pracy.</li>
  <li>Zasilanie z wielu linii → uziemić <b>wszystkie</b> linie zasilające.</li>
  <li><b>Nie wolno</b> uziemiać przez bezpieczniki i odłączniki.</li>
  <li>Powyżej 1 kV — okulary i hełm ochronny.</li>
</ul>`,
      },
      {
        t: "Strefy pracy i minimalne odstępy", zr: "27",
        h: `
<figure class="rys">${RYS.strefy()}</figure>
<div class="tabela-wrap"><table>
<tr><th>U<sub>n</sub> [kV]</th><th>Granica strefy prac pod napięciem [mm]</th><th>Zewn. granica strefy prac w pobliżu napięcia [mm]</th></tr>
<tr class="wyr"><td>≤ 1</td><td>bez dotyku</td><td class="num">300</td></tr>
<tr><td>3</td><td class="num">60</td><td class="num">1120</td></tr>
<tr><td>6</td><td class="num">90</td><td class="num">1120</td></tr>
<tr class="wyr"><td>10</td><td class="num">120</td><td class="num">1150</td></tr>
<tr><td>15</td><td class="num">160</td><td class="num">1160</td></tr>
<tr><td>20</td><td class="num">220</td><td class="num">1220</td></tr>
<tr><td>30</td><td class="num">320</td><td class="num">1320</td></tr>
<tr class="wyr"><td>110</td><td class="num">1000</td><td class="num">2000</td></tr>
<tr><td>220</td><td class="num">1600</td><td class="num">3000</td></tr>
<tr><td>400</td><td class="num">2500</td><td class="num">4000</td></tr>
<tr><td>750</td><td class="num">5300</td><td class="num">8400</td></tr>
</table></div>
<div class="wazne"><b>Najczęściej pytane</b>do 1 kV: strefa pod napięciem = „bez dotyku”, w pobliżu napięcia = <b>300 mm</b>; 110 kV: 1 m / 2 m.</div>`,
      },
      {
        t: "Sprzęt ochrony osobistej", zr: "01",
        h: `
<div class="siatka-3">
  <div class="kafel"><h4>Hełm z przyłbicą</h4><p>Chroni głowę przed udarem, oczy i twarz przed UV, odpryskami i <b>łukiem elektrycznym</b> (kl. 1). Izolacja klasy 0: 1000 V AC / 1500 V DC.</p></div>
  <div class="kafel"><h4>Rękawice elektroizolacyjne</h4><p>Do <b>1000 V</b>; często z rękawicą skórzaną na wierzch (ochrona mechaniczna).</p></div>
  <div class="kafel"><h4>Kalosze / półbuty dielektryczne kl. 0</h4><p>Do 1 kV AC / 1,5 kV DC — <b>sprzęt dodatkowy</b>, zakładany na obuwie robocze. Prąd upływu ≤ 2 mA, próba 10 kV.</p></div>
</div>`,
      },
      {
        t: "Gaszenie urządzeń elektrycznych", zr: "15",
        h: `
<p><b>Gaśnica mgłowa</b> (np. GWM-6, woda demineralizowana) — pożary grup <b>A i F</b> (ciała stałe, oleje i tłuszcze jadalne), także <b>płonącej na człowieku odzieży</b>, dokumentów i urządzeń; nie zostawia śladów.</p>
<div class="wazne czerwone"><b>Urządzenia pod napięciem</b>tylko <b>do 1000 V</b> i z odległości <b>min. 1 m</b>.</div>`,
      },
    ],
  },

  /* ===================================================================== 9 */
  {
    id: "instalacje",
    ik: "🏠",
    tytul: "Montaż: gniazda, łazienka, Ex, gaz",
    wstep: "Jak podłączyć gniazdo i łącznik, przyłączanie urządzeń, strefy w łazience, urządzenia przeciwwybuchowe i instalacje gazowe.",
    sekcje: [
      {
        t: "Gniazdo wtykowe i łącznik", zr: "43",
        h: `
<figure class="rys">${RYS.gniazdo()}</figure>
<ul>
  <li><b>TN-S:</b> L — lewy zacisk, N — prawy, PE — bolec ochronny.</li>
  <li><b>TN-C:</b> PEN dochodzi do bolca i mostkiem do zacisku N (2 przewody pod bolcem).</li>
  <li><b>Gniazda podwójne</b> — ta sama zasada, z <b>połączeniem krzyżowym</b> zacisków prądowych.</li>
  <li><b>Łącznik zawsze w przewodzie fazowym L.</b></li>
</ul>`,
      },
      {
        t: "Przyłączanie urządzeń przewodem ruchomym", zr: "39",
        h: `
<ul>
  <li><b>Żyła ochronna PE musi mieć nadmiar długości</b> względem żył roboczych — przy wyrwaniu przewodu rozłączy się jako ostatnia.</li>
  <li>Przewody giętkie wprowadza się tak, by nie skręcały się i nie przenosiły naciągu na zaciski: <b>odgiętka</b> (1) i <b>odciążka</b> (2).</li>
</ul>`,
      },
      {
        t: "Strefy w łazience (PN-HD 60364-7-701)", zr: "38",
        h: `
<figure class="rys">${RYS.lazienka()}</figure>
<div class="tabela-wrap"><table>
<tr><th>Strefa</th><th>Gdzie</th><th>Min. IP</th><th>Co wolno</th></tr>
<tr class="wyr"><td><b>0</b></td><td>wnętrze wanny / brodzika</td><td>IPX7</td><td>tylko urządzenia na <b>bardzo niskie napięcie ≤ 12 V</b></td></tr>
<tr><td><b>1</b></td><td>nad wanną do 2,25 m</td><td>IPX5</td><td>np. przepływowy podgrzewacz na stałe (IP25), z RCD 30 mA</td></tr>
<tr><td><b>2</b></td><td>0,60 m od wanny</td><td>IPX4 (publiczne IPX5)</td><td>podgrzewacz na stałe, oprawy II kl.; gniazdo i wyłącznik dopiero w strefie 3</td></tr>
<tr><td><b>3</b></td><td>kolejne 2,40 m</td><td>IPX4 (publiczne IPX5)</td><td>pralka, grzejnik, oprawy II kl., wyłączniki, <b>gniazda z bolcem IP44</b></td></tr>
</table></div>`,
      },
      {
        t: "Urządzenia w wykonaniu przeciwwybuchowym", zr: "41",
        h: `<p>Urządzenia i systemy ochronne do atmosfery wybuchowej podlegają ocenie zgodności z dyrektywą <b>ATEX</b>. Każde musi być oznakowane <b>czytelnie i trwale</b> (znak <b>Ex</b> w sześciokącie).</p>`,
      },
      {
        t: "Instalacje gazowe w budynkach", zr: "60",
        h: `
<ul>
  <li>Budynek <b>wyższy niż 25 m</b> — instalacja gazowa wymaga pozytywnej opinii komendanta wojewódzkiego PSP.</li>
  <li><b>Gaz płynny</b> — tylko w budynkach <b>niskich</b>.</li>
  <li><b>Zabrania się</b> stosowania w jednym budynku gazu płynnego i gazu z sieci (wyjątek: w budynku niskim na gaz płynny dopuszcza się kotłownię na gaz sieciowy).</li>
  <li>Ciśnienie gazu przy ścianie budynku: mieszkalnego, zamieszkania zbiorowego, użyteczności publicznej i rekreacji indywidualnej — <b>≤ 500 kPa</b>; pozostałych — <b>≤ 1600 kPa</b>.</li>
</ul>`,
      },
    ],
  },

  /* ===================================================================== 10 */
  {
    id: "pomoc",
    ik: "🚑",
    tytul: "Porażenie i pierwsza pomoc",
    wstep: "Od czego zależą skutki porażenia, co prąd robi z organizmem, łańcuch ratowniczy, RKO i oparzenia.",
    sekcje: [
      {
        t: "Od czego zależą skutki przepływu prądu", zr: "11, 16",
        h: `
<ul>
  <li><b>rodzaj prądu</b> — stały, przemienny, udarowy (piorun),</li>
  <li><b>natężenie</b> prądu rażenia,</li>
  <li><b>czas</b> przepływu,</li>
  <li><b>częstotliwość</b> — najgroźniejsza sieciowa (50 Hz); przy wyższej i niższej prąd śmiertelny rośnie (np. 5000 Hz → 1 A, 10 Hz → 1,2 A),</li>
  <li><b>rezystancja ciała</b> — w najgorszych warunkach <b>1000–2000 Ω</b>,</li>
  <li>stan psychiczny i fizyczny, choroby,</li>
  <li>czynniki środowiskowe — wilgotność, temperatura, stanowisko na gołej ziemi, podłoga przewodząca,</li>
  <li><b>droga przepływu</b> (najgroźniejsza przez serce, np. ręka–nogi).</li>
</ul>
<div class="wazne"><b>Najważniejsze trzy</b>rodzaj prądu, natężenie i czas przepływu.</div>`,
      },
      {
        t: "Co prąd robi z organizmem", zr: "12",
        h: `
<div class="siatka-2">
  <div class="kafel"><h4>Serce</h4><p><b>Migotanie komór</b> → zatrzymanie krążenia → śmierć z niedotlenienia.</p></div>
  <div class="kafel"><h4>Układ nerwowy</h4><p>Utrata przytomności, zaburzenia, niepokój.</p></div>
  <div class="kafel"><h4>Mięśnie</h4><p>Skurcze, <b>samościsk</b> (nie można puścić przewodu), drżenie, ból; skurcz mięśni oddechowych.</p></div>
  <div class="kafel"><h4>Oparzenia</h4><p><b>Zewnętrzne</b> — łuk, w miejscu styku; <b>wewnętrzne</b> — na całej drodze prądu, niewidoczne, mogą uszkodzić <b>nerki</b> (mioglobina z mięśni).</p></div>
</div>
<p>Do tego: utrata równowagi, upadek, urazy mechaniczne, uszkodzenie wzroku od łuku.</p>`,
      },
      {
        t: "Łańcuch ratowniczy", zr: "07",
        h: `
<figure class="rys">${RYS.lancuch()}</figure>
<p>Ratownika pierwszego kontaktu dotyczą <b>trzy pierwsze ogniwa</b>: natychmiastowe działanie, wezwanie pomocy, pierwsza pomoc. Pozostałe — służby ratunkowe.</p>
<div class="wazne czerwone"><b>Prawo</b>Nieudzielenie pomocy — do <b>3 lat</b> pozbawienia wolności. Numer alarmowy <span class="zapamietaj">112</span> (pogotowie 999).</div>`,
      },
      {
        t: "Resuscytacja krążeniowo-oddechowa (RKO)", zr: "03, 04",
        h: `
<ol class="kroki">
  <li>Oceń <b>bezpieczeństwo</b> (najpierw odłącz napięcie!).</li>
  <li>Oceń <b>przytomność</b>.</li>
  <li>Udrożnij <b>drogi oddechowe</b>.</li>
  <li>Oceń <b>oddech</b> metodą „<b>widzę, słyszę, czuję</b>” (do 10 s).</li>
  <li>Zadzwoń na <b>112</b> (lub 999).</li>
  <li><b>30 uciśnięć</b> klatki piersiowej.</li>
  <li><b>2 oddechy</b> ratownicze.</li>
  <li>Kontynuuj <b>30 : 2</b>. Gdy jest <b>AED</b> — włącz i wykonuj polecenia.</li>
</ol>
<div class="siatka-2">
  <div class="kafel"><h4>Tempo uciśnięć</h4><p class="duza num">100–120 / min</p></div>
  <div class="kafel"><h4>Stosunek</h4><p class="duza num">30 : 2</p></div>
</div>
<h3>RKO prowadzi się do:</h3>
<ol><li>powrotu oddechu i tętna,</li><li>przybycia profesjonalnej pomocy,</li><li>wyczerpania sił ratownika,</li><li>gdy dalsze działanie zagraża ratującemu.</li></ol>`,
      },
      {
        t: "Oparzenia", zr: "65, 66",
        h: `
<div class="siatka-3">
  <div class="kafel"><h4>I stopień</h4><p>tylko naskórek: <b>rumień, obrzęk, ból</b>.</p></div>
  <div class="kafel"><h4>II stopień</h4><p>naskórek i skóra właściwa: zaczerwienienie, <b>pęcherze</b>, czucie zachowane.</p></div>
  <div class="kafel"><h4>III stopień</h4><p>martwica całej skóry i tkanek pod nią: skóra sucha, <b>biała lub szara</b>, strup, <b>brak bólu</b> (zniszczone nerwy).</p></div>
</div>
<h3>Reguła dziewiątek — powierzchnia oparzenia</h3>
<div class="siatka-2">
<figure class="rys">${RYS.dziewiatki()}</figure>
<ul>
  <li>głowa — <b>9%</b></li><li>każda ręka — <b>9%</b></li><li>przód tułowia — <b>18%</b>, tył — <b>18%</b></li>
  <li>każda noga — <b>18%</b></li><li>krocze — <b>1%</b></li>
</ul>
</div>`,
      },
    ],
  },
);
