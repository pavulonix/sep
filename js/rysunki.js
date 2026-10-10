/* Schematy przerysowane z materiałów szkoleniowych jako SVG (bez obrazków z zewnątrz).
   Kolory biorą się z klas CSS (.s-*), więc działają w jasnym i ciemnym motywie. */
"use strict";

const RYS = {};

/* Zwoje uzwojenia transformatora (3 łuki) od punktu x,y w prawo. */
function zwoj(x, y, w = 36) {
  const s = w / 3;
  let d = `M${x} ${y}`;
  for (let i = 0; i < 3; i++) d += ` a${s / 2} ${s / 2} 0 0 1 ${s} 0`;
  return `<path d="${d}" class="s-lin" fill="none"/>`;
}
/* Symbol uziemienia z punktem zaczepienia (x, y). */
function ziemia(x, y, etyk = "") {
  return `<g class="s-lin"><line x1="${x}" y1="${y}" x2="${x}" y2="${y + 14}"/>
    <line x1="${x - 12}" y1="${y + 14}" x2="${x + 12}" y2="${y + 14}"/>
    <line x1="${x - 8}" y1="${y + 19}" x2="${x + 8}" y2="${y + 19}"/>
    <line x1="${x - 4}" y1="${y + 24}" x2="${x + 4}" y2="${y + 24}"/></g>
    ${etyk ? `<text x="${x + 16}" y="${y + 24}" class="s-txt">${etyk}</text>` : ""}`;
}
const kropka = (x, y) => `<circle cx="${x}" cy="${y}" r="3.2" class="s-pkt"/>`;

/* ---------------------------------------------------------------- układy sieci
   typ: TN-C, TN-S, TN-C-S, TT, IT. Rysunek: źródło (3 uzwojenia), przewody, odbiornik
   z obudową (część przewodząca dostępna) i jej połączeniem ochronnym. */
