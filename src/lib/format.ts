import type { Lang, TranslationKey } from "../i18n/translations";

type T = (key: TranslationKey, vars?: Record<string, string | number>) => string;

/** Localized price, e.g. "Rs. 400" / "400 روپے"; null prices show "Price on request". */
export const formatPrice = (price: number | null, t: T): string =>
  price === null ? t("menu.addPrice") : t("menu.currency", { n: price.toLocaleString("en-PK") });

export type { Lang };
