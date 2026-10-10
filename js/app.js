/* SEP — nauka: kurs krok po kroku, powtórki (system pudełek Leitnera), test, trening ustny, ściąga.
   Postęp trzymamy w przeglądarce — strona jest prywatna (filtr IP), uczy się jedna osoba. */
"use strict";

const $ = (s, el = document) => el.querySelector(s);
const MAIN = $("#tresc");

/* ================================================================ pamięć */
const PAM = {
  czytaj(k, d) { try { const v = localStorage.getItem("sep." + k); return v ? JSON.parse(v) : d; } catch { return d; } },
  zapisz(k, v) { try { localStorage.setItem("sep." + k, JSON.stringify(v)); } catch { /* tryb prywatny */ } },
};
let przeczytane = PAM.czytaj("umiem", {});      // { "lekcja:indeks": true } — nazwa klucza z poprzedniej wersji
let wynikiLekcji = PAM.czytaj("lekcje", {});    // { lekcja: { naj, ost, data } } — mini-testy
let karty = PAM.czytaj("karty", null);          // { indeks fiszki: { b: pudełko, d: "RRRR-MM-DD" } }
let historiaTestow = PAM.czytaj("testy", []);   // [{ data, wynik, z, tryb }]
let zleOdpowiedzi = PAM.czytaj("zle", {});      // { indeks pytania: liczba pomyłek }
let dataEgzaminu = PAM.czytaj("egzamin", "");   // "RRRR-MM-DD"
let ostatnie = PAM.czytaj("ostatnie", null);    // { id, krok } — gdzie skończyła się nauka

// Przejście ze starych fiszek („umiem” / „nie umiem”) na pudełka: umiane trafiają do pudełka 2.
if (!karty) {
  karty = {};
  for (const i of Object.keys(PAM.czytaj("fiszki", {}))) karty[i] = { b: 2, d: dzisiaj() };
  PAM.zapisz("karty", karty);
}

/* ================================================================ daty */
function dzisiaj(plus = 0) {
  const d = new Date();
  d.setDate(d.getDate() + plus);
  return d.toLocaleDateString("sv-SE"); // RRRR-MM-DD w lokalnej strefie
}
function dniDo(data) {
  if (!data) return null;
  const [r, m, d] = data.split("-").map(Number);
  const dz = new Date(); dz.setHours(0, 0, 0, 0);
  return Math.round((new Date(r, m - 1, d) - dz) / 864e5);
}
const odmiana = (n, a, b, c) => `${n} ${n === 1 ? a : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? b : c}`;

/* ================================================================ postęp */
const klucz = (id, i) => `${id}:${i}`;
const lekcja = (id) => MODULY.find((m) => m.id === id);
const pytaniaLekcji = (id) => PYTANIA.map((p, i) => ({ ...p, i })).filter((p) => p.m === id);

function stanLekcji(m) {
  const n = m.sekcje.length;
  const z = m.sekcje.filter((_, i) => przeczytane[klucz(m.id, i)]).length;
  const w = wynikiLekcji[m.id];
  const ukonczona = z === n && (!pytaniaLekcji(m.id).length || (w && w.naj >= 80));
  return { z, n, w, ukonczona, rozpoczeta: z > 0 || !!w };
}
function postepKursu() {
  const st = MODULY.map(stanLekcji);
  const ukonczone = st.filter((s) => s.ukonczona).length;
  const sekcje = st.reduce((a, s) => a + s.z, 0), wszystkie = st.reduce((a, s) => a + s.n, 0);
  return { ukonczone, lekcji: MODULY.length, pr: Math.round((sekcje / wszystkie) * 100) };
}
function nastepnaLekcja() {
  if (ostatnie && lekcja(ostatnie.id) && !stanLekcji(lekcja(ostatnie.id)).ukonczona) return ostatnie;
  const m = MODULY.find((x) => !stanLekcji(x).ukonczona);
  if (!m) return null;
  const pierwszaNieprzeczytana = m.sekcje.findIndex((_, i) => !przeczytane[klucz(m.id, i)]);
  return { id: m.id, krok: pierwszaNieprzeczytana === 0 ? 0 : pierwszaNieprzeczytana < 0 ? m.sekcje.length + 1 : pierwszaNieprzeczytana + 1 };
}
/* Gotowość części = średnia najlepszych wyników mini-testów jej lekcji (lekcja bez testu liczy się wg przeczytania). */
function wynikLekcjiPr(id) {
  const s = stanLekcji(lekcja(id));
  if (!pytaniaLekcji(id).length) return Math.round((s.z / s.n) * 100);
  return s.w ? s.w.naj : 0;
}
const srednia = (ids) => ids.length ? Math.round(ids.map(wynikLekcjiPr).reduce((a, b) => a + b, 0) / ids.length) : 0;
const gotowoscCzesci = (c) => srednia(c.lekcje);
const lekcjePod = (sw) => MODULY.filter((m) => dotyczy(ZAKRES[m.id] || "ED", sw)).map((m) => m.id);
const gotowoscSw = (sw) => srednia(lekcjePod(sw));

/* ================================================================ powtórki (Leitner) */
const ODSTEPY_DNI = [0, 1, 3, 7, 16, 35]; // pudełko → za ile dni wraca karta
const kartyDoPowtorki = (filtr) => FISZKI.map((f, i) => ({ ...f, i }))
  .filter((f) => (!filtr || f.m === filtr) && karty[f.i] && karty[f.i].d <= dzisiaj());
const kartyNowe = (filtr) => FISZKI.map((f, i) => ({ ...f, i })).filter((f) => (!filtr || f.m === filtr) && !karty[f.i]);
const kartyOpanowane = () => Object.values(karty).filter((k) => k.b >= 4).length;

/* ================================================================ wspólne kawałki */
function pierscien(pr, rozm = 96, podpis = "") {
  const r = rozm / 2 - 8, o = 2 * Math.PI * r;
  return `<svg class="pierscien" width="${rozm}" height="${rozm}" viewBox="0 0 ${rozm} ${rozm}" role="img" aria-label="${pr}%">
    <circle cx="${rozm / 2}" cy="${rozm / 2}" r="${r}" class="pi-tlo"/>
    <circle cx="${rozm / 2}" cy="${rozm / 2}" r="${r}" class="pi-war" stroke-dasharray="${o}" stroke-dashoffset="${o * (1 - pr / 100)}" transform="rotate(-90 ${rozm / 2} ${rozm / 2})"/>
    <text x="50%" y="${podpis ? "47%" : "50%"}" class="pi-num">${pr}%</text>${podpis ? `<text x="50%" y="66%" class="pi-pod">${podpis}</text>` : ""}</svg>`;
}
const pasek = (pr) => `<div class="pasek-postepu"><i style="width:${pr}%"></i></div>`;
/* Plakietka świadectwa: E — eksploatacja, D — dozór, ED — oba. */
function odznaka(z, dlugo = false) {
  const t = { E: ["E", "eksploatacja"], D: ["D", "dozór"], ED: ["E + D", "oba świadectwa"] }[z] ?? ["E + D", "oba"];
  return `<span class="odz odz-${z}" title="Pod świadectwo: ${t[1]}">${t[0]}${dlugo ? ` · ${t[1]}` : ""}</span>`;
}
const OPIS_ZAKRESU = {
  E: "Pod świadectwo <b>E</b>. Komisja D też może o to zapytać — wtedy z perspektywy nadzoru: kto, kiedy i jak to sprawdza.",
  D: "Pod świadectwo <b>D</b> — organizacja pracy, przepisy, dokumenty, odpowiedzialność.",
  ED: "Na <b>oba</b> egzaminy — komisja E i komisja D pytają o to tak samo.",
};
const numerLekcji = (id) => MODULY.findIndex((m) => m.id === id) + 1;