RYS.uklad = function (typ) {
  const W = 640, H = 330;
  const y = { L1: 50, L2: 72, L3: 94, N: 116, PE: 138 };
  const xe = W - 40;
  let s = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Schemat układu ${typ}">`;
  // uzwojenia
  for (const k of ["L1", "L2", "L3"]) s += zwoj(40, y[k]);
  s += `<line x1="40" y1="${y.L1}" x2="40" y2="${y.N}" class="s-lin"/>`; // punkt gwiazdowy (umownie)
  const linia = (k, x1, x2, kl) => `<line x1="${x1}" y1="${y[k]}" x2="${x2}" y2="${y[k]}" class="${kl}"/>`;
  s += linia("L1", 76, xe, "s-l1") + linia("L2", 76, xe, "s-l2") + linia("L3", 76, xe, "s-l3");
  const etyk = (k, t) => `<text x="${xe + 6}" y="${y[k] + 4}" class="s-txt b">${t}</text>`;
  s += etyk("L1", "L1") + etyk("L2", "L2") + etyk("L3", "L3");

  // odbiornik
  const ox = 400, oy = 200, ow = 150, oh = 54;
  // Podpis WEWNĄTRZ obudowy: pod nią rysujemy uziemienie R_A (TT, IT) i tam by się nakładał.
  s += `<rect x="${ox}" y="${oy}" width="${ow}" height="${oh}" rx="6" class="s-obud"/>
        <text x="${ox + 12}" y="${oy + oh - 10}" class="s-txt">odbiornik — obudowa</text>`;
  const zac = [ox + 22, ox + 50, ox + 78, ox + 106];
  ["L1", "L2", "L3"].forEach((k, i) => {
    s += `<line x1="${zac[i]}" y1="${y[k]}" x2="${zac[i]}" y2="${oy}" class="s-${k.toLowerCase()}"/>${kropka(zac[i], y[k])}`;
  });

  if (typ === "TN-C") {
    s += `<line x1="40" y1="${y.N}" x2="${xe}" y2="${y.N}" class="s-pen"/>` + etyk("N", "PEN");
    s += `<line x1="40" y1="${y.N}" x2="40" y2="230" class="s-pen"/>` + ziemia(40, 230, "R<tspan baseline-shift='sub'>B</tspan>");
    s += `<line x1="${zac[3]}" y1="${y.N}" x2="${zac[3]}" y2="${oy}" class="s-pen"/>${kropka(zac[3], y.N)}`;
    s += `<path d="M${zac[3]} ${oy + 12} h28" class="s-pen"/><text x="${zac[3] + 32}" y="${oy + 16}" class="s-txt">mostek N–PE</text>`;
    s += `<text x="120" y="${H - 14}" class="s-txt">Jeden przewód PEN pełni funkcję N i PE w całej sieci. Typowa sieć nN w Polsce.</text>`;
  } else if (typ === "TN-S") {
    s += `<line x1="40" y1="${y.N}" x2="${xe}" y2="${y.N}" class="s-n"/>` + etyk("N", "N");
    s += `<line x1="60" y1="${y.N}" x2="60" y2="${y.PE}" class="s-pe"/>${kropka(60, y.N)}`;
    s += `<line x1="60" y1="${y.PE}" x2="${xe}" y2="${y.PE}" class="s-pe"/>` + etyk("PE", "PE");
    s += `<line x1="40" y1="${y.N}" x2="40" y2="230" class="s-lin"/>` + ziemia(40, 230, "R<tspan baseline-shift='sub'>B</tspan>");
    s += `<line x1="${zac[3]}" y1="${y.N}" x2="${zac[3]}" y2="${oy}" class="s-n"/>${kropka(zac[3], y.N)}`;
    s += `<line x1="${ox + ow - 14}" y1="${y.PE}" x2="${ox + ow - 14}" y2="${oy}" class="s-pe"/>${kropka(ox + ow - 14, y.PE)}`;
    s += `<text x="120" y="${H - 14}" class="s-txt">Osobny przewód ochronny PE w całym układzie — od źródła do odbiornika.</text>`;
  } else if (typ === "TN-C-S") {
    const xz = 250; // złącze
    s += `<line x1="40" y1="${y.N}" x2="${xz}" y2="${y.N}" class="s-pen"/>`;
    s += `<text x="120" y="${y.N - 6}" class="s-txt b">PEN</text>`;
    s += `<line x1="${xz}" y1="${y.N}" x2="${xe}" y2="${y.N}" class="s-n"/>` + etyk("N", "N");
    s += `<line x1="${xz}" y1="${y.N}" x2="${xz}" y2="${y.PE}" class="s-pe"/>${kropka(xz, y.N)}`;
    s += `<line x1="${xz}" y1="${y.PE}" x2="${xe}" y2="${y.PE}" class="s-pe"/>` + etyk("PE", "PE");
    s += `<line x1="${xz}" y1="${y.L1 - 22}" x2="${xz}" y2="${y.PE + 60}" class="s-zl"/>
          <text x="${xz}" y="${y.L1 - 28}" text-anchor="middle" class="s-txt b">złącze — rozdział PEN</text>
          <text x="${xz - 60}" y="${y.PE + 30}" text-anchor="middle" class="s-txt">TN-C</text>
          <text x="${xz + 60}" y="${y.PE + 30}" text-anchor="middle" class="s-txt">TN-S</text>`;
    s += ziemia(xz, y.PE + 60 - 10, "R ≤ 30 Ω");
    s += `<line x1="40" y1="${y.N}" x2="40" y2="230" class="s-pen"/>` + ziemia(40, 230, "R<tspan baseline-shift='sub'>B</tspan>");
    s += `<line x1="${zac[3]}" y1="${y.N}" x2="${zac[3]}" y2="${oy}" class="s-n"/>${kropka(zac[3], y.N)}`;
    s += `<line x1="${ox + ow - 14}" y1="${y.PE}" x2="${ox + ow - 14}" y2="${oy}" class="s-pe"/>${kropka(ox + ow - 14, y.PE)}`;
    s += `<text x="120" y="${H - 14}" class="s-txt">Do złącza PEN, za złączem osobno N i PE — i już nigdy się nie łączą.</text>`;
  } else if (typ === "TT") {
    s += `<line x1="40" y1="${y.N}" x2="${xe}" y2="${y.N}" class="s-n"/>` + etyk("N", "N");
    s += `<line x1="40" y1="${y.N}" x2="40" y2="230" class="s-lin"/>` + ziemia(40, 230, "R<tspan baseline-shift='sub'>B</tspan> (sieć)");
    s += `<line x1="${zac[3]}" y1="${y.N}" x2="${zac[3]}" y2="${oy}" class="s-n"/>${kropka(zac[3], y.N)}`;
    s += `<path d="M${ox + ow} ${oy + 20} h40 v40" class="s-pe" fill="none"/>` + ziemia(ox + ow + 40, oy + 60, "R<tspan baseline-shift='sub'>A</tspan>");
    s += `<text x="120" y="${H - 14}" class="s-txt">Obudowy uziemione własnym uziomem R<tspan baseline-shift='sub'>A</tspan>, niezależnym od uziemienia sieci R<tspan baseline-shift='sub'>B</tspan>.</text>`;
  } else if (typ === "IT") {
    s += `<line x1="40" y1="${y.N}" x2="200" y2="${y.N}" class="s-n" stroke-dasharray="6 5"/>
          <text x="208" y="${y.N + 4}" class="s-txt">N (często nie wyprowadzony)</text>`;
    s += `<line x1="40" y1="${y.N}" x2="40" y2="170" class="s-lin"/>
          <rect x="31" y="170" width="18" height="40" class="s-obud"/><text x="56" y="194" class="s-txt b">Z</text>
          <line x1="40" y1="210" x2="40" y2="230" class="s-lin"/>` + ziemia(40, 230, "R<tspan baseline-shift='sub'>B</tspan>");
    s += `<path d="M${ox + ow} ${oy + 20} h40 v40" class="s-pe" fill="none"/>` + ziemia(ox + ow + 40, oy + 60, "R<tspan baseline-shift='sub'>A</tspan>");
    s += `<text x="120" y="${H - 14}" class="s-txt">Części czynne izolowane od ziemi albo połączone z nią przez impedancję Z.</text>`;
  }
  return s + "</svg>";
};

