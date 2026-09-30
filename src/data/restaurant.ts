/**
 * Central restaurant configuration.
 * Every value marked PLACEHOLDER must be replaced with real information before launch.
 * Public values can also be supplied through environment variables (see .env.example).
 */
const env = import.meta.env;

export const PLACEHOLDER = {
  address: "ADD RESTAURANT ADDRESS",
  phone: "ADD PHONE NUMBER",
  whatsapp: "ADD WHATSAPP NUMBER",
  email: "ADD EMAIL ADDRESS",
  hours: "ADD OPENING HOURS",
} as const;

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
  address: PLACEHOLDER.address,
  phone: PLACEHOLDER.phone,
  /** Digits only, with country code, e.g. "923001234567". Used to build wa.me links. */
  whatsappNumber: (env.VITE_WHATSAPP_NUMBER as string | undefined)?.replace(/\D/g, "") ?? "",
  whatsappDisplay: PLACEHOLDER.whatsapp,
  email: PLACEHOLDER.email,
  openingHours: [PLACEHOLDER.hours],
  mapEmbedUrl: (env.VITE_MAP_EMBED_URL as string | undefined) ?? "",
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
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
  { to: "/location", label: "Location" },
] as const;