function aktywujNav(akt) {
  document.querySelectorAll("[data-nav]").forEach((a) => a.classList.toggle("aktywny", a.dataset.nav === akt));
}

/* ================================================================ pulpit */
function widokPulpit() {
  const p = postepKursu();
  const nast = nastepnaLekcja();
  const doPowt = kartyDoPowtorki().length, nowe = kartyNowe().length;
  const dni = dniDo(dataEgzaminu);
  const zostaloLekcji = p.lekcji - p.ukonczone;
  const ost = historiaTestow.at(-1);

  let plan = "";
  if (dni !== null && dni >= 0) {
    const naDzien = dni > 0 ? Math.ceil(zostaloLekcji / Math.max(1, dni - 2)) : 0;
    plan = dni === 0
      ? "Dziś egzamin. Przejrzyj ściągę z liczbami i zrób kilka pytań ustnych na rozgrzewkę. Powodzenia!"
      : zostaloLekcji
        ? `Plan na dziś: <b>${odmiana(naDzien, "lekcja", "lekcje", "lekcji")}</b> + powtórki. Dwa ostatnie dni zostaw na testy i trening ustny.`
        : "Kurs przerobiony — teraz codziennie powtórki, test egzaminacyjny i symulacja komisji.";
  }

  const mn = nast && lekcja(nast.id);
  return `
<section class="powitanie">
  <div class="powitanie-tekst">
    <p class="nadtytul">SEP · grupa 1 · do 1 kV · eksploatacja + dozór</p>
    <h1>${p.ukonczone === 0 && !ostatnie ? "Zacznijmy naukę do egzaminu" : p.ukonczone === p.lekcji ? "Kurs ukończony — szlifuj formę" : "Wracamy do nauki"}</h1>
    <p>${plan || "Ustaw datę egzaminu, a pulpit rozpisze Ci, ile przerabiać dziennie."}</p>
    <div class="data-egz">
      <label for="data-egz">Data egzaminu</label>
      <input type="date" id="data-egz" value="${dataEgzaminu}">
      ${dni !== null ? `<span class="odliczanie">${dni > 0 ? `za ${odmiana(dni, "dzień", "dni", "dni")}` : dni === 0 ? "dziś!" : "minęła"}</span>` : ""}
    </div>
  </div>
  <div class="powitanie-krag">${pierscien(Math.round((p.ukonczone / p.lekcji) * 100), 132, `${p.ukonczone}/${p.lekcji} lekcji`)}</div>
</section>

<div class="kafle-pulpitu">
  ${mn ? `<a class="kafel-akcja glowny" href="#/lekcja/${mn.id}/${nast.krok}">
    <span class="etyk">Dalej w kursie</span>
    <b>${numerLekcji(mn.id)}. ${mn.tytul}</b>
    <small>${CZESCI[czescLekcji(mn.id)]?.t ?? ""} · ${nast.krok === 0 ? "wstęp" : nast.krok > mn.sekcje.length ? "sprawdź się" : `krok ${nast.krok} z ${mn.sekcje.length}`}</small>
    <span class="strzalka">Kontynuuj →</span></a>`
    : `<a class="kafel-akcja glowny" href="#/test"><span class="etyk">Wszystko przerobione</span><b>Test egzaminacyjny</b><small>sprawdź, czy wynik trzyma 90%</small><span class="strzalka">Do testu →</span></a>`}
  <a class="kafel-akcja" href="#/powtorki">
    <span class="etyk">Powtórki na dziś</span>
    <b>${doPowt ? odmiana(doPowt, "karta", "karty", "kart") : nowe ? "Nowe karty czekają" : "Na dziś czysto ✓"}</b>
    <small>${nowe ? `${nowe} jeszcze nie widzianych · ` : ""}${kartyOpanowane()}/${FISZKI.length} opanowanych</small>
    <span class="strzalka">Powtarzaj →</span></a>
  <a class="kafel-akcja" href="#/ustny">
    <span class="etyk">Trening ustny</span>
    <b>Symulacja komisji</b>
    <small>${USTNE.length} pytań z modelowymi odpowiedziami</small>
    <span class="strzalka">Ćwicz →</span></a>
  <a class="kafel-akcja" href="#/test">
    <span class="etyk">Test próbny</span>
    <b>${ost ? `Ostatnio ${ost.wynik}%` : "Jeszcze bez testu"}</b>
    <small>${PYTANIA.length} pytań w banku${Object.keys(zleOdpowiedzi).length ? ` · ${Object.keys(zleOdpowiedzi).length} do poprawy` : ""}</small>
    <span class="strzalka">Rozwiąż →</span></a>
</div>

<h2 class="sekcja-tytul">Gotowość do egzaminu</h2>
<p class="podtytul">Zdajesz dwa osobne egzaminy. Gotowość liczona z mini-testów na końcu lekcji — lekcja jest zaliczona przy wyniku 80% i więcej.</p>
<div class="dwa-egzaminy">
  <a class="egz-kafel egz-E" href="#/kurs/E">${pierscien(gotowoscSw("E"), 88)}<div>${odznaka("E", true)}<b>Egzamin E</b><small>${odmiana(lekcjePod("E").length, "lekcja", "lekcje", "lekcji")}: technika, ochrona, pomiary, BHP</small></div></a>
  <a class="egz-kafel egz-D" href="#/kurs/D">${pierscien(gotowoscSw("D"), 88)}<div>${odznaka("D", true)}<b>Egzamin D</b><small>${odmiana(lekcjePod("D").length, "lekcja", "lekcje", "lekcji")}: przepisy, organizacja pracy, BHP</small></div></a>
</div>
<div class="gotowosc">${CZESCI.map((c, i) => {
    const g = gotowoscCzesci(c);
    return `<a class="got-wiersz" href="#/kurs#cz-${i}"><span class="got-nr">${i + 1}</span><span class="got-t">${c.t}</span>${pasek(g)}<span class="got-pr num ${g >= 80 ? "ok" : ""}">${g}%</span></a>`;
  }).join("")}</div>

<h2 class="sekcja-tytul">Plan kursu</h2>
${mapaKursu(true)}
<p class="stopka">Treść: slajdy ze szkolenia SEP, podręcznik i teksty rozporządzeń z Dziennika Ustaw (stan na październik 2026) — <a href="#/zrodla">źródła</a>.</p>`;
}

/* ================================================================ mapa kursu */
/* sciezka: "E" / "D" — lekcje spoza tej ścieżki są wyszarzone (dalej klikalne). */
function mapaKursu(zwarta = false, sciezka = "") {
  return `<ol class="mapa">${CZESCI.map((c, ci) => `
  <li class="mapa-czesc" id="cz-${ci}">
    <div class="mapa-nagl"><span class="mapa-nr">${ci + 1}</span><div><b>${c.t}</b>${zwarta ? "" : `<small>${c.opis}</small>`}</div></div>
    <ul>${c.lekcje.map((id) => {
      const m = lekcja(id), s = stanLekcji(m), z = ZAKRES[id] || "ED";
      const stan = s.ukonczona ? "ukonczona" : s.rozpoczeta ? "w-toku" : "";
      const poza = sciezka && !dotyczy(z, sciezka) ? "poza" : "";
      return `<li><a class="mapa-lekcja ${stan} ${poza}" href="#/lekcja/${id}">
        <span class="kropka-stanu" aria-hidden="true">${s.ukonczona ? "✓" : numerLekcji(id)}</span>
        <span class="ml-t"><b>${m.tytul}</b><small>${s.ukonczona ? "zaliczona" : `${s.z}/${s.n} kroków`}${s.w ? ` · test ${s.w.naj}%` : ""}</small></span>
        ${odznaka(z)}</a></li>`;
    }).join("")}</ul>
  </li>`).join("")}</ol>`;
}
function widokKurs(sciezka = "") {
  const p = postepKursu();
  if (!["E", "D"].includes(sciezka)) sciezka = "";
  return `
<h1>Kurs</h1>
<p class="wstep">${p.lekcji} lekcji w ${CZESCI.length} częściach — od egzaminu i podstaw po dozór. Każda lekcja to kilka krótkich kroków i mini-test na końcu.</p>
<div class="legenda">
  <div>${odznaka("E", true)}<span>wykonywanie prac: technika, ochrona, pomiary</span></div>
  <div>${odznaka("D", true)}<span>kierowanie i nadzór: przepisy, polecenia, dokumenty</span></div>
  <div>${odznaka("ED", true)}<span>na oba egzaminy: BHP, pierwsza pomoc, egzamin</span></div>
</div>
<div class="filtry">
  <a class="${!sciezka ? "aktywny" : ""}" href="#/kurs">Cały kurs</a>
  <a class="${sciezka === "E" ? "aktywny" : ""}" href="#/kurs/E">Ścieżka E — ${odmiana(lekcjePod("E").length, "lekcja", "lekcje", "lekcji")}</a>
  <a class="${sciezka === "D" ? "aktywny" : ""}" href="#/kurs/D">Ścieżka D — ${odmiana(lekcjePod("D").length, "lekcja", "lekcje", "lekcji")}</a>
</div>
${sciezka === "D" ? `<p class="podtytul">Komisja D pyta też o budowę urządzeń i normy (§ 6 rozporządzenia z 2022 r.) — lekcje E warto przejrzeć, ale pod kątem „jak to nadzorować i sprawdzać”.</p>` : ""}
${mapaKursu(false, sciezka)}`;
}

