import { useEffect } from "react";
import { useI18n } from "../i18n/LanguageContext";
import type { TranslationKey } from "../i18n/translations";

/**
 * Updates <title>, meta description and Open Graph tags per route and language.
 * Pass translation keys; omit both for the home page.
 */
export function usePageMeta(titleKey?: TranslationKey, descKey?: TranslationKey) {
  const { t, lang } = useI18n();
  useEffect(() => {
    const name = t("brand.name");
    const title = titleKey ? `${t(titleKey)} | ${name}` : t("seo.homeTitle");
    const description = t(descKey ?? "seo.homeDesc");
    document.title = title;
    const set = (selector: string, value: string) =>
      document.querySelector(selector)?.setAttribute("content", value);
    set('meta[name="description"]', description);
    set('meta[property="og:title"]', title);
    set('meta[property="og:description"]', description);
    set('meta[property="og:locale"]', lang === "ur" ? "ur_PK" : "en_PK");
  }, [titleKey, descKey, t, lang]);
}
