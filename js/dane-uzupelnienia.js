/* Uzupełnienia tematów, których brakowało w slajdach (porównanie z bardzo-latwo.pl, październik 2026):
   AFDD i ograniczniki przepięć, czasy zadziałania RCD, wzorcowanie mierników, przeglądy okresowe
   (Prawo budowlane art. 62), kilka źródeł zasilania (PV, magazyn, agregat, UPS), gaszenie.
   Pole `dla` mówi, pod które świadectwo jest krok: "E", "D" albo "ED". */
"use strict";

const dopisz = (id, sekcja, przed) => {
  const m = MODULY.find((x) => x.id === id);
  if (!m) return;
  const i = przed ? m.sekcje.findIndex((s) => s.t.startsWith(przed)) : -1;
  if (i < 0) m.sekcje.push(sekcja); else m.sekcje.splice(i, 0, sekcja);
};

dopisz("zabezpieczenia", {
  t: "AFDD i ograniczniki przepięć (SPD)", zr: "uzupełnienie (bardzo-latwo.pl)", dla: "E",
  h: `
<div class="tabela-wrap"><table>
<tr><th>Aparat</th><th>Przed czym chroni</th></tr>
<tr><td><b>MCB</b> — wyłącznik nadprądowy</td><td>przeciążenie i zwarcie</td></tr>
<tr><td><b>RCD</b> — różnicowoprądowy</td><td>prąd upływu do ziemi → porażenie, pożar od upływu</td></tr>
<tr class="wyr"><td><b>AFDD</b> — detektor łuku</td><td><b>iskrzenie (łuk)</b> na luźnych zaciskach i uszkodzonych przewodach — przy prądzie za małym, żeby zadziałał MCB</td></tr>
<tr><td><b>SPD</b> — ogranicznik przepięć</td><td>przepięcia atmosferyczne i łączeniowe</td></tr>
</table></div>
<p><b>AFDD</b> to ochrona <b>przeciwpożarowa</b>, uzupełnia MCB i RCD, nie zastępuje ich. Ma sens tam, gdzie pożar jest groźniejszy: sypialnie, pokoje dzieci, budynki drewniane, pomieszczenia z materiałami palnymi.</p>
<h3>Typy SPD — od złącza do odbiornika</h3>
<ol class="kroki">
  <li><b>Typ 1 (T1)</b> — w złączu lub rozdzielnicy głównej, gdy budynek ma instalację odgromową lub zasilanie napowietrzne; przenosi część prądu pioruna.</li>
  <li><b>Typ 2 (T2)</b> — w rozdzielnicy; podstawowa ochrona instalacji przed przepięciami.</li>
  <li><b>Typ 3 (T3)</b> — blisko czułych odbiorników (gniazdo, listwa); działa tylko za T2.</li>
</ol>
<p>Ograniczniki kolejnych typów muszą ze sobą <b>współpracować (koordynacja)</b>. Przy fotowoltaice SPD stosuje się po stronie <b>DC i AC</b>.</p>`,
});

dopisz("pomiary", {
  t: "RCD — wymagane czasy zadziałania", zr: "uzupełnienie (PN-EN 61008/61009, bardzo-latwo.pl)", dla: "E",
  h: `
<div class="tabela-wrap"><table>
<tr><th>Rodzaj RCD</th><th>przy I<sub>Δn</sub></th><th>przy 5 · I<sub>Δn</sub></th></tr>
<tr class="wyr"><td>ogólny (bezzwłoczny)</td><td class="num">≤ 300 ms</td><td class="num">≤ 40 ms</td></tr>
<tr><td>selektywny <b>S</b></td><td class="num">130–500 ms</td><td class="num">50–150 ms</td></tr>
</table></div>
<p>Miernik sprawdza też, czy RCD <b>nie zadziała przy 0,5 I<sub>Δn</sub></b>, i mierzy <b>napięcie dotykowe</b> na PE. Przycisk <b>TEST</b> pokazuje tylko, że mechanizm się rusza — nie mówi nic o prądzie i czasie zadziałania.</p>`,
}, "Oględziny");

dopisz("pomiary", {
  t: "Przeglądy okresowe i wzorcowanie mierników", zr: "Prawo budowlane art. 62 + uzupełnienie (bardzo-latwo.pl)", dla: "D",
  h: `
<div class="wazne niebieskie"><b>To jest temat pod dozór</b>Kontrolę okresową instalacji elektrycznej w budynku mogą wykonywać osoby z kwalifikacjami wymaganymi <b>przy dozorze</b> nad eksploatacją urządzeń elektroenergetycznych (art. 62 Prawa budowlanego).</div>
<ul>
  <li>Instalację elektryczną i piorunochronną w budynku bada się <b>co najmniej raz na 5 lat</b>: sprawność połączeń, osprzętu, zabezpieczeń i środków ochrony przeciwporażeniowej, rezystancja izolacji, uziemienia.</li>
  <li>Wynik kontroli wpisuje się do <b>książki obiektu budowlanego</b> — prowadzi ją właściciel lub zarządca.</li>
  <li>5 lat to <b>minimum</b>. Częściej: wynajem (co 1–2 lata), wilgoć, pył, warsztaty. <b>Poza kolejnością</b>: po zalaniu, pożarze, uderzeniu pioruna.</li>
  <li>Terminy dla urządzeń w zakładzie ustala <b>instrukcja eksploatacji</b> — osoba dozoru pilnuje ich dotrzymania.</li>
</ul>
<h3>Przyrządy pomiarowe</h3>
<p>Mierz przyrządem sprawnym i z <b>aktualnym świadectwem wzorcowania</b> — numer przyrządu wpisujesz do protokołu. Wynik z niewzorcowanego miernika łatwo podważyć po wypadku.</p>`,
}, "Oględziny");