/* ================================================================ lekcja krok po kroku
   Krok 0 — wstęp, 1..n — sekcje, n+1 — „Sprawdź się” (mini-test). */
let quizStan = null;
function widokLekcja(id, krokTxt) {
  const m = lekcja(id);
  if (!m) return widokKurs();
  const n = m.sekcje.length;
  const krok = Math.min(Math.max(Number(krokTxt) || 0, 0), n + 1);
  const ci = czescLekcji(id), nr = numerLekcji(id);
  const nastM = MODULY[nr], popM = MODULY[nr - 2];
  ostatnie = { id, krok }; PAM.zapisz("ostatnie", ostatnie);
  if (krok >= 1 && krok <= n && !przeczytane[klucz(id, krok - 1)]) { przeczytane[klucz(id, krok - 1)] = true; PAM.zapisz("umiem", przeczytane); }

  const kroki = [{ t: "Wstęp" }, ...m.sekcje.map((s) => ({ t: s.t })), { t: "Sprawdź się" }];
  const os = `<nav class="os-krokow" aria-label="Kroki lekcji">${kroki.map((k, i) => {
    const zrob = i === 0 || (i <= n ? przeczytane[klucz(id, i - 1)] : !!wynikiLekcji[id]);
    return `<a href="#/lekcja/${id}/${i}" class="${i === krok ? "biezacy" : ""} ${zrob ? "zrobiony" : ""}" title="${k.t.replace(/<[^>]+>/g, "")}"><span></span></a>`;
  }).join("")}</nav>`;

  let tresc;
  if (krok === 0) {
    const minut = Math.max(5, Math.round(m.sekcje.reduce((a, s) => a + s.h.replace(/<[^>]+>/g, "").length, 0) / 900));
    tresc = `
<div class="lekcja-wstep">
  <p class="wstep">${m.wstep}</p>
  <div class="wazne zakres-${ZAKRES[id] || "ED"}"><b>${odznaka(ZAKRES[id] || "ED", true)}</b>${OPIS_ZAKRESU[ZAKRES[id] || "ED"]}</div>
  <div class="siatka-2">
    <div class="kafel"><h4>Po tej lekcji umiesz</h4><ul class="lista-ok">${(CELE[id] || []).map((c) => `<li>${c}</li>`).join("")}</ul></div>
    <div class="kafel"><h4>W lekcji · ok. ${minut} min</h4><ol class="lista-krokow">${m.sekcje.map((s, i) =>
      `<li class="${przeczytane[klucz(id, i)] ? "zrobiony" : ""}"><a href="#/lekcja/${id}/${i + 1}">${s.t}</a> ${s.dla && s.dla !== ZAKRES[id] ? odznaka(s.dla) : ""}</li>`).join("")}
      <li><a href="#/lekcja/${id}/${n + 1}">Sprawdź się${pytaniaLekcji(id).length ? ` — ${Math.min(5, pytaniaLekcji(id).length)} pytań` : ""}</a></li></ol></div>
  </div>
</div>`;
  } else if (krok <= n) {
    const s = m.sekcje[krok - 1];
    const zk = zakresKroku(id, s);
    tresc = `<section class="sekcja krok-tresc pas-${zk}"><div class="krok-odz">${odznaka(zk, true)}</div><h2>${s.t}</h2>${s.h}
      <p class="zrodlo-sekcji">${zrodloSekcji(s.zr)}</p></section>`;
  } else {
    tresc = `<section class="sekcja" id="quiz"></section>`;
  }

  const wstecz = krok > 0 ? `#/lekcja/${id}/${krok - 1}` : popM ? `#/lekcja/${popM.id}` : "#/kurs";
  const dalej = krok <= n ? `#/lekcja/${id}/${krok + 1}` : nastM ? `#/lekcja/${nastM.id}` : "#/test";
  const dalejTxt = krok === 0 ? "Zaczynamy" : krok < n ? "Dalej" : krok === n ? "Sprawdź się" : nastM ? `Lekcja ${nr + 1}: ${nastM.tytul}` : "Test egzaminacyjny";
  return `
<div class="lekcja">
  <p class="okruszki"><a href="#/kurs">Kurs</a> › Część ${ci + 1}: ${CZESCI[ci]?.t ?? ""} › Lekcja ${nr} z ${MODULY.length}</p>
  <div class="lekcja-nagl"><span class="lekcja-nr">${nr}</span><div><h1>${m.tytul}</h1>${odznaka(ZAKRES[id] || "ED", true)}</div></div>
  ${os}
  <p class="krok-podpis">${krok === 0 ? "Wstęp" : krok <= n ? `Krok ${krok} z ${n}` : "Sprawdź się"}</p>
  ${tresc}
  <div class="nawigacja-krokow">
    <a class="btn" href="${wstecz}">← ${krok > 0 ? "Wstecz" : popM ? "Poprzednia lekcja" : "Kurs"}</a>
    <a class="btn glowny" href="${dalej}" id="krok-dalej">${dalejTxt} →</a>
  </div>
</div>`;
}
function zrodloSekcji(zr) {
  if (!zr || zr === "—") return "Uzupełnienie spoza slajdów.";
  if (/^\d/.test(zr)) return `Źródło: slajd ${zr} z materiałów szkoleniowych.`;
  return `Źródło: ${zr}.`;
}

