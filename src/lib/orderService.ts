import { restaurant } from "../data/restaurant";
import type { ContactValues } from "./validation";

export interface OrderLine {
  id: string;
  name: string;
  price: number | null;
  quantity: number;
}

export interface OrderPayload {
  name: string;
  phone: string;
  fulfilment: "delivery" | "pickup";
  address: string;
  notes: string;
  lines: OrderLine[];
}

export interface OrderTotal {
  amount: number;
  /** True when at least one line has no price yet, so the total is not final. */
  incomplete: boolean;
}

export function calculateTotal(lines: OrderLine[]): OrderTotal {
  let amount = 0;
  let incomplete = false;
  for (const l of lines) {
    if (l.price === null) incomplete = true;
    else amount += l.price * l.quantity;
  }
  return { amount, incomplete };
}

const rs = (n: number) => `Rs. ${n.toLocaleString("en-PK")}`;

/** English total used in the order message sent to the restaurant (staff-facing). */
export function totalLabel(total: OrderTotal): string {
  if (total.incomplete) {
    return total.amount > 0 ? `${rs(total.amount)} + items awaiting price` : "To be confirmed";
  }
  return rs(total.amount);
}

/** Plain-text order, used for WhatsApp, clipboard and any future channel. */
export function buildOrderText(o: OrderPayload): string {
  const total = totalLabel(calculateTotal(o.lines));
  const lines = o.lines.map((l) => `• ${l.quantity} × ${l.name}`).join("\n");
  const details = [
    `Type: ${o.fulfilment === "delivery" ? "Delivery" : "Pickup"}`,
    o.fulfilment === "delivery" ? `Address: ${o.address.trim()}` : "",
    `Name: ${o.name.trim()}`,
    `Phone: ${o.phone.trim()}`,
    o.notes.trim() ? `Instructions: ${o.notes.trim()}` : "",
  ].filter(Boolean);
  return [`New order — ${restaurant.name}`, "", lines, "", `Total: ${total}`, ...details].join("\n");
}

export const whatsappLink = (text: string): string | null =>
  restaurant.whatsappNumber
    ? `https://wa.me/${restaurant.whatsappNumber}?text=${encodeURIComponent(text)}`
    : null;

export type OrderResult =
  | { status: "whatsapp"; url: string; text: string }
  | { status: "sent"; text: string }
  | { status: "not-configured"; text: string }
  | { status: "error"; message: string; text: string };

/**
 * Order channel adapter. To add a backend or payment provider later, extend this function
 * (or set VITE_ORDER_ENDPOINT) — the UI only depends on the returned OrderResult.
 * Priority: backend endpoint → WhatsApp → "not configured".
 */
export async function submitOrder(order: OrderPayload): Promise<OrderResult> {
  const text = buildOrderText(order);

  if (restaurant.endpoints.order) {
    try {
      const res = await fetch(restaurant.endpoints.order, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...order, text }),
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      return { status: "sent", text };
    } catch {
      return {
        status: "error",
        message: "We couldn't send your order. Please check your connection and try again.",
        text,
      };
    }
  }

  const url = whatsappLink(text);
  if (url) return { status: "whatsapp", url, text };
  return { status: "not-configured", text };
}

export type ContactResult =
  | { status: "sent" }
  | { status: "not-configured" }
  | { status: "error"; message: string };

export async function submitContact(values: ContactValues): Promise<ContactResult> {
  if (!restaurant.endpoints.contact) return { status: "not-configured" };
  try {
    const res = await fetch(restaurant.endpoints.contact, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    if (!res.ok) throw new Error(`Request failed (${res.status})`);
    return { status: "sent" };
  } catch {
    return {
      status: "error",
      message: "Your message could not be sent. Please try again in a moment.",
    };
  }
}

/** Plain-text contact message, used for the email / WhatsApp fallbacks. */
export function buildContactText(v: ContactValues): string {
  return [
    `Message for ${restaurant.name}`,
    "",
    v.message.trim(),
    "",
    `Name: ${v.name.trim()}`,
    v.phone.trim() ? `Phone: ${v.phone.trim()}` : "",
    v.email.trim() ? `Email: ${v.email.trim()}` : "",
  ]
    .filter((row, i) => row !== "" || i < 3)
    .join("\n");
}

export const mailtoLink = (subject: string, body: string) =>
  `mailto:${restaurant.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
