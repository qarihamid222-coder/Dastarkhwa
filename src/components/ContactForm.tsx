import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { submitContact } from "../lib/orderService";
import { validateContact } from "../lib/validation";
import type { ContactField, ContactValues, Errors } from "../lib/validation";
import { Button } from "./Button";
import { TextArea, TextField } from "./FormField";

const empty: ContactValues = { name: "", phone: "", email: "", message: "" };
type Status = "idle" | "sending" | "sent" | "not-configured" | "error";

export function ContactForm() {
  const [values, setValues] = useState<ContactValues>(empty);
  const [errors, setErrors] = useState<Errors<ContactField>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const set = (k: ContactField) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValues((v) => ({ ...v, [k]: e.target.value }));

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
    } else if (res.status === "error") {
      setErrorMessage(res.message);
      setStatus("error");
    } else {
      setStatus("not-configured");
    }
  };

  if (status === "sent") {
    return (
      <div className="notice notice--ok" role="status">
        <h3>Message sent</h3>
        <p>Thank you for contacting us. We will get back to you soon.</p>
        <Button variant="ghost" onClick={() => setStatus("idle")}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      {status === "error" && (
        <div className="notice notice--error" role="alert">
          {errorMessage}
        </div>
      )}
      {status === "not-configured" && (
        <div className="notice notice--info" role="status">
          The contact form is not connected to an inbox yet, so your message was not sent. Please use the phone or
          WhatsApp details on this page instead.
        </div>
      )}
      <div className="grid-2">
        <TextField id="contact-name" label="Name" value={values.name} onChange={set("name")} error={errors.name} autoComplete="name" maxLength={80} />
        <TextField id="contact-phone" label="Phone" type="tel" inputMode="tel" value={values.phone} onChange={set("phone")} error={errors.phone} autoComplete="tel" maxLength={20} />
      </div>
      <TextField id="contact-email" label="Email" type="email" value={values.email} onChange={set("email")} error={errors.email} autoComplete="email" maxLength={120} hint="Provide a phone number or an email so we can reply." />
      <TextArea id="contact-message" label="Message" rows={5} value={values.message} onChange={set("message")} error={errors.message} maxLength={1000} />
      <Button type="submit" size="lg" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
