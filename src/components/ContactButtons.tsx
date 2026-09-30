import { restaurant } from "../data/restaurant";
import { useI18n } from "../i18n/LanguageContext";
import { IconChat, IconMail, IconPhone } from "./Icons";

export const telHref = `tel:${restaurant.phoneIntl}`;
export const whatsappHref = `https://wa.me/${restaurant.whatsappNumber}`;
export const emailHref = `mailto:${restaurant.email}`;

/** Call / WhatsApp (and optionally Email) buttons using the configured restaurant contacts. */
export function ContactButtons({ email = false, className = "" }: { email?: boolean; className?: string }) {
  const { t } = useI18n();
  return (
    <div className={`contact-buttons ${className}`.trim()}>
      <a className="btn btn--primary btn--lg" href={telHref} aria-label={t("action.callAria")}>
        <IconPhone /> {t("action.call")}
      </a>
      <a
        className="btn btn--whatsapp btn--lg"
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t("action.whatsappAria")}
      >
        <IconChat /> {t("action.whatsapp")}
      </a>
      {email && (
        <a className="btn btn--secondary btn--lg" href={emailHref} aria-label={t("action.emailAria")}>
          <IconMail /> {t("action.email")}
        </a>
      )}
    </div>
  );
}

/** Fixed bottom bar on phones for one-tap calling and WhatsApp. */
export function MobileActionBar() {
  const { t } = useI18n();
  return (
    <div className="action-bar" role="region" aria-label={t("action.bar")}>
      <a className="action-bar__btn action-bar__btn--call" href={telHref} aria-label={t("action.callAria")}>
        <IconPhone /> {t("action.call")}
      </a>
      <a
        className="action-bar__btn action-bar__btn--wa"
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t("action.whatsappAria")}
      >
        <IconChat /> {t("action.whatsapp")}
      </a>
    </div>
  );
}
