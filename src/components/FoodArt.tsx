import type { ArtVariant } from "../data/menu";

/**
 * Built-in, detailed vector food visuals (no external image URLs). They stand in for real
 * photographs until photos are added to `public/images/menu/` (see README). Everything is
 * generated deterministically, so the artwork is identical on every render.
 */

/* ---------- helpers ---------- */
function makeRng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}
const f = (n: number) => Math.round(n * 10) / 10;

/** Smooth closed blob (used for chicken pieces). */
function blob(cx: number, cy: number, rx: number, ry: number, rot: number, seed: number) {
  const r = makeRng(seed);
  const n = 9;
  const pts: [number, number][] = [];
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    const k = 0.86 + r() * 0.26;
    const x = Math.cos(a) * rx * k;
    const y = Math.sin(a) * ry * k;
    const c = Math.cos(rot), s = Math.sin(rot);
    pts.push([cx + x * c - y * s, cy + x * s + y * c]);
  }
  const mid = (a: [number, number], b: [number, number]): [number, number] => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  let d = `M${f(mid(pts[n - 1]!, pts[0]!)[0])} ${f(mid(pts[n - 1]!, pts[0]!)[1])}`;
  for (let i = 0; i < n; i++) {
    const p = pts[i]!;
    const m = mid(p, pts[(i + 1) % n]!);
    d += `Q${f(p[0])} ${f(p[1])} ${f(m[0])} ${f(m[1])}`;
  }
  return d + "Z";
}

/* ---------- biryani geometry (computed once) ---------- */
type GrainPalette = { white: string; cream: string; yellow: string; gold: string; orange: string; red: string; herb: string };

function makeGrains(seed: number, count: number, plain = false) {
  const r = makeRng(seed);
  const paths: Record<keyof GrainPalette, string> = { white: "", cream: "", yellow: "", gold: "", orange: "", red: "", herb: "" };
  let all = "";
  let made = 0;
  while (made < count) {
    const x = 34 + r() * 168;
    const y = 44 + r() * 82;
    const inDome = y <= 112 && ((x - 118) / 80) ** 2 + ((y - 112) / 66) ** 2 <= 1;
    const inFront = y > 112 && ((x - 118) / 82) ** 2 + ((y - 112) / 15) ** 2 <= 1;
    if (!inDome && !inFront) continue;
    made++;
    const a = r() * Math.PI;
    const len = 7 + r() * 4.5;
    const dx = Math.cos(a) * len;
    const dy = Math.sin(a) * len * 0.72;
    const seg = `M${f(x - dx / 2)} ${f(y - dy / 2)}l${f(dx)} ${f(dy)}`;
    all += seg;
    let v = Math.sin(x * 0.055 + y * 0.11 + 1.3) + 0.6 * Math.sin(x * 0.13 - y * 0.07) + (r() - 0.5) * 0.95 + ((112 - y) / 64) * 0.45;
    if (plain) v = -0.4 + (r() - 0.5) * 0.4;
    let key: keyof GrainPalette;
    if (!plain && r() < 0.035) key = "red";
    else if (!plain && r() < 0.03) key = "herb";
    else if (v > 1.05) key = "orange";
    else if (v > 0.55) key = "gold";
    else if (v > 0.1) key = "yellow";
    else if (v > -0.55) key = "white";
    else key = "cream";
    paths[key] += seg;
  }
  return { paths, all };
}

