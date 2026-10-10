/* SEP — nauka: routing (#/...), postęp w localStorage, fiszki, test, ściąga, narzędzia.
   Postęp trzymamy w przeglądarce — strona jest prywatna (filtr IP), jedna osoba się uczy. */
"use strict";

const $ = (s, el = document) => el.querySelector(s);
const MAIN = $("#tresc");

/* ---------------------------------------------------------------- pamięć */
const PAM = {
  czytaj(k, d) { try { const v = localStorage.getItem("sep." + k); return v ? JSON.parse(v) : d; } catch { return d; } },
  zapisz(k, v) { try { localStorage.setItem("sep." + k, JSON.stringify(v)); } catch { /* tryb prywatny */ } },
};
let umiem = PAM.czytaj("umiem", {});           // { "modul:indeks": true }
let fiszkiUmiem = PAM.czytaj("fiszki", {});    // { indeks: true }
let historiaTestow = PAM.czytaj("testy", []);  // [{data, wynik, z}]
let zleOdpowiedzi = PAM.czytaj("zle", {});     // { indeks pytania: liczba pomyłek }

const kluczSekcji = (m, i) => `${m}:${i}`;
function postepModulu(m) {
  const n = m.sekcje.length;
  const z = m.sekcje.filter((_, i) => umiem[kluczSekcji(m.id, i)]).length;
  return { z, n, pr: n ? Math.round((z / n) * 100) : 0 };
}
function postepCaly() {
  let z = 0, n = 0;
  for (const m of MODULY) { const p = postepModulu(m); z += p.z; n += p.n; }
  return { z, n, pr: n ? Math.round((z / n) * 100) : 0 };
}

/* ---------------------------------------------------------------- menu boczne */
function rysujMenu(akt) {
  const el = $("#boczne");
  el.innerHTML = `<h3>Nauka</h3>` + MODULY.map((m) => {
    const p = postepModulu(m);
    return `<a href="#/modul/${m.id}" class="${akt === m.id ? "aktywny" : ""}"><span class="ik">${m.ik}</span>${m.tytul}
      <span class="postep ${p.z === p.n ? "ok" : ""}">${p.z === p.n ? "✓" : `${p.z}/${p.n}`}</span></a>`;
  }).join("") + `<h3>Ćwiczenia</h3>
    <a href="#/fiszki" class="${akt === "fiszki" ? "aktywny" : ""}"><span class="ik">🃏</span>Fiszki</a>
    <a href="#/test" class="${akt === "test" ? "aktywny" : ""}"><span class="ik">📝</span>Test próbny</a>
    <a href="#/ustny" class="${akt === "ustny" ? "aktywny" : ""}"><span class="ik">🎤</span>Trening ustny</a>
    <a href="#/sciaga" class="${akt === "sciaga" ? "aktywny" : ""}"><span class="ik">📋</span>Ściąga — liczby</a>
    <a href="#/narzedzia" class="${akt === "narzedzia" ? "aktywny" : ""}"><span class="ik">🧮</span>Kalkulatory</a>`;
  document.querySelectorAll(".pasek nav a").forEach((a) => {
    const h = a.getAttribute("href").slice(2);
    a.classList.toggle("aktywny", h === "" ? akt === "start" : akt === h || (h === "modul" && MODULY.some((m) => m.id === akt)));
  });
}

