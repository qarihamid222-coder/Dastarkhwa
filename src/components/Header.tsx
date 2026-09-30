import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { navLinks } from "../data/restaurant";
import { useCart } from "../context/CartContext";
import { Logo } from "./Logo";
import { ButtonLink } from "./Button";
import { IconClose, IconMenu } from "./Icons";

export function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { count } = useCart();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.classList.add("no-scroll");
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("no-scroll");
    };
  }, [open]);

  return (
    <header className="header">
      <div className="container header__bar">
        <Logo />
        <nav id="site-nav" className={`nav${open ? " nav--open" : ""}`} aria-label="Main navigation">
          <ul className="nav__list">
            {navLinks.map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} end={l.to === "/"} className="nav__link">
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="header__actions">
          <ButtonLink to="/order" className="header__order">
            Order<span className="header__now"> Now</span>
            {count > 0 && (
              <span className="cart-count" aria-label={`${count} ${count === 1 ? "item" : "items"} in your order`}>
                {count}
              </span>
            )}
          </ButtonLink>
          <button
            type="button"
            className="nav-toggle"
            aria-expanded={open}
            aria-controls="site-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </div>
    </header>
  );
}
