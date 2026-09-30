import type { TranslationKey } from "../i18n/translations";

/** Validation returns translation keys; components translate them for the current language. */
export type Errors<T extends string> = Partial<Record<T, TranslationKey>>;

const PHONE_RE = /^\+?[0-9\s-]{10,16}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const isValidPhone = (value: string) => {
  const digits = value.replace(/\D/g, "");
  return PHONE_RE.test(value.trim()) && digits.length >= 10 && digits.length <= 15;
};
export const isValidEmail = (value: string) => EMAIL_RE.test(value.trim());

export type ContactField = "name" | "phone" | "email" | "message";
export interface ContactValues {
  name: string;
  phone: string;
  email: string;
  message: string;
}

export function validateContact(v: ContactValues): Errors<ContactField> {
  const e: Errors<ContactField> = {};
  if (v.name.trim().length < 2) e.name = "err.name";
  if (!v.phone.trim() && !v.email.trim()) e.phone = "err.phoneOrEmail";
  if (v.phone.trim() && !isValidPhone(v.phone)) e.phone = "err.phone";
  if (v.email.trim() && !isValidEmail(v.email)) e.email = "err.email";
  if (v.message.trim().length < 10) e.message = "err.message";
  return e;
}

export type OrderField = "name" | "phone" | "items" | "address";
export interface OrderValues {
  name: string;
  phone: string;
  fulfilment: "delivery" | "pickup";
  address: string;
  itemCount: number;
}

export function validateOrder(v: OrderValues): Errors<OrderField> {
  const e: Errors<OrderField> = {};
  if (v.name.trim().length < 2) e.name = "err.name";
  if (!isValidPhone(v.phone)) e.phone = "err.phone";
  if (v.itemCount === 0) e.items = "err.items";
  if (v.fulfilment === "delivery" && v.address.trim().length < 8) e.address = "err.address";
  return e;
}
