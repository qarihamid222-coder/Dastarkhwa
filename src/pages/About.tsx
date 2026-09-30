import { useI18n } from "../i18n/LanguageContext";
import { usePageMeta } from "../hooks/usePageMeta";
import { ButtonLink } from "../components/Button";
import { PageHero } from "../components/PageHero";
import { Section } from "../components/Section";
import { WhyChooseUs } from "../components/WhyChooseUs";
import { FoodArt } from "../components/FoodArt";

export default function About() {
  usePageMeta("seo.aboutTitle", "seo.aboutDesc");
  const { t } = useI18n();
  return (
    <>
      <PageHero title={t("about.title")} intro={t("about.intro")} />
      <Section tone="white">
        <div className="split split--center">
          <div>
            <h2>{t("about.heading")}</h2>
            <p>{t("about.p1")}</p>
            <p>{t("about.p2")}</p>
            <ButtonLink to="/menu" variant="secondary">
              {t("about.explore")}
            </ButtonLink>
          </div>
          <div className="about-art" role="img" aria-label={t("about.art")}>
            <FoodArt variant="biryani" />
          </div>
        </div>
      </Section>
      <Section eyebrow={t("about.standEyebrow")} title={t("about.standTitle")} tone="cream">
        <WhyChooseUs />
      </Section>
    </>
  );
}
