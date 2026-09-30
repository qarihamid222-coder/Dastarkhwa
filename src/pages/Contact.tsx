import { useI18n } from "../i18n/LanguageContext";
import { usePageMeta } from "../hooks/usePageMeta";
import { PageHero } from "../components/PageHero";
import { Section } from "../components/Section";
import { ContactForm } from "../components/ContactForm";
import { ContactButtons } from "../components/ContactButtons";
import { ContactDetails } from "../components/ContactDetails";

export default function Contact() {
  usePageMeta("seo.contactTitle", "seo.contactDesc");
  const { t } = useI18n();
  return (
    <>
      <PageHero title={t("contact.title")} intro={t("contact.intro")} />
      <Section tone="white">
        <div className="split">
          <div>
            <h2 className="h3">{t("contact.sendHeading")}</h2>
            <ContactForm />
          </div>
          <div>
            <h2 className="h3">{t("contact.detailsHeading")}</h2>
            <ContactDetails />
            <ContactButtons email className="contact-buttons--stack contact-buttons--spaced" />
          </div>
        </div>
      </Section>
    </>
  );
}
