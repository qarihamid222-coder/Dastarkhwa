import { restaurant } from "../data/restaurant";
import { useI18n } from "../i18n/LanguageContext";
import { usePageMeta } from "../hooks/usePageMeta";
import { PageHero } from "../components/PageHero";
import { Section } from "../components/Section";
import { ContactButtons } from "../components/ContactButtons";
import { ContactDetails } from "../components/ContactDetails";
import { IconPin } from "../components/Icons";

export default function Location() {
  usePageMeta("seo.locationTitle", "seo.locationDesc");
  const { t } = useI18n();
  const hasMap = restaurant.mapEmbedUrl.startsWith("https://www.google.com/maps/embed");
  return (
    <>
      <PageHero title={t("loc.title")} intro={t("loc.intro")} />
      <Section tone="white">
        <div className="split">
          <div>
            <ContactDetails />
            <ContactButtons className="contact-buttons--stack contact-buttons--spaced" />
          </div>
          <div className="map">
            {hasMap ? (
              <iframe
                title={t("loc.mapTitle")}
                src={restaurant.mapEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            ) : (
              <div className="map__placeholder">
                <IconPin />
                <p>{t("loc.mapText")}</p>
                <a className="btn btn--secondary" href={restaurant.mapSearchUrl} target="_blank" rel="noopener noreferrer">
                  {t("loc.openMaps")}
                </a>
              </div>
            )}
          </div>
        </div>
      </Section>
    </>
  );
}
