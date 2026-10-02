/**
 * Central menu data. EDIT THIS FILE to change items, prices, images, categories and availability.
 * Names and descriptions are in English + Urdu. Prices: Attock Beef Biryani Single Rs. 200 and Double Rs. 400
 * (a cold drink is INCLUDED in that price), Family Deal Rs. 1200, Extra Cold Drink Rs. 50.
 * Items with `price: null` show "Price on request" and are confirmed by the restaurant.
 * Set a number (PKR) to show a price and include it in order totals.
 */
import type { TranslationKey } from "../i18n/translations";
import type { Lang } from "../i18n/translations";

export type ArtVariant = "biryani" | "deal" | "rice" | "raita" | "salad" | "drink" | "water";
export type Portion = "single" | "double";

export interface MenuCategory {
  id: string;
  /** Translation key for the category label (see src/i18n/translations.ts). */
  labelKey: TranslationKey;
  art: ArtVariant;
}

export interface MenuItem {
  id: string;
  name: string;
  nameUr: string;
  category: string;
  description: string;
  descriptionUr: string;
  /** PKR amount, or null while the price has not been provided. */
  price: number | null;
  /** Shows a "Single" / "Double" portion badge on the card. */
  portion?: Portion;
  /** True when a cold drink is included in the price (shows the bottle and an "included" label; no separate drink price). */
  drinkIncluded?: boolean;
  /** Built-in artwork to show when there is no photo (defaults to the category's artwork). */
  art?: ArtVariant;
  /** Optional photo, e.g. `image: menuImage("single-biryani.jpg")`. When empty or failing to load, the fallback image or built-in artwork is shown. */
  image?: string;
  /** Second choice if `image` is missing (e.g. the general biryani photo). */
  imageFallback?: string;
  /** "contain" shows the whole picture (for posters with text/prices); "cover" (default) fills and crops the card image. */
  imageFit?: "cover" | "contain";
  /** Set to false to show the item as "Unavailable" and block ordering. Defaults to true. */
  available?: boolean;
  featured?: boolean;
}

/**
 * Photo folder: put real photos in `public/images/menu/` (about 1200x900, JPG) and reference them with
 * `menuImage("file.jpg")`. Until a photo exists the fallback image or built-in artwork is shown.
 *   - chicken-biryani.jpg  biryani photo used on the Home hero and About page
 *   - single-biryani.jpg   Single Biryani card image
 *   - double-biryani.jpg   Double Biryani card image
 *   - star-cola.jpg        Star Cola Small Bottle card image
 *   - family-deal.jpg      Family Deal card image
 */
export const menuImage = (file: string) => `/images/menu/${file}`;

/** Real biryani photo used on the Home hero and About page. */
export const BIRYANI_PHOTO = menuImage("chicken-biryani.jpg");

/** The included cold-drink bottle (cropped from the uploaded Star Cola picture), shown on combo cards. */
export const COLD_DRINK_PHOTO = menuImage("cold-drink-bottle.jpg");

export const menuCategories: MenuCategory[] = [
  { id: "biryani", labelKey: "cat.biryani", art: "biryani" },
  { id: "pulao", labelKey: "cat.pulao", art: "rice" },
  { id: "deals", labelKey: "cat.deals", art: "deal" },
  { id: "sides", labelKey: "cat.sides", art: "raita" },
  { id: "extras", labelKey: "cat.extras", art: "salad" },
];

