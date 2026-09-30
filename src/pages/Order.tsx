import { useI18n } from "../i18n/LanguageContext";
import { usePageMeta } from "../hooks/usePageMeta";
import { PageHero } from "../components/PageHero";
import { Section } from "../components/Section";
import { OrderForm } from "../components/OrderForm";

export default function Order() {
  usePageMeta("seo.orderTitle", "seo.orderDesc");
  const { t } = useI18n();
  return (
    <>
      <PageHero title={t("order.title")} intro={t("order.intro")} />
      <Section tone="cream">
        <OrderForm />
      </Section>
    </>
  );
}