/* ---------------------------------------------------------------- start */
function widokStart() {
  const p = postepCaly();
  const ost = historiaTestow.at(-1);
  const umianeFiszki = Object.keys(fiszkiUmiem).length;
  return `
<section class="hero">
  <h1>Uprawnienia SEP — grupa 1, E + D</h1>
  <p>Cały materiał ze szkolenia przepisany i przerysowany w jednym miejscu: moduły z wyjaśnieniami i schematami,
  fiszki do powtórek, test jak na egzaminie i ściąga z liczbami, które trzeba umieć na pamięć.</p>
  <a class="btn glowny" href="#/modul/${pierwszyNieukonczony()}">▶ Ucz się dalej</a>
  <a class="btn" href="#/test">📝 Test próbny</a>
  <a class="btn" href="#/fiszki">🃏 Fiszki</a>
</section>
<div class="statystyki">
  <div class="stat"><b class="num">${p.pr}%</b><span>tematów opanowanych (${p.z}/${p.n})</span><div class="pasek-postepu"><i style="width:${p.pr}%"></i></div></div>
  <div class="stat"><b class="num">${umianeFiszki}/${FISZKI.length}</b><span>fiszek umiesz</span><div class="pasek-postepu"><i style="width:${Math.round(umianeFiszki / FISZKI.length * 100)}%"></i></div></div>
  <div class="stat"><b class="num">${ost ? ost.wynik + "%" : "—"}</b><span>${ost ? `ostatni test (${ost.data})` : "nie było jeszcze testu"}</span></div>
  <div class="stat"><b class="num">${PYTANIA.length}</b><span>pytań w banku testowym</span></div>
</div>
<h2>Moduły</h2>
<div class="moduly">${MODULY.map((m) => {
    const pm = postepModulu(m);
    return `<a class="modul-kafel" href="#/modul/${m.id}"><span class="ik">${m.ik}</span><span><b>${m.tytul}</b>
      <small>${pm.z}/${pm.n} tematów${pm.z === pm.n ? " ✓" : ""}</small></span></a>`;
  }).join("")}</div>
<p class="stopka">Materiał: slajdy ze szkolenia SEP (zdjęcia z ${new Date(2026, 9, 10).toLocaleDateString("pl-PL")}). Części oznaczone „uzupełnienie” pochodzą spoza slajdów — sprawdź je z aktualnymi przepisami.</p>`;
}
function pierwszyNieukonczony() {
  const m = MODULY.find((x) => postepModulu(x).z < postepModulu(x).n);
  return (m ?? MODULY[0]).id;
}

/* ---------------------------------------------------------------- moduł */
function widokModul(id) {
  const i = MODULY.findIndex((m) => m.id === id);
  const m = MODULY[i];
  if (!m) return widokStart();
  const pop = MODULY[i - 1], nast = MODULY[i + 1];
  return `
<div class="naglowek-modulu"><div class="wielka-ik">${m.ik}</div><h1>${m.tytul}</h1></div>
<p class="wstep">${m.wstep}</p>
${m.sekcje.map((s, j) => {
    const k = kluczSekcji(m.id, j);
    return `<section class="sekcja" id="s-${j}"><h2>${s.t}<span class="zr" title="numery zdjęć w folderze z materiałami">${s.zr === "—" || s.zr === "uzupełnienie" ? "uzupełnienie" : "slajd " + s.zr}</span></h2>
      ${s.h}
      <button class="btn maly btn-umiem ${umiem[k] ? "zrobione" : ""}" data-umiem="${k}">${umiem[k] ? "✓ Umiem" : "Oznacz: umiem"}</button></section>`;
  }).join("")}
<div class="przelacz-sekcje">
  ${pop ? `<a class="btn" href="#/modul/${pop.id}">← ${pop.tytul}</a>` : "<span></span>"}
  <a class="btn" href="#/fiszki/${m.id}">🃏 Fiszki z tego modułu</a>
  ${nast ? `<a class="btn glowny" href="#/modul/${nast.id}">${nast.tytul} →</a>` : `<a class="btn glowny" href="#/test">Test próbny →</a>`}
</div>`;
}