/* mini-test na końcu lekcji */
function startQuizu(id) {
  const pula = tasuj(pytaniaLekcji(id)).slice(0, 5).map(tasujOdp);
  quizStan = { id, pyt: pula, poz: 0, dobre: 0 };
  pokazQuiz();
}
function pokazQuiz() {
  const s = quizStan, el = $("#quiz");
  if (!s || !el) return;
  if (!s.pyt.length) {
    el.innerHTML = `<h2>Podsumowanie</h2><p>Ta lekcja nie ma pytań testowych — przejrzyj jeszcze raz kroki i przejdź dalej.</p>`;
    return;
  }
  const p = s.pyt[s.poz];
  if (!p) {
    const wynik = Math.round((s.dobre / s.pyt.length) * 100);
    const st = wynikiLekcji[s.id] || { naj: 0 };
    wynikiLekcji[s.id] = { naj: Math.max(st.naj, wynik), ost: wynik, data: dzisiaj() };
    PAM.zapisz("lekcje", wynikiLekcji);
    el.innerHTML = `<div class="wynik-lekcji ${wynik >= 80 ? "zal" : ""}">${pierscien(wynik, 120)}
      <div><h2>${wynik >= 80 ? "Lekcja zaliczona ✓" : "Jeszcze nie — powtórz i spróbuj ponownie"}</h2>
      <p>${s.dobre} z ${s.pyt.length} poprawnych. ${wynik >= 80 ? "Karty z tej lekcji trafią do powtórek." : "Wróć do kroków, w których się pomyliłeś, i rozwiąż test jeszcze raz — pytania się losują."}</p>
      <p><button class="btn" data-quiz="${s.id}">↻ Jeszcze raz</button> <a class="btn" href="#/powtorki/${s.id}">Karty z tej lekcji</a></p></div></div>`;
    if (wynik >= 80) for (const f of FISZKI.map((x, i) => ({ ...x, i }))) if (f.m === s.id && !karty[f.i]) karty[f.i] = { b: 0, d: dzisiaj() };
    PAM.zapisz("karty", karty);
    return;
  }
  el.innerHTML = `
<p class="licznik"><span>Pytanie ${s.poz + 1} z ${s.pyt.length}</span><span>Poprawne: ${s.dobre}</span></p>
<div class="tresc-pyt">${p.p}</div>
<div class="odpowiedzi">${p.odp.map((o, i) => `<button class="odp" data-qodp="${i}"><span class="lit">${"ABCD"[i]}</span><span>${o}</span></button>`).join("")}</div>
<div id="q-wyj"></div>`;
}
function odpowiedzQuiz(i) {
  const s = quizStan, p = s.pyt[s.poz];
  const b = MAIN.querySelectorAll("[data-qodp]");
  b.forEach((x) => (x.disabled = true));
  b[p.ok].classList.add("dobra");
  const ok = i === p.ok;
  if (ok) { s.dobre++; delete zleOdpowiedzi[p.i]; } else { b[i].classList.add("zla"); zleOdpowiedzi[p.i] = (zleOdpowiedzi[p.i] ?? 0) + 1; }
  PAM.zapisz("zle", zleOdpowiedzi);
  $("#q-wyj").innerHTML = `<div class="wazne ${ok ? "zielone" : "czerwone"}"><b>${ok ? "Dobrze!" : "Poprawna: " + "ABCD"[p.ok]}</b>${p.w}</div>
    <p class="prawo"><button class="btn glowny" id="q-dalej">${s.poz + 1 < s.pyt.length ? "Następne" : "Wynik"} →</button></p>`;
  $("#q-dalej").focus();
}

/* ================================================================ powtórki */
let powtStan = null;
function widokPowtorki(filtr) {
  const due = tasuj(kartyDoPowtorki(filtr));
  const nowe = kartyNowe(filtr).slice(0, filtr ? 99 : 10);
  powtStan = { talia: [...due, ...nowe], poz: 0, filtr, dobre: 0 };
  const pudelka = [0, 1, 2, 3, 4, 5].map((b) => FISZKI.filter((f, i) => (!filtr || f.m === filtr) && karty[i] && karty[i].b === b).length);
  const lekcjeZKartami = MODULY.filter((m) => FISZKI.some((f) => f.m === m.id));
  return `
<h1>Powtórki</h1>
<p class="wstep">Karta, którą pamiętasz, wraca coraz rzadziej (1 → 3 → 7 → 16 → 35 dni). Ta, której nie pamiętasz, wraca jutro. Dziesięć minut dziennie wystarczy.</p>
<div class="pudelka" aria-label="Karty w pudełkach">${pudelka.map((n, b) => `<div class="pudelko"><b class="num">${n}</b><span>${["nowe", "1 dzień", "3 dni", "7 dni", "16 dni", "35 dni"][b]}</span></div>`).join("")}</div>
<div class="filtry">
  <a class="${!filtr ? "aktywny" : ""}" href="#/powtorki">Wszystkie lekcje</a>
  ${lekcjeZKartami.map((m) => `<a class="${filtr === m.id ? "aktywny" : ""}" href="#/powtorki/${m.id}">${numerLekcji(m.id)}. ${m.tytul}</a>`).join("")}
</div>
<div id="powt"></div>`;
}
function pokazKarte() {
  const s = powtStan, el = $("#powt");
  if (!s || !el) return;
  const f = s.talia[s.poz];
  if (!f) {
    el.innerHTML = `<div class="pusto"><div class="duza-ik">✓</div><h2>${s.talia.length ? "Sesja zrobiona" : "Na dziś nic do powtórki"}</h2>
      <p>${s.talia.length ? `Przejrzane: ${s.poz} · pamiętane od razu: ${s.dobre}.` : "Wróć jutro albo wybierz lekcję powyżej, żeby przejrzeć jej karty."}</p>
      <p><a class="btn glowny" href="#/">Pulpit</a> <a class="btn" href="#/test">Test</a></p></div>`;
    return;
  }
  const m = lekcja(f.m);
  el.innerHTML = `
<p class="licznik"><span>Karta ${s.poz + 1} z ${s.talia.length}</span><span>${m ? `${odznaka(ZAKRES[m.id] || "ED")} ${numerLekcji(m.id)}. ${m.tytul}` : ""}</span></p>
${pasek((s.poz / s.talia.length) * 100)}
<div class="fiszka-scena"><button class="fiszka" id="fiszka" aria-label="Odwróć kartę">
  <span class="strona przod"><span class="etykieta">pytanie${karty[f.i] ? "" : " · nowa"}</span><span>${f.p}</span><small class="podp">kliknij lub spacja — pokaż odpowiedź</small></span>
  <span class="strona tyl"><span class="etykieta">odpowiedź</span><span id="f-o"></span></span>
</button></div>
<div class="fiszka-akcje">
  <button class="btn zle-btn" id="f-nie">✗ Nie pamiętam <kbd>←</kbd></button>
  <button class="btn glowny" id="f-tak">✓ Pamiętam <kbd>→</kbd></button>
</div>`;
  setTimeout(() => { const o = $("#f-o"); if (o) o.textContent = f.o; }, 120); // odpowiedź dopiero po wyrenderowaniu przodu
}
function ocenKarte(pamietam) {
  const s = powtStan, f = s.talia[s.poz];
  if (!f) return;
  const k = karty[f.i] || { b: 0 };
  if (pamietam) {
    const b = Math.min(5, Math.max(1, k.b + 1));
    karty[f.i] = { b, d: dzisiaj(ODSTEPY_DNI[b]) };
    s.dobre++;
  } else {
    karty[f.i] = { b: 1, d: dzisiaj(1) };
    if (s.talia.slice(s.poz + 1).every((x) => x.i !== f.i)) s.talia.push(f); // jeszcze raz w tej sesji
  }
  PAM.zapisz("karty", karty);
  s.poz++;
  pokazKarte();
}