const BIRYANI = (() => {
  const { paths, all } = makeGrains(11, 980);
  const r = makeRng(77);

  // fried onion (birista) curls on top
  const onions: { d: string; c: string; w: number }[] = [];
  for (let i = 0; i < 46; i++) {
    const x = 50 + r() * 136;
    const y = 52 + r() * 50;
    if (((x - 118) / 74) ** 2 + ((y - 106) / 56) ** 2 > 1) continue;
    const l = 7 + r() * 9;
    const a = r() * Math.PI * 2;
    const ex = Math.cos(a) * l;
    const ey = Math.sin(a) * l * 0.6;
    const c = [`#c98a2b`, `#8b5a1c`, `#e0b04e`, `#a4661f`][Math.floor(r() * 4)]!;
    onions.push({ d: `M${f(x)} ${f(y)}q${f(ex * 0.4 + (r() - 0.5) * 6)} ${f(ey * 0.4 - 4 - r() * 3)} ${f(ex)} ${f(ey)}`, c, w: 1.2 + r() * 0.8 });
  }

  // chicken pieces: [cx, cy, rx, ry, rot, bone]
  const pieces: { d: string; hl: string; cx: number; cy: number; rx: number; ry: number; bone: boolean; rot: number; specks: [number, number][] }[] = [];
  const defs: [number, number, number, number, number, boolean][] = [
    [82, 84, 21, 9.5, -0.55, true],
    [128, 68, 22, 10, 0.25, false],
    [104, 97, 20, 9, -0.12, false],
    [154, 90, 20, 9.5, 0.6, true],
    [64, 102, 16, 8, 0.3, false],
    [142, 106, 15, 7.5, -0.35, false],
  ];
  defs.forEach(([cx, cy, rx, ry, rot, bone], i) => {
    const rr = makeRng(300 + i);
    const specks: [number, number][] = [];
    for (let k = 0; k < 9; k++) specks.push([cx + (rr() - 0.5) * rx * 1.5, cy + (rr() - 0.5) * ry * 1.4]);
    pieces.push({ d: blob(cx, cy, rx, ry, rot, 500 + i), hl: blob(cx - rx * 0.22, cy - ry * 0.3, rx * 0.55, ry * 0.4, rot, 700 + i), cx, cy, rx, ry, bone, rot, specks });
  });

  // rice over chicken edges so the meat looks mixed into the rice
  const over = (() => {
    const rr = makeRng(901);
    let d = "";
    for (const p of defs) {
      for (let k = 0; k < 11; k++) {
        const a = rr() * Math.PI * 2;
        const x = p[0] + Math.cos(a) * (p[2] * 0.95);
        const y = p[1] + Math.sin(a) * (p[3] * 0.9);
        const ga = rr() * Math.PI;
        const len = 7 + rr() * 3.5;
        d += `M${f(x - (Math.cos(ga) * len) / 2)} ${f(y - (Math.sin(ga) * len * 0.7) / 2)}l${f(Math.cos(ga) * len)} ${f(Math.sin(ga) * len * 0.7)}`;
      }
    }
    return d;
  })();

  // coriander / mint leaves
  const leaves: { x: number; y: number; a: number; s: number; c: string }[] = [];
  const lr = makeRng(1234);
  for (let i = 0; i < 16; i++) {
    const x = 56 + lr() * 124;
    const y = 54 + lr() * 52;
    if (((x - 118) / 72) ** 2 + ((y - 106) / 54) ** 2 > 1) continue;
    leaves.push({ x, y, a: lr() * 360, s: 0.42 + lr() * 0.4, c: [`#2f8a3e`, `#4fae55`, `#1f6a30`, `#6bbd5b`][Math.floor(lr() * 4)]! });
  }
  return { paths, all, onions, pieces, over, leaves };
})();

const RICE = (() => makeGrains(5, 760, true))();