/* ---------------------------------------------------------------- sieć nN 230/400 V */
RYS.siecNN = function () {
  const y = [50, 100, 150, 200];
  let s = `<svg viewBox="0 0 640 250" role="img" aria-label="Napięcia w sieci nN">`;
  s += `<circle cx="70" cy="125" r="34" class="s-lin" fill="none"/><circle cx="110" cy="125" r="34" class="s-lin" fill="none"/>
        <text x="40" y="180" class="s-txt b">SN</text><text x="124" y="180" class="s-txt b">nN</text>`;
  const kl = ["s-l1", "s-l2", "s-l3", "s-pen"], et = ["L1", "L2", "L3", "PEN / N"];
  y.forEach((yy, i) => {
    s += `<path d="M144 125 L170 ${yy} H540" class="${kl[i]}" fill="none"/><text x="548" y="${yy + 5}" class="s-txt b">${et[i]}</text>`;
  });
  s += ziemia(170, 225).replace(/y1="225"/, 'y1="225"');
  s += `<line x1="170" y1="200" x2="170" y2="225" class="s-pen"/>`;
  const strz = (x, y1, y2, t, kl2 = "") =>
    `<line x1="${x}" y1="${y1 + 4}" x2="${x}" y2="${y2 - 4}" class="s-str ${kl2}" marker-start="url(#gr)" marker-end="url(#gr)"/>
     <text x="${x + 6}" y="${(y1 + y2) / 2 + 5}" class="s-txt b ${kl2}">${t}</text>`;
  s += `<defs><marker id="gr" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" class="s-grot"/></marker></defs>`;
  s += strz(250, y[0], y[1], "400 V", "s-akc") + strz(250, y[1], y[2], "400 V", "s-akc") + strz(340, y[0], y[2], "400 V", "s-akc");
  s += strz(420, y[2], y[3], "230 V", "s-nieb") + strz(480, y[0], y[3], "230 V", "s-nieb");
  return s + `</svg>`;
};