/* ---------------------------------------------------------------- fiszki */
let fiszkiStan = null;
function widokFiszki(filtr) {
  const pula = FISZKI.map((f, i) => ({ ...f, i })).filter((f) => !filtr || f.m === filtr);
  const doNauki = pula.filter((f) => !fiszkiUmiem[f.i]);
  const talia = tasuj(doNauki.length ? doNauki : pula);
  fiszkiStan = { talia, poz: 0, filtr };
  const naz = (id) => MODULY.find((m) => m.id === id)?.tytul ?? id;
  return `
<h1>🃏 Fiszki</h1>
<p class="wstep">Kliknij kartę, żeby ją odwrócić. „Umiem” — karta wypada z powtórek; „Jeszcze nie” — wróci.</p>
<div class="filtry">
  <button class="${!filtr ? "aktywny" : ""}" data-filtr="">Wszystkie (${FISZKI.length})</button>
  ${MODULY.filter((m) => FISZKI.some((f) => f.m === m.id)).map((m) =>
    `<button class="${filtr === m.id ? "aktywny" : ""}" data-filtr="${m.id}">${m.ik} ${m.tytul}</button>`).join("")}
</div>
<p class="licznik"><span id="f-licznik"></span><span>${pula.filter((f) => fiszkiUmiem[f.i]).length}/${pula.length} umiesz${filtr ? " w: " + naz(filtr) : ""}</span></p>
<div class="fiszka-scena"><div class="fiszka" id="fiszka"><div class="strona przod"><span class="etykieta">pytanie</span><span id="f-p"></span></div>
<div class="strona tyl"><span class="etykieta">odpowiedź</span><span id="f-o"></span></div></div></div>
<div class="fiszka-akcje">
  <button class="btn" id="f-nie">↻ Jeszcze nie</button>
  <button class="btn glowny" id="f-tak">✓ Umiem</button>
</div>
<p style="text-align:center;margin-top:18px"><button class="btn maly" id="f-reset">Wyczyść postęp fiszek${filtr ? " w tym module" : ""}</button></p>`;
}
function pokazFiszke() {
  const s = fiszkiStan;
  if (!s) return;
  const f = s.talia[s.poz];
  $("#fiszka").classList.remove("odwrocona");
  if (!f) {
    $("#f-p").innerHTML = "🎉 Koniec talii!<br><small>Wszystkie karty przejrzane.</small>";
    $("#f-o").textContent = "";
    $("#f-licznik").textContent = "";
    return;
  }
  $("#f-p").textContent = f.p;
  setTimeout(() => { $("#f-o").textContent = f.o; }, 150); // nie pokazuj odpowiedzi w trakcie obrotu
  $("#f-licznik").textContent = `karta ${s.poz + 1} z ${s.talia.length}`;
}