/* ---------- reusable defs ---------- */
function Defs() {
  return (
    <defs>
      <linearGradient id="kbc-bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#fbf1d8" />
        <stop offset="1" stopColor="#ecd2a0" />
      </linearGradient>
      <linearGradient id="kbc-copper" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#7a4410" />
        <stop offset=".22" stopColor="#d99a48" />
        <stop offset=".45" stopColor="#f0c377" />
        <stop offset=".75" stopColor="#b9772a" />
        <stop offset="1" stopColor="#6d3a0c" />
      </linearGradient>
      <linearGradient id="kbc-rim" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#c68434" />
        <stop offset=".5" stopColor="#f6d68f" />
        <stop offset="1" stopColor="#b97a2c" />
      </linearGradient>
      <radialGradient id="kbc-chicken" cx=".35" cy=".3" r=".85">
        <stop offset="0" stopColor="#e07a36" />
        <stop offset=".55" stopColor="#b84a1a" />
        <stop offset="1" stopColor="#7a2a0d" />
      </radialGradient>
      <radialGradient id="kbc-light" cx=".38" cy=".25" r=".9">
        <stop offset="0" stopColor="#fff6dc" stopOpacity=".38" />
        <stop offset=".5" stopColor="#fff6dc" stopOpacity="0" />
        <stop offset="1" stopColor="#3a1800" stopOpacity=".42" />
      </radialGradient>
      <clipPath id="kbc-mound">
        <path d="M36 112C38 76 78 46 118 46C158 46 198 76 200 112A82 15 0 0 1 36 112Z" />
      </clipPath>
      <filter id="kbc-blur" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="1.6" />
      </filter>
      <linearGradient id="kbc-cola" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#1a0a03" />
        <stop offset=".35" stopColor="#4a1f0c" />
        <stop offset=".7" stopColor="#2b1206" />
        <stop offset="1" stopColor="#14070a" />
      </linearGradient>
      <linearGradient id="kbc-glass" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#ffffff" stopOpacity=".5" />
        <stop offset=".3" stopColor="#ffffff" stopOpacity=".12" />
        <stop offset=".8" stopColor="#ffffff" stopOpacity=".1" />
        <stop offset="1" stopColor="#ffffff" stopOpacity=".4" />
      </linearGradient>
      <linearGradient id="kbc-ice" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#ffffff" stopOpacity=".85" />
        <stop offset="1" stopColor="#cfe8f2" stopOpacity=".45" />
      </linearGradient>
      <linearGradient id="kbc-yogurt" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#fffdf6" />
        <stop offset="1" stopColor="#efe6cf" />
      </linearGradient>
    </defs>
  );
}

