import type { ArtVariant } from "../data/menu";

/**
 * Built-in vector food illustrations. Used as the default imagery so the site never
 * depends on third-party image URLs. Replace by setting `image` on a menu item.
 */
const GRAINS: [number, number, string][] = [
  [78, 92, "#f3d98b"], [96, 84, "#e8a83a"], [116, 80, "#fbefc7"], [136, 84, "#e9822f"],
  [154, 92, "#f3d98b"], [88, 104, "#fbefc7"], [108, 98, "#e9822f"], [128, 98, "#f3d98b"],
  [148, 106, "#e8a83a"], [98, 114, "#f3d98b"], [120, 112, "#fbefc7"], [140, 116, "#e9822f"],
  [108, 70, "#fbefc7"], [126, 68, "#e8a83a"], [118, 58, "#f3d98b"], [100, 124, "#e8a83a"],
];

function Steam() {
  return (
    <g fill="none" stroke="#ffffff" strokeOpacity=".55" strokeWidth="3" strokeLinecap="round">
      <path d="M96 40c-6-8 6-12 0-22" />
      <path d="M118 36c-6-8 6-12 0-22" />
      <path d="M140 40c-6-8 6-12 0-22" />
    </g>
  );
}

function BiryaniBowl({ x = 0, y = 0, s = 1 }: { x?: number; y?: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx="118" cy="162" rx="92" ry="10" fill="#000" opacity=".18" />
      <path d="M30 108h176c0 34-38 56-88 56s-88-22-88-56z" fill="#c98a2b" />
      <path d="M30 108h176c0 6-1 11-3 16H33c-2-5-3-10-3-16z" fill="#a86f1c" />
      <ellipse cx="118" cy="108" rx="88" ry="14" fill="#8b5a12" />
      <path d="M52 108c0-34 30-56 66-56s66 22 66 56z" fill="#f6dc94" />
      {GRAINS.map(([cx, cy, c], i) => (
        <ellipse key={i} cx={cx} cy={cy} rx="6" ry="2.6" fill={c} transform={`rotate(${(i * 37) % 90 - 45} ${cx} ${cy})`} />
      ))}
      <ellipse cx="96" cy="88" rx="17" ry="12" fill="#8a3b1c" />
      <ellipse cx="140" cy="92" rx="16" ry="11" fill="#7a2f17" />
      <ellipse cx="118" cy="76" rx="14" ry="10" fill="#a34a22" />
      <path d="M156 70c8-6 18-4 20 4-8 4-16 3-20-4z" fill="#2f7d4f" />
      <path d="M76 68c-8-6-18-4-20 4 8 4 16 3 20-4z" fill="#2f7d4f" />
      <Steam />
    </g>
  );
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
      <defs>
        <linearGradient id={`bg-${variant}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fbf1d8" />
          <stop offset="1" stopColor="#f0d9a8" />
        </linearGradient>
      </defs>
      {!bare && <rect width="236" height="176" fill={`url(#bg-${variant})`} />}
      {variant === "biryani" && <BiryaniBowl />}
      {variant === "deal" && (
        <>
          <BiryaniBowl x={-6} y={14} s={0.62} />
          <BiryaniBowl x={92} y={14} s={0.62} />
          <BiryaniBowl x={43} y={-6} s={0.72} />
        </>
      )}
      {variant === "side" && (
        <g>
          <ellipse cx="118" cy="150" rx="70" ry="9" fill="#000" opacity=".16" />
          <path d="M52 92h132c0 30-28 52-66 52s-66-22-66-52z" fill="#f7f3ea" stroke="#d9cdb2" strokeWidth="3" />
          <ellipse cx="118" cy="92" rx="66" ry="11" fill="#fffdf6" stroke="#d9cdb2" strokeWidth="3" />
          <ellipse cx="118" cy="90" rx="52" ry="7" fill="#f3ecd6" />
          <circle cx="104" cy="88" r="4" fill="#2f7d4f" />
          <circle cx="126" cy="90" r="3" fill="#b3402a" />
          <circle cx="140" cy="87" r="3" fill="#2f7d4f" />
        </g>
      )}
      {variant === "drink" && (
        <g>
          <ellipse cx="118" cy="152" rx="40" ry="7" fill="#000" opacity=".16" />
          <path d="M84 50h68l-8 96c0 4-4 7-9 7h-34c-5 0-9-3-9-7z" fill="#ffffff" fillOpacity=".55" stroke="#9c7a3c" strokeWidth="3" />
          <path d="M89 82h58l-5 64c0 3-3 5-7 5h-34c-4 0-7-2-7-5z" fill="#b3402a" />
          <rect x="102" y="66" width="12" height="12" rx="2" fill="#ffffff" fillOpacity=".7" transform="rotate(-12 108 72)" />
          <rect x="128" y="62" width="12" height="12" rx="2" fill="#ffffff" fillOpacity=".7" transform="rotate(14 134 68)" />
          <path d="M126 20l16 62" stroke="#0f5132" strokeWidth="5" strokeLinecap="round" />
        </g>
      )}
      {variant === "extra" && (
        <g>
          <ellipse cx="118" cy="150" rx="70" ry="9" fill="#000" opacity=".16" />
          <ellipse cx="118" cy="104" rx="70" ry="42" fill="#e6b463" />
          <ellipse cx="118" cy="100" rx="60" ry="34" fill="#f1cf8a" />
          <circle cx="94" cy="92" r="4" fill="#c98a2b" />
          <circle cx="126" cy="108" r="4" fill="#c98a2b" />
          <circle cx="144" cy="88" r="3" fill="#c98a2b" />
          <circle cx="104" cy="116" r="3" fill="#c98a2b" />
        </g>
      )}
    </svg>
  );
}
