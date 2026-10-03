import { useNavigate } from "react-router-dom";
import { getCategory, isAvailable, itemText } from "../data/menu";
import type { MenuItem } from "../data/menu";
import { formatPrice } from "../lib/format";
import { useCart } from "../context/CartContext";
import { useI18n } from "../i18n/LanguageContext";
import { Button } from "./Button";
import { FoodImage } from "./FoodImage";

function Plates({ count }: { count: number }) {
  return (
    <span className="plates" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <svg key={i} viewBox="0 0 24 24" focusable="false">
          <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="12" cy="12" r="4.5" fill="currentColor" />
        </svg>
      ))}
    </span>
  );
}

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
    <article className={`card${available ? "" : " card--off"}${item.portion ? ` card--${item.portion}` : ""}`}>
      <div className="card__media">
        <FoodImage
          src={item.image}
          fallbackSrc={item.imageFallback}
          fit={item.imageFit}
          alt={item.image ? text.name : t("menu.imageAlt", { name: text.name })}
          variant={item.art ?? category?.art ?? "biryani"}
        />
        {item.portion && (
          <span className={`portion portion--${item.portion}`}>
            <Plates count={item.portion === "double" ? 2 : 1} />
            {t(item.portion === "double" ? "portion.double" : "portion.single")}
          </span>
        )}
      </div>
      <div className="card__body">
        {category && <p className="card__cat">{t(category.labelKey)}</p>}
        <h3 className="card__title">{text.name}</h3>
        <p className="card__desc">{text.description}</p>
        <div className="card__foot">
          <p className={`price${item.price === null ? " price--missing" : ""}`}>
            <span className="visually-hidden">{t("menu.price")} </span>
            {formatPrice(item.price, t)}
            {item.drinkIncluded && <span className="price__note"> · {t("menu.comboPrice")}</span>}
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
