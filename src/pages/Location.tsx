import { isConfigured, restaurant } from "../data/restaurant";
import { usePageMeta } from "../hooks/usePageMeta";
import { PageHero } from "../components/PageHero";
import { Section } from "../components/Section";
import { ContactDetails } from "../components/ContactDetails";
import { IconPin } from "../components/Icons";

export default function Location() {
  usePageMeta("Find Us", "Find Karachi Biryani Center: address, phone, WhatsApp and opening hours.");
  const hasMap = restaurant.mapEmbedUrl.startsWith("https://www.google.com/maps/embed");
  return (
    <>
      <PageHero title="Find Us" intro="Visit the restaurant or get in touch." />
      <Section tone="white">
        <div className="split">
          <ContactDetails />
          <div className="map">
            {hasMap ? (
              <iframe
                title={`Map showing the location of ${restaurant.name}`}
                src={restaurant.mapEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            ) : (
              <div className="map__placeholder">
                <IconPin />
                <p>
                  Map will appear here once the restaurant address is added.
                  {isConfigured(restaurant.address) ? "" : " Set VITE_MAP_EMBED_URL to connect Google Maps."}
                </p>
              </div>
            )}
          </div>
        </div>
      </Section>
    </>
  );
}
