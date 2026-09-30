import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { translations } from "./translations";
import type { Lang, TranslationKey } from "./translations";

export type UrduFont = "mehr" | "noori" | "noto";

/**
 * Font choices for Urdu. The matching font stacks live in src/styles/global.css
 * (:root[data-urdu-font="…"]): each lists the requested font first and then the closest
 * Nastaliq alternatives, so the browser falls back automatically if a font isn't installed.
 * Noto Nastaliq Urdu is bundled with the site (self-hosted) and is always available;
 * Mehr and Noori Nastaliq are used when they are installed on the visitor's device.
 */
export const URDU_FONTS: { id: UrduFont; label: string }[] = [
  { id: "noori", label: "Jameel Noori Nastaleeq" },
  { id: "noto", label: "Noto Nastaliq Urdu" },
  { id: "mehr", label: "Mehr Nastaliq" },
];

type Vars = Record<string, string | number>;

interface I18nValue {
  lang: Lang;
  dir: "ltr" | "rtl";
  setLang: (l: Lang) => void;
  toggleLang: () => void;
  font: UrduFont;
  setFont: (f: UrduFont) => void;
  t: (key: TranslationKey, vars?: Vars) => string;
}

const I18nContext = createContext<I18nValue | null>(null);
const LANG_KEY = "kbc-lang";
const FONT_KEY = "kbc-urdu-font";

const read = (key: string): string | null => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};
const write = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* storage unavailable — preference just isn't remembered */
  }
};

const initialLang = (): Lang => {
  const saved = read(LANG_KEY);
  return saved === "ur" || saved === "en" ? saved : "en";
};
const initialFont = (): UrduFont => {
  const saved = read(FONT_KEY);
  return saved === "mehr" || saved === "noori" || saved === "noto" ? saved : "noori";
};

let fontLoaded = false;
/** Loads the bundled Urdu font only when Urdu is first used (keeps the English site light). */
function loadUrduFont() {
  if (fontLoaded) return;
  fontLoaded = true;
  void import("@fontsource/noto-nastaliq-urdu/arabic-400.css");
  void import("@fontsource/noto-nastaliq-urdu/arabic-700.css");
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);
  const [font, setFontState] = useState<UrduFont>(initialFont);
  const dir = lang === "ur" ? "rtl" : "ltr";

  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = dir;
    root.dataset.urduFont = font;
    if (lang === "ur") loadUrduFont();
  }, [lang, dir, font]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    write(LANG_KEY, l);
  }, []);
  const setFont = useCallback((f: UrduFont) => {
    setFontState(f);
    write(FONT_KEY, f);
  }, []);

  const value = useMemo<I18nValue>(() => {
    const dict = translations[lang];
    const t = (key: TranslationKey, vars?: Vars) => {
      const text: string = dict[key] ?? translations.en[key];
      return vars ? text.replace(/\{(\w+)\}/g, (_, k: string) => String(vars[k] ?? "")) : text;
    };
    return { lang, dir, setLang, toggleLang: () => setLang(lang === "en" ? "ur" : "en"), font, setFont, t };
  }, [lang, dir, font, setLang, setFont]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside <LanguageProvider>");
  return ctx;
}
