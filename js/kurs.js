/* Plan kursu: kolejność lekcji, podział na części i to, czego uczy każda lekcja.
   Treść lekcji leży w MODULY (dane-*.js); tu ustawiamy ją w jedną ścieżkę od początku do egzaminu. */
"use strict";

const CZESCI = [
  { t: "Na start", opis: "Pod co się uczysz: egzamin, wniosek, zmiany z 2026 r.", lekcje: ["egzamin"] },
  { t: "Fundamenty", opis: "Napięcia, przewody, wzory i aparaty w rozdzielnicy.", lekcje: ["podstawy", "elektrotechnika"] },
  { t: "Sieci i ochrona przeciwporażeniowa", opis: "Układy TN/TT/IT, środki ochrony, wyłączniki i RCD.", lekcje: ["uklady", "ochrona", "zabezpieczenia"] },
  { t: "Pomiary i badania", opis: "Co, czym i z jakim wynikiem mierzysz w instalacji.", lekcje: ["pomiary", "uziemienia"] },
  { t: "Bezpieczna praca", opis: "Strefy pracy, montaż, łazienki, pierwsza pomoc.", lekcje: ["bhp", "instalacje", "pomoc"] },
  { t: "Przepisy i dozór (D)", opis: "Akty prawne, polecenia, funkcje i dokumenty — pod świadectwo D.", lekcje: ["przepisy", "dozor"] },
];

/* Cele lekcji — „po tej lekcji umiesz…”. Krótko, żeby było wiadomo, na czym się skupić. */
const CELE = {
  egzamin: ["odróżnić E od D", "wypełnić wniosek z dobrym zakresem", "znać zmiany z 2026 r. i koszty"],
  podstawy: ["podać przedziały napięć ELV / nN / SN / WN", "znać napięcia bezpieczne 50 / 25 / 12 V", "rozpoznać przewody po kolorach i dobrać przekrój PE"],
  elektrotechnika: ["policzyć prąd i energię odbiornika", "wyjaśnić zwarcie i przeciążenie", "rozróżnić MCB, RCD, RCBO, SPD, stycznik"],
  uklady: ["odczytać nazwę układu z liter", "narysować TN-C, TN-S, TN-C-S, TT, IT", "wyjaśnić rozdział PEN"],
  ochrona: ["wymienić ochronę podstawową, przy uszkodzeniu i uzupełniającą", "objaśnić SELV i PELV", "rozpoznać klasy ochronności i kody IP"],
  zabezpieczenia: ["dobrać charakterystykę B / C / D", "odczytać oznaczenia wkładek", "wyjaśnić działanie i typy RCD"],
  pomiary: ["wymienić pomiary odbiorcze i okresowe", "podać napięcia probiercze i progi izolacji", "ocenić skuteczność ochrony z pomiaru pętli"],
  uziemienia: ["zmierzyć uziemienie metodą techniczną", "znać wymagane wartości", "wiedzieć, kiedy metoda dwucęgowa"],
  bhp: ["sprawdzić brak napięcia i uziemić miejsce pracy", "znać odstępy stref pracy", "dobrać sprzęt i środek gaśniczy"],
  instalacje: ["podłączyć gniazdo i łącznik", "znać strefy w łazience", "pamiętać o Ex i instalacjach gazowych"],
  pomoc: ["opisać skutki prądu dla organizmu", "przeprowadzić RKO 30 : 2", "ocenić oparzenie regułą dziewiątek"],
  przepisy: ["wymienić ustawy i rozporządzenia", "wiedzieć, kiedy polecenie pisemne", "znać listę prac szczególnie niebezpiecznych"],
  dozor: ["nazwać 4 funkcje i ich świadectwa", "opisać przebieg pracy od polecenia do zakończenia", "wymienić dokumenty pracodawcy"],
};

/* Ustaw MODULY w kolejności kursu; lekcje spoza planu (gdyby się pojawiły) idą na koniec. */
(() => {
  const kolej = CZESCI.flatMap((c) => c.lekcje);
  MODULY.sort((a, b) => {
    const ia = kolej.indexOf(a.id), ib = kolej.indexOf(b.id);
    return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
  });
})();

const czescLekcji = (id) => CZESCI.findIndex((c) => c.lekcje.includes(id));

/* Pod które świadectwo jest lekcja: "E", "D" albo "ED" (obie). Rozporządzenie z 2022 r. (§ 6) daje
   D także budowę urządzeń i normy, więc komisja D pyta o technikę — ale z perspektywy nadzoru. */
const ZAKRES = {
  egzamin: "ED", podstawy: "E", elektrotechnika: "E", uklady: "E", ochrona: "E", zabezpieczenia: "E",
  pomiary: "E", uziemienia: "E", bhp: "ED", instalacje: "E", pomoc: "ED", przepisy: "D", dozor: "D",
};
// Pojedyncze kroki, które są pod inne świadectwo niż cała lekcja.
for (const [id, tytul, dla] of [
  ["przepisy", "Stanowiska", "ED"],
  ["przepisy", "Polecenie pisemne", "ED"],
  ["dozor", "Przygotowanie strefy", "ED"],
  ["egzamin", "E i D", "ED"],
]) {
  const s = MODULY.find((m) => m.id === id)?.sekcje.find((x) => x.t.startsWith(tytul));
  if (s && !s.dla) s.dla = dla;
}
const zakresKroku = (id, s) => s.dla || ZAKRES[id] || "ED";
const dotyczy = (z, sw) => z === "ED" || z === sw; // czy zakres z obejmuje świadectwo sw ("E"/"D")
