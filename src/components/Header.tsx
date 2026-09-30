import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { navLinks } from "../data/restaurant";
import { useCart } from "../context/CartContext";
import { useI18n } from "../i18n/LanguageContext";
import { Logo } from "./Logo";
import { ButtonLink } from "./Button";
import { LanguageToggle, UrduFontPicker } from "./LanguageSwitcher";
import { IconBag, IconClose, IconMenu } from "./Icons";

export function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { count } = useCart();
  const { t } = useI18n();

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
        <nav id="site-nav" className={`nav${open ? " nav--open" : ""}`} aria-label={t("nav.main")}>
          <ul className="nav__list">
            {navLinks.map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} end={l.to === "/"} className="nav__link">
                  {t(l.key)}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="nav__extra">
            <UrduFontPicker id="font-picker-nav" />
          </div>
        </nav>
        <div className="header__actions">
          <LanguageToggle />
          <ButtonLink to="/order" className="header__order" ariaLabel={count > 0 ? `${t("nav.order")} (${count})` : t("nav.order")}>
            <IconBag className="header__bag" />
            <span className="header__order-text">{t("nav.order")}</span>
            {count > 0 && (
              <span className="cart-count" aria-label={t("nav.orderItems", { n: count })}>
                {count}
              </span>
            )}
          </ButtonLink>
          <button
            type="button"
            className="nav-toggle"
            aria-expanded={open}
            aria-controls="site-nav"
            aria-label={open ? t("nav.close") : t("nav.open")}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </div>
    </header>
  );
}
