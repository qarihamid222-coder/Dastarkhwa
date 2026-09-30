import { formatPrice } from "../lib/format";
import { calculateTotal, totalLabel } from "../lib/orderService";
import type { OrderLine } from "../lib/orderService";
import { useCart } from "../context/CartContext";
import { IconMinus, IconPlus, IconTrash } from "./Icons";

export function OrderSummary({ lines, editable = true }: { lines: OrderLine[]; editable?: boolean }) {
  const { setQuantity, remove } = useCart();
  const total = calculateTotal(lines);

  return (
    <div className="summary">
      <h2 className="summary__title">Order summary</h2>
      {lines.length === 0 ? (
        <p className="summary__empty">Your order is empty. Add an item to get started.</p>
      ) : (
        <ul className="summary__list">
          {lines.map((l) => (
            <li key={l.id} className="summary__line">
              <div className="summary__info">
                <span className="summary__name">{l.name}</span>
                <span className={`summary__price${l.price === null ? " price--missing" : ""}`}>
                  {l.price === null ? formatPrice(null) : `${formatPrice(l.price)} each`}
                </span>
              </div>
              {editable ? (
                <div className="qty" role="group" aria-label={`Quantity for ${l.name}`}>
                  <button type="button" onClick={() => setQuantity(l.id, l.quantity - 1)} aria-label={`Decrease ${l.name}`}>
                    <IconMinus />
                  </button>
                  <span aria-live="polite">{l.quantity}</span>
                  <button type="button" onClick={() => setQuantity(l.id, l.quantity + 1)} aria-label={`Increase ${l.name}`}>
                    <IconPlus />
                  </button>
                  <button type="button" className="qty__remove" onClick={() => remove(l.id)} aria-label={`Remove ${l.name}`}>
                    <IconTrash />
                  </button>
                </div>
              ) : (
                <span>× {l.quantity}</span>
              )}
            </li>
          ))}
        </ul>
      )}
      <div className="summary__total">
        <span>Total</span>
        <strong>{totalLabel(total)}</strong>
      </div>
      {total.incomplete && lines.length > 0 && (
        <p className="summary__note">
          Prices for some items have not been added yet, so the final amount will be confirmed by the restaurant.
        </p>
      )}
    </div>
  );
}
