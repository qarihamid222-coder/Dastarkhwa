import { useNavigate } from "react-router-dom";
import { getCategory, isAvailable, itemText } from "../data/menu";
import type { MenuItem } from "../data/menu";
import { formatPrice } from "../lib/format";
import { useCart } from "../context/CartContext";
import { useI18n } from "../i18n/LanguageContext";
import { Button } from "./Button";
import { FoodImage } from "./FoodImage";

export function MenuCard({ item }: { item: MenuItem }) {
  const { add } = useCart();
  const { lang, t } = useI18n();
  const navigate = useNavigate();
  const category = getCategory(item.category);
  const available = isAvailable(item);
  const text = itemText(item, lang);

  const order = () => {
    add(item.id);
    navigate("/order");
  };

  return (
    <article className={`card${available ? "" : " card--off"}`}>
      <FoodImage src={item.image} alt={item.image ? text.name : t("menu.imageAlt", { name: text.name })} variant={category?.art ?? "biryani"} />
      <div className="card__body">
        {category && <p className="card__cat">{t(category.labelKey)}</p>}
        <h3 className="card__title">{text.name}</h3>
        <p className="card__desc">{text.description}</p>
        <div className="card__foot">
          <p className={`price${item.price === null ? " price--missing" : ""}`}>
            <span className="visually-hidden">{t("menu.price")} </span>
            {formatPrice(item.price, t)}
            {text.priceNote && item.price !== null && <span className="price__note"> / {text.priceNote}</span>}
          </p>
          {available ? (
            <Button size="md" onClick={order} aria-label={t("menu.orderItem", { name: text.name })}>
              {t("menu.orderNow")}
            </Button>
          ) : (
            <span className="badge">{t("menu.unavailable")}</span>
          )}
        </div>
      </div>
    </article>
  );
}
