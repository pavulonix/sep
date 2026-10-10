/* Moduły pod uprawnienia D (dozór) i o samym egzaminie. Slajdy z kursu dotyczyły głównie
   zakresu E — ta część jest UZUPEŁNIENIEM opartym na rozporządzeniu Ministra Energii
   z 28.08.2019 r. (BHP przy urządzeniach energetycznych) i rozporządzeniu MKiŚ z 1.07.2022 r.
   (kwalifikacje). Przed egzaminem warto porównać z aktualnym tekstem jednolitym. */
"use strict";

MODULY.unshift({
  id: "egzamin",
  ik: "🎓",
  tytul: "Egzamin E + D — jak to wygląda",
  wstep: "Co musisz wiedzieć na egzamin kwalifikacyjny w grupie 1 na eksploatację (E) i dozór (D).",
  sekcje: [
    {
      t: "E i D — czym się różnią", zr: "23",
      h: `
<div class="siatka-2">
  <div class="kafel"><h4>👷 Eksploatacja (E)</h4><p>Dla osób, które <b>fizycznie pracują</b> przy urządzeniach, instalacjach i sieciach: obsługa, konserwacja, remonty, montaż, pomiary — zgodnie z poleceniem i instrukcją.</p></div>
  <div class="kafel"><h4>🧑‍💼 Dozór (D)</h4><p>Dla osób <b>kierujących i nadzorujących</b> pracę innych: wydawanie poleceń, dopuszczanie do pracy, nadzór nad eksploatacją, odbiory.</p></div>
</div>
<div class="wazne"><b>Zdajesz oba</b>Dla D pytania częściej dotyczą przepisów, organizacji pracy, odpowiedzialności i dokumentacji; dla E — budowy urządzeń, pomiarów, ochrony przeciwporażeniowej i bezpiecznego wykonywania prac. Pierwsza pomoc i ochrona ppoż. są w obu.</div>`,
    },
    {
      t: "Egzamin w praktyce (uzupełnienie)", zr: "—",
      h: `
<ul>
  <li>Egzamin przed <b>komisją kwalifikacyjną</b> (np. przy SEP), na podstawie rozporządzenia MKiŚ z <b>1 lipca 2022 r.</b>, zwykle w formie rozmowy / pytań ustnych lub testu.</li>
  <li>Wniosek określa <b>grupę</b> (1 — elektroenergetyczne), <b>rodzaj</b> (E, D) i <b>zakres urządzeń</b> (np. do 1 kV, aparatura kontrolno-pomiarowa, prace kontrolno-pomiarowe).</li>
  <li>Do wniosku dołącza się m.in. <b>zaświadczenie pracodawcy o doświadczeniu zawodowym</b> i stażu.</li>
  <li><b>Świadectwo kwalifikacyjne jest ważne 5 lat</b> — potem trzeba je odnowić.</li>
</ul>
<div class="wazne niebieskie"><b>Jak się uczyć z tej strony</b>1) Przeczytaj moduły (kliknij „Umiem” pod opanowanym tematem). 2) Codziennie 10 min fiszek. 3) Test próbny — aż do wyniku 90%+. 4) Dzień przed egzaminem — ściąga z liczbami.</div>`,
    },
  ],
});