dopisz("instalacje", {
  t: "Kilka źródeł zasilania: PV, magazyn, agregat, UPS", zr: "uzupełnienie (bardzo-latwo.pl)", dla: "E",
  h: `
<div class="wazne czerwone"><b>Wyłączyłeś zasilanie z sieci — to nie znaczy, że nie ma napięcia</b>Fotowoltaika, magazyn energii, agregat i UPS mogą podać napięcie z drugiej strony. Przed pracą wyłącz i zabezpiecz <b>wszystkie źródła</b>, a brak napięcia sprawdź w miejscu pracy.</div>
<div class="siatka-2">
  <div class="kafel"><h4>Fotowoltaika</h4><p>Po stronie <b>DC napięcia z paneli nie da się wyłączyć w dzień</b> — dlatego rozłącznik DC przy falowniku. SPD po stronie DC i AC, uziemiona konstrukcja, RCD dobrany do falownika (dla beztransformatorowych często typ B lub A z kontrolą DC — według producenta). Przyłączenie zgłasza się do operatora sieci (OSD).</p></div>
  <div class="kafel"><h4>Magazyn energii</h4><p>Hybrydowy falownik (PV + bateria) albo magazyn dołączony po stronie AC. Własne zabezpieczenia i rozłączniki według DTR, <b>BMS</b> pilnuje ogniw. Zasilanie awaryjne tylko wydzielonych obwodów. Magazyn wprowadzający energię do sieci, <b>powyżej 10 kW</b> — osobny punkt 12 w grupie 1.</p></div>
  <div class="kafel"><h4>Agregat</h4><p>Do instalacji <b>tylko przez przełącznik sieć–agregat</b> (ręczny I-0-II z blokadą albo automatyczny SZR). Nigdy „przez gniazdko” — <b>zasilanie zwrotne</b> poraża monterów na linii i niszczy agregat po powrocie sieci. Uziemienie i punkt neutralny według producenta. Zespoły prądotwórcze <b>powyżej 50 kW</b> — punkt 6 w grupie 1.</p></div>
  <div class="kafel"><h4>UPS</h4><p>Mały UPS wpina się do gniazdka przy urządzeniu — bez przeróbek w rozdzielnicy. Pamiętaj, że <b>na jego wyjściu jest napięcie</b> także przy odłączonej sieci.</p></div>
</div>`,
});

dopisz("bhp", {
  t: "Pożar urządzenia elektrycznego — czym gasić", zr: "15 + uzupełnienie (bardzo-latwo.pl)", dla: "ED",
  h: `
<ol class="kroki">
  <li><b>Wyłącz napięcie</b>, jeśli możesz to zrobić bezpiecznie — wtedy gasisz jak zwykły pożar.</li>
  <li>Pod napięciem gaś <b>gaśnicą proszkową lub śniegową (CO₂)</b> albo <b>mgłową</b> — oznaczoną do urządzeń pod napięciem (do 1000 V), z zachowaniem odległości z etykiety (zwykle min. 1 m).</li>
  <li><b>Nigdy wodą ani pianą</b> na urządzenia pod napięciem.</li>
  <li>Wezwij straż (112), powiadom przełożonego; osoba dozoru zabezpiecza miejsce i nie dopuszcza do ponownego załączenia przed sprawdzeniem.</li>
</ol>`,
}, "Gaszenie");

