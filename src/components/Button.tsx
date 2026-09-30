import { Link } from "react-router-dom";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "light";

interface Common {
  variant?: Variant;
  size?: "md" | "lg";
  children: ReactNode;
  className?: string;
}

const cls = (v: Variant, size: string, extra?: string) =>
  ["btn", `btn--${v}`, size === "lg" ? "btn--lg" : "", extra ?? ""].filter(Boolean).join(" ");

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: Common & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cls(variant, size, className)} {...rest}>
      {children}
    </button>
  );
}

export function ButtonLink({
  to,
  variant = "primary",
  size = "md",
  className,
  children,
}: Common & { to: string }) {
  return (
    <Link to={to} className={cls(variant, size, className)}>
      {children}
    </Link>
  );
}
