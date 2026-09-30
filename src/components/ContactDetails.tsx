import type { ReactNode } from "react";
import { restaurant } from "../data/restaurant";
import { useI18n } from "../i18n/LanguageContext";
import { emailHref, telHref, whatsappHref } from "./ContactButtons";
import { IconChat, IconClock, IconMail, IconPhone, IconPin } from "./Icons";

/** Numbers and emails always read left-to-right, even inside Urdu (RTL) text. */
const Ltr = ({ children }: { children: ReactNode }) => <bdi dir="ltr">{children}</bdi>;

/** Shared restaurant contact block (Location page, Contact page, footer). */
export function ContactDetails({ compact = false }: { compact?: boolean }) {
  const { lang, t } = useI18n();
  const ur = lang === "ur";

  const rows: { icon: ReactNode; label: string; value: ReactNode }[] = [
    { icon: <IconPin />, label: t("detail.address"), value: ur ? restaurant.addressUr : restaurant.address },
    {
      icon: <IconPhone />,
      label: t("detail.phone"),
      value: (
        <a href={telHref}>
          <Ltr>{restaurant.phone}</Ltr>
        </a>
      ),
    },
    {
      icon: <IconChat />,
      label: t("detail.whatsapp"),
      value: (
        <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
          <Ltr>{restaurant.whatsappDisplay}</Ltr>
        </a>
      ),
    },
  ];
  if (!compact)
    rows.push({
      icon: <IconMail />,
      label: t("detail.email"),
      value: (
        <a href={emailHref}>
          <Ltr>{restaurant.email}</Ltr>
        </a>
      ),
    });
  rows.push({
    icon: <IconClock />,
    label: t("detail.hours"),
    value: (ur ? restaurant.openingHoursUr : restaurant.openingHours).map((h) => <span key={h}>{h}</span>),
  });

  return (
    <ul className="details">
      {rows.map((r) => (
        <li key={r.label} className="details__row">
          <span className="details__icon">{r.icon}</span>
          <span className="details__text">
            <span className="details__label">{r.label}</span>
            <span className="details__value">{r.value}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}