/* ---------------------------------------------------------------- wyłącznik RCD — zasada */
RYS.rcd = function (awaria) {
  let s = `<svg viewBox="0 0 320 300" style="max-width:360px" role="img" aria-label="Zasada działania RCD ${awaria ? "przy uszkodzeniu" : "w stanie normalnym"}">`;
  s += `<defs><marker id="g${awaria ? 1 : 0}" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10 z" class="s-grot"/></marker></defs>`;
  s += `<rect x="70" y="40" width="160" height="110" rx="10" class="s-ramka"/><text x="240" y="60" class="s-txt b">RCD</text>`;
  s += `<line x1="120" y1="10" x2="120" y2="210" class="s-l1"/><line x1="180" y1="10" x2="180" y2="210" class="s-n"/>
        <text x="112" y="10" class="s-txt b" text-anchor="end">L</text><text x="188" y="10" class="s-txt b">N</text>`;
  s += `<ellipse cx="150" cy="100" rx="56" ry="16" class="s-rdzen"/><text x="150" y="134" text-anchor="middle" class="s-txt">przekładnik sumujący</text>`;
  s += `<rect x="95" y="210" width="110" height="46" rx="6" class="s-obud"/><text x="150" y="238" text-anchor="middle" class="s-txt">odbiornik</text>`;
  s += `<text x="100" y="185" text-anchor="end" class="s-txt b s-nieb">I₁ ↓</text><text x="200" y="185" class="s-txt b s-nieb">↑ I₂</text>`;
  if (!awaria) {
    s += `<text x="160" y="285" text-anchor="middle" class="s-txt b s-ziel">I₁ = I₂ → suma = 0 → nie wyłącza</text>`;
  } else {
    s += `<path d="M205 240 h30 l20 30" class="s-blad" fill="none"/>
          <circle cx="270" cy="200" r="9" class="s-lin" fill="none"/><line x1="270" y1="209" x2="270" y2="240" class="s-lin"/>
          <line x1="270" y1="240" x2="258" y2="268" class="s-lin"/><line x1="270" y1="240" x2="282" y2="268" class="s-lin"/>
          <line x1="270" y1="218" x2="250" y2="236" class="s-lin"/>
          <text x="292" y="232" class="s-txt b s-czer">I<tspan baseline-shift="sub">Δ</tspan></text>
          <text x="150" y="70" text-anchor="middle" class="s-txt b s-czer">I₁ ≠ I₂</text>
          <text x="160" y="290" text-anchor="middle" class="s-txt b s-czer">różnica → wyzwala (≤ I<tspan baseline-shift="sub">Δn</tspan>)</text>`;
  }
  return s + `</svg>`;
};

/* ---------------------------------------------------------------- łazienka — przekrój */
RYS.lazienka = function () {
  let s = `<svg viewBox="0 0 640 300" role="img" aria-label="Strefy w łazience">`;
  const st = (x, w, kl, t, ip) => `<rect x="${x}" y="40" width="${w}" height="200" class="${kl}"/>
     <text x="${x + w / 2}" y="70" text-anchor="middle" class="s-txt b">strefa ${t}</text>
     <text x="${x + w / 2}" y="90" text-anchor="middle" class="s-txt">${ip}</text>`;
  s += st(40, 160, "s-str1", "1", "min. IPX5") + st(200, 70, "s-str2", "2", "min. IPX4") + st(270, 240, "s-str3", "3", "min. IPX4");
  s += `<rect x="40" y="190" width="160" height="50" class="s-str0"/><text x="120" y="212" text-anchor="middle" class="s-txt b">strefa 0</text><text x="120" y="230" text-anchor="middle" class="s-txt">IPX7, tylko ≤ 12 V</text>`;
  s += `<path d="M40 190 h160 v50 h-160 z" class="s-lin" fill="none"/><text x="120" y="180" text-anchor="middle" class="s-txt">wanna / brodzik</text>`;
  s += `<line x1="20" y1="240" x2="620" y2="240" class="s-lin"/>`;
  const wym = (x1, x2, t) => `<line x1="${x1}" y1="262" x2="${x2}" y2="262" class="s-str" marker-start="url(#gl)" marker-end="url(#gl)"/><text x="${(x1 + x2) / 2}" y="282" text-anchor="middle" class="s-txt b">${t}</text>`;
  s += `<defs><marker id="gl" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" class="s-grot"/></marker></defs>`;
  s += wym(200, 270, "0,60 m") + wym(270, 510, "2,40 m");
  s += `<line x1="600" y1="40" x2="600" y2="240" class="s-str" marker-start="url(#gl)" marker-end="url(#gl)"/><text x="594" y="140" text-anchor="end" class="s-txt b">2,25 m</text>`;
  return s + `</svg>`;
};

