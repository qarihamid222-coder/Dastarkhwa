import { Link } from "react-router-dom";
import { itemText, menuItems } from "../data/menu";
import { useI18n } from "../i18n/LanguageContext";
import { usePageMeta } from "../hooks/usePageMeta";
import { formatPrice } from "../lib/format";
import { ButtonLink } from "../components/Button";
import { ContactButtons } from "../components/ContactButtons";
import { ContactDetails } from "../components/ContactDetails";
import { HeroMedia } from "../components/HeroMedia";
import { IconCup, IconPin } from "../components/Icons";
import { MenuCard } from "../components/MenuCard";
import { OwnerSection } from "../components/OwnerSection";
import { Section } from "../components/Section";
import { WhyChooseUs } from "../components/WhyChooseUs";

export default function Home() {
  usePageMeta();
  const { lang, t } = useI18n();
  const featured = menuItems.filter((i) => i.featured).slice(0, 4);
  const combos = menuItems.filter((i) => i.drinkIncluded);

  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="container hero__grid">
          <div className="hero__copy">
            <p className="hero__place">
              <IconPin /> {t("brand.place")}
            </p>
            <h1 id="hero-title" className="hero__title">
              <span className="hero__line hero__line--1">{t("hero.title1")}</span>{" "}
              <span className="hero__line hero__line--2">{t("hero.title2")}</span>
            </h1>
            <p className="hero__tag">{t("hero.tag")}</p>
            <p className="hero__lead">{t("hero.lead")}</p>
            <p className="hero__combo">
              <IconCup /> {t("hero.combo")}
            </p>
            <div className="hero__cta">
              <ButtonLink to="/order" size="lg">
                {t("hero.order")}
              </ButtonLink>
              <ButtonLink to="/menu" variant="light" size="lg">
                {t("hero.menu")}
              </ButtonLink>
            </div>
          </div>
          <HeroMedia />
        </div>
      </section>

      <Section id="welcome" eyebrow={t("home.welcomeEyebrow")} title={t("home.welcomeTitle")} tone="white">
        <p className="lead-text">{t("home.welcomeText")}</p>
      </Section>

      <Section id="featured" eyebrow={t("home.featuredEyebrow")} title={t("home.featuredTitle")} intro={t("home.featuredIntro")}>
        <div className="grid-cards grid-cards--4">
          {featured.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
        <p className="center">
          <ButtonLink to="/menu" variant="secondary">
            {t("home.seeMenu")}
          </ButtonLink>
        </p>
      </Section>

      <Section id="combo" eyebrow={t("home.comboEyebrow")} title={t("home.comboTitle")} tone="dark">
        <div className="combo">
          <div className="combo__text">
            <p>{t("home.comboText")}</p>
            <ul className="combo__prices">
              {combos.map((i) => (
                <li key={i.id}>
                  <span>{itemText(i, lang).name}</span>
                  <strong>{formatPrice(i.price, t)}</strong>
                </li>
              ))}
            </ul>
            <p className="combo__included">
              <IconCup /> {t("menu.included")}
            </p>
            <ButtonLink to="/menu" className="btn--gold" size="lg">
              {t("home.comboCta")}
            </ButtonLink>
          </div>
        </div>
      </Section>

      <OwnerSection variant="home" />

      <Section id="why" eyebrow={t("home.whyEyebrow")} title={t("home.whyTitle")} tone="white">
        <WhyChooseUs />
      </Section>

      <Section id="about-teaser" eyebrow={t("home.aboutEyebrow")} title={t("about.heading")} tone="cream">
        <p className="lead-text">{t("about.p1")}</p>
        <p className="center">
          <Link className="text-link" to="/about">
            {t("home.readMore")}
          </Link>
        </p>
      </Section>

      <Section id="find-us" eyebrow={t("home.findEyebrow")} title={t("home.findTitle")} tone="white">
        <div className="split">
          <ContactDetails />
          <div className="cta-card">
            <h3>{t("home.ctaTitle")}</h3>
            <p>{t("home.ctaText")}</p>
            <ButtonLink to="/order" size="lg">
              {t("nav.order")}
            </ButtonLink>
            <ContactButtons className="contact-buttons--stack" />
            <p className="cta-card__link">
              <Link className="text-link" to="/location">
                {t("home.locationLink")}
              </Link>
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}

