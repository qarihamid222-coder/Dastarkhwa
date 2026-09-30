import { Link } from "react-router-dom";
import { isConfigured, navLinks, restaurant } from "../data/restaurant";
import { useI18n } from "../i18n/LanguageContext";
import { Logo } from "./Logo";
import { ContactDetails } from "./ContactDetails";
import { UrduFontPicker } from "./LanguageSwitcher";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div>
          <Logo light />
          <p className="footer__about">{t("hero.lead")}</p>
          <div className="footer__social">
            <h2 className="footer__heading">{t("footer.followUs")}</h2>
            <ul className="social">
              {restaurant.socialLinks.map((s) => (
                <li key={s.label}>
                  {isConfigured(s.url) ? (
                    <a href={s.url} target="_blank" rel="noopener noreferrer">
                      {s.label}
                    </a>
                  ) : (
                    <span className="placeholder">
                      {s.label} {t("footer.soon")}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <UrduFontPicker id="font-picker-footer" />
        </div>
        <nav aria-label={t("nav.footer")}>
          <h2 className="footer__heading">{t("footer.quickLinks")}</h2>
          <ul className="footer__links">
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to}>{t(l.key)}</Link>
              </li>
            ))}
            <li>
              <Link to="/order">{t("nav.order")}</Link>
            </li>
          </ul>
        </nav>
        <div>
          <h2 className="footer__heading">{t("footer.visit")}</h2>
          <ContactDetails />
        </div>
      </div>
      <div className="footer__bottom">
        <div className="container">
          <p>{t("footer.rights", { year: new Date().getFullYear() })}</p>
        </div>
      </div>
    </footer>
  );
}
