import { useI18n } from "../i18n/LanguageContext";
import { usePageMeta } from "../hooks/usePageMeta";
import { ButtonLink } from "../components/Button";
import { PageHero } from "../components/PageHero";
import { Section } from "../components/Section";

export default function NotFound() {
  usePageMeta("seo.notFoundTitle");
  const { t } = useI18n();
  return (
    <>
      <PageHero title={t("nf.title")} intro={t("nf.text")} />
      <Section tone="white">
        <p className="center">
          <ButtonLink to="/">{t("nf.home")}</ButtonLink>{" "}
          <ButtonLink to="/menu" variant="secondary">
            {t("hero.menu")}
          </ButtonLink>
        </p>
      </Section>
    </>
  );
}
