import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import { isAvailable, menuCategories, menuItems } from "../data/menu";
import { useCart } from "../context/CartContext";
import { submitOrder } from "../lib/orderService";
import type { OrderResult } from "../lib/orderService";
import { validateOrder } from "../lib/validation";
import type { Errors, OrderField } from "../lib/validation";
import { Button } from "./Button";
import { TextArea, TextField } from "./FormField";
import { OrderSummary } from "./OrderSummary";
import { IconPlus } from "./Icons";

type Fulfilment = "delivery" | "pickup";

export function OrderForm() {
  const { lines, add, clear } = useCart();
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
      <div className="notice notice--ok" role="status">
        <h2>{result.status === "sent" ? "Order received" : "Your order is ready to send"}</h2>
        {result.status === "sent" && <p>Thank you! We have received your order and will contact you shortly.</p>}
        {result.status === "whatsapp" && (
          <>
            <p>Tap the button below to send your order to us on WhatsApp.</p>
            <a className="btn btn--primary btn--lg" href={result.url} target="_blank" rel="noopener noreferrer">
              Send order on WhatsApp
            </a>
          </>
        )}
        {result.status === "not-configured" && (
          <>
            <p>
              Online order sending has not been connected yet. Your order details are shown below — copy them and
              share them with the restaurant, or call the restaurant to place the order.
            </p>
            <pre className="order-text">{result.text}</pre>
            <Button variant="secondary" onClick={() => copy(result.text)}>
              {copied ? "Copied!" : "Copy order details"}
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
            Start a new order
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
            {result.message}
          </div>
        )}

        <fieldset className="fieldset">
          <legend>1. Choose your items</legend>
          <div className="add-item">
            <div className="field">
              <label htmlFor="add-item">Add a menu item</label>
              <select id="add-item" value={pick} onChange={(e) => setPick(e.target.value)}>
                <option value="">Select an item…</option>
                {menuCategories.map((c) => {
                  const inCat = available.filter((i) => i.category === c.id);
                  return inCat.length ? (
                    <optgroup key={c.id} label={c.label}>
                      {inCat.map((i) => (
                        <option key={i.id} value={i.id}>
                          {i.name}
                        </option>
                      ))}
                    </optgroup>
                  ) : null;
                })}
              </select>
            </div>
            <Button type="button" variant="secondary" onClick={onAdd} disabled={!pick}>
              <IconPlus /> Add
            </Button>
          </div>
          {errors.items && (
            <p className="field__error" role="alert">
              {errors.items}
            </p>
          )}
          <p className="fieldset__hint">
            Browse the full <Link to="/menu">menu</Link>. Drinks, sides and extras can be added from the list above.
          </p>
        </fieldset>

        <fieldset className="fieldset">
          <legend>2. Delivery or pickup</legend>
          <div className="segmented" role="radiogroup" aria-label="Delivery or pickup">
            {(["pickup", "delivery"] as const).map((v) => (
              <label key={v} className={`segmented__opt${fulfilment === v ? " is-on" : ""}`}>
                <input
                  type="radio"
                  name="fulfilment"
                  value={v}
                  checked={fulfilment === v}
                  onChange={() => setFulfilment(v)}
                />
                {v === "pickup" ? "Pickup" : "Delivery"}
              </label>
            ))}
          </div>
          {fulfilment === "delivery" && (
            <TextArea
              id="order-address"
              label="Delivery address"
              rows={3}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              error={errors.address}
              autoComplete="street-address"
              maxLength={300}
            />
          )}
        </fieldset>

        <fieldset className="fieldset">
          <legend>3. Your details</legend>
          <div className="grid-2">
            <TextField
              id="order-name"
              label="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={errors.name}
              autoComplete="name"
              maxLength={80}
            />
            <TextField
              id="order-phone"
              label="Phone number"
              type="tel"
              inputMode="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              error={errors.phone}
              autoComplete="tel"
              maxLength={20}
            />
          </div>
          <TextArea
            id="order-notes"
            label="Special instructions"
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
          {busy ? "Sending…" : "Place order"}
        </Button>
        <p className="summary__note">
          No online payment is taken on this website. Payment is arranged with the restaurant.
        </p>
      </aside>
    </form>
  );
}