/* ---------------------------------------------------------------- pomiar uziemienia 3p */
RYS.uziemienie3p = function () {
  let s = `<svg viewBox="0 0 640 300" role="img" aria-label="Pomiar rezystancji uziemienia metodą trójprzewodową">`;
  s += `<defs><marker id="gu" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" class="s-grot"/></marker></defs>`;
  s += `<rect x="250" y="12" width="140" height="44" rx="8" class="s-ramka"/><text x="320" y="39" text-anchor="middle" class="s-txt b">miernik (RE3p)</text>`;
  s += `<rect x="0" y="120" width="640" height="80" class="s-grunt"/><line x1="0" y1="120" x2="640" y2="120" class="s-lin"/>`;
  const pret = (x, t, op, kot = "middle") => `<line x1="${x}" y1="100" x2="${x}" y2="${op}" class="s-pret"/><text x="${kot === "end" ? x + 12 : kot === "start" ? x - 12 : x}" y="${op + 18}" text-anchor="${kot}" class="s-txt b">${t}</text>`;
  s += pret(60, "E — badany uziom", 190, "start") + pret(370, "S — sonda napięciowa", 160) + pret(600, "H — sonda prądowa", 160, "end");
  s += `<path d="M60 100 V70 H260 V56" class="s-lin" fill="none"/><path d="M370 100 V70 H330 V56" class="s-lin" fill="none"/><path d="M600 100 V40 H390" class="s-lin" fill="none"/>`;
  s += `<line x1="60" y1="225" x2="370" y2="225" class="s-str" marker-start="url(#gu)" marker-end="url(#gu)"/><text x="215" y="244" text-anchor="middle" class="s-txt b">≥ 20 m (ok. 62% odległości E–H)</text>`;
  s += `<line x1="60" y1="262" x2="600" y2="262" class="s-str" marker-start="url(#gu)" marker-end="url(#gu)"/><text x="330" y="282" text-anchor="middle" class="s-txt b">≥ 40 m (E–H)</text>`;
  s += `<rect x="340" y="128" width="96" height="20" rx="4" class="s-strefa0"/><text x="388" y="142" text-anchor="middle" class="s-txt">52%–72%</text>`;
  return s + `</svg>`;
};

/* ---------------------------------------------------------------- gniazdo wtykowe */
RYS.gniazdo = function () {
  let s = `<svg viewBox="0 0 640 260" role="img" aria-label="Podłączenie gniazda wtykowego i łącznika">`;
  s += `<rect x="40" y="30" width="200" height="200" rx="24" class="s-obud"/><circle cx="140" cy="130" r="70" class="s-ramka"/>`;
  s += `<circle cx="104" cy="140" r="11" class="s-l1f"/><circle cx="176" cy="140" r="11" class="s-nf"/>`;
  s += `<rect x="132" y="70" width="16" height="34" rx="4" class="s-pef"/>`;
  s += `<text x="104" y="180" text-anchor="middle" class="s-txt b">L</text><text x="176" y="180" text-anchor="middle" class="s-txt b">N</text>
        <text x="140" y="62" text-anchor="middle" class="s-txt b">PE (bolec)</text>`;
  s += `<text x="140" y="250" text-anchor="middle" class="s-txt">widok od przodu: faza zawsze po LEWEJ</text>`;
  // łącznik
  s += `<line x1="300" y1="80" x2="400" y2="80" class="s-l1"/><line x1="400" y1="80" x2="440" y2="62" class="s-l1"/>
        <line x1="450" y1="80" x2="540" y2="80" class="s-l1"/><circle cx="560" cy="100" r="22" class="s-ramka"/>
        <line x1="300" y1="160" x2="560" y2="160" class="s-n"/><line x1="560" y1="122" x2="560" y2="160" class="s-n"/>
        <text x="290" y="85" text-anchor="end" class="s-txt b">L</text><text x="290" y="165" text-anchor="end" class="s-txt b">N</text>
        <text x="425" y="50" text-anchor="middle" class="s-txt b">łącznik</text><text x="560" y="58" text-anchor="middle" class="s-txt b">żarówka</text>
        <text x="430" y="200" text-anchor="middle" class="s-txt">Łącznik zawsze przerywa przewód FAZOWY L.</text>
        <text x="430" y="220" text-anchor="middle" class="s-txt">N idzie wprost do odbiornika (na gwint oprawki).</text>`;
  return s + `</svg>`;
};

