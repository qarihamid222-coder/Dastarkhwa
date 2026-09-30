/**
 * Central menu data. EDIT THIS FILE to change items, prices, images, categories and availability.
 * All items below are SAMPLE content. Prices are intentionally `null` (shown as "Add Price")
 * until real prices are provided. Set `price` to a number (in PKR) to enable totals.
 */
export type ArtVariant = "biryani" | "deal" | "side" | "drink" | "extra";

export interface MenuCategory {
  id: string;
  label: string;
  art: ArtVariant;
}

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  description: string;
  /** PKR amount, or null while the price has not been provided. */
  price: number | null;
  /** Optional label shown next to the price, e.g. "full plate". */
  priceNote?: string;
  /** Optional image URL/path. When empty or failing to load, built-in artwork is shown. */
  image?: string;
  /** Set to false to show the item as "Unavailable" and block ordering. Defaults to true. */
  available?: boolean;
  featured?: boolean;
}

export const menuCategories: MenuCategory[] = [
  { id: "chicken", label: "Chicken Biryani", art: "biryani" },
  { id: "beef", label: "Beef Biryani", art: "biryani" },
  { id: "mutton", label: "Mutton Biryani", art: "biryani" },
  { id: "special", label: "Special Biryani", art: "biryani" },
  { id: "deals", label: "Family Deals", art: "deal" },
  { id: "sides", label: "Rice & Side Items", art: "side" },
  { id: "drinks", label: "Drinks", art: "drink" },
  { id: "extras", label: "Extras", art: "extra" },
];

export const menuItems: MenuItem[] = [
  {
    id: "chicken-biryani",
    name: "Chicken Biryani",
    category: "chicken",
    description:
      "Fragrant basmati rice cooked with tender chicken and authentic biryani spices.",
    price: 400,
    priceNote: "full plate",
    featured: true,
  },
  {
    id: "beef-biryani",
    name: "Beef Biryani",
    category: "beef",
    description:
      "Rich and flavorful biryani prepared with tender beef and aromatic spices.",
    price: 400,
    priceNote: "full plate",
    featured: true,
  },
  {
    id: "mutton-biryani",
    name: "Mutton Biryani",
    category: "mutton",
    description:
      "Traditional-style mutton biryani with fragrant rice and carefully balanced spices.",
    price: 400,
    priceNote: "full plate",
    featured: true,
  },
  {
    id: "special-biryani",
    name: "Special Biryani",
    category: "special",
    description:
      "Our special biryani selection prepared with a rich blend of aromatic spices.",
    price: 400,
    priceNote: "full plate",
    featured: true,
  },
  {
    id: "family-deal",
    name: "Family Deal",
    category: "deals",
    description: "A generous family meal option suitable for sharing.",
    price: null,
    featured: true,
  },
  {
    id: "plain-rice",
    name: "Plain Rice",
    category: "sides",
    description: "Steamed basmati rice, a simple side for any meal.",
    price: null,
  },
  {
    id: "raita",
    name: "Raita",
    category: "sides",
    description: "Cool, creamy yogurt raita to balance the spices.",
    price: null,
  },
  {
    id: "salad",
    name: "Fresh Salad",
    category: "sides",
    description: "Crisp seasonal salad served on the side.",
    price: null,
  },
  {
    id: "cold-drink",
    name: "Cold Drink",
    category: "drinks",
    description: "Refreshing drinks to complement your meal.",
    price: null,
    featured: true,
  },
  {
    id: "water",
    name: "Mineral Water",
    category: "drinks",
    description: "Bottled mineral water.",
    price: null,
  },
  {
    id: "extra-raita",
    name: "Extra Raita",
    category: "extras",
    description: "An additional portion of raita.",
    price: null,
  },
  {
    id: "extra-salad",
    name: "Extra Salad",
    category: "extras",
    description: "An additional portion of fresh salad.",
    price: null,
  },
];

export const getMenuItem = (id: string) => menuItems.find((item) => item.id === id);
export const getCategory = (id: string) => menuCategories.find((c) => c.id === id);
export const isAvailable = (item: MenuItem) => item.available !== false;
