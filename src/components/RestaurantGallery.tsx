import { useState } from "react";
import type { TranslationKey } from "../i18n/translations";
import { useI18n } from "../i18n/LanguageContext";

/**
 * Real photos of the restaurant. Add any of these files to `public/images/gallery/`; only photos that
 * exist are shown, and the whole section stays hidden until at least one loads.
 */
const PHOTOS: { file: string; alt: TranslationKey }[] = [
  { file: "storefront.jpg", alt: "gallery.storefront" },
  { file: "interior.jpg", alt: "gallery.interior" },
  { file: "dining.jpg", alt: "gallery.dining" },
  { file: "counter.jpg", alt: "gallery.counter" },
];

export function RestaurantGallery() {
  const { t } = useI18n();
  const [loaded, setLoaded] = useState<Record<string, boolean>>({});
  const [failed, setFailed] = useState<Record<string, boolean>>({});
  const any = Object.values(loaded).some(Boolean);

  return (
    <section className="section section--cream" hidden={!any} aria-labelledby="gallery-title">
      <div className="container">
        <header className="section__head">
          <p className="eyebrow">{t("gallery.eyebrow")}</p>
          <h2 id="gallery-title">{t("gallery.title")}</h2>
        </header>
        <div className="gallery">
          {PHOTOS.filter((p) => !failed[p.file]).map((p) => (
            <figure key={p.file} className="gallery__item" hidden={!loaded[p.file]}>
              <img
                src={`/images/gallery/${p.file}`}
                alt={t(p.alt)}
                width={1200}
                height={900}
                decoding="async"
                onLoad={() => setLoaded((s) => ({ ...s, [p.file]: true }))}
                onError={() => setFailed((s) => ({ ...s, [p.file]: true }))}
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