/* ---------------------------------------------------------------- charakterystyki MCB */
RYS.mcb = function () {
  const x = (k) => 60 + Math.log10(k) / Math.log10(30) * 540;
  let s = `<svg viewBox="0 0 640 230" role="img" aria-label="Progi zadziałania wyłączników A, B, C, D">`;
  [1, 2, 3, 5, 10, 20, 30].forEach((k) => {
    s += `<line x1="${x(k)}" y1="20" x2="${x(k)}" y2="190" class="s-siatka"/><text x="${x(k)}" y="208" text-anchor="middle" class="s-txt">${k}·In</text>`;
  });
  const pas = (y, od, do_, t, kl) =>
    `<rect x="${x(od)}" y="${y}" width="${x(do_) - x(od)}" height="26" rx="6" class="${kl}"/>
     <text x="${x(od) - 8}" y="${y + 18}" text-anchor="end" class="s-txt b">${t}</text>
     <text x="${(x(od) + x(do_)) / 2}" y="${y + 18}" text-anchor="middle" class="s-txt b">${od}–${do_} In</text>`;
  s += pas(28, 2, 3, "A", "s-pasA") + pas(68, 3, 5, "B", "s-pasB") + pas(108, 5, 10, "C", "s-pasC") + pas(148, 10, 20, "D", "s-pasD");
  s += `<text x="320" y="226" text-anchor="middle" class="s-txt">lewa krawędź = próg niezadziałania, prawa = próg pewnego zadziałania (wyzwalacz zwarciowy)</text>`;
  return s + `</svg>`;
};

/* ---------------------------------------------------------------- reguła dziewiątek */
RYS.dziewiatki = function () {
  let s = `<svg viewBox="0 0 320 340" role="img" aria-label="Reguła dziewiątek" style="max-width:300px">`;
  s += `<circle cx="160" cy="40" r="26" class="s-cialo"/><text x="160" y="45" text-anchor="middle" class="s-txt b">9%</text>`;
  s += `<rect x="118" y="72" width="84" height="120" rx="14" class="s-cialo"/>
        <text x="160" y="118" text-anchor="middle" class="s-txt b">przód 18%</text><text x="160" y="140" text-anchor="middle" class="s-txt b">tył 18%</text>`;
  s += `<rect x="80" y="76" width="30" height="120" rx="12" class="s-cialo"/><text x="95" y="140" text-anchor="middle" class="s-txt b" transform="rotate(-90 95 140)">ręka 9%</text>`;
  s += `<rect x="210" y="76" width="30" height="120" rx="12" class="s-cialo"/><text x="225" y="140" text-anchor="middle" class="s-txt b" transform="rotate(90 225 140)">ręka 9%</text>`;
  s += `<rect x="120" y="196" width="36" height="130" rx="12" class="s-cialo"/><rect x="164" y="196" width="36" height="130" rx="12" class="s-cialo"/>
        <text x="138" y="265" text-anchor="middle" class="s-txt b">18%</text><text x="182" y="265" text-anchor="middle" class="s-txt b">18%</text>
        <circle cx="160" cy="200" r="11" class="s-cialo2"/><text x="160" y="204" text-anchor="middle" class="s-txt b">1%</text>`;
  return s + `</svg>`;
};