/* ---------- biryani in a copper serving dish ---------- */
function BiryaniDish() {
  const B = BIRYANI;
  return (
    <g>
      <ellipse cx="118" cy="160" rx="86" ry="8" fill="#2b1605" opacity=".28" />
      {/* side handles */}
      <path d="M30 118c-16 0-18 12-14 18 3 5 10 6 16 2" fill="none" stroke="#9a5a18" strokeWidth="4.5" strokeLinecap="round" />
      <path d="M206 118c16 0 18 12 14 18-3 5-10 6-16 2" fill="none" stroke="#9a5a18" strokeWidth="4.5" strokeLinecap="round" />
      {/* bowl body */}
      <path d="M30 112C34 140 58 160 84 160L152 160C178 160 202 140 206 112Z" fill="url(#kbc-copper)" />
      <path d="M44 128C70 138 166 138 192 128" fill="none" stroke="#6d3a0c" strokeWidth="1.4" opacity=".55" />
      <path d="M40 120C44 140 62 154 80 157" fill="none" stroke="#fff3cf" strokeWidth="2.4" opacity=".35" strokeLinecap="round" />
      {/* rim + dark inside */}
      <ellipse cx="118" cy="112" rx="88" ry="18" fill="url(#kbc-rim)" />
      <ellipse cx="118" cy="112" rx="82" ry="15" fill="#3a1c08" />
      {/* rice mound */}
      <g clipPath="url(#kbc-mound)">
        <rect x="30" y="40" width="180" height="96" fill="#c8973f" />
        <path d={B.all} transform="translate(.8 1.1)" stroke="#6b4210" strokeOpacity=".5" strokeWidth="1.9" strokeLinecap="round" fill="none" />
        <path d={B.paths.cream} stroke="#eadcae" strokeWidth="1.9" strokeLinecap="round" fill="none" />
        <path d={B.paths.white} stroke="#faf4e0" strokeWidth="1.9" strokeLinecap="round" fill="none" />
        <path d={B.paths.yellow} stroke="#f3cc4f" strokeWidth="1.9" strokeLinecap="round" fill="none" />
        <path d={B.paths.gold} stroke="#e3a42a" strokeWidth="1.9" strokeLinecap="round" fill="none" />
        <path d={B.paths.orange} stroke="#ea8a2c" strokeWidth="1.9" strokeLinecap="round" fill="none" />
        <path d={B.paths.red} stroke="#c7481d" strokeWidth="1.9" strokeLinecap="round" fill="none" />
        <path d={B.paths.herb} stroke="#3f9a48" strokeWidth="1.9" strokeLinecap="round" fill="none" />
        <rect x="30" y="40" width="180" height="96" fill="url(#kbc-light)" />
      </g>
      {/* chicken */}
      {B.pieces.map((p, i) => (
        <g key={i}>
          <path d={p.d} fill="#3b1406" transform="translate(1 1.6)" opacity=".5" />
          <path d={p.d} fill="url(#kbc-chicken)" stroke="#6b230a" strokeWidth=".8" />
          <path d={p.hl} fill="#f0a060" opacity=".45" />
          {p.specks.map(([x, y], k) => (
            <circle key={k} cx={f(x)} cy={f(y)} r={k % 3 === 0 ? 1.1 : 0.7} fill="#4a1a08" opacity=".55" />
          ))}
          {p.bone && (
            <g transform={`translate(${f(p.cx + Math.cos(p.rot) * p.rx * 0.95)} ${f(p.cy + Math.sin(p.rot) * p.rx * 0.95)})`}>
              <rect x="-2.4" y="-1.6" width="5" height="3.2" rx="1.6" fill="#f3e6c6" stroke="#b79c68" strokeWidth=".6" transform={`rotate(${f((p.rot * 180) / Math.PI)})`} />
            </g>
          )}
        </g>
      ))}
      {/* rice over chicken edges */}
      <path d={B.over} stroke="#faf0cf" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity=".95" />
      <path d={B.over} stroke="#ecaa3a" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity=".35" transform="translate(1.5 .5)" />
      {/* fried onions */}
      {B.onions.map((o, i) => (
        <path key={i} d={o.d} stroke={o.c} strokeWidth={f(o.w)} strokeLinecap="round" fill="none" />
      ))}
      {/* herbs */}
      {B.leaves.map((l, i) => (
        <path
          key={i}
          d="M0 0C3-4.5 9-3.5 10 0C9 3.5 3 4.5 0 0Z"
          fill={l.c}
          stroke="#185a27"
          strokeWidth=".4"
          transform={`translate(${f(l.x)} ${f(l.y)}) rotate(${f(l.a)}) scale(${f(l.s)})`}
        />
      ))}
      {/* green chilies */}
      <path d="M150 58q14 -4 26 8" fill="none" stroke="#2f7d33" strokeWidth="4.2" strokeLinecap="round" />
      <path d="M150 57.4q14 -4 26 7.6" fill="none" stroke="#7cc766" strokeWidth="1.2" strokeLinecap="round" opacity=".9" />
      <path d="M78 64q-16 -2 -26 10" fill="none" stroke="#2f7d33" strokeWidth="4" strokeLinecap="round" />
      <path d="M78 63.4q-16 -2 -26 9.6" fill="none" stroke="#7cc766" strokeWidth="1.1" strokeLinecap="round" opacity=".9" />
      {/* front lip of the dish */}
      <path d="M30 112A88 18 0 0 0 206 112" fill="none" stroke="url(#kbc-rim)" strokeWidth="4" strokeLinecap="round" />
      <path d="M34 114A86 17 0 0 0 202 114" fill="none" stroke="#fff3cf" strokeWidth="1" opacity=".5" />
    </g>
  );
}

function Steam() {
  return (
    <g fill="none" stroke="#ffffff" strokeLinecap="round" filter="url(#kbc-blur)">
      <path d="M92 44c-7-8 7-14 0-24s6-14 0-22" strokeWidth="5" opacity=".5" />
      <path d="M120 40c-7-9 7-15 0-25s6-13 0-21" strokeWidth="6" opacity=".55" />
      <path d="M148 44c-7-8 7-14 0-24s6-14 0-22" strokeWidth="5" opacity=".45" />
    </g>
  );
}

