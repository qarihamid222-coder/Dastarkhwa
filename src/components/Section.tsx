import type { ReactNode } from "react";
import { useReveal } from "../hooks/useReveal";

interface Props {
  id?: string;
  eyebrow?: string;
  title?: string;
  intro?: string;
  tone?: "cream" | "white" | "dark";
  children: ReactNode;
  headingId?: string;
}

export function Section({ id, eyebrow, title, intro, tone = "cream", children, headingId }: Props) {
  const ref = useReveal<HTMLDivElement>();
  const hid = headingId ?? (id ? `${id}-title` : undefined);
  return (
    <section id={id} className={`section section--${tone}`} aria-labelledby={title ? hid : undefined}>
      <div className="container" ref={ref}>
        {(title || eyebrow) && (
          <header className="section__head">
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            {title && <h2 id={hid}>{title}</h2>}
            {intro && <p className="section__intro">{intro}</p>}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
