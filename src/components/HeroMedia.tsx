import { useState } from "react";
import { BIRYANI_PHOTO } from "../data/menu";
import { useI18n } from "../i18n/LanguageContext";
import { FoodArt } from "./FoodArt";

/** Hero food visual: the real biryani photo, or the built-in artwork if the photo file is missing. */
export function HeroMedia() {
  const { t } = useI18n();
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div className="hero__art" role="img" aria-label={t("hero.art")}>
        <div className="hero__plate">
          <FoodArt variant="biryani" bare />
        </div>
      </div>
    );
  }
  return (
    <div className="hero__art">
      <img
        className="hero__photo"
        src={BIRYANI_PHOTO}
        alt={t("photo.biryaniAlt")}
        width={1536}
        height={1024}
        decoding="async"
        fetchPriority="high"
        onError={() => setFailed(true)}
      />
    </div>
  );
}