/* ---------- cold drinks ---------- */
function Bubbles({ seed, n, x0, x1, y0, y1 }: { seed: number; n: number; x0: number; x1: number; y0: number; y1: number }) {
  const r = makeRng(seed);
  return (
    <g fill="none" stroke="#ffe9c9" strokeOpacity=".65" strokeWidth=".6">
      {Array.from({ length: n }, (_, i) => (
        <circle key={i} cx={f(x0 + r() * (x1 - x0))} cy={f(y0 + r() * (y1 - y0))} r={f(0.7 + r() * 1.5)} />
      ))}
    </g>
  );
}
function Droplets({ seed, n, x0, x1, y0, y1 }: { seed: number; n: number; x0: number; x1: number; y0: number; y1: number }) {
  const r = makeRng(seed);
  return (
    <g>
      {Array.from({ length: n }, (_, i) => {
        const x = f(x0 + r() * (x1 - x0));
        const y = f(y0 + r() * (y1 - y0));
        const rr = f(0.8 + r() * 1.2);
        return (
          <g key={i}>
            <ellipse cx={x} cy={y} rx={rr} ry={f(rr * 1.35)} fill="#ffffff" fillOpacity=".3" stroke="#ffffff" strokeOpacity=".55" strokeWidth=".4" />
            <circle cx={f(x - rr * 0.3)} cy={f(y - rr * 0.5)} r={f(rr * 0.28)} fill="#ffffff" fillOpacity=".9" />
          </g>
        );
      })}
    </g>
  );
}

function ColaGlass({ x, y, water = false }: { x: number; y: number; water?: boolean }) {
  const liquid = water ? "#cfe6ee" : "url(#kbc-cola)";
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse cx="0" cy="88" rx="30" ry="5.5" fill="#2b1605" opacity=".28" />
      {/* liquid */}
      <path d="M-23 16L23 16L17.6 79Q17.4 83 13 83L-13 83Q-17.4 83 -17.6 79Z" fill={liquid} opacity={water ? 0.75 : 1} />
      {!water && <path d="M-23 16L23 16L22.3 24L-22.3 24Z" fill="#7a4a24" opacity=".9" />}
      {/* foam */}
      {!water && (
        <g fill="#e6c79a" opacity=".92">
          {[-19, -13, -7, -1, 5, 11, 17].map((cx, i) => (
            <circle key={i} cx={cx} cy={i % 2 ? 15 : 13.4} r={i % 2 ? 3.6 : 4.4} />
          ))}
        </g>
      )}
      <Bubbles seed={water ? 4 : 9} n={water ? 12 : 30} x0={-15} x1={15} y0={24} y1={78} />
      {/* ice cubes */}
      <g stroke="#ffffff" strokeOpacity=".85" strokeWidth=".9">
        <rect x="-18" y="6" width="17" height="15" rx="2.6" fill="url(#kbc-ice)" transform="rotate(-14 -10 14)" />
        <rect x="2" y="3" width="17" height="16" rx="2.6" fill="url(#kbc-ice)" transform="rotate(12 10 11)" />
        <rect x="-8" y="16" width="15" height="14" rx="2.4" fill="url(#kbc-ice)" transform="rotate(-6 0 23)" opacity=".9" />
      </g>
      <path d="M-15 9l6 -1M6 6l6 2" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" opacity=".9" />
      {/* glass walls */}
      <path d="M-25 0L25 0L19 83Q19 89 13 89L-13 89Q-19 89 -19 83Z" fill="url(#kbc-glass)" stroke="#ffffff" strokeOpacity=".7" strokeWidth="1.2" />
      <ellipse cx="0" cy="0" rx="25" ry="3.4" fill="none" stroke="#ffffff" strokeOpacity=".75" strokeWidth="1.3" />
      <path d="M-20 8L-15.5 80" stroke="#ffffff" strokeOpacity=".6" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M19 10L15 70" stroke="#ffffff" strokeOpacity=".35" strokeWidth="1.2" strokeLinecap="round" />
      <ellipse cx="0" cy="86" rx="13" ry="2.4" fill="#ffffff" opacity=".25" />
      <Droplets seed={water ? 12 : 21} n={13} x0={-17} x1={17} y0={22} y1={78} />
      {/* straw */}
      <g strokeLinecap="round">
        <path d="M9 40L22 -22" stroke="#c4252b" strokeWidth="3.4" />
        <path d="M9 40L22 -22" stroke="#ffffff" strokeWidth="3.4" strokeDasharray="4 5" opacity=".85" />
      </g>
    </g>
  );
}