/* ================================================================ test */
let testStan = null;
function widokTestStart() {
  const ost = historiaTestow.slice(-6).reverse();
  const zle = Object.keys(zleOdpowiedzi).length;
  const nD = PYTANIA.filter((p) => dotyczy(ZAKRES[p.m] || "ED", "D")).length;
  return `
<h1>Test próbny</h1>
<p class="wstep">Jednokrotny wybór, od razu widzisz poprawną odpowiedź z wyjaśnieniem. Prawdziwy egzamin jest ustny — test sprawdza, czy masz fakty w głowie. Celuj w 90%.</p>
<div class="siatka-3">
  <button class="kafel-akcja" data-test="szybki"><span class="etyk">10 minut</span><b>Szybki — 20 pytań</b><small>losowo z całości</small></button>
  <button class="kafel-akcja glowny" data-test="E"><span class="etyk">${odznaka("E", true)}</span><b>Egzamin E — 30 pytań</b><small>technika, ochrona, pomiary, BHP, pierwsza pomoc</small></button>
  <button class="kafel-akcja" data-test="D"><span class="etyk">${odznaka("D", true)}</span><b>Egzamin D — ${Math.min(25, nD)} pytań</b><small>przepisy, organizacja pracy, dokumenty, BHP, pierwsza pomoc</small></button>
  <button class="kafel-akcja" data-test="all"><span class="etyk">pełny przegląd</span><b>Wszystkie — ${PYTANIA.length}</b><small>cały bank pytań</small></button>
  <button class="kafel-akcja" data-test="zle" ${zle ? "" : "disabled"}><span class="etyk">najwięcej daje</span><b>Moje błędy — ${zle}</b><small>${zle ? "tylko pytania, na które źle odpowiedziałeś" : "na razie brak błędów"}</small></button>
</div>
${ost.length ? `<h2 class="sekcja-tytul">Ostatnie wyniki</h2><div class="tabela-wrap"><table><tr><th>Data</th><th>Rodzaj</th><th>Wynik</th><th>Pytań</th></tr>
${ost.map((t) => `<tr><td>${t.data}</td><td>${t.tryb ?? "—"}</td><td><b class="${t.wynik >= 90 ? "ok-txt" : ""}">${t.wynik}%</b></td><td>${t.z}</td></tr>`).join("")}</table></div>` : ""}`;
}
const NAZWY_TESTOW = { szybki: "szybki", E: "egzamin E", D: "egzamin D", all: "wszystkie", zle: "błędy" };
function startTestu(tryb) {
  let pula = PYTANIA.map((p, i) => ({ ...p, i }));
  if (tryb === "zle") pula = pula.filter((p) => zleOdpowiedzi[p.i]);
  if (tryb === "D") pula = pula.filter((p) => dotyczy(ZAKRES[p.m] || "ED", "D"));
  if (tryb === "E") pula = pula.filter((p) => dotyczy(ZAKRES[p.m] || "ED", "E"));
  pula = tasuj(pula);
  const ile = { szybki: 20, E: 30, D: 25 }[tryb];
  if (ile) pula = pula.slice(0, ile);
  testStan = { pyt: pula.map(tasujOdp), poz: 0, dobre: 0, tryb };
  pokazPytanie();
}
function tasujOdp(p) {
  const idx = tasuj(p.odp.map((_, i) => i)); // warianty też tasujemy, żeby nie uczyć się „zawsze B”
  return { ...p, odp: idx.map((i) => p.odp[i]), ok: idx.indexOf(p.ok) };
}
function pokazPytanie() {
  const s = testStan, p = s.pyt[s.poz];
  if (!p) return koniecTestu();
  const m = lekcja(p.m);
  MAIN.innerHTML = `
<div class="test-ramka">
<p class="licznik"><span>Pytanie ${s.poz + 1} z ${s.pyt.length}</span><span>Poprawne: ${s.dobre}</span></p>
${pasek((s.poz / s.pyt.length) * 100)}
<div class="pytanie">
  <small class="z-lekcji">${m ? `${odznaka(ZAKRES[m.id] || "ED")} Lekcja ${numerLekcji(m.id)} · ${m.tytul}` : ""}</small>
  <div class="tresc-pyt">${p.p}</div>
  <div class="odpowiedzi">${p.odp.map((o, i) => `<button class="odp" data-odp="${i}"><span class="lit">${"ABCD"[i]}</span><span>${o}</span></button>`).join("")}</div>
  <div id="wyjasnienie"></div>
</div></div>`;
  window.scrollTo({ top: 0 });
}
function odpowiedz(i) {
  const s = testStan, p = s.pyt[s.poz];
  const b = MAIN.querySelectorAll(".odp");
  b.forEach((x) => (x.disabled = true));
  b[p.ok].classList.add("dobra");
  const ok = i === p.ok;
  if (ok) { s.dobre++; delete zleOdpowiedzi[p.i]; }
  else { b[i].classList.add("zla"); zleOdpowiedzi[p.i] = (zleOdpowiedzi[p.i] ?? 0) + 1; }
  PAM.zapisz("zle", zleOdpowiedzi);
  $("#wyjasnienie").innerHTML = `<div class="wazne ${ok ? "zielone" : "czerwone"}"><b>${ok ? "Dobrze!" : "Źle — poprawna: " + "ABCD"[p.ok]}</b>${p.w}
    ${ok ? "" : ` <a href="#/lekcja/${p.m}">Wróć do lekcji →</a>`}</div>
    <p class="prawo"><button class="btn glowny" id="dalej">${s.poz + 1 < s.pyt.length ? "Następne →" : "Wynik →"}</button></p>`;
  $("#dalej").focus();
}
function koniecTestu() {
  const s = testStan;
  const wynik = Math.round((s.dobre / s.pyt.length) * 100);
  historiaTestow.push({ data: new Date().toLocaleString("pl-PL", { dateStyle: "short", timeStyle: "short" }), wynik, z: s.pyt.length, tryb: NAZWY_TESTOW[s.tryb] });
  PAM.zapisz("testy", historiaTestow.slice(-50));
  // słabe lekcje: gdzie było najwięcej błędów w tym teście
  const bledy = {};
  testStan = null;
  for (const [k, v] of Object.entries(zleOdpowiedzi)) if (v) bledy[PYTANIA[k]?.m] = (bledy[PYTANIA[k]?.m] ?? 0) + 1;
  const slabe = Object.entries(bledy).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([id]) => lekcja(id)).filter(Boolean);
  MAIN.innerHTML = `
<div class="pytanie wynik-testu">
  ${pierscien(wynik, 150)}
  <h1>${wynik >= 90 ? "Gotowy na egzamin 💪" : wynik >= 70 ? "Dobrze — jeszcze trochę" : "Trzeba wrócić do lekcji"}</h1>
  <p>${s.dobre} z ${s.pyt.length} poprawnych.</p>
  ${slabe.length ? `<p>Najwięcej błędów masz w: ${slabe.map((m) => `<a href="#/lekcja/${m.id}">${m.tytul}</a>`).join(", ")}.</p>` : ""}
  <p><a class="btn glowny" href="#/test">Nowy test</a> ${Object.keys(zleOdpowiedzi).length ? `<button class="btn" data-test="zle">Powtórz błędy (${Object.keys(zleOdpowiedzi).length})</button>` : ""}</p>
</div>`;
}