/* ---------------------------------------------------------------- łańcuch ratowniczy */
RYS.lancuch = function () {
  const ogniwa = [["Natychmiastowe", "działanie", "s-r1"], ["Wezwanie", "pomocy", "s-r2"], ["Pierwsza", "pomoc", "s-r3"], ["Ratownictwo", "medyczne", "s-r4"], ["Szpital", "", "s-r5"]];
  let s = `<svg viewBox="0 0 640 170" role="img" aria-label="Łańcuch ratowniczy">`;
  ogniwa.forEach(([a, b, kl], i) => {
    const cx = 70 + i * 125;
    s += `<ellipse cx="${cx}" cy="80" rx="62" ry="44" class="${kl}" fill="none" stroke-width="12"/>
          <text x="${cx}" y="${b ? 76 : 85}" text-anchor="middle" class="s-txt b">${a}</text>${b ? `<text x="${cx}" y="94" text-anchor="middle" class="s-txt b">${b}</text>` : ""}`;
  });
  s += `<path d="M8 150 H372" class="s-akcl"/><text x="190" y="166" text-anchor="middle" class="s-txt b">ratownik pierwszego kontaktu — ogniwa 1–3</text>`;
  return s + `</svg>`;
};

/* ---------------------------------------------------------------- symbole klas ochronności */
RYS.klasa = function (k) {
  if (k === "I") return `<svg viewBox="0 0 80 80" width="72" height="72" aria-label="Klasa I"><circle cx="40" cy="40" r="34" class="s-lin" fill="none" stroke-width="4"/><g class="s-lin" stroke-width="4"><line x1="40" y1="16" x2="40" y2="44"/><line x1="22" y1="44" x2="58" y2="44"/><line x1="28" y1="53" x2="52" y2="53"/><line x1="34" y1="62" x2="46" y2="62"/></g></svg>`;
  if (k === "II") return `<svg viewBox="0 0 80 80" width="72" height="72" aria-label="Klasa II"><rect x="8" y="8" width="64" height="64" class="s-lin" fill="none" stroke-width="4"/><rect x="22" y="22" width="36" height="36" class="s-lin" fill="none" stroke-width="4"/></svg>`;
  return `<svg viewBox="0 0 80 80" width="72" height="72" aria-label="Klasa III"><path d="M40 4 L76 40 L40 76 L4 40 Z" class="s-lin" fill="none" stroke-width="4"/><g class="s-lin" stroke-width="5"><line x1="30" y1="28" x2="30" y2="52"/><line x1="40" y1="28" x2="40" y2="52"/><line x1="50" y1="28" x2="50" y2="52"/></g></svg>`;
};

/* ---------------------------------------------------------------- pomiar izolacji */
RYS.izolacja = function () {
  const zyly = [["L1", "s-l1"], ["L2", "s-l2"], ["L3", "s-l3"], ["N", "s-n"], ["PE", "s-pe"]];
  let s = `<svg viewBox="0 0 640 230" role="img" aria-label="Pomiar rezystancji izolacji">`;
  zyly.forEach(([t, kl], i) => {
    const y = 30 + i * 36;
    s += `<line x1="40" y1="${y}" x2="230" y2="${y}" class="${kl}" stroke-width="10"/><text x="244" y="${y + 5}" class="s-txt b">${t}</text>`;
  });
  s += `<circle cx="420" cy="110" r="44" class="s-ramka"/><text x="420" y="118" text-anchor="middle" class="s-mo">MΩ</text>`;
  s += `<path d="M268 30 H310 M268 66 H310 M268 102 H310 M268 138 H310 M310 30 V138 M310 84 H376" class="s-lin" fill="none"/>`;
  s += `<path d="M268 174 H340 V200 H420 V154" class="s-pe" fill="none"/>`;
  s += `<text x="520" y="70" class="s-txt b">L1+L2+L3+N</text><text x="520" y="90" class="s-txt">zwarte razem</text><text x="520" y="150" class="s-txt b">↔ PE</text><text x="520" y="170" class="s-txt">przez 60 s</text>`;
  return s + `</svg>`;
};