/* ---------------------------------------------------------------- test */
let testStan = null;
function widokTestStart() {
  const ost = historiaTestow.slice(-5).reverse();
  const zle = Object.keys(zleOdpowiedzi).length;
  return `
<h1>📝 Test próbny</h1>
<p class="wstep">Pytania jednokrotnego wyboru z całego materiału. Od razu widzisz poprawną odpowiedź i wyjaśnienie.</p>
<div class="siatka-3">
  <button class="kafel btn" data-test="20"><h4>Szybki — 20 pytań</h4><p>losowe z całości</p></button>
  <button class="kafel btn" data-test="40"><h4>Egzaminacyjny — 40 pytań</h4><p>losowe z całości</p></button>
  <button class="kafel btn" data-test="all"><h4>Wszystkie — ${PYTANIA.length}</h4><p>pełny przegląd</p></button>
  <button class="kafel btn" data-test="zle" ${zle ? "" : "disabled"}><h4>Moje błędy — ${zle}</h4><p>tylko pytania, na które źle odpowiedziałeś</p></button>
</div>
${ost.length ? `<h2 style="margin-top:24px">Ostatnie wyniki</h2><div class="tabela-wrap"><table><tr><th>Data</th><th>Wynik</th><th>Pytań</th></tr>
${ost.map((t) => `<tr><td>${t.data}</td><td><b>${t.wynik}%</b></td><td>${t.z}</td></tr>`).join("")}</table></div>` : ""}`;
}
function startTestu(tryb) {
  let pula = PYTANIA.map((p, i) => ({ ...p, i }));
  if (tryb === "zle") pula = pula.filter((p) => zleOdpowiedzi[p.i]);
  pula = tasuj(pula);
  if (tryb !== "all" && tryb !== "zle") pula = pula.slice(0, Number(tryb));
  // warianty odpowiedzi też tasujemy, żeby nie uczyć się „zawsze B”
  testStan = { pyt: pula.map((p) => tasujOdp(p)), poz: 0, dobre: 0 };
  pokazPytanie();
}
function tasujOdp(p) {
  const idx = tasuj(p.odp.map((_, i) => i));
  return { ...p, odp: idx.map((i) => p.odp[i]), ok: idx.indexOf(p.ok) };
}
function pokazPytanie() {
  const s = testStan;
  const p = s.pyt[s.poz];
  if (!p) return koniecTestu();
  const modul = MODULY.find((m) => m.id === p.m);
  MAIN.innerHTML = `
<p class="licznik"><span>Pytanie ${s.poz + 1} z ${s.pyt.length}</span><span>Poprawne: ${s.dobre}</span></p>
<div class="pasek-postepu" style="margin-bottom:14px"><i style="width:${(s.poz / s.pyt.length) * 100}%"></i></div>
<div class="pytanie">
  <small style="color:var(--tekst-3)">${modul ? modul.ik + " " + modul.tytul : ""}</small>
  <div class="tresc">${p.p}</div>
  <div class="odpowiedzi">${p.odp.map((o, i) => `<button class="odp" data-odp="${i}"><span class="lit">${"ABCD"[i]}</span><span>${o}</span></button>`).join("")}</div>
  <div id="wyjasnienie"></div>
</div>`;
  window.scrollTo({ top: 0 });
}
function odpowiedz(i) {
  const s = testStan;
  const p = s.pyt[s.poz];
  const przyciski = MAIN.querySelectorAll(".odp");
  przyciski.forEach((b) => (b.disabled = true));
  przyciski[p.ok].classList.add("dobra");
  const dobrze = i === p.ok;
  if (dobrze) { s.dobre++; delete zleOdpowiedzi[p.i]; }
  else { przyciski[i].classList.add("zla"); zleOdpowiedzi[p.i] = (zleOdpowiedzi[p.i] ?? 0) + 1; }
  PAM.zapisz("zle", zleOdpowiedzi);
  $("#wyjasnienie").innerHTML = `<div class="wazne ${dobrze ? "zielone" : "czerwone"} wyjasnienie"><b>${dobrze ? "Dobrze!" : "Źle — poprawna: " + "ABCD"[p.ok]}</b>${p.w}
    ${dobrze ? "" : ` <a href="#/modul/${p.m}">Wróć do tematu →</a>`}</div>
    <p style="text-align:right"><button class="btn glowny" id="dalej">${s.poz + 1 < s.pyt.length ? "Następne →" : "Wynik →"}</button></p>`;
  $("#dalej").focus();
}
function koniecTestu() {
  const s = testStan;
  const wynik = Math.round((s.dobre / s.pyt.length) * 100);
  historiaTestow.push({ data: new Date().toLocaleString("pl-PL", { dateStyle: "short", timeStyle: "short" }), wynik, z: s.pyt.length });
  PAM.zapisz("testy", historiaTestow.slice(-50));
  testStan = null;
  MAIN.innerHTML = `
<div class="pytanie" style="text-align:center">
  <h1>Wynik</h1>
  <div class="wynik-duzy" style="color:${wynik >= 90 ? "var(--zielony)" : wynik >= 70 ? "var(--akcent-ciemny)" : "var(--czerwony)"}">${wynik}%</div>
  <p>${s.dobre} z ${s.pyt.length} poprawnych. ${wynik >= 90 ? "Gotowy na egzamin! 💪" : wynik >= 70 ? "Dobrze — powtórz błędy i będzie komplet." : "Wróć do modułów i fiszek, potem spróbuj jeszcze raz."}</p>
  <p><a class="btn glowny" href="#/test">Nowy test</a> ${Object.keys(zleOdpowiedzi).length ? `<button class="btn" data-test="zle">Powtórz błędy (${Object.keys(zleOdpowiedzi).length})</button>` : ""}</p>
</div>`;
}

/* ---------------------------------------------------------------- trening ustny
   Komisja zwykle pyta ustnie: losujemy pytanie, odliczamy 90 s na odpowiedź na głos,
   potem pokazujemy modelową odpowiedź do porównania. */
