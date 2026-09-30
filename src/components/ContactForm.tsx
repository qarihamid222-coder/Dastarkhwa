import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { restaurant } from "../data/restaurant";
import { useI18n } from "../i18n/LanguageContext";
import { buildContactText, mailtoLink, submitContact } from "../lib/orderService";
import { validateContact } from "../lib/validation";
import type { ContactField, ContactValues, Errors } from "../lib/validation";
import { Button } from "./Button";
import { TextArea, TextField } from "./FormField";
import { IconChat, IconMail } from "./Icons";

const empty: ContactValues = { name: "", phone: "", email: "", message: "" };
type Status = "idle" | "sending" | "sent" | "not-configured" | "error";

export function ContactForm() {
  const { t } = useI18n();
  const [values, setValues] = useState<ContactValues>(empty);
  const [errors, setErrors] = useState<Errors<ContactField>>({});
  const [status, setStatus] = useState<Status>("idle");

  const set = (k: ContactField) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValues((v) => ({ ...v, [k]: e.target.value }));
  const err = (k: ContactField) => (errors[k] ? t(errors[k]) : undefined);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const found = validateContact(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = (["name", "phone", "email", "message"] as const).find((k) => found[k]);
      document.getElementById(`contact-${first}`)?.focus();
      return;
    }
    setStatus("sending");
    const res = await submitContact(values);
    if (res.status === "sent") {
      setValues(empty);
      setStatus("sent");
    } else {
      setStatus(res.status);
    }
  };

  if (status === "sent") {
    return (
      <div className="notice notice--ok" role="status">
        <h3>{t("contact.sentTitle")}</h3>
        <p>{t("contact.sentText")}</p>
        <Button variant="ghost" onClick={() => setStatus("idle")}>
          {t("contact.another")}
        </Button>
      </div>
    );
  }

  const text = buildContactText(values);

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      {status === "error" && (
        <div className="notice notice--error" role="alert">
          {t("contact.error")}
        </div>
      )}
      {status === "not-configured" && (
        <div className="notice notice--info" role="status">
          <p>{t("contact.notConfigured")}</p>
          <div className="contact-buttons">
            <a className="btn btn--secondary" href={mailtoLink(`Message for ${restaurant.name}`, text)}>
              <IconMail /> {t("contact.viaEmail")}
            </a>
            <a
              className="btn btn--whatsapp"
              href={`https://wa.me/${restaurant.whatsappNumber}?text=${encodeURIComponent(text)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconChat /> {t("contact.viaWhatsapp")}
            </a>
          </div>
        </div>
      )}
      <div className="grid-2">
        <TextField id="contact-name" label={t("contact.name")} value={values.name} onChange={set("name")} error={err("name")} autoComplete="name" maxLength={80} />
        <TextField id="contact-phone" label={t("contact.phone")} type="tel" inputMode="tel" dir="ltr" value={values.phone} onChange={set("phone")} error={err("phone")} autoComplete="tel" maxLength={20} />
      </div>
      <TextField id="contact-email" label={t("contact.email")} type="email" dir="ltr" value={values.email} onChange={set("email")} error={err("email")} autoComplete="email" maxLength={120} hint={t("contact.hint")} />
      <TextArea id="contact-message" label={t("contact.message")} rows={5} value={values.message} onChange={set("message")} error={err("message")} maxLength={1000} />
      <Button type="submit" size="lg" disabled={status === "sending"}>
        {status === "sending" ? t("contact.sending") : restaurant.endpoints.contact ? t("contact.send") : t("contact.sendVia")}
      </Button>
    </form>
  );
}
