import { Link } from "react-router-dom";
import { isConfigured, navLinks, restaurant } from "../data/restaurant";
import { Logo } from "./Logo";
import { ContactDetails } from "./ContactDetails";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div>
          <Logo light />
          <p className="footer__about">{restaurant.shortDescription}</p>
          <div className="footer__social">
            <h2 className="footer__heading">Follow us</h2>
            <ul className="social">
              {restaurant.socialLinks.map((s) => (
                <li key={s.label}>
                  {isConfigured(s.url) ? (
                    <a href={s.url} target="_blank" rel="noopener noreferrer">
                      {s.label}
                    </a>
                  ) : (
                    <span className="placeholder" title="Add the account URL in src/data/restaurant.ts">
                      {s.label} (coming soon)
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <nav aria-label="Footer navigation">
          <h2 className="footer__heading">Quick links</h2>
          <ul className="footer__links">
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to}>{l.label}</Link>
              </li>
            ))}
            <li>
              <Link to="/order">Order Now</Link>
            </li>
          </ul>
        </nav>
        <div>
          <h2 className="footer__heading">Visit &amp; contact</h2>
          <ContactDetails compact />
        </div>
      </div>
      <div className="footer__bottom">
        <div className="container">
          <p>
            © {new Date().getFullYear()} {restaurant.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