MODULY.push({
  id: "dozor",
  ik: "🧑‍💼",
  tytul: "Dozór (D): organizacja pracy",
  wstep: "Role przy poleceniu, przygotowanie miejsca pracy, rodzaje poleceń, instrukcja eksploatacji i obowiązki osoby dozoru. Uzupełnienie spoza slajdów — oparte na rozporządzeniu BHP z 2019 r.",
  sekcje: [
    {
      t: "Kto jest kim przy pracy na polecenie", zr: "20 + uzupełnienie",
      h: `
<div class="tabela-wrap"><table>
<tr><th>Rola</th><th>Co robi</th></tr>
<tr class="wyr"><td><b>Poleceniodawca</b></td><td>wydaje polecenie wykonania pracy; określa zakres, miejsce, czas, środki bezpieczeństwa i skład zespołu — zwykle osoba dozoru (D)</td></tr>
<tr><td><b>Koordynujący</b></td><td>koordynuje prace w sieci/zakładzie, zezwala na przygotowanie miejsca pracy i dopuszczenie (np. dyspozytor)</td></tr>
<tr class="wyr"><td><b>Dopuszczający</b></td><td>przygotowuje (lub sprawdza przygotowanie) strefę pracy i <b>dopuszcza zespół</b>: wskazuje strefę, robi <b>instruktaż o zagrożeniach</b>, potwierdza dopuszczenie na piśmie, zgłasza koordynującemu</td></tr>
<tr><td><b>Kierujący zespołem</b></td><td>kieruje pracą zespołu na miejscu, odpowiada za bezpieczne wykonanie, przyjmuje miejsce pracy od dopuszczającego</td></tr>
<tr><td><b>Nadzorujący</b></td><td>sprawuje nadzór nad bezpieczeństwem zespołu, gdy pracuje on np. przy urządzeniach innego właściciela lub pracownicy nie mają kwalifikacji</td></tr>
<tr><td><b>Członek zespołu</b></td><td>wykonuje pracę zgodnie z poleceniem i instruktażem</td></tr>
</table></div>
<p>Funkcje można łączyć, ale w granicach przepisów i instrukcji — np. dopuszczający może być jednocześnie kierującym zespołem przy prostszych pracach.</p>`,
    },
    {
      t: "Rodzaje poleceń i prace bez polecenia", zr: "21 + uzupełnienie",
      h: `
<div class="siatka-2">
  <div class="kafel"><h4>Polecenie pisemne</h4><p>Prace stwarzające <b>szczególne zagrożenie</b> dla zdrowia lub życia (lista w module Przepisy). Dokument z numerem, zakresem, środkami bezpieczeństwa, składem zespołu, potwierdzeniami.</p></div>
  <div class="kafel"><h4>Polecenie ustne</h4><p>Pozostałe prace eksploatacyjne wymagające polecenia; rejestrowane (np. w dzienniku), z określeniem zakresu i środków bezpieczeństwa.</p></div>
</div>
<div class="wazne"><b>Bez polecenia (wyjątkowo)</b>czynności przy <b>ratowaniu życia lub zdrowia</b> oraz przy <b>zapobieganiu awarii</b> / likwidacji jej skutków — z obowiązkiem niezwłocznego powiadomienia przełożonego. Także prace wykonywane stale przez upoważnione osoby w ustalonych miejscach, zgodnie z instrukcją eksploatacji.</div>`,
    },
    {
      t: "Przygotowanie miejsca pracy — 5 zasad", zr: "02, 71 + uzupełnienie",
      h: `
<ol class="kroki">
  <li><b>Wyłącz</b> — odłącz napięcie ze wszystkich stron, z widoczną przerwą.</li>
  <li><b>Zabezpiecz przed ponownym załączeniem</b> — blokada, wyjęte wkładki, tabliczka „Nie załączać — pracują ludzie”.</li>
  <li><b>Sprawdź brak napięcia</b> — wskaźnikiem sprawdzonym przed i po użyciu.</li>
  <li><b>Uziem i zewrzyj</b> — bezpośrednio po sprawdzeniu braku napięcia, po obu stronach miejsca pracy.</li>
  <li><b>Osłoń lub oddziel</b> sąsiednie części pod napięciem, wyznacz i oznacz strefę pracy (ogrodzenie, tablice).</li>
</ol>
<p>Po zakończeniu: zespół opuszcza strefę, kierujący zgłasza zakończenie, zdejmuje się uziemienia (odwrotnie niż zakładanie), usuwa zabezpieczenia i dopiero wtedy można załączyć.</p>`,
    },
    {
      t: "Instrukcja eksploatacji i dokumentacja", zr: "uzupełnienie",
      h: `
<ul>
  <li>Pracodawca (właściciel) opracowuje <b>instrukcję eksploatacji</b> urządzeń/instalacji: charakterystykę, warunki eksploatacji, zasady obsługi, konserwacji i remontów, wymagania BHP i ppoż., postępowanie w razie awarii, terminy przeglądów i pomiarów.</li>
  <li>Prowadzi się <b>dokumentację eksploatacyjną</b>: dokumentację techniczną, protokoły pomiarów i przeglądów, dzienniki operacyjne, ewidencję poleceń.</li>
  <li>Pracodawca ustala i aktualizuje <b>wykaz prac na polecenie pisemne</b> i wyznacza osoby uprawnione do wydawania poleceń.</li>
  <li>Urządzenia przyjmuje się do eksploatacji po <b>odbiorze</b> i sprawdzeniach odbiorczych (PN-HD 60364-6).</li>
</ul>`,
    },
    {
      t: "Obowiązki i odpowiedzialność osoby dozoru", zr: "uzupełnienie",
      h: `
<ul>
  <li>organizuje pracę tak, by była <b>bezpieczna</b> i zgodna z przepisami, instrukcjami i normami (uznanymi regułami technicznymi),</li>
  <li>dba o to, by prace wykonywały osoby z <b>aktualnymi kwalifikacjami</b>, przeszkolone i zdolne do pracy (badania lekarskie, BHP),</li>
  <li>zapewnia <b>sprzęt ochronny</b> sprawny i z aktualnymi badaniami okresowymi,</li>
  <li>nadzoruje <b>terminy przeglądów i pomiarów</b> (np. pomiary ochrony co najmniej co 5 lat, częściej przy zagrożeniu),</li>
  <li>wstrzymuje pracę, gdy grozi niebezpieczeństwo; reaguje na wypadki (pierwsza pomoc, zabezpieczenie miejsca, zgłoszenie),</li>
  <li>odpowiada za dopuszczenie do eksploatacji urządzeń sprawnych i bezpiecznych.</li>
</ul>
<div class="wazne"><b>Pamiętaj</b>Osoba dozoru odpowiada nie za „przestrzeganie normy” jako takiej, tylko za to, by spełnić wymagania przepisów — normą albo rozwiązaniem równoważnym (moduł Przepisy).</div>`,
    },
  ],
});
