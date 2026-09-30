import type { ReactNode } from "react";
import type { TranslationKey } from "../i18n/translations";
import { useI18n } from "../i18n/LanguageContext";
import { IconCheck, IconFlame, IconHeart, IconLeaf } from "./Icons";

const reasons: { icon: ReactNode; title: TranslationKey; text: TranslationKey }[] = [
  { icon: <IconCheck />, title: "why.taste", text: "why.tasteText" },
  { icon: <IconLeaf />, title: "why.fresh", text: "why.freshText" },
  { icon: <IconFlame />, title: "why.flavor", text: "why.flavorText" },
  { icon: <IconHeart />, title: "why.service", text: "why.serviceText" },
];

export function WhyChooseUs() {
  const { t } = useI18n();
  return (
    <ul className="features">
      {reasons.map((r) => (
        <li key={r.title} className="feature">
          <span className="feature__icon">{r.icon}</span>
          <h3>{t(r.title)}</h3>
          <p>{t(r.text)}</p>
        </li>
      ))}
    </ul>
  );
}