/* ================================================================ trening ustny */
let ustnyStan = null;
function widokUstny() {
  return `
<h1>Trening ustny</h1>
<p class="wstep">Egzamin to rozmowa z komisją. Odpowiadaj <b>na głos</b>: definicja → zastosowanie → zagrożenia → bezpieczeństwo → kryterium. Potem porównaj z modelową odpowiedzią i oceń się uczciwie.</p>
<div class="siatka-2">
  <button class="kafel-akcja glowny" data-ustny="symulacja"><span class="etyk">jak na egzaminie</span><b>Symulacja komisji</b><small>6 losowych pytań pod rząd, 90 s na każde, na końcu podsumowanie</small></button>
  <button class="kafel-akcja" data-ustny="luz"><span class="etyk">bez presji</span><b>Pojedyncze pytania</b><small>losujesz po jednym, ile chcesz</small></button>
</div>`;
}
function startUstny(tryb) {
  const talia = tasuj(USTNE.map((_, i) => i));
  ustnyStan = { tryb, talia: tryb === "symulacja" ? talia.slice(0, 6) : talia, poz: 0, licznik: null, oceny: [] };
  pokazUstne();
}
function pokazUstne() {
  const s = ustnyStan;
  clearInterval(s.licznik);
  if (s.tryb === "symulacja" && s.poz >= s.talia.length) return koniecUstny();
  const [p, o] = USTNE[s.talia[s.poz % s.talia.length]];
  MAIN.innerHTML = `
<div class="test-ramka">
<p class="licznik"><span>${s.tryb === "symulacja" ? `Symulacja · pytanie ${s.poz + 1} z ${s.talia.length}` : `Pytanie ${(s.poz % s.talia.length) + 1} z ${s.talia.length}`}</span><span id="u-czas" class="num zegar">⏱ 90 s</span></p>
<div class="pytanie">
  <div class="tresc-pyt">${p}</div>
  <div id="u-o" class="wazne zielone ukryte"><b>Modelowa odpowiedź</b>${o}</div>
  <div class="ustny-akcje" id="u-akcje"><button class="btn glowny" id="u-pokaz">Pokaż odpowiedź</button>${s.tryb === "luz" ? `<a class="btn" href="#/ustny">Zakończ</a>` : ""}</div>
</div></div>`;
  let t = 90;
  s.licznik = setInterval(() => {
    t--;
    const el = $("#u-czas");
    if (!el) return clearInterval(s.licznik);
    el.textContent = t > 0 ? `⏱ ${t} s` : "⏱ czas minął";
    el.classList.toggle("koniec", t <= 10);
    if (t <= 0) clearInterval(s.licznik);
  }, 1000);
}
function pokazOdpUstna() {
  const s = ustnyStan;
  clearInterval(s.licznik);
  $("#u-o").classList.remove("ukryte");
  $("#u-akcje").innerHTML = `<span class="ocen-podpis">Jak poszło?</span>
    <button class="btn" data-ocena="0">✗ Nie umiałem</button>
    <button class="btn" data-ocena="1">~ Częściowo</button>
    <button class="btn glowny" data-ocena="2">✓ Umiałem</button>`;
}
function koniecUstny() {
  const s = ustnyStan;
  const pkt = s.oceny.reduce((a, b) => a + b, 0), max = s.oceny.length * 2;
  const pr = max ? Math.round((pkt / max) * 100) : 0;
  const slabe = s.talia.filter((_, i) => s.oceny[i] < 2).map((i) => USTNE[i][0]);
  MAIN.innerHTML = `
<div class="pytanie wynik-testu">
  ${pierscien(pr, 150)}
  <h1>${pr >= 80 ? "Komisja byłaby zadowolona" : pr >= 50 ? "Nieźle — dopracuj kilka tematów" : "Potrzeba więcej treningu"}</h1>
  ${slabe.length ? `<div class="wazne"><b>Do powtórki</b><ul>${slabe.map((x) => `<li>${x}</li>`).join("")}</ul></div>` : "<p>Wszystkie odpowiedzi ocenione jako dobre.</p>"}
  <p><button class="btn glowny" data-ustny="symulacja">Kolejna symulacja</button> <a class="btn" href="#/ustny">Wróć</a></p>
</div>`;
  ustnyStan = null;
}

/* ================================================================ ściąga */
function widokSciaga() {
  const k = (t, rz) => `<div class="kafel"><h4>${t}</h4><dl>${rz.map(([a, b]) => `<dt>${a}</dt><dd>${b}</dd>`).join("")}</dl></div>`;
  return `
<h1>Ściąga — liczby i fakty</h1>
<p class="wstep">Wszystko, co trzeba umieć na pamięć, na jednej stronie. Da się wydrukować (Ctrl+P). Do liczenia: <a href="#/narzedzia">kalkulatory</a>.</p>
<div class="sciaga">
${k("Egzamin 2026", [["świadectwo", "5 lat, bez przedłużenia"], ["bezterminowe", "nieważne od 3.07.2026"], ["forma", "ustny, ≥ 3 egzaminujących"], ["opłata", "10% płacy min. = 480,60 zł"], ["terminy", "zawiadomienie ≥ 14 dni; świadectwo ≤ 14 dni"], ["bez świadectwa", "obsługa ≤ 1 kV i ≤ 20 kW"], ["grupa 1", "pkt 2 — do 1 kV; pkt 13 — AKPiA"]])}
${k("Dozór — rozp. BHP 2019", [["poleceniodawca", "D"], ["koordynujący", "D"], ["dopuszczający", "E"], ["kierujący zespołem", "E"], ["łączenie", "max 2 funkcje; nie dopuszczający + kierujący"], ["zespół", "≥ 2 osoby"], ["polecenie", "przechowywać ≥ 90 dni"], ["uziemienie", "≥ 1 widoczne z miejsca pracy"]])}
${k("Napięcia", [["ELV", "AC ≤ 50 V, DC ≤ 120 V"], ["nN", "AC 50 V–1 kV, DC 120 V–1,5 kV"], ["SN", "AC 1–50 kV, DC 1,5–75 kV"], ["WN", "AC > 50 kV, DC > 75 kV"], ["sieć nN", "230 / 400 V"]])}
${k("Napięcia bezpieczne U_L", [["AC", "50 / 25 / 12 V"], ["DC", "120 / 60 / 30 V"], ["", "suche / wilgotne / mokre"]])}
${k("Przewody", [["PE", "2,5 mm² (z osłoną), 4 mm² (bez)"], ["PEN", "≥ 10 mm² Cu, 16 mm² Al"], ["S_L ≤ 16", "S_PE = S_L"], ["16–35", "S_PE = 16"], ["> 35", "S_PE = ½ S_L"]])}
${k("Wyłączniki nadprądowe", [["A", "2–3 I_n"], ["B", "3–5 I_n"], ["C", "5–10 I_n"], ["D", "10–20 I_n"], ["bimetal", "1,13 / 1,45 I_n"]])}
${k("RCD", [["przeciwporażeniowy", "≤ 30 mA"], ["przeciwpożarowy", "≤ 500 mA"], ["zadziałanie", "0,5–1 I_Δn (15–30 mA)"], ["TEST", "raz w miesiącu"], ["typy", "AC ⊂ A ⊂ B; S — zwłoczny"]])}
${k("Pomiary", [["ciągłość PE", "4–24 V, ≥ 200 mA, ≥ 10 s, ≤ 1 Ω"], ["izolacja 230/400 V", "500 V DC, ≥ 1 MΩ"], ["izolacja SELV/PELV", "250 V DC, ≥ 0,5 MΩ"], ["izolacja > 500 V", "1000 V DC, ≥ 1 MΩ"], ["czas izolacji", "60 s"], ["pętla", "Z_s ≤ U_0 / I_a"], ["gF25", "I_a 93 A → 2,47 Ω"], ["badania okresowe", "co ≤ 5 lat"]])}
${k("Uziemienia", [["budynek", "≤ 10 Ω"], ["stacja trafo", "≤ 1 Ω"], ["sonda S", "20 m (ok. 62%)"], ["sonda H", "40 m"], ["odstęp sond", "≥ 5 × wymiar uziomu"], ["R_x", "U_x / I_A"]])}
${k("Strefy pracy", [["≤ 1 kV", "bez dotyku / 300 mm"], ["10 kV", "120 / 1150 mm"], ["15 kV", "160 / 1160 mm"], ["20 kV", "220 / 1220 mm"], ["110 kV", "1000 / 2000 mm"], ["400 kV", "2500 / 4000 mm"]])}
${k("Łazienka", [["strefa 0", "IPX7, ≤ 12 V"], ["strefa 1", "IPX5, do 2,25 m"], ["strefa 2", "IPX4, 0,60 m"], ["strefa 3", "IPX4, 2,40 m, gniazdo IP44"], ["publiczne", "min. IPX5"]])}
${k("IP", [["IP2X", "palec 12,5 mm — min. obudowa"], ["5 / 6", "pyłoodporne / pyłoszczelne"], ["X4", "bryzgi"], ["X5 / X6", "strumień / fala"], ["X7 / X8", "zanurzenie 30 min / ciągłe"]])}
${k("Pierwsza pomoc", [["RKO", "30 : 2"], ["tempo", "100–120 / min"], ["alarm", "112 (999)"], ["kara", "do 3 lat"], ["ciało", "1000–2000 Ω"], ["częstotliwość", "50 Hz najgroźniejsza"], ["9%", "głowa, ręka"], ["18%", "noga, przód, tył"]])}
${k("Różne", [["gaśnica mgłowa", "≤ 1000 V, ≥ 1 m"], ["kalosze kl. 0", "1 kV AC, 1,5 kV DC"], ["gaz > 25 m", "opinia PSP"], ["gaz przy ścianie", "≤ 500 kPa (mieszk.), ≤ 1600 kPa"], ["rurociągi", "≥ 50 kPa → polecenie pisemne"]])}
</div>`;
}

