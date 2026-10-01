/**
 * Central menu data. EDIT THIS FILE to change items, prices, images, categories and availability.
 * Names and descriptions are in English + Urdu. Prices: Single Biryani Rs. 200, Double Biryani Rs. 400,
 * Star Cola Small Bottle Rs. 50.
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
  /** Built-in artwork to show when there is no photo (defaults to the category's artwork). */
  art?: ArtVariant;
  /** Optional photo, e.g. `image: menuImage("single-biryani.jpg")`. When empty or failing to load, the fallback image or built-in artwork is shown. */
  image?: string;
  /** Second choice if `image` is missing (e.g. the general biryani photo). */
  imageFallback?: string;
  /** Set to false to show the item as "Unavailable" and block ordering. Defaults to true. */
  available?: boolean;
  featured?: boolean;
}

/**
 * Photo folder: put real photos in `public/images/menu/` (about 1200x900, JPG) and reference them with
 * `menuImage("file.jpg")`. Until a photo exists the fallback image or built-in artwork is shown.
 *   - chicken-biryani.jpg  general biryani photo (Home hero, About, and the biryani cards)
 *   - single-biryani.jpg   optional: a photo of a single portion
 *   - double-biryani.jpg   optional: a photo of a double portion
 *   - star-cola.jpg        optional: Star Cola small bottle photo
 */
export const menuImage = (file: string) => `/images/menu/${file}`;

/** Real biryani photo used on the Home hero, About page and as the default for the biryani cards. */
export const BIRYANI_PHOTO = menuImage("chicken-biryani.jpg");

export const menuCategories: MenuCategory[] = [
  { id: "biryani", labelKey: "cat.biryani", art: "biryani" },
  { id: "deals", labelKey: "cat.deals", art: "deal" },
  { id: "sides", labelKey: "cat.sides", art: "raita" },
  { id: "drinks", labelKey: "cat.drinks", art: "drink" },
  { id: "extras", labelKey: "cat.extras", art: "salad" },
];

export const menuItems: MenuItem[] = [
  {
    id: "single-biryani",
    name: "Single Biryani",
    nameUr: "سنگل بریانی",
    category: "biryani",
    description: "One generous portion of fragrant basmati rice with tender meat and authentic biryani spices.",
    descriptionUr: "خوشبودار باسمتی چاول، نرم گوشت اور اصل بریانی مسالوں کے ساتھ ایک بھرپور پورشن۔",
    price: 200,
    portion: "single",
    image: menuImage("single-biryani.jpg"),
    imageFallback: BIRYANI_PHOTO,
    featured: true,
  },
  {
    id: "double-biryani",
    name: "Double Biryani",
    nameUr: "ڈبل بریانی",
    category: "biryani",
    description: "A double portion of our biryani, ideal for a bigger appetite or for sharing.",
    descriptionUr: "ہماری بریانی کا ڈبل پورشن، زیادہ بھوک کے لیے یا مل کر کھانے کے لیے موزوں۔",
    price: 400,
    portion: "double",
    image: menuImage("double-biryani.jpg"),
    imageFallback: BIRYANI_PHOTO,
    featured: true,
  },
  {
    id: "family-deal",
    name: "Family Deal",
    nameUr: "فیملی ڈیل",
    category: "deals",
    description: "A generous family meal option suitable for sharing.",
    descriptionUr: "مل کر کھانے کے لیے موزوں ایک بھرپور فیملی پیکج۔",
    price: null,
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
    id: "star-cola",
    name: "Star Cola Small Bottle",
    nameUr: "سٹار کولا چھوٹی بوتل",
    category: "drinks",
    description: "A small, ice-cold Star Cola bottle to go with your meal.",
    descriptionUr: "کھانے کے ساتھ ٹھنڈی ٹھار سٹار کولا کی چھوٹی بوتل۔",
    price: 50,
    image: menuImage("star-cola.jpg"),
    featured: true,
  },
  {
    id: "water",
    art: "water",
    name: "Mineral Water",
    nameUr: "منرل واٹر",
    category: "drinks",
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