/* ---------------------------------------------------------------- strefy pracy */
RYS.strefy = function () {
  let s = `<svg viewBox="0 0 640 220" role="img" aria-label="Strefy pracy przy urządzeniach pod napięciem">`;
  s += `<rect x="20" y="20" width="600" height="180" rx="90" class="s-str3"/><rect x="150" y="55" width="340" height="110" rx="55" class="s-str1"/>`;
  s += `<rect x="290" y="95" width="60" height="30" rx="6" class="s-czesc"/><text x="320" y="114" text-anchor="middle" class="s-txt b">U</text>`;
  s += `<text x="320" y="80" text-anchor="middle" class="s-txt b">strefa prac pod napięciem</text>`;
  s += `<text x="320" y="44" text-anchor="middle" class="s-txt b">strefa prac w pobliżu napięcia</text>`;
  s += `<text x="320" y="190" text-anchor="middle" class="s-txt">poza zewnętrzną granicą — praca „z dala od napięcia”</text>`;
  return s + `</svg>`;
};

/* ---------------------------------------------------------------- praca na polecenie pisemne
   Kto komu przekazuje pracę: polecenie → przygotowanie strefy → dopuszczenie → praca → zakończenie (§ 30 rozp. 2019). */
RYS.przebieg = function () {
  const kroki = [
    [["Polecenio-", "dawca"], "D", "wydaje polecenie"],
    [["Koordynujący"], "D", "zezwala"],
    [["Dopuszczający"], "E", "dopuszcza"],
    [["Kierujący", "zespołem"], "E", "przejmuje strefę"],
    [["Zespół"], "", "≥ 2 osoby, praca"],
  ];
  const w = 118, gap = 12, x0 = 2;
  let s = `<svg viewBox="0 0 640 200" role="img" aria-label="Przebieg pracy na polecenie pisemne">
    <defs><marker id="grot-p" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10z" class="s-grot"/></marker></defs>`;
  kroki.forEach(([tyt, sw, opis], i) => {
    const x = x0 + i * (w + gap), sx = x + w / 2;
    s += `<rect x="${x}" y="38" width="${w}" height="92" rx="10" class="${sw === "D" ? "s-ramka" : "s-obud"}"/>`;
    tyt.forEach((t, j) => { s += `<text x="${sx}" y="${60 + j * 16}" text-anchor="middle" class="s-txt b">${t}</text>`; });
    const y = 60 + tyt.length * 16 + 4;
    if (sw) s += `<text x="${sx}" y="${y}" text-anchor="middle" class="s-txt">świadectwo ${sw}</text>`;
    s += `<text x="${sx}" y="${y + (sw ? 18 : 0)}" text-anchor="middle" class="s-txt">${opis}</text>`;
    if (i < kroki.length - 1) s += `<line x1="${x + w + 1}" y1="84" x2="${x + w + gap - 1}" y2="84" class="s-str" marker-end="url(#grot-p)"/>`;
  });
  const xa = x0 + 2 * (w + gap) + 8, xb = x0 + 3 * (w + gap) + w - 8, xs = (xa + xb) / 2;
  const xl = x0 + w / 2 + (w + gap) / 2;
  s += `<text x="320" y="22" text-anchor="middle" class="s-txt b">polecenie → przygotowanie strefy → dopuszczenie → praca → zakończenie</text>
    <path d="M${xa} 146 H${xb}" class="s-akcl"/>
    <text x="${xs}" y="166" text-anchor="middle" class="s-txt b">tych dwóch funkcji nie łączy się</text>
    <text x="${xs}" y="184" text-anchor="middle" class="s-txt">(wyjątek: prace pod napięciem)</text>
    <text x="${xl}" y="166" text-anchor="middle" class="s-txt">jedna osoba —</text>
    <text x="${xl}" y="184" text-anchor="middle" class="s-txt">najwyżej 2 funkcje</text>`;
  return `<figure class="rys">${s}</svg><figcaption>Ramki pogrubione — funkcje wymagające świadectwa D.</figcaption></figure>`;
};