function ColaBottle({ x, y, s = 1, tilt = 0 }: { x: number; y: number; s?: number; tilt?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${tilt}) scale(${s})`}>
      <ellipse cx="0" cy="117" rx="22" ry="4" fill="#2b1605" opacity=".3" />
      {/* cap */}
      <rect x="-7.5" y="0" width="15" height="7.5" rx="1.6" fill="#c0272d" />
      <path d="M-5 1.5v5M-2 1.5v5M1 1.5v5M4 1.5v5" stroke="#8d1a20" strokeWidth=".8" />
      {/* glass body */}
      <clipPath id={`kbc-bottle-${x}`}>
        <path d="M-6 7.5L-6 28C-6 40 -18 44 -18 62L-18 108Q-18 116 -10 116L10 116Q18 116 18 108L18 62C18 44 6 40 6 28L6 7.5Z" />
      </clipPath>
      <path d="M-6 7.5L-6 28C-6 40 -18 44 -18 62L-18 108Q-18 116 -10 116L10 116Q18 116 18 108L18 62C18 44 6 40 6 28L6 7.5Z" fill="#e8f2f2" fillOpacity=".3" />
      <g clipPath={`url(#kbc-bottle-${x})`}>
        <rect x="-20" y="18" width="40" height="100" fill="url(#kbc-cola)" />
        <ellipse cx="0" cy="18" rx="6" ry="1.4" fill="#8a5a30" />
        {/* label */}
        <rect x="-19" y="66" width="38" height="28" fill="#f6f0e0" />
        <rect x="-19" y="66" width="38" height="6" fill="#c0272d" />
        <rect x="-19" y="88" width="38" height="6" fill="#c0272d" />
        <path d="M0 73.5l1.7 3.6 3.9.5-2.9 2.7.8 3.9L0 82.3l-3.5 1.9.8-3.9-2.9-2.7 3.9-.5z" fill="#d9a441" />
        <path d="M-12 84.5h24" stroke="#2a1a10" strokeWidth="1.4" strokeLinecap="round" opacity=".75" />
        <path d="M-12 86.5h24" stroke="#2a1a10" strokeWidth=".7" strokeLinecap="round" opacity=".5" />
        <Bubbles seed={33} n={10} x0={-14} x1={14} y0={24} y1={62} />
      </g>
      <path d="M-14 50L-14 106" stroke="#ffffff" strokeOpacity=".5" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M-3.5 10L-3.5 26" stroke="#ffffff" strokeOpacity=".5" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M14 70L14 104" stroke="#ffffff" strokeOpacity=".25" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M-6 7.5L-6 28C-6 40 -18 44 -18 62L-18 108Q-18 116 -10 116L10 116Q18 116 18 108L18 62C18 44 6 40 6 28L6 7.5Z" fill="none" stroke="#ffffff" strokeOpacity=".45" strokeWidth=".9" />
      <Droplets seed={x + 5} n={11} x0={-15} x1={15} y0={22} y1={110} />
    </g>
  );
}

/* ---------- simple dishes: rice, raita, salad ---------- */
function PlainRice() {
  return (
    <g>
      <ellipse cx="118" cy="158" rx="76" ry="7" fill="#2b1605" opacity=".25" />
      <path d="M40 112C42 140 70 158 118 158C166 158 194 140 196 112Z" fill="#f4efe3" stroke="#d6cbb0" strokeWidth="2" />
      <path d="M50 124C74 134 162 134 186 124" fill="none" stroke="#c9b98f" strokeWidth="1.4" opacity=".7" />
      <ellipse cx="118" cy="112" rx="78" ry="15" fill="#fffdf6" stroke="#d6cbb0" strokeWidth="2" />
      <clipPath id="kbc-rice-clip">
        <path d="M46 112C48 78 84 52 118 52C152 52 188 78 190 112A72 12 0 0 1 46 112Z" />
      </clipPath>
      <g clipPath="url(#kbc-rice-clip)">
        <rect x="40" y="46" width="156" height="82" fill="#d8c79a" />
        <path d={RICE.all} transform="translate(.8 1)" stroke="#8a7440" strokeOpacity=".45" strokeWidth="1.9" strokeLinecap="round" fill="none" />
        <path d={RICE.paths.cream} stroke="#efe4c2" strokeWidth="1.9" strokeLinecap="round" fill="none" />
        <path d={RICE.paths.white} stroke="#fffaf0" strokeWidth="1.9" strokeLinecap="round" fill="none" />
        <rect x="40" y="46" width="156" height="82" fill="url(#kbc-light)" />
      </g>
      <path d="M40 112A78 15 0 0 0 196 112" fill="none" stroke="#fffdf6" strokeWidth="3" />
      <g fill="none" stroke="#ffffff" strokeLinecap="round" filter="url(#kbc-blur)" opacity=".75">
        <path d="M104 50c-6-7 6-12 0-20" strokeWidth="5" />
        <path d="M130 48c-6-7 6-12 0-20" strokeWidth="5" />
      </g>
    </g>
  );
}