let ustnyStan = null;
function widokUstny() {
  ustnyStan = { talia: tasuj(USTNE.map((_, i) => i)), poz: 0, licznik: null };
  return `
<h1>🎤 Trening ustny</h1>
<p class="wstep">Odpowiadaj <b>na głos</b> 60–90 s: definicja → zastosowanie → zagrożenia → bezpieczeństwo → kryterium. Potem odkryj modelową odpowiedź.</p>
<div class="pytanie">
  <p class="licznik"><span id="u-nr"></span><span id="u-czas" class="num"></span></p>
  <div class="tresc" id="u-p"></div>
  <div id="u-o" class="wazne zielone ukryte"></div>
  <p style="display:flex;gap:10px;flex-wrap:wrap"><button class="btn" id="u-pokaz">Pokaż odpowiedź</button><button class="btn glowny" id="u-dalej">Następne pytanie →</button></p>
</div>`;
}
function pokazUstne() {
  const s = ustnyStan;
  if (!s) return;
  clearInterval(s.licznik);
  const [p, o] = USTNE[s.talia[s.poz % s.talia.length]];
  $("#u-nr").textContent = `pytanie ${(s.poz % s.talia.length) + 1} z ${s.talia.length}`;
  $("#u-p").textContent = p;
  const odp = $("#u-o");
  odp.classList.add("ukryte");
  odp.innerHTML = "<b>Modelowa odpowiedź</b>" + o;
  let t = 90;
  $("#u-czas").textContent = "⏱ 90 s";
  s.licznik = setInterval(() => {
    t--;
    const el = $("#u-czas");
    if (!el) return clearInterval(s.licznik);
    el.textContent = t > 0 ? `⏱ ${t} s` : "⏱ czas minął";
    if (t <= 0) clearInterval(s.licznik);
  }, 1000);
}

/* ---------------------------------------------------------------- ściąga */
function widokSciaga() {
  const k = (t, rz) => `<div class="kafel"><h4>${t}</h4><dl>${rz.map(([a, b]) => `<dt>${a}</dt><dd>${b}</dd>`).join("")}</dl></div>`;
  return `
<h1>📋 Ściąga — liczby do zapamiętania</h1>
<p class="wstep">Wszystkie wartości liczbowe z materiału w jednym miejscu. Da się wydrukować (Ctrl+P).</p>
<div class="sciaga">
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
${k("Różne", [["świadectwo", "5 lat"], ["gaśnica mgłowa", "≤ 1000 V, ≥ 1 m"], ["kalosze kl. 0", "1 kV AC, 1,5 kV DC"], ["gaz > 25 m", "opinia PSP"], ["gaz przy ścianie", "≤ 500 kPa (mieszk.), ≤ 1600 kPa"], ["rurociągi", "≥ 50 kPa → polecenie pisemne"]])}
</div>`;
}