/* ================================================================ źródła */
function widokZrodla() {
  const z = (t, opis, url) => `<li><a href="${url}" target="_blank" rel="noopener">${t}</a><span>${opis}</span></li>`;
  return `
<h1>Źródła i materiały 2026</h1>
<p class="wstep">Skąd jest treść strony i gdzie sprawdzić szczegóły. Akty prawne czytaj w Dzienniku Ustaw (tekst jednolity), nie z drugiej ręki.</p>
<section class="sekcja"><h2>Akty prawne — sprawdzone z tekstem</h2><ul class="zrodla">
${z("Rozporządzenie MKiŚ z 1.07.2022 r. — stwierdzanie kwalifikacji (Dz.U. 2022 poz. 1392)", "egzamin, wniosek, komisja, opłata, grupy urządzeń — podstawa lekcji 1", "https://www.ure.gov.pl/download/9/12973/1392.pdf")}
${z("Rozporządzenie Ministra Energii z 28.08.2019 r. — BHP przy urządzeniach energetycznych (Dz.U. 2019 poz. 1830)", "polecenia, funkcje, strefy pracy, prace szczególnie niebezpieczne — podstawa lekcji o dozorze", "https://eli.gov.pl/eli/DU/2019/1830/ogl")}
${z("Rozporządzenie MKiŚ z 22.03.2023 r. — warunki funkcjonowania systemu elektroenergetycznego (Dz.U. 2023 poz. 819)", "zastąpiło rozporządzenie z 2007 r.", "https://eli.gov.pl/eli/DU/2023/819/ogl")}
</ul></section>
<section class="sekcja"><h2>Zmiany w 2026 r.</h2><ul class="zrodla">
${z("SEP Warszawa — bezterminowe świadectwa utraciły ważność 3 lipca 2026 r.", "komunikat stowarzyszenia", "https://mailing.sep.warszawa.pl/aktualnosci/1992-bezterminowe-swiadectwa-kwalifikacyjne-sep-utracily-waznosc-3-lipca-2026-r")}
${z("Grema — kto musi uzyskać nowe świadectwo po 3.07.2026", "omówienie art. 54 Prawa energetycznego i przepisów przejściowych", "https://www.grema.pl/bezterminowe-uprawnienia-sep-po-3-lipca-2026-kto-musi-uzyskac-nowe-swiadectwo/")}
${z("TISBUD — zagadnienia egzaminacyjne G1 2026", "przegląd zagadnień, opłata 480,60 zł w 2026 r.", "https://tisbud.pl/pytania-na-egzamin-sep-g1-do-1kv/")}
${z("uprawnienia1kv.pl — pytania na egzamin SEP G1", "podział zagadnień na E i D", "https://uprawnienia1kv.pl/aktualnosci/pytania-na-egzamin-sep-g1.html")}
</ul></section>
<section class="sekcja"><h2>Do samodzielnego ćwiczenia</h2><ul class="zrodla">
${z("sep-quiz (GitHub, licencja MIT) — 196 pytań G1 z wyjaśnieniami", "dobra baza do dodatkowego treningu, ale część odpowiedzi opiera się na starym rozporządzeniu (np. łączenie funkcji, polecenia ustne) — sprawdzaj z lekcją o dozorze", "https://github.com/dominikmaslak11/sep-quiz")}
</ul></section>
<section class="sekcja"><h2>Materiały własne</h2>
<p>80 zdjęć slajdów ze szkolenia SEP (numery przy każdym kroku lekcji) oraz „Podręcznik SEP G1 E+D 2026” — ogólny, bez liczb; wzięte z niego: podstawy elektrotechniki, aparatura, protokół z pomiarów, pytania ustne.</p></section>`;
}

/* ================================================================ narzędzia */
function widokNarzedzia() {
  return `
<h1>Kalkulatory</h1>
<p class="wstep">Policz to, o co pytają na egzaminie, i sprawdź, czy rozumiesz zasadę.</p>
<section class="sekcja"><h2>Skuteczność ochrony — impedancja pętli zwarcia</h2>
<div class="kalk">
  <div><label for="k-typ">Zabezpieczenie</label><select id="k-typ">
    <option value="B">wyłącznik B</option><option value="C">wyłącznik C</option><option value="D">wyłącznik D</option><option value="gF">wkładka gF (0,4 s)</option></select></div>
  <div><label for="k-in">Prąd znamionowy I<sub>n</sub> [A]</label><select id="k-in">${[6, 10, 13, 16, 20, 25, 32].map((v) => `<option ${v === 16 ? "selected" : ""}>${v}</option>`).join("")}</select></div>
  <div><label for="k-u0">U<sub>0</sub> [V]</label><input id="k-u0" type="number" value="230"></div>
  <div><label for="k-zs">Zmierzona Z<sub>s</sub> [Ω]</label><input id="k-zs" type="number" step="0.01" value="0.72"></div>
</div>
<div class="kalk-wynik" id="k-wynik"></div></section>

<section class="sekcja"><h2>Dekoder stopnia ochrony IP</h2>
<div class="ip-cyfry">IP <select id="ip1" aria-label="pierwsza cyfra">${["X", 0, 1, 2, 3, 4, 5, 6].map((v) => `<option ${v === 4 ? "selected" : ""}>${v}</option>`).join("")}</select>
<select id="ip2" aria-label="druga cyfra">${["X", 0, 1, 2, 3, 4, 5, 6, 7, 8].map((v) => `<option ${v === 4 ? "selected" : ""}>${v}</option>`).join("")}</select></div>
<div class="kalk-wynik" id="ip-wynik"></div></section>

<section class="sekcja"><h2>Przekrój przewodu ochronnego PE</h2>
<div class="kalk"><div><label for="pe-sl">Przekrój fazowego S<sub>L</sub> [mm²]</label><select id="pe-sl">${[1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95, 120].map((v) => `<option ${v === 25 ? "selected" : ""}>${v}</option>`).join("")}</select></div></div>
<div class="kalk-wynik" id="pe-wynik"></div></section>

<section class="sekcja"><h2>Strefa pracy — minimalne odstępy</h2>
<div class="kalk"><div><label for="st-u">Napięcie znamionowe</label><select id="st-u">${ODSTEPY.map((o, i) => `<option value="${i}">${o[0]}</option>`).join("")}</select></div></div>
<div class="kalk-wynik" id="st-wynik"></div></section>`;
}
const ODSTEPY = [["≤ 1 kV", "bez dotyku", 300], ["3 kV", 60, 1120], ["6 kV", 90, 1120], ["10 kV", 120, 1150], ["15 kV", 160, 1160], ["20 kV", 220, 1220], ["30 kV", 320, 1320], ["110 kV", 1000, 2000], ["220 kV", 1600, 3000], ["400 kV", 2500, 4000], ["750 kV", 5300, 8400]];
const IA_GF = { 20: 74, 25: 93, 32: 120 }; // 0,4 s — tylko wartości z tabeli ze szkolenia
const IP1 = { X: "nie badano", 0: "brak ochrony", 1: "ciała > 50 mm (dłoń)", 2: "ciała > 12,5 mm (palec)", 3: "ciała > 2,5 mm (narzędzie)", 4: "ciała > 1 mm (drut)", 5: "pyłoodporne", 6: "pyłoszczelne" };
const IP2 = { X: "nie badano", 0: "brak ochrony", 1: "krople pionowo", 2: "krople pod kątem 15°", 3: "krople pod kątem 60° (natrysk)", 4: "bryzgi z każdej strony", 5: "strumień wody", 6: "fala / silny strumień", 7: "zanurzenie do 30 min", 8: "ciągłe zanurzenie" };

