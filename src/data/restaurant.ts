/**
 * Central restaurant configuration.
 * Edit the values here to update the whole site (English text and Urdu equivalents side by side).
 * Public values can also be supplied through environment variables (see .env.example).
 */
const env = import.meta.env;

export interface SocialLink {
  label: string;
  /** Leave empty until the real account URL is provided. */
  url: string;
}

export const restaurant = {
  name: "Karachi Biryani Center",
  tagline: "Authentic Karachi Biryani, Made With Love",
  shortDescription:
    "Delicious, aromatic and flavorful biryani made with authentic Pakistani taste.",
  address: "Chitral City",
  addressUr: "چترال سٹی",
  /** Shown to visitors exactly as provided. */
  phone: "03237185867",
  /** International format for tel: links. */
  phoneIntl: "+923237185867",
  /** Digits only, with country code (Pakistan +92). Used to build wa.me links. */
  whatsappNumber: (env.VITE_WHATSAPP_NUMBER as string | undefined)?.replace(/\D/g, "") || "923237185867",
  whatsappDisplay: "03237185867",
  email: "hamidurahman15201@gmail.com",
  openingHours: ["Open 24 hours"],
  openingHoursUr: ["24 گھنٹے کھلا"],
  /** Search link (no exact pin is claimed) until a precise Google Maps location is provided. */
  /** Optional: shown on the About page owner card when set. Leave empty to show the card without a name. */
  ownerName: "",
  ownerNameUr: "",
  mapSearchUrl:
    "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("Karachi Biryani Center, Chitral City"),
  mapEmbedUrl: (env.VITE_MAP_EMBED_URL as string | undefined) ?? "",
  /** Add the real page URL to show an account in the footer; entries with an empty url are hidden. */
  socialLinks: [
    { label: "Facebook", url: "" },
    { label: "Instagram", url: "" },
    { label: "TikTok", url: "" },
  ] as SocialLink[],
  endpoints: {
    contact: (env.VITE_CONTACT_ENDPOINT as string | undefined) ?? "",
    order: (env.VITE_ORDER_ENDPOINT as string | undefined) ?? "",
  },
};

/** True once a real (non-placeholder) value is configured. */
export const isConfigured = (value: string) =>
  value.trim() !== "" && !value.startsWith("ADD ");

export const navLinks = [
  { to: "/", key: "nav.home" },
  { to: "/menu", key: "nav.menu" },
  { to: "/about", key: "nav.about" },
  { to: "/contact", key: "nav.contact" },
  { to: "/location", key: "nav.location" },
] as const;