function Raita() {
  const dots = makeRng(8);
  return (
    <g>
      <ellipse cx="118" cy="152" rx="74" ry="7" fill="#2b1605" opacity=".25" />
      <path d="M46 92C48 130 76 150 118 150C160 150 188 130 190 92Z" fill="#f2ead8" stroke="#d3c6a6" strokeWidth="2" />
      <path d="M58 112C84 122 152 122 178 112" fill="none" stroke="#c9b98f" strokeWidth="1.3" opacity=".6" />
      <ellipse cx="118" cy="92" rx="72" ry="16" fill="#fffdf6" stroke="#d3c6a6" strokeWidth="2" />
      <ellipse cx="118" cy="93" rx="64" ry="12.5" fill="url(#kbc-yogurt)" />
      <path d="M72 93c20 -6 40 4 60 -2s30 -4 40 0" fill="none" stroke="#e6dcc0" strokeWidth="1.2" opacity=".8" />
      <path d="M86 98c16 4 34 -2 52 1" fill="none" stroke="#e6dcc0" strokeWidth="1" opacity=".7" />
      {/* chili powder + cumin */}
      {Array.from({ length: 26 }, (_, i) => {
        const a = dots() * Math.PI * 2;
        const rr = Math.sqrt(dots()) * 0.85;
        return <circle key={i} cx={f(118 + Math.cos(a) * 58 * rr)} cy={f(93 + Math.sin(a) * 10 * rr)} r={f(0.6 + dots() * 0.7)} fill={i % 3 ? "#b3401c" : "#6b4a1e"} opacity=".85" />;
      })}
      {/* cucumber dice */}
      {[[92, 91], [110, 96], [130, 90], [146, 96], [120, 88]].map(([x, y], i) => (
        <rect key={i} x={x} y={y} width="5" height="3.4" rx=".8" fill="#bfe0a4" stroke="#7fae63" strokeWidth=".5" transform={`rotate(${i * 25} ${x} ${y})`} />
      ))}
      {/* mint */}
      <path d="M112 88c2-6 9-6 10 0c-2 5-8 6-10 0z" fill="#2f8a3e" stroke="#185a27" strokeWidth=".4" />
      <path d="M124 90c3-5 9-4 9 1c-3 4-8 4-9-1z" fill="#4fae55" stroke="#185a27" strokeWidth=".4" />
    </g>
  );
}