export const menuItems: MenuItem[] = [
  {
    id: "single-biryani",
    name: "Attock Beef Biryani — Single",
    nameUr: "اٹک بیف بریانی — سنگل",
    category: "biryani",
    description: "A single portion of Attock Beef Biryani with fragrant basmati rice and authentic spices. Cold drink included.",
    descriptionUr: "اٹک بیف بریانی کا سنگل پورشن، خوشبودار باسمتی چاول اور اصل مسالوں کے ساتھ۔ ٹھنڈا مشروب شامل۔",
    price: 200,
    portion: "single",
    drinkIncluded: true,
    image: menuImage("single-biryani.jpg"),
    imageFit: "contain",
    featured: true,
  },
  {
    id: "double-biryani",
    name: "Attock Beef Biryani — Double",
    nameUr: "اٹک بیف بریانی — ڈبل",
    category: "biryani",
    description: "A double portion of Attock Beef Biryani, ideal for a bigger appetite or for sharing. Cold drink included.",
    descriptionUr: "اٹک بیف بریانی کا ڈبل پورشن، زیادہ بھوک کے لیے یا مل کر کھانے کے لیے موزوں۔ ٹھنڈا مشروب شامل۔",
    price: 400,
    portion: "double",
    drinkIncluded: true,
    image: menuImage("double-biryani.jpg"),
    imageFit: "contain",
    featured: true,
  },
  {
    id: "beef-pulao",
    art: "rice",
    name: "Attock Beef Pulao",
    nameUr: "اٹک بیف پلاؤ",
    category: "pulao",
    description: "Tender beef cooked with fragrant basmati rice and whole spices in the traditional pulao style.",
    descriptionUr: "نرم بیف، خوشبودار باسمتی چاول اور ثابت مسالوں کے ساتھ روایتی انداز کا پلاؤ۔",
    price: null,
    featured: true,
  },
  {
    id: "family-deal",
    name: "Family Deal",
    nameUr: "فیملی ڈیل",
    category: "deals",
    description: "A generous family meal option suitable for sharing.",
    descriptionUr: "مل کر کھانے کے لیے موزوں ایک بھرپور فیملی پیکج۔",
    price: 1200,
    image: menuImage("family-deal.jpg"),
    imageFit: "contain",
    featured: true,
  },
  {
    id: "plain-rice",
    art: "rice",
    name: "Plain Rice",
    nameUr: "سادہ چاول",
    category: "sides",
    description: "Steamed basmati rice, a simple side for any meal.",
    descriptionUr: "ہر کھانے کے ساتھ موزوں، بھاپ میں پکے باسمتی چاول۔",
    price: null,
  },
  {
    id: "raita",
    art: "raita",
    name: "Raita",
    nameUr: "رائتہ",
    category: "sides",
    description: "Cool, creamy yogurt raita to balance the spices.",
    descriptionUr: "مسالوں کا ذائقہ متوازن کرنے کے لیے ٹھنڈا اور کریمی دہی کا رائتہ۔",
    price: null,
  },
  {
    id: "salad",
    art: "salad",
    name: "Fresh Salad",
    nameUr: "تازہ سلاد",
    category: "sides",
    description: "Crisp seasonal salad served on the side.",
    descriptionUr: "ساتھ پیش کیا جانے والا تازہ اور کرکرا سلاد۔",
    price: null,
  },
  {
    id: "extra-cold-drink",
    name: "Extra Cold Drink (Star Cola Small)",
    nameUr: "اضافی ٹھنڈا مشروب (سٹار کولا چھوٹی بوتل)",
    category: "extras",
    description: "Optional extra. The first cold drink is already included with every biryani.",
    descriptionUr: "اختیاری اضافہ۔ ہر بریانی کے ساتھ پہلا ٹھنڈا مشروب پہلے ہی شامل ہے۔",
    price: 50,
    image: menuImage("star-cola.jpg"),
    imageFit: "contain",
  },
  {
    id: "water",
    art: "water",
    name: "Mineral Water",
    nameUr: "منرل واٹر",
    category: "extras",
    description: "Bottled mineral water.",
    descriptionUr: "بوتل بند منرل واٹر۔",
    price: null,
  },
  {
    id: "extra-raita",
    art: "raita",
    name: "Extra Raita",
    nameUr: "اضافی رائتہ",
    category: "extras",
    description: "An additional portion of raita.",
    descriptionUr: "رائتے کی اضافی مقدار۔",
    price: null,
  },
  {
    id: "extra-salad",
    art: "salad",
    name: "Extra Salad",
    nameUr: "اضافی سلاد",
    category: "extras",
    description: "An additional portion of fresh salad.",
    descriptionUr: "سلاد کی اضافی مقدار۔",
    price: null,
  },
];

export const getMenuItem = (id: string) => menuItems.find((item) => item.id === id);
export const getCategory = (id: string) => menuCategories.find((c) => c.id === id);
export const isAvailable = (item: MenuItem) => item.available !== false;

/** Picks the English or Urdu version of an item's text fields. */
export const itemText = (item: MenuItem, lang: Lang) => ({
  name: lang === "ur" ? item.nameUr : item.name,
  description: lang === "ur" ? item.descriptionUr : item.description,
});
