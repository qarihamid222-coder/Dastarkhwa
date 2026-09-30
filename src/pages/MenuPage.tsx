import { useI18n } from "../i18n/LanguageContext";
import { usePageMeta } from "../hooks/usePageMeta";
import { PageHero } from "../components/PageHero";
import { Section } from "../components/Section";
import { MenuBrowser } from "../components/MenuBrowser";

export default function MenuPage() {
  usePageMeta("seo.menuTitle", "seo.menuDesc");
  const { t } = useI18n();
  return (
    <>
      <PageHero title={t("menu.title")} intro={t("menu.intro")} />
      <Section tone="cream">
        <MenuBrowser />
      </Section>
    </>
  );
}