function Salad() {
  return (
    <g>
      <ellipse cx="118" cy="150" rx="86" ry="8" fill="#2b1605" opacity=".25" />
      <ellipse cx="118" cy="118" rx="88" ry="30" fill="#f8f4ea" stroke="#d6cbb0" strokeWidth="2" />
      <ellipse cx="118" cy="116" rx="68" ry="21" fill="#efe8d6" />
      {/* cucumber slices */}
      {[[84, 108], [104, 100], [128, 104], [150, 112], [96, 122]].map(([x, y], i) => (
        <g key={i}>
          <ellipse cx={x} cy={y} rx="14" ry="6.5" fill="#cfe8b0" stroke="#6fa455" strokeWidth="1.6" />
          <ellipse cx={x} cy={y} rx="9.5" ry="4" fill="#e6f3cf" />
          {[-4, 0, 4].map((dx) => (
            <ellipse key={dx} cx={x + dx} cy={y} rx="1" ry="1.5" fill="#a9cf86" />
          ))}
        </g>
      ))}
      {/* tomato wedges */}
      {[[118, 118], [140, 124], [72, 120], [166, 106]].map(([x, y], i) => (
        <g key={i} transform={`rotate(${i * 40 - 20} ${x} ${y})`}>
          <path d={`M${x - 12} ${y}Q${x} ${y - 13} ${x + 12} ${y}Q${x} ${y + 3} ${x - 12} ${y}Z`} fill="#d9402a" stroke="#a52a18" strokeWidth="1" />
          <path d={`M${x - 8} ${y - 0.5}Q${x} ${y - 8} ${x + 8} ${y - 0.5}`} fill="none" stroke="#f08a70" strokeWidth="1.4" />
        </g>
      ))}
      {/* onion rings */}
      {[[100, 112], [132, 112], [158, 120]].map(([x, y], i) => (
        <g key={i}>
          <ellipse cx={x} cy={y} rx="9" ry="4" fill="none" stroke="#c48ab0" strokeWidth="2.2" />
          <ellipse cx={x} cy={y} rx="5" ry="2" fill="none" stroke="#e8cfe0" strokeWidth="1.3" />
        </g>
      ))}
      {/* lemon wedge + green chili */}
      <path d="M170 98Q188 92 196 106Q180 112 170 98Z" fill="#f4d24a" stroke="#c9a722" strokeWidth="1.2" />
      <path d="M176 100Q186 98 190 105" fill="none" stroke="#fbeaa0" strokeWidth="1.2" />
      <path d="M58 100q20 -10 40 2" fill="none" stroke="#2f7d33" strokeWidth="3.6" strokeLinecap="round" />
      <path d="M58 99.4q20 -10 40 1.6" fill="none" stroke="#7cc766" strokeWidth="1" strokeLinecap="round" />
    </g>
  );
}

function Scene({ variant }: { variant: ArtVariant }) {
  switch (variant) {
    case "biryani":
      return (
        <>
          <BiryaniDish />
          <Steam />
        </>
      );
    case "deal":
      return (
        <>
          <g transform="translate(-2 46) scale(.5)">
            <BiryaniDish />
          </g>
          <g transform="translate(120 46) scale(.5)">
            <BiryaniDish />
          </g>
          <g transform="translate(42 6) scale(.68)">
            <BiryaniDish />
          </g>
        </>
      );
    case "rice":
      return <PlainRice />;
    case "raita":
      return <Raita />;
    case "salad":
      return <Salad />;
    case "drink":
      return (
        <>
          <ellipse cx="118" cy="158" rx="96" ry="9" fill="#2b1605" opacity=".18" />
          <ColaBottle x={52} y={34} s={1.08} tilt={-3} />
          <ColaBottle x={186} y={38} s={1.04} tilt={3} />
          <ColaGlass x={118} y={66} />
        </>
      );
    case "water":
      return (
        <>
          <ellipse cx="118" cy="158" rx="80" ry="8" fill="#2b1605" opacity=".18" />
          <g transform="translate(70 34)">
            <rect x="-7" y="0" width="14" height="8" rx="2" fill="#2b7fc1" />
            <path d="M-8 8L-8 26C-8 38 -18 42 -18 58L-18 112Q-18 120 -10 120L10 120Q18 120 18 112L18 58C18 42 8 38 8 26L8 8Z" fill="#dff1f7" fillOpacity=".7" stroke="#ffffff" strokeOpacity=".8" strokeWidth="1.2" />
            <path d="M-17 62H17V96H-17Z" fill="#2b7fc1" opacity=".9" />
            <path d="M-12 80h24" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity=".9" />
            <path d="M-13 30L-13 110" stroke="#ffffff" strokeOpacity=".6" strokeWidth="2.4" strokeLinecap="round" />
            <Droplets seed={41} n={9} x0={-14} x1={14} y0={24} y1={110} />
          </g>
          <ColaGlass x={158} y={66} water />
        </>
      );
  }
}

export function FoodArt({ variant, className, bare = false }: { variant: ArtVariant; className?: string; bare?: boolean }) {
  return (
    <svg
      className={className}
      viewBox="0 0 236 176"
      role="img"
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio={bare ? "xMidYMid meet" : "xMidYMid slice"}
    >
      <Defs />
      {!bare && <rect width="236" height="176" fill="url(#kbc-bg)" />}
      {!bare && <ellipse cx="118" cy="170" rx="150" ry="22" fill="#b98f55" opacity=".25" />}
      <Scene variant={variant} />
    </svg>
  );
}