function liczNarzedzia() {
  const typ = $("#k-typ")?.value;
  if (!typ) return;
  const In = Number($("#k-in").value), U0 = Number($("#k-u0").value), Zs = Number($("#k-zs").value);
  const mn = { B: 5, C: 10, D: 20 }[typ];
  const Ia = typ === "gF" ? IA_GF[In] : mn * In;
  const w = $("#k-wynik");
  if (!Ia) {
    w.className = "kalk-wynik";
    w.innerHTML = "Dla wkładek gF tabela ze szkolenia podaje tylko 20, 25 i 32 A — wybierz jedną z nich.";
  } else {
    const zdop = U0 / Ia, ok = Zs > 0 && Zs <= zdop;
    w.className = "kalk-wynik " + (Zs > 0 ? (ok ? "ok" : "zle") : "");
    w.innerHTML = `I<sub>a</sub> = ${typ === "gF" ? "z tabeli wkładki" : `${mn} × ${In} A`} = <b>${Ia} A</b> → Z<sub>s dop</sub> = ${U0} / ${Ia} = <b>${zdop.toFixed(2).replace(".", ",")} Ω</b><br>
      Zmierzono ${String(Zs).replace(".", ",")} Ω → ochrona <b>${ok ? "SKUTECZNA ✓" : "NIESKUTECZNA ✗"}</b>`;
  }
  const a = $("#ip1").value, b = $("#ip2").value;
  $("#ip-wynik").innerHTML = `<b>IP${a}${b}</b>: ${IP1[a]}; ${IP2[b]}.`;
  const sl = Number($("#pe-sl").value);
  const spe = sl <= 16 ? sl : sl <= 35 ? 16 : sl / 2;
  $("#pe-wynik").innerHTML = `S<sub>PE</sub> = <b>${String(spe).replace(".", ",")} mm²</b> (${sl <= 16 ? "S_L ≤ 16 → tyle samo" : sl <= 35 ? "16 < S_L ≤ 35 → 16" : "S_L > 35 → połowa"})`;
  const o = ODSTEPY[Number($("#st-u").value)];
  $("#st-wynik").innerHTML = `prace pod napięciem: <b>${typeof o[1] === "number" ? o[1] + " mm" : o[1]}</b> · zewnętrzna granica prac w pobliżu napięcia: <b>${o[2]} mm</b>`;
}

/* ================================================================ pomocnicze */
function tasuj(a) {
  const b = [...a];
  for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; }
  return b;
}

/* ================================================================ routing */
function trasa() {
  const [, a, b, c] = (location.hash || "#/").split("#")[1].split("/");
  testStan = null; quizStan = null; powtStan = null;
  if (ustnyStan) { clearInterval(ustnyStan.licznik); ustnyStan = null; }
  let nav = a || "start";
  if (a === "modul") { location.replace(`#/lekcja/${b}`); return; } // stare linki
  if (a === "lekcja") { MAIN.innerHTML = widokLekcja(b, c); nav = "kurs"; const m = lekcja(b); if (m && Number(c) === m.sekcje.length + 1) startQuizu(b); }
  else if (a === "kurs") MAIN.innerHTML = widokKurs(b);
  else if (a === "powtorki") { MAIN.innerHTML = widokPowtorki(b); pokazKarte(); }
  else if (a === "test") MAIN.innerHTML = widokTestStart();
  else if (a === "ustny") MAIN.innerHTML = widokUstny();
  else if (a === "sciaga") MAIN.innerHTML = widokSciaga();
  else if (a === "narzedzia") { MAIN.innerHTML = widokNarzedzia(); liczNarzedzia(); nav = "sciaga"; }
  else if (a === "zrodla") MAIN.innerHTML = widokZrodla();
  else { MAIN.innerHTML = widokPulpit(); nav = "start"; }
  aktywujNav(nav);
  // „#/kurs#cz-2” — przewiń do części
  const kot = location.hash.split("#")[2];
  if (kot) document.getElementById(kot)?.scrollIntoView({ block: "start" }); else window.scrollTo({ top: 0 });
}

document.addEventListener("click", (e) => {
  const t = e.target.closest("[data-test],[data-odp],[data-qodp],[data-quiz],[data-ustny],[data-ocena],#dalej,#q-dalej,#f-tak,#f-nie,#fiszka,#u-pokaz,.motyw");
  if (!t) return;
  if (t.dataset.test) startTestu(t.dataset.test);
  else if (t.dataset.odp !== undefined) odpowiedz(Number(t.dataset.odp));
  else if (t.dataset.qodp !== undefined) odpowiedzQuiz(Number(t.dataset.qodp));
  else if (t.dataset.quiz) startQuizu(t.dataset.quiz);
  else if (t.dataset.ustny) startUstny(t.dataset.ustny);
  else if (t.dataset.ocena !== undefined) {
    ustnyStan.oceny[ustnyStan.poz] = Number(t.dataset.ocena);
    ustnyStan.poz++; pokazUstne();
  }
  else if (t.id === "dalej") { testStan.poz++; pokazPytanie(); }
  else if (t.id === "q-dalej") { quizStan.poz++; pokazQuiz(); }
  else if (t.id === "u-pokaz") pokazOdpUstna();
  else if (t.id === "fiszka") t.classList.toggle("odwrocona");
  else if (t.id === "f-tak" || t.id === "f-nie") ocenKarte(t.id === "f-tak");
  else if (t.classList.contains("motyw")) {
    const ciemny = document.documentElement.dataset.theme
      ? document.documentElement.dataset.theme === "dark"
      : matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.dataset.theme = ciemny ? "light" : "dark";
    PAM.zapisz("motyw", document.documentElement.dataset.theme);
  }
});
document.addEventListener("input", (e) => { if (e.target.closest(".kalk, .ip-cyfry")) liczNarzedzia(); });
document.addEventListener("change", (e) => {
  if (e.target.id === "data-egz") { dataEgzaminu = e.target.value; PAM.zapisz("egzamin", dataEgzaminu); trasa(); }
});
document.addEventListener("keydown", (e) => {
  if (e.target.closest("input, select, textarea")) return;
  if (powtStan) {
    if (e.key === " ") { e.preventDefault(); $("#fiszka")?.classList.toggle("odwrocona"); }
    if (e.key === "ArrowRight") $("#f-tak")?.click();
    if (e.key === "ArrowLeft") $("#f-nie")?.click();
    return;
  }
  const odp = testStan ? ".odp[data-odp]" : quizStan ? "[data-qodp]" : null;
  if (odp && ["1", "2", "3", "4", "a", "b", "c", "d"].includes(e.key.toLowerCase())) {
    const i = "1234".includes(e.key) ? Number(e.key) - 1 : "abcd".indexOf(e.key.toLowerCase());
    const b = MAIN.querySelectorAll(odp)[i];
    if (b && !b.disabled) b.click();
    return;
  }
  if (e.key === "Enter") { ($("#dalej") || $("#q-dalej"))?.click(); return; }
  if (location.hash.startsWith("#/lekcja") && !quizStan?.pyt.length) {
    if (e.key === "ArrowRight") $("#krok-dalej")?.click();
    if (e.key === "ArrowLeft") $(".nawigacja-krokow .btn:not(.glowny)")?.click();
  }
});

const motyw = PAM.czytaj("motyw", null);
if (motyw) document.documentElement.dataset.theme = motyw;
window.addEventListener("hashchange", trasa);
trasa();
