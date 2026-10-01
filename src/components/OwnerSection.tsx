import { useState } from "react";
import { restaurant } from "../data/restaurant";
import { useI18n } from "../i18n/LanguageContext";

/** Public path of the owner's photo (`public/images/owner.png`); the card stays hidden if the file is missing. */
export const OWNER_PHOTO = "/images/owner.png";

export function OwnerSection() {
  const { lang, t } = useI18n();
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  const name = lang === "ur" ? restaurant.ownerNameUr || restaurant.ownerName : restaurant.ownerName;

  return (
    <section className="section section--white" hidden={!loaded} aria-labelledby="owner-title">
      <div className="container">
        <div className="owner">
          <figure className="owner__photo">
            <img
              src={OWNER_PHOTO}
              alt={t("owner.alt")}
              width={445}
              height={560}
              decoding="async"
              onLoad={() => setLoaded(true)}
              onError={() => setFailed(true)}
            />
          </figure>
          <div className="owner__text">
            <p className="eyebrow">{t("owner.eyebrow")}</p>
            <h2 id="owner-title">{t("owner.title")}</h2>
            <p>{t("owner.text")}</p>
            {name && <p className="owner__name">{name}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
