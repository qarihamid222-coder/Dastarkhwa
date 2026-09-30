import { isConfigured, restaurant } from "../data/restaurant";
import type { ReactNode } from "react";
import { IconChat, IconClock, IconMail, IconPhone, IconPin } from "./Icons";

const linkOrText = (value: string, href: string | null): ReactNode =>
  href && isConfigured(value) ? <a href={href}>{value}</a> : <span className="placeholder">{value}</span>;

/** Shared restaurant contact block (Location page, Contact page, footer). */
export function ContactDetails({ compact = false }: { compact?: boolean }) {
  const wa = restaurant.whatsappNumber ? `https://wa.me/${restaurant.whatsappNumber}` : null;
  const tel = isConfigured(restaurant.phone) ? `tel:${restaurant.phone.replace(/[^\d+]/g, "")}` : null;
  const mail = isConfigured(restaurant.email) ? `mailto:${restaurant.email}` : null;

  const rows: { icon: ReactNode; label: string; value: ReactNode }[] = [
    { icon: <IconPin />, label: "Address", value: <span className={isConfigured(restaurant.address) ? "" : "placeholder"}>{restaurant.address}</span> },
    { icon: <IconPhone />, label: "Phone", value: linkOrText(restaurant.phone, tel) },
    { icon: <IconChat />, label: "WhatsApp", value: linkOrText(restaurant.whatsappDisplay, wa) },
  ];
  if (!compact) rows.push({ icon: <IconMail />, label: "Email", value: linkOrText(restaurant.email, mail) });
  rows.push({
    icon: <IconClock />,
    label: "Opening hours",
    value: (
      <>
        {restaurant.openingHours.map((h) => (
          <span key={h} className={isConfigured(h) ? "" : "placeholder"}>
            {h}
          </span>
        ))}
      </>
    ),
  });

  return (
    <ul className="details">
      {rows.map((r) => (
        <li key={r.label} className="details__row">
          <span className="details__icon">{r.icon}</span>
          <span>
            <span className="details__label">{r.label}</span>
            <span className="details__value">{r.value}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}
