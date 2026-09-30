import { Link } from "react-router-dom";
import { menuItems } from "../data/menu";
import { useI18n } from "../i18n/LanguageContext";
import { usePageMeta } from "../hooks/usePageMeta";
import { ButtonLink } from "../components/Button";
import { ContactButtons } from "../components/ContactButtons";
import { ContactDetails } from "../components/ContactDetails";
import { HeroMedia } from "../components/HeroMedia";
import { IconPin } from "../components/Icons";
import { MenuCard } from "../components/MenuCard";
import { Section } from "../components/Section";
import { WhyChooseUs } from "../components/WhyChooseUs";

export default function Home() {
  usePageMeta();
  const { t } = useI18n();
  const featured = menuItems.filter((i) => i.featured).slice(0, 6);

  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="container hero__grid">
          <div className="hero__copy">
            <div className="hero__identity">
              <p className="hero__brand">{t("brand.name")}</p>
              <p className="hero__place">
                <IconPin /> {t("brand.place")}
              </p>
            </div>
            <h1 id="hero-title">
              <span className="hero__line">{t("hero.title1")}</span> <span className="hero__line">{t("hero.title2")}</span>
            </h1>
            <p className="hero__lead">{t("hero.lead")}</p>
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
        <div className="grid-cards">
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
