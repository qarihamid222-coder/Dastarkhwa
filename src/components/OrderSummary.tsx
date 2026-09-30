import { formatPrice } from "../lib/format";
import { calculateTotal } from "../lib/orderService";
import type { OrderLine } from "../lib/orderService";
import { useCart } from "../context/CartContext";
import { useI18n } from "../i18n/LanguageContext";
import { getMenuItem, itemText } from "../data/menu";
import { IconMinus, IconPlus, IconTrash } from "./Icons";

export function OrderSummary({ lines }: { lines: OrderLine[] }) {
  const { setQuantity, remove } = useCart();
  const { lang, t } = useI18n();
  const total = calculateTotal(lines);

  const totalText = total.incomplete
    ? total.amount > 0
      ? t("order.plusPending", { amount: formatPrice(total.amount, t) })
      : t("order.tbc")
    : formatPrice(total.amount, t);

  return (
    <div className="summary">
      <h2 className="summary__title">{t("order.summary")}</h2>
      {lines.length === 0 ? (
        <p className="summary__empty">{t("order.empty")}</p>
      ) : (
        <ul className="summary__list">
          {lines.map((l) => {
            const item = getMenuItem(l.id);
            const name = item ? itemText(item, lang).name : l.name;
            return (
              <li key={l.id} className="summary__line">
                <div className="summary__info">
                  <span className="summary__name">{name}</span>
                  <span className={`summary__price${l.price === null ? " price--missing" : ""}`}>
                    {l.price === null ? formatPrice(null, t) : t("order.each", { price: formatPrice(l.price, t) })}
                  </span>
                </div>
                <div className="qty" role="group" aria-label={t("order.qty", { name })}>
                  <button type="button" onClick={() => setQuantity(l.id, l.quantity - 1)} aria-label={t("order.dec", { name })}>
                    <IconMinus />
                  </button>
                  <span aria-live="polite">{l.quantity}</span>
                  <button type="button" onClick={() => setQuantity(l.id, l.quantity + 1)} aria-label={t("order.inc", { name })}>
                    <IconPlus />
                  </button>
                  <button type="button" className="qty__remove" onClick={() => remove(l.id)} aria-label={t("order.remove", { name })}>
                    <IconTrash />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      <div className="summary__total">
        <span>{t("order.total")}</span>
        <strong>{totalText}</strong>
      </div>
      {total.incomplete && lines.length > 0 && <p className="summary__note">{t("order.pendingNote")}</p>}
    </div>
  );
}