PYTANIA.push(
  { m: "zabezpieczenia", p: "AFDD wykrywa:", odp: ["prąd upływu do ziemi", "łuk elektryczny (iskrzenie) na luźnych połączeniach", "przepięcia atmosferyczne", "przeciążenie silnika"], ok: 1, w: "AFDD to ochrona przeciwpożarowa przed łukiem przy prądzie zbyt małym dla MCB. Uzupełnia MCB i RCD." },
  { m: "zabezpieczenia", p: "Ogranicznik przepięć typu 1 montuje się:", odp: ["w gniazdku przy komputerze", "w złączu lub rozdzielnicy głównej, gdy jest instalacja odgromowa", "tylko w obwodzie oświetlenia", "za ogranicznikiem typu 3"], ok: 1, w: "T1 — przy wejściu do budynku (piorun), T2 — rozdzielnica, T3 — przy odbiornikach, tylko za T2." },
  { m: "pomiary", p: "RCD ogólny 30 mA przy prądzie 5·IΔn powinien zadziałać w czasie:", odp: ["≤ 40 ms", "≤ 300 ms", "≤ 0,4 s", "≤ 5 s"], ok: 0, w: "Przy IΔn ≤ 300 ms, przy 5·IΔn ≤ 40 ms. Selektywny S: 130–500 ms i 50–150 ms." },
  { m: "pomiary", p: "Kontrolę okresową instalacji elektrycznej w budynku (art. 62 Prawa budowlanego) przeprowadza się co najmniej:", odp: ["co rok", "co 2 lata", "co 5 lat", "co 10 lat"], ok: 2, w: "Co najmniej raz na 5 lat; wynik — do książki obiektu budowlanego. Wykonują osoby z kwalifikacjami dozorowymi." },
  { m: "pomiary", p: "Kto może wykonywać kontrolę okresową instalacji elektrycznej w budynku?", odp: ["każdy elektryk", "osoba z kwalifikacjami wymaganymi przy dozorze nad eksploatacją urządzeń elektroenergetycznych", "tylko inspektor nadzoru budowlanego", "właściciel budynku"], ok: 1, w: "Art. 62 Prawa budowlanego — kwalifikacje dozorowe (D)." },
  { m: "instalacje", p: "Agregat prądotwórczy przyłącza się do instalacji domu:", odp: ["przez dowolne gniazdko", "przez przełącznik sieć–agregat z blokadą (I-0-II) lub SZR", "równolegle z siecią", "przez wyłącznik różnicowoprądowy"], ok: 1, w: "Inaczej grozi zasilanie zwrotne sieci — porażenie monterów i zniszczenie agregatu." },
  { m: "instalacje", p: "Dlaczego przy fotowoltaice potrzebny jest rozłącznik DC?", odp: ["bo panele dają napięcie zawsze, gdy świeci słońce", "bo tak każe taryfa", "żeby ładować magazyn", "nie jest potrzebny"], ok: 0, w: "Napięcia DC z paneli nie wyłączysz w dzień — rozłącznik odcina falownik od łańcucha paneli." },
  { m: "bhp", p: "Czym NIE wolno gasić urządzeń pod napięciem?", odp: ["gaśnicą proszkową", "gaśnicą śniegową CO₂", "wodą lub pianą", "gaśnicą mgłową dopuszczoną do 1000 V"], ok: 2, w: "Woda i piana przewodzą prąd. Proszek, CO₂, mgła — tylko oznaczone do urządzeń pod napięciem, z odległości z etykiety." },
);

FISZKI.push(
  { m: "zabezpieczenia", p: "MCB, RCD, AFDD, SPD — przed czym chronią?", o: "MCB — przeciążenie i zwarcie; RCD — upływ (porażenie); AFDD — łuk/iskrzenie (pożar); SPD — przepięcia." },
  { m: "zabezpieczenia", p: "Typy SPD?", o: "T1 — złącze/rozdzielnica główna (piorun), T2 — rozdzielnica, T3 — przy odbiorniku, tylko za T2." },
  { m: "pomiary", p: "Czasy zadziałania RCD ogólnego?", o: "Przy IΔn ≤ 300 ms, przy 5·IΔn ≤ 40 ms. Typ S: 130–500 ms / 50–150 ms." },
  { m: "pomiary", p: "Przegląd instalacji w budynku — co ile i kto?", o: "Co najmniej co 5 lat (art. 62 Prawa budowlanego); osoba z kwalifikacjami dozorowymi; wpis do książki obiektu." },
  { m: "instalacje", p: "Jakie źródła mogą podać napięcie mimo wyłączenia sieci?", o: "Fotowoltaika (DC z paneli w dzień), magazyn energii, agregat, UPS. Wyłącz i zabezpiecz wszystkie." },
  { m: "instalacje", p: "Jak podłączyć agregat do instalacji?", o: "Przez przełącznik sieć–agregat I-0-II z blokadą albo SZR — nigdy przez gniazdko (zasilanie zwrotne)." },
);

USTNE.push(
  ["Pracujesz w budynku z fotowoltaiką i magazynem energii. Jak przygotujesz miejsce pracy?", "Ustalam wszystkie źródła zasilania (sieć, falownik PV, magazyn, ewentualnie agregat/UPS). Wyłączam i zabezpieczam każde: wyłącznik główny, rozłącznik AC falownika, rozłącznik DC (panele dają napięcie w dzień), odłączenie magazynu wg DTR. Oznaczam miejsca odłączenia, sprawdzam brak napięcia w miejscu pracy sprawnym wskaźnikiem, uziemiam i oznaczam strefę."],
  ["Co sprawdzasz przy badaniu wyłącznika różnicowoprądowego?", "Dobór i połączenia L, N, PE; przycisk TEST; że nie zadziała przy 0,5 IΔn i zadziała między 0,5 a 1 IΔn (dla 30 mA: 15–30 mA); czas zadziałania — ogólny ≤ 300 ms przy IΔn i ≤ 40 ms przy 5·IΔn; napięcie dotykowe Ud ≤ UL. Miernik z aktualnym wzorcowaniem, wynik do protokołu."],
);