/* ---------------------------------------------------------------- narzędzia */
function widokNarzedzia() {
  return `
<h1>🧮 Kalkulatory</h1>
<p class="wstep">Policz to, o co pytają na egzaminie, i sprawdź, czy rozumiesz zasadę.</p>
<section class="sekcja"><h2>Skuteczność ochrony — impedancja pętli zwarcia</h2>
<div class="kalk">
  <div><label>Zabezpieczenie</label><select id="k-typ">
    <option value="B">wyłącznik B</option><option value="C">wyłącznik C</option><option value="D">wyłącznik D</option><option value="gF">wkładka gF (0,4 s)</option></select></div>
  <div><label>Prąd znamionowy I<sub>n</sub> [A]</label><select id="k-in">${[6, 10, 13, 16, 20, 25, 32].map((v) => `<option ${v === 16 ? "selected" : ""}>${v}</option>`).join("")}</select></div>
  <div><label>U<sub>0</sub> [V]</label><input id="k-u0" type="number" value="230"></div>
  <div><label>Zmierzona Z<sub>s</sub> [Ω]</label><input id="k-zs" type="number" step="0.01" value="0.72"></div>
</div>
<div class="kalk-wynik" id="k-wynik"></div></section>

<section class="sekcja"><h2>Dekoder stopnia ochrony IP</h2>
<div class="ip-cyfry">IP <select id="ip1">${["X", 0, 1, 2, 3, 4, 5, 6].map((v) => `<option ${v === 4 ? "selected" : ""}>${v}</option>`).join("")}</select>
<select id="ip2">${["X", 0, 1, 2, 3, 4, 5, 6, 7, 8].map((v) => `<option ${v === 4 ? "selected" : ""}>${v}</option>`).join("")}</select></div>
<div class="kalk-wynik" id="ip-wynik"></div></section>

<section class="sekcja"><h2>Przekrój przewodu ochronnego PE</h2>
<div class="kalk"><div><label>Przekrój fazowego S<sub>L</sub> [mm²]</label><select id="pe-sl">${[1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95, 120].map((v) => `<option ${v === 25 ? "selected" : ""}>${v}</option>`).join("")}</select></div></div>
<div class="kalk-wynik" id="pe-wynik"></div></section>

<section class="sekcja"><h2>Strefa pracy — minimalne odstępy</h2>
<div class="kalk"><div><label>Napięcie znamionowe</label><select id="st-u">${ODSTEPY.map((o, i) => `<option value="${i}">${o[0]}</option>`).join("")}</select></div></div>
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
  }
  const zdop = Ia ? U0 / Ia : 0;
  const ok = Zs > 0 && Zs <= zdop;
  if (Ia) {
  w.className = "kalk-wynik " + (Zs > 0 ? (ok ? "ok" : "zle") : "");
  w.innerHTML = `I<sub>a</sub> = ${typ === "gF" ? "z tabeli wkładki" : `${mn} × ${In} A`} = <b>${Ia} A</b> → Z<sub>s dop</sub> = ${U0} / ${Ia} = <b>${zdop.toFixed(2).replace(".", ",")} Ω</b><br>
    Zmierzono ${String(Zs).replace(".", ",")} Ω → ochrona <b>${ok ? "SKUTECZNA ✓" : "NIESKUTECZNA ✗"}</b>${typ === "gF" && In < 20 ? "" : ""}`;
  }
  const a = $("#ip1").value, b = $("#ip2").value;
  $("#ip-wynik").innerHTML = `<b>IP${a}${b}</b>: ${IP1[a]}; ${IP2[b]}.`;
  const sl = Number($("#pe-sl").value);
  const spe = sl <= 16 ? sl : sl <= 35 ? 16 : sl / 2;
  $("#pe-wynik").innerHTML = `S<sub>PE</sub> = <b>${String(spe).replace(".", ",")} mm²</b> (${sl <= 16 ? "S_L ≤ 16 → tyle samo" : sl <= 35 ? "16 < S_L ≤ 35 → 16" : "S_L > 35 → połowa"})`;
  const o = ODSTEPY[Number($("#st-u").value)];
  $("#st-wynik").innerHTML = `prace pod napięciem: <b>${typeof o[1] === "number" ? o[1] + " mm" : o[1]}</b> · zewnętrzna granica prac w pobliżu napięcia: <b>${o[2]} mm</b>`;
}

/* ---------------------------------------------------------------- pomocnicze */
function tasuj(a) {
  const b = [...a];
  for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; }
  return b;
}

/* ---------------------------------------------------------------- routing */
function trasa() {
  const [, a, b] = (location.hash || "#/").split("/");
  $("#boczne").classList.remove("otwarte");
  testStan = null;
  if (ustnyStan) { clearInterval(ustnyStan.licznik); ustnyStan = null; }
  if (a === "modul") { MAIN.innerHTML = widokModul(b); rysujMenu(b); }
  else if (a === "fiszki") { MAIN.innerHTML = widokFiszki(b); rysujMenu("fiszki"); pokazFiszke(); }
  else if (a === "test") { MAIN.innerHTML = widokTestStart(); rysujMenu("test"); }
  else if (a === "ustny") { MAIN.innerHTML = widokUstny(); rysujMenu("ustny"); pokazUstne(); }
  else if (a === "sciaga") { MAIN.innerHTML = widokSciaga(); rysujMenu("sciaga"); }
  else if (a === "narzedzia") { MAIN.innerHTML = widokNarzedzia(); rysujMenu("narzedzia"); liczNarzedzia(); }
  else { MAIN.innerHTML = widokStart(); rysujMenu("start"); }
  window.scrollTo({ top: 0 });
}

document.addEventListener("click", (e) => {
  const t = e.target.closest("[data-umiem],[data-filtr],[data-test],[data-odp],#dalej,#f-tak,#f-nie,#f-reset,#fiszka,#u-pokaz,#u-dalej,.menu-btn,.motyw");
  if (!t) return;
  if (t.dataset.umiem) {
    const k = t.dataset.umiem;
    if (umiem[k]) delete umiem[k]; else umiem[k] = true;
    PAM.zapisz("umiem", umiem);
    t.classList.toggle("zrobione", !!umiem[k]);
    t.textContent = umiem[k] ? "✓ Umiem" : "Oznacz: umiem";
    rysujMenu(location.hash.split("/")[2]);
  } else if (t.dataset.filtr !== undefined) {
    location.hash = t.dataset.filtr ? `#/fiszki/${t.dataset.filtr}` : "#/fiszki";
  } else if (t.dataset.test) {
    startTestu(t.dataset.test);
  } else if (t.dataset.odp !== undefined) {
    odpowiedz(Number(t.dataset.odp));
  } else if (t.id === "dalej") {
    testStan.poz++; pokazPytanie();
  } else if (t.id === "u-pokaz") {
    $("#u-o").classList.remove("ukryte"); clearInterval(ustnyStan.licznik);
  } else if (t.id === "u-dalej") {
    ustnyStan.poz++; pokazUstne();
  } else if (t.id === "fiszka") {
    t.classList.toggle("odwrocona");
  } else if (t.id === "f-tak" || t.id === "f-nie") {
    const f = fiszkiStan.talia[fiszkiStan.poz];
    if (!f) return;
    if (t.id === "f-tak") fiszkiUmiem[f.i] = true; else { delete fiszkiUmiem[f.i]; fiszkiStan.talia.push(f); }
    PAM.zapisz("fiszki", fiszkiUmiem);
    fiszkiStan.poz++; pokazFiszke();
  } else if (t.id === "f-reset") {
    for (const f of FISZKI.map((x, i) => ({ ...x, i }))) if (!fiszkiStan.filtr || f.m === fiszkiStan.filtr) delete fiszkiUmiem[f.i];
    PAM.zapisz("fiszki", fiszkiUmiem); trasa();
  } else if (t.classList.contains("menu-btn")) {
    $("#boczne").classList.toggle("otwarte");
  } else if (t.classList.contains("motyw")) {
    const ciemny = document.documentElement.dataset.theme
      ? document.documentElement.dataset.theme === "dark"
      : matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.dataset.theme = ciemny ? "light" : "dark";
    PAM.zapisz("motyw", document.documentElement.dataset.theme);
  }
});
document.addEventListener("input", (e) => { if (e.target.closest(".kalk, .ip-cyfry")) liczNarzedzia(); });
document.addEventListener("keydown", (e) => {
  if (location.hash.startsWith("#/fiszki") && fiszkiStan) {
    if (e.key === " ") { e.preventDefault(); $("#fiszka")?.classList.toggle("odwrocona"); }
    if (e.key === "ArrowRight") $("#f-tak")?.click();
    if (e.key === "ArrowLeft") $("#f-nie")?.click();
  }
  if (testStan && ["1", "2", "3", "4", "a", "b", "c", "d"].includes(e.key.toLowerCase())) {
    const i = "1234".includes(e.key) ? Number(e.key) - 1 : "abcd".indexOf(e.key.toLowerCase());
    const b = MAIN.querySelectorAll(".odp")[i];
    if (b && !b.disabled) b.click();
  }
  if (testStan && e.key === "Enter") $("#dalej")?.click();
});

const motyw = PAM.czytaj("motyw", null);
if (motyw) document.documentElement.dataset.theme = motyw;
window.addEventListener("hashchange", trasa);
trasa();
