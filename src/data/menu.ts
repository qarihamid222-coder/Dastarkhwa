/**
 * Central menu data. EDIT THIS FILE to change items, prices, images, categories and availability.
 * Names and descriptions are in English + Urdu. Only the biryani "full plate" price has been
 * provided so far; items with `price: null` show "Price on request" and are confirmed by the
 * restaurant. Set a number (PKR) to show a price and include it in order totals.
 */
import type { TranslationKey } from "../i18n/translations";
import type { Lang } from "../i18n/translations";

export type ArtVariant = "biryani" | "deal" | "rice" | "raita" | "salad" | "drink" | "water";

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
  /** Optional label shown next to the price, e.g. "full plate". */
  priceNote?: string;
  priceNoteUr?: string;
  /** Built-in artwork to show when there is no photo (defaults to the category's artwork). */
  art?: ArtVariant;
  /** Optional photo, e.g. `image: menuImage("chicken-biryani.jpg")`. When empty or failing to load, built-in artwork is shown. */
  image?: string;
  /** Set to false to show the item as "Unavailable" and block ordering. Defaults to true. */
  available?: boolean;
  featured?: boolean;
}

/**
 * Photo folder: put real photos in `public/images/menu/` (e.g. `chicken-biryani.jpg`, about 1200×900,
 * JPG/WebP) and reference them with `menuImage("chicken-biryani.jpg")` in the item's `image` field.
 * Until an item has an `image`, the built-in illustration is shown (also if a photo fails to load).
 */
export const menuImage = (file: string) => `/images/menu/${file}`;

/**
 * Real biryani photo used on the Chicken and Special biryani cards, the Home hero and About page.
 * Add the file `public/images/menu/chicken-biryani.jpg`; until it exists the built-in artwork is shown.
 */
export const BIRYANI_PHOTO = menuImage("chicken-biryani.jpg");

export const menuCategories: MenuCategory[] = [
  { id: "chicken", labelKey: "cat.chicken", art: "biryani" },
  { id: "beef", labelKey: "cat.beef", art: "biryani" },
  { id: "mutton", labelKey: "cat.mutton", art: "biryani" },
  { id: "special", labelKey: "cat.special", art: "biryani" },
  { id: "deals", labelKey: "cat.deals", art: "deal" },
  { id: "sides", labelKey: "cat.sides", art: "raita" },
  { id: "drinks", labelKey: "cat.drinks", art: "drink" },
  { id: "extras", labelKey: "cat.extras", art: "salad" },
];

const FULL_PLATE = { price: 400, priceNote: "full plate", priceNoteUr: "فل پلیٹ" } as const;

export const menuItems: MenuItem[] = [
  {
    id: "chicken-biryani",
    image: BIRYANI_PHOTO,
    name: "Chicken Biryani",
    nameUr: "چکن بریانی",
    category: "chicken",
    description: "Fragrant basmati rice cooked with tender chicken and authentic biryani spices.",
    descriptionUr: "خوشبودار باسمتی چاول، نرم چکن اور اصل بریانی مسالوں کے ساتھ تیار۔",
    ...FULL_PLATE,
    featured: true,
  },
  {
    id: "beef-biryani",
    name: "Beef Biryani",
    nameUr: "بیف بریانی",
    category: "beef",
    description: "Rich and flavorful biryani prepared with tender beef and aromatic spices.",
    descriptionUr: "نرم بیف اور خوشبودار مسالوں سے تیار بھرپور ذائقہ دار بریانی۔",
    ...FULL_PLATE,
    featured: true,
  },
  {
    id: "mutton-biryani",
    name: "Mutton Biryani",
    nameUr: "مٹن بریانی",
    category: "mutton",
    description: "Traditional-style mutton biryani with fragrant rice and carefully balanced spices.",
    descriptionUr: "روایتی انداز کی مٹن بریانی، خوشبودار چاول اور متوازن مسالوں کے ساتھ۔",
    ...FULL_PLATE,
    featured: true,
  },
  {
    id: "special-biryani",
    image: BIRYANI_PHOTO,
    name: "Special Biryani",
    nameUr: "سپیشل بریانی",
    category: "special",
    description: "Our special biryani selection prepared with a rich blend of aromatic spices.",
    descriptionUr: "خوشبودار مسالوں کے بھرپور امتزاج سے تیار ہماری خاص بریانی۔",
    ...FULL_PLATE,
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
    id: "cold-drink",
    name: "Cold Drink",
    nameUr: "کولڈ ڈرنک",
    category: "drinks",
    description: "Refreshing drinks to complement your meal.",
    descriptionUr: "کھانے کے ساتھ تازگی بخش مشروب۔",
    price: null,
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
  priceNote: lang === "ur" ? item.priceNoteUr : item.priceNote,
});
