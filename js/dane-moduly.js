/* Treść nauki — przepisana i uporządkowana ze slajdów szkoleniowych SEP (grupa 1, E).
   „zr” = numery zdjęć w folderze „sep materiały” (kolejność wg godziny wykonania), żeby
   dało się wrócić do oryginału. Fragmenty spoza slajdów są oznaczone jako „uzupełnienie”. */
"use strict";

const MODULY = [
  /* ===================================================================== 1 */
  {
    id: "przepisy",
    ik: "📜",
    tytul: "Przepisy, normy, uprawnienia",
    wstep: "Na jakiej podstawie prawnej działa elektryk, czym różni się E od D i kiedy potrzebne jest polecenie pisemne.",
    sekcje: [
      {
        t: "Najważniejsze akty prawne", zr: "32",
        h: `
<h3>Ustawy (najwyższe akty)</h3>
<ul>
  <li><b>Prawo budowlane</b> — ustawa z 7 lipca 1994 r.</li>
  <li><b>Prawo energetyczne</b> — ustawa z 10 kwietnia 1997 r.</li>
  <li><b>Kodeks pracy</b> — ustawa z 26 czerwca 1974 r.</li>
</ul>
<h3>Rozporządzenia (przepisy wykonawcze)</h3>
<ul>
  <li><b>Min. Klimatu i Środowiska z 1 lipca 2022 r.</b> — szczegółowe zasady stwierdzania kwalifikacji osób zajmujących się eksploatacją urządzeń, instalacji i sieci (to na jego podstawie zdajesz egzamin).</li>
  <li><b>Min. Energii z 28 sierpnia 2019 r.</b> — BHP przy urządzeniach i instalacjach energetycznych (polecenia, strefy pracy, prace szczególnie niebezpieczne).</li>
  <li><b>Min. Infrastruktury z 12 kwietnia 2002 r.</b> — warunki techniczne, jakim powinny odpowiadać budynki (instalacje elektryczne: §180–190).</li>
  <li><b>Min. Klimatu i Środowiska z 22 marca 2023 r.</b> — szczegółowe warunki funkcjonowania systemu elektroenergetycznego (zastąpiło rozporządzenie z 4 maja 2007 r.).</li>
</ul>
<h3>Normy</h3>
<p><b>PN-HD 60364</b> — Instalacje elektryczne niskiego napięcia:</p>
<div class="tabela-wrap"><table>
<tr><th>Część</th><th>Zakres</th></tr>
<tr><td>1</td><td>Wymagania, ogólne charakterystyki, definicje</td></tr>
<tr><td>3</td><td>Instalacje w obiektach budowlanych</td></tr>
<tr class="wyr"><td>4-41</td><td>Ochrona przed porażeniem elektrycznym</td></tr>
<tr><td>5</td><td>Dobór i montaż wyposażenia</td></tr>
<tr class="wyr"><td>6</td><td>Sprawdzanie (odbiorcze i okresowe)</td></tr>
<tr><td>7</td><td>Wymagania dla specjalnych instalacji lub lokalizacji (np. łazienki: 7-701)</td></tr>
</table></div>`,
      },
      {
        t: "Normy — dobrowolne, ale…", zr: "26",
        h: `
<p>Normy to zbiór <b>uznanych reguł technicznych</b> (w prawie: „zasad wiedzy technicznej”) przyjętych w drodze konsensusu.</p>
<div class="wazne"><b>Stosowanie norm jest dobrowolne.</b>
Ale gdy dojdzie do wypadku, szkody czy skażenia, niezgodność z normą obciąża projektanta, wykonawcę i właściciela —
nie za samo „złamanie normy”, tylko za nierespektowanie uznanych reguł technicznych. Wymaganie przepisu spełnia się
albo przestrzegając normy, albo <b>w inny, równoważny sposób</b>.</div>`,
      },
      {
        t: "Stanowiska: eksploatacja (E) i dozór (D)", zr: "23",
        h: `
<div class="siatka-2">
  <div class="kafel"><h4>E — eksploatacja</h4><p>Osoby <b>wykonujące prace</b>: obsługa, konserwacja, remonty, montaż, prace kontrolno-pomiarowe.</p></div>
  <div class="kafel"><h4>D — dozór</h4><p>Osoby <b>kierujące</b> pracami eksploatacyjnymi oraz pracownicy techniczni sprawujący <b>nadzór</b> nad eksploatacją.</p></div>
</div>
<div class="wazne niebieskie"><b>Grupa 1</b> — urządzenia, instalacje i sieci elektroenergetyczne. Do wniosku egzaminacyjnego dołącza się m.in. zaświadczenie pracodawcy o doświadczeniu i stażu pracy.</div>`,
      },
      {
        t: "Polecenie pisemne — kiedy i jak", zr: "20, 21",
        h: `
<div class="wazne czerwone"><b>Zasada</b>Prace eksploatacyjne stwarzające możliwość wystąpienia <b>szczególnego zagrożenia dla zdrowia lub życia</b> wykonuje się na podstawie <b>polecenia pisemnego</b>.</div>
<h3>Przykłady prac szczególnie niebezpiecznych (wybór najczęściej pytanych)</h3>
<ul>
  <li>w pobliżu <b>nieosłoniętych urządzeń pod napięciem</b> lub ich części,</li>
  <li><b>przy urządzeniach pod napięciem</b> (poza pracami wykonywanymi stale przez upoważnione osoby wg instrukcji eksploatacji),</li>
  <li>przy urządzeniach wyłączonych, ale uziemionych tak, że <b>żadne uziemienie nie jest widoczne z miejsca pracy</b>,</li>
  <li><b>w wykopach lub na wysokości</b>,</li>
  <li>związane z <b>identyfikacją i przecinaniem kabli</b>,</li>
  <li>na skrzyżowaniach linii z liniami pod napięciem; przy wyłączonym torze linii wielotorowej ≥ 1 kV, gdy inny tor jest pod napięciem,</li>
  <li>w zbiornikach, kanałach i innych przestrzeniach zamkniętych; w strefach zagrożenia wybuchem; przy sieci trakcyjnej,</li>
  <li>na rurociągach wody, pary, gazów o nadciśnieniu <b>≥ 50 kPa</b> wymagające demontażu armatury.</li>
</ul>
<p>Szczegółowy wykaz takich prac <b>ustala i aktualizuje pracodawca</b>.</p>
<h3>Dopuszczenie do pracy (robi to dopuszczający)</h3>
<ol class="kroki">
  <li>sprawdzenie poprawności przygotowania strefy pracy,</li>
  <li>wskazanie zespołowi (kierującemu zespołem) strefy pracy,</li>
  <li><b>instruktaż o zagrożeniach w strefie pracy lub jej sąsiedztwie</b>,</li>
  <li>pisemne potwierdzenie dopuszczenia do pracy,</li>
  <li>zgłoszenie koordynującemu dopuszczenia zespołu do pracy.</li>
</ol>`,
      },
    ],
  },

  /* ===================================================================== 2 */
  {
    id: "podstawy",
    ik: "⚡",
    tytul: "Napięcia, przewody, oznaczenia",
    wstep: "Podział napięć, napięcia bezpieczne, sieć 230/400 V oraz kolory, symbole i przekroje przewodów.",
    sekcje: [
      {
        t: "Podział napięć", zr: "05",
        h: `
<div class="tabela-wrap"><table>
<tr><th>Nazwa</th><th>Skrót</th><th>Prąd przemienny (AC)</th><th>Prąd stały (DC)</th></tr>
<tr class="wyr"><td>Bardzo niskie napięcie</td><td>ELV</td><td class="num">U<sub>n</sub> ≤ 50 V</td><td class="num">U<sub>n</sub> ≤ 120 V</td></tr>
<tr><td>Niskie napięcie</td><td>nN</td><td class="num">50 V &lt; U<sub>n</sub> ≤ 1000 V</td><td class="num">120 V &lt; U<sub>n</sub> ≤ 1500 V</td></tr>
<tr><td>Średnie napięcie</td><td>SN</td><td class="num">1 kV &lt; U<sub>n</sub> ≤ 50 kV</td><td class="num">1,5 kV &lt; U<sub>n</sub> ≤ 75 kV</td></tr>
<tr><td>Wysokie napięcie</td><td>WN</td><td class="num">U<sub>n</sub> &gt; 50 kV</td><td class="num">U<sub>n</sub> &gt; 75 kV</td></tr>
</table></div>
<p>ELV — <i>Extra-Low Voltage</i>. Granice ELV (50 V AC / 120 V DC) to te same liczby, co napięcie bezpieczne w warunkach normalnych.</p>`,
      },
      {
        t: "Napięcia bezpieczne (dotykowe dopuszczalne U<sub>L</sub>)", zr: "67",
        h: `
<div class="tabela-wrap"><table>
<tr><th>Rodzaj napięcia</th><th class="c">normalne (suche)</th><th class="c">szczególne (wilgotne)</th><th class="c">ekstremalne (mokre)</th></tr>
<tr class="wyr"><td>przemienne AC</td><td class="c num">50 V</td><td class="c num">25 V</td><td class="c num">12 V</td></tr>
<tr class="wyr"><td>stałe DC</td><td class="c num">120 V</td><td class="c num">60 V</td><td class="c num">30 V</td></tr>
</table></div>
<div class="wazne"><b>Sposób na zapamiętanie</b>AC: 50 → 25 → 12 (za każdym razem o połowę). DC: zawsze ok. 2,4× więcej: 120 → 60 → 30.</div>
<p><b>Źródła bardzo niskiego napięcia bezpiecznego:</b> transformatory ochronne (bezpieczeństwa), źródła elektrochemiczne (akumulatory, baterie), zespoły prądotwórcze napędzane silnikiem spalinowym.</p>`,
      },
      {
        t: "Typowa sieć nN w Polsce: 230/400 V", zr: "56, 69",
        h: `
<figure class="rys">${RYS.siecNN()}<figcaption>Transformator SN/nN, uzwojenie wtórne w gwiazdę, punkt neutralny uziemiony.</figcaption></figure>
<div class="siatka-2">
  <div class="kafel"><h4>Napięcie międzyfazowe</h4><p class="duza num">400 V</p><p>L1–L2, L2–L3, L3–L1</p></div>
  <div class="kafel"><h4>Napięcie fazowe</h4><p class="duza num">230 V</p><p>L–N (L–PEN), L–ziemia. N–ziemia ≈ 0 V</p></div>
</div>
<p>Sieć 0,4 kV od transformatora to zwykle <b>TN-C</b> (L1, L2, L3, PEN).</p>`,
      },
      {
        t: "Oznaczenia i kolory przewodów", zr: "54, 57",
        h: `
<div class="tabela-wrap"><table>
<tr><th>Symbol</th><th>Przewód</th><th>Kolor izolacji</th></tr>
<tr><td><b>L</b> (L1, L2, L3)</td><td>fazowy</td><td>brązowy, czarny, szary</td></tr>
<tr><td><b>N</b></td><td>neutralny</td><td>niebieski</td></tr>
<tr class="wyr"><td><b>PE</b></td><td>ochronny</td><td>żółto-zielony — <b>tylko</b> do PE</td></tr>
<tr><td><b>PEN</b></td><td>ochronno-neutralny</td><td>żółto-zielony z niebieskimi końcówkami (lub odwrotnie)</td></tr>
<tr><td><b>L+ / L− / M</b></td><td>prąd stały: biegun dodatni / ujemny / punkt środkowy</td><td>L+ czerwony, M niebieski</td></tr>
</table></div>
<h3>Oznaczenia w symbolach przewodów</h3>
<div class="siatka-3">
  <div class="kafel"><h4>Konstrukcja żyły</h4><p><b>D</b> — drut<br><b>L</b> — linka<br><b>Lg</b> — linka giętka</p></div>
  <div class="kafel"><h4>Materiał żyły</h4><p><b>A</b> — aluminium<br><b>brak litery</b> — miedź</p></div>
</div>`,
      },
      {
        t: "Przekroje przewodów ochronnych", zr: "59",
        h: `
<ul>
  <li>Przewód ochronny PE (osobny, nie w kablu): <b>2,5 mm²</b> z osłoną mechaniczną, <b>4 mm²</b> bez osłony.</li>
  <li>Przewód ochronno-neutralny PEN: <b>min. 10 mm² Cu</b> lub <b>16 mm² Al</b>.</li>
</ul>
<div class="tabela-wrap"><table>
<tr><th>Przekrój fazowego S<sub>L</sub> [mm²]</th><th>Min. przekrój ochronnego S<sub>PE</sub> [mm²]</th></tr>
<tr><td>S<sub>L</sub> ≤ 16</td><td><b>S<sub>PE</sub> = S<sub>L</sub></b></td></tr>
<tr><td>16 &lt; S<sub>L</sub> ≤ 35</td><td><b>16</b></td></tr>
<tr><td>S<sub>L</sub> &gt; 35</td><td><b>½ S<sub>L</sub></b></td></tr>
</table></div>
<p class="mono">(PE z tego samego materiału co przewody fazowe)</p>`,
      },
    ],
  },

  /* ===================================================================== 3 */
  {
    id: "uklady",
    ik: "🔌",
    tytul: "Układy sieci TN, TT, IT",
    wstep: "Co oznaczają litery w nazwie układu i jak wyglądają TN-C, TN-S, TN-C-S, TT i IT.",
    sekcje: [
      {
        t: "Jak czytać nazwę układu", zr: "35",
        h: `
<div class="siatka-2">
  <div class="kafel"><h4>1. litera — sieć a ziemia</h4><p><b>T</b> — jeden punkt sieci połączony bezpośrednio z ziemią.<br><b>I</b> — wszystkie części czynne izolowane od ziemi albo jeden punkt połączony z ziemią przez impedancję.</p></div>
  <div class="kafel"><h4>2. litera — obudowy a ziemia</h4><p><b>T</b> — części przewodzące dostępne uziemione bezpośrednio, niezależnie od uziemienia sieci.<br><b>N</b> — części przewodzące dostępne połączone z uziemionym punktem sieci (zwykle z punktem neutralnym).</p></div>
</div>
<div class="kafel" style="margin-top:12px"><h4>Kolejne litery (tylko w TN) — przewody N i PE</h4><p><b>C</b> (<i>combined</i>) — jeden wspólny przewód PEN.<br><b>S</b> (<i>separated</i>) — osobne przewody N i PE.</p></div>`,
      },
      { t: "Układ TN-C", zr: "52, 69", h: `<figure class="rys">${RYS.uklad("TN-C")}</figure><p>Funkcje przewodu neutralnego i ochronnego pełni <b>jeden przewód PEN</b> w całej sieci. <i>Uzupełnienie: w TN-C nie stosuje się wyłącznika różnicowoprądowego — przewód PEN nie może przez niego przechodzić.</i></p>` },
      {
        t: "Układ TN-S", zr: "34",
        h: `<figure class="rys">${RYS.uklad("TN-S")}</figure>
<p>Sieć TN ma jeden punkt bezpośrednio uziemiony (R<sub>B</sub>), a obudowy są przyłączone do tego punktu przewodami ochronnymi. W <b>TN-S</b> w całym układzie stosuje się <b>osobny przewód ochronny PE</b>. Dodatkowo stosuje się uziemienia w sieci rozdzielczej.</p>`,
      },
      {
        t: "Układ TN-C-S i rozdział PEN", zr: "33, 37",
        h: `<figure class="rys">${RYS.uklad("TN-C-S")}</figure>
<p>W części sieci (od strony zasilania) jest jeden przewód <b>PEN</b>, za <b>złączem</b> — osobne N i PE.</p>
<div class="wazne"><b>Przejście z TN-C na TN-S (w złączu / rozdzielnicy)</b>
Żyła PEN kabla zasilającego idzie na zacisk <b>PE</b> (z uziemieniem, np. R ≤ 30 Ω), a z zacisku PE robi się <b>mostek na N</b>.
Za punktem rozdziału przewodów N i PE <b>nigdy już się nie łączy</b>.</div>`,
      },
      {
        t: "Układ TT (uzupełnienie)", zr: "—",
        h: `<figure class="rys">${RYS.uklad("TT")}</figure>
<p>Sieć uziemiona (R<sub>B</sub>), obudowy uziemione <b>własnym, niezależnym uziomem R<sub>A</sub></b>. Prąd zwarcia z obudową płynie przez ziemię — jest mały, dlatego w TT ochronę zapewnia zwykle wyłącznik różnicowoprądowy. <i>(Uzupełnienie — tego układu nie było na slajdach.)</i></p>`,
      },
      {
        t: "Układ IT", zr: "29",
        h: `<figure class="rys">${RYS.uklad("IT")}</figure>
<p>Wszystkie części czynne <b>odizolowane od ziemi</b> albo jeden punkt przyłączony do ziemi <b>przez impedancję Z</b>. Części przewodzące dostępne uziemione niezależnie od siebie, wspólnie albo przyłączone do uziemienia układu sieci.</p>
<p>R<sub>A</sub> — uziemienie przewodu ochronnego, R<sub>B</sub> — uziemienie układu sieci, Z — impedancja.</p>`,
      },
    ],
  },

  /* ===================================================================== 4 */
  {
    id: "ochrona",
    ik: "🛡️",
    tytul: "Ochrona przeciwporażeniowa",
    wstep: "Środki ochrony wg PN-HD 60364-4-41: podstawowa, przy uszkodzeniu, SELV/PELV, klasy ochronności, stopnie IP.",
    sekcje: [
      {
        t: "Rodzaje i środki ochrony (PN-HD 60364)", zr: "30, 55",
        h: `
<div class="siatka-2">
  <div class="kafel"><h4>Ochrona podstawowa</h4><p>przed dotykiem bezpośrednim części czynnych: izolacja, obudowy, ogrodzenia, przeszkody, umieszczenie poza zasięgiem ręki.</p></div>
  <div class="kafel"><h4>Ochrona przy uszkodzeniu</h4><p>gdy izolacja zawiedzie: samoczynne wyłączenie zasilania, izolacja podwójna/wzmocniona, separacja elektryczna.</p></div>
  <div class="kafel"><h4>Bardzo niskie napięcie</h4><p>SELV i PELV — chroni równocześnie przed dotykiem bezpośrednim i pośrednim.</p></div>
  <div class="kafel"><h4>Ochrona uzupełniająca</h4><p>wyłącznik różnicowoprądowy I<sub>Δn</sub> ≤ 30 mA, połączenia wyrównawcze miejscowe.</p></div>
</div>
<div class="wazne"><b>Równoczesna ochrona podstawowa i przy uszkodzeniu (wzmocniony środek ochrony)</b>obwody SELV, obwody PELV, ochrona przez ograniczenie energii rozładowania.</div>`,
      },
      {
        t: "Samoczynne wyłączenie zasilania", zr: "13",
        h: `
<p>Urządzenia ochronne i przewody dobiera się tak, by przy zwarciu przewodu fazowego z przewodem ochronnym lub obudową nastąpiło <b>samoczynne wyłączenie w wymaganym czasie</b>.</p>
<div class="wzor">Z<sub>s</sub> · I<sub>a</sub> ≤ U<sub>0</sub><small>Z<sub>s</sub> — impedancja pętli zwarciowej, I<sub>a</sub> — prąd zadziałania zabezpieczenia w wymaganym czasie, U<sub>0</sub> — napięcie faza–ziemia (230 V)</small></div>
<p>Sprawdza się to pomiarem impedancji pętli zwarcia — patrz moduł <a href="#/modul/pomiary">Pomiary</a>.</p>`,
      },
      {
        t: "SELV i PELV", zr: "08",
        h: `
<div class="siatka-2">
  <div class="kafel"><h4>SELV — Safety Extra-Low Voltage</h4><p>Bardzo niskie napięcie ze źródła bezpiecznego, <b>bez żadnego uziemienia</b> — ani części czynnych, ani obudów.</p></div>
  <div class="kafel"><h4>PELV — Protected Extra-Low Voltage</h4><p>To samo, ale <b>z uziemieniem roboczym</b>: jeden przewód (biegun) obwodu jest uziemiony; obudowy też mogą być uziemione.</p></div>
</div>
<p>Oba zasilane ze źródła bezpiecznego (np. transformatora ochronnego) zapewniającego niezawodne oddzielenie od innych obwodów. U ≤ U<sub>L</sub>.</p>`,
      },
      {
        t: "Klasy ochronności urządzeń", zr: "44, 49, 52, 58, 63, 64",
        h: `
<div class="siatka-3">
  <div class="kafel"><div class="symbole">${RYS.klasa("I")}<h4>Klasa I</h4></div>
  <p>Izolacja podstawowa + <b>zacisk ochronny PE</b> na obudowie. Przy przebiciu działa zabezpieczenie (nadprądowe lub RCD). Przykłady: pralka, lodówka, silnik. <b>Wtyczka z bolcem</b> — tylko do gniazda ze stykiem ochronnym.</p></div>
  <div class="kafel"><div class="symbole">${RYS.klasa("II")}<h4>Klasa II</h4></div>
  <p><b>Izolacja podwójna</b> (podstawowa + dodatkowa) lub <b>wzmocniona</b>. <b>Nie wymaga</b> przewodu PE. Przykłady: suszarka, wiertarka z płaską wtyczką, ładowarka. Przewód ruchomy wymienia się w całości z wtyczką.</p></div>
  <div class="kafel"><div class="symbole">${RYS.klasa("III")}<h4>Klasa III</h4></div>
  <p>Zasilanie z <b>bardzo niskiego napięcia SELV/PELV</b> (≤ U<sub>L</sub>). Źródło: akumulator lub zasilacz II kl. Nie wolno podłączać do innego źródła. Przykłady: wkrętarka akumulatorowa, zabawki, lampy ogrodowe z transformatora bezpieczeństwa.</p></div>
</div>
<h3>Konstrukcje urządzeń II klasy</h3>
<p>a) obudowa izolacyjna; b–d) izolacja podwójna; e–f) izolacja wzmocniona. To środek ochrony <b>bez samoczynnego wyłączenia zasilania</b>, stosowany zwłaszcza w urządzeniach domowych (obsługiwanych przez osoby niepoinstruowane). Ograniczeniem może być np. bardzo duża wilgotność.</p>`,
      },
      {
        t: "Obudowy i ogrodzenia", zr: "22",
        h: `
<div class="siatka-2">
  <div class="kafel"><h4>Obudowa</h4><p>Stopień ochrony co najmniej <b>IP2X</b>. Chroni przed <b>umyślnym</b> dotknięciem części czynnych; otwarcie możliwe <b>tylko narzędziem</b>.</p></div>
  <div class="kafel"><h4>Ogrodzenie</h4><p>Poręcz, bariera, taśma, linka — chroni przed <b>przypadkowym</b> dotknięciem i zbytnim zbliżeniem. Trwale zamocowane, zdejmowane tylko narzędziem.</p></div>
</div>`,
      },
      {
        t: "Stopnie ochrony IP", zr: "62",
        h: `
<p><b>IP</b> — <i>International Protection Rating</i>. Pierwsza cyfra: ciała obce i pył (0–6), druga: woda (0–8).</p>
<div class="siatka-2">
<div class="tabela-wrap"><table>
<tr><th>1. cyfra</th><th>Ochrona przed ciałami obcymi</th></tr>
<tr><td>0</td><td>brak</td></tr><tr><td>1</td><td>&gt; 50 mm (dłoń)</td></tr><tr class="wyr"><td>2</td><td>&gt; 12,5 mm (palec)</td></tr>
<tr><td>3</td><td>&gt; 2,5 mm (narzędzie)</td></tr><tr><td>4</td><td>&gt; 1 mm (drut)</td></tr><tr><td>5</td><td>pyłoodporność</td></tr><tr><td>6</td><td>pyłoszczelność</td></tr>
</table></div>
<div class="tabela-wrap"><table>
<tr><th>2. cyfra</th><th>Ochrona przed wodą</th></tr>
<tr><td>0</td><td>brak</td></tr><tr><td>1</td><td>krople pionowo</td></tr><tr><td>2</td><td>krople pod kątem 15°</td></tr><tr><td>3</td><td>krople pod kątem 60° (natrysk)</td></tr>
<tr class="wyr"><td>4</td><td>krople/bryzgi z dowolnej strony</td></tr><tr><td>5</td><td>strumień wody</td></tr><tr><td>6</td><td>fala, silny strumień</td></tr>
<tr><td>7</td><td>zanurzenie przez 30 min</td></tr><tr><td>8</td><td>ciągłe zanurzenie</td></tr>
</table></div>
</div>
<p>Litera <b>X</b> zamiast cyfry = nie badano (np. IPX4 — tylko woda, IP2X — tylko ciała obce). Sprawdź się w <a href="#/narzedzia">dekoderze IP</a>.</p>`,
      },
    ],
  },
];
