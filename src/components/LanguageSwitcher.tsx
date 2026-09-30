import { URDU_FONTS, useI18n } from "../i18n/LanguageContext";
import type { UrduFont } from "../i18n/LanguageContext";

/** Compact English/Urdu toggle for the header. */
export function LanguageToggle() {
  const { lang, toggleLang, t } = useI18n();
  return (
    <button
      type="button"
      className="lang-toggle"
      onClick={toggleLang}
      aria-label={t("lang.switchTo")}
      lang={lang === "en" ? "ur" : "en"}
    >
      <span className="lang-toggle__full">{t("lang.switchLabel")}</span>
      <span className="lang-toggle__short" aria-hidden="true">
        {t("lang.switchShort")}
      </span>
    </button>
  );
}

/** Urdu font chooser; only shown while Urdu is active. */
export function UrduFontPicker({ id }: { id: string }) {
  const { lang, font, setFont, t } = useI18n();
  if (lang !== "ur") return null;
  return (
    <div className="font-picker">
      <label htmlFor={id}>{t("lang.fontLabel")}</label>
      <select id={id} value={font} onChange={(e) => setFont(e.target.value as UrduFont)}>
        {URDU_FONTS.map((f) => (
          <option key={f.id} value={f.id}>
            {f.label}
          </option>
        ))}
      </select>
    </div>
  );
}
