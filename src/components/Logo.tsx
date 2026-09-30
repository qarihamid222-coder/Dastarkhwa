import { Link } from "react-router-dom";

/** Text-based temporary logo. Replace this component (or its contents) with the final logo asset. */
export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className={`logo${light ? " logo--light" : ""}`} aria-label="Karachi Biryani Center — home">
      <svg className="logo__mark" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
        <circle cx="24" cy="24" r="23" fill="var(--gold)" />
        <path d="M9 27h30a15 15 0 0 1-30 0z" fill="var(--green-900)" />
        <path d="M13 27c0-7 5-12 11-12s11 5 11 12z" fill="var(--cream)" />
        <circle cx="24" cy="12" r="2.4" fill="var(--maroon)" />
      </svg>
      <span className="logo__text">
        <span className="logo__top">Karachi</span>
        <span className="logo__bottom">Biryani Center</span>
      </span>
    </Link>
  );
}
