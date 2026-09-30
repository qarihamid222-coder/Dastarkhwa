import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import { isAvailable, itemText, menuCategories, menuItems } from "../data/menu";
import { useCart } from "../context/CartContext";
import { useI18n } from "../i18n/LanguageContext";
import { submitOrder } from "../lib/orderService";
import type { OrderResult } from "../lib/orderService";
import { validateOrder } from "../lib/validation";
import type { Errors, OrderField } from "../lib/validation";
import { Button } from "./Button";
import { telHref } from "./ContactButtons";
import { TextArea, TextField } from "./FormField";
import { OrderSummary } from "./OrderSummary";
import { IconChat, IconPlus } from "./Icons";

type Fulfilment = "delivery" | "pickup";

export function OrderForm() {
  const { lines, add, clear } = useCart();
  const { lang, t } = useI18n();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [fulfilment, setFulfilment] = useState<Fulfilment>("pickup");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [pick, setPick] = useState("");
  const [errors, setErrors] = useState<Errors<OrderField>>({});
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<OrderResult | null>(null);
  const [copied, setCopied] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (result && result.status !== "error") {
      resultRef.current?.scrollIntoView({ block: "start" });
      resultRef.current?.querySelector("h2")?.focus({ preventScroll: true });
    }
  }, [result]);

  const available = menuItems.filter(isAvailable);

  const onAdd = () => {
    if (!pick) return;
    add(pick);
    setPick("");
    setErrors((e) => ({ ...e, items: undefined }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const found = validateOrder({ name, phone, fulfilment, address, itemCount: lines.length });
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = (["name", "phone", "items", "address"] as const).find((k) => found[k]);
      document.getElementById(first === "items" ? "add-item" : `order-${first}`)?.focus();
      return;
    }
    setBusy(true);
    const res = await submitOrder({ name, phone, fulfilment, address, notes, lines });
    setBusy(false);
    setResult(res);
    if (res.status === "sent") clear();
  };

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  if (result && result.status !== "error") {
    return (
      <div className="notice notice--ok" role="status" ref={resultRef}>
        <h2 tabIndex={-1}>{result.status === "sent" ? t("order.doneTitle") : t("order.readyTitle")}</h2>
        {result.status === "sent" && <p>{t("order.doneText")}</p>}
        {result.status === "whatsapp" && (
          <>
            <p>{t("order.waText")}</p>
            <a className="btn btn--whatsapp btn--lg btn--block" href={result.url} target="_blank" rel="noopener noreferrer">
              <IconChat /> {t("order.waButton")}
            </a>
            <h3 className="order-text__title">{t("order.preview")}</h3>
            <pre className="order-text" dir="ltr">{result.text}</pre>
          </>
        )}
        {result.status === "not-configured" && (
          <>
            <p>{t("order.manualText")}</p>
            <pre className="order-text" dir="ltr">{result.text}</pre>
            <Button variant="secondary" onClick={() => copy(result.text)}>
              {copied ? t("order.copied") : t("order.copy")}
            </Button>
          </>
        )}
        <p className="notice__actions">
          <Button
            variant="ghost"
            onClick={() => {
              clear();
              setResult(null);
              setNotes("");
            }}
          >
            {t("order.new")}
          </Button>
        </p>
      </div>
    );
  }

  return (
    <form className="order-grid" onSubmit={onSubmit} noValidate>
      <div className="order-grid__form">
        {result?.status === "error" && (
          <div className="notice notice--error" role="alert">
            {t("order.sendError")}
          </div>
        )}

        <fieldset className="fieldset">
          <legend>{t("order.step1")}</legend>
          <div className="add-item">
            <div className="field">
              <label htmlFor="add-item">{t("order.addLabel")}</label>
              <select id="add-item" value={pick} onChange={(e) => setPick(e.target.value)}>
                <option value="">{t("order.select")}</option>
                {menuCategories.map((c) => {
                  const inCat = available.filter((i) => i.category === c.id);
                  return inCat.length ? (
                    <optgroup key={c.id} label={t(c.labelKey)}>
                      {inCat.map((i) => (
                        <option key={i.id} value={i.id}>
                          {itemText(i, lang).name}
                        </option>
                      ))}
                    </optgroup>
                  ) : null;
                })}
              </select>
            </div>
            <Button type="button" variant="secondary" onClick={onAdd} disabled={!pick}>
              <IconPlus /> {t("order.add")}
            </Button>
          </div>
          {errors.items && (
            <p className="field__error" role="alert">
              {t(errors.items)}
            </p>
          )}
          <p className="fieldset__hint">
            <Link to="/menu">{t("order.browse")}</Link> {t("order.hint")}
          </p>
        </fieldset>

        <fieldset className="fieldset">
          <legend>{t("order.step2")}</legend>
          <div className="segmented" role="radiogroup" aria-label={t("order.fulfilment")}>
            {(["pickup", "delivery"] as const).map((v) => (
              <label key={v} className={`segmented__opt${fulfilment === v ? " is-on" : ""}`}>
                <input
                  type="radio"
                  name="fulfilment"
                  value={v}
                  checked={fulfilment === v}
                  onChange={() => setFulfilment(v)}
                />
                {v === "pickup" ? t("order.pickup") : t("order.delivery")}
              </label>
            ))}
          </div>
          {fulfilment === "delivery" && (
            <TextArea
              id="order-address"
              label={t("order.address")}
              rows={3}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              error={errors.address && t(errors.address)}
              autoComplete="street-address"
              maxLength={300}
            />
          )}
        </fieldset>

        <fieldset className="fieldset">
          <legend>{t("order.step3")}</legend>
          <div className="grid-2">
            <TextField
              id="order-name"
              label={t("order.name")}
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={errors.name && t(errors.name)}
              autoComplete="name"
              maxLength={80}
            />
            <TextField
              id="order-phone"
              label={t("order.phone")}
              type="tel"
              inputMode="tel"
              dir="ltr"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              error={errors.phone && t(errors.phone)}
              autoComplete="tel"
              maxLength={20}
            />
          </div>
          <TextArea
            id="order-notes"
            label={t("order.notes")}
            optional
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            maxLength={400}
          />
        </fieldset>
      </div>

      <aside className="order-grid__summary" aria-label="Order summary">
        <OrderSummary lines={lines} />
        <Button type="submit" size="lg" className="btn--block" disabled={busy}>
          {busy ? t("order.sending") : t("order.place")}
        </Button>
        <p className="summary__note">{t("order.paymentNote")}</p>
        <a className="btn btn--secondary btn--block" href={telHref}>
          {t("action.call")}
        </a>
      </aside>
    </form>
  );
}
