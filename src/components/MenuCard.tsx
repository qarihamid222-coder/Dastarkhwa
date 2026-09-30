import { useNavigate } from "react-router-dom";
import { getCategory, isAvailable } from "../data/menu";
import type { MenuItem } from "../data/menu";
import { formatPrice } from "../lib/format";
import { useCart } from "../context/CartContext";
import { Button } from "./Button";
import { FoodImage } from "./FoodImage";

export function MenuCard({ item }: { item: MenuItem }) {
  const { add } = useCart();
  const navigate = useNavigate();
  const category = getCategory(item.category);
  const available = isAvailable(item);

  const order = () => {
    add(item.id);
    navigate("/order");
  };

  return (
    <article className={`card${available ? "" : " card--off"}`}>
      <FoodImage src={item.image} alt={`${item.name} — sample illustration`} variant={category?.art ?? "biryani"} />
      <div className="card__body">
        {category && <p className="card__cat">{category.label}</p>}
        <h3 className="card__title">{item.name}</h3>
        <p className="card__desc">{item.description}</p>
        <div className="card__foot">
          <p className={`price${item.price === null ? " price--missing" : ""}`}>
            <span className="visually-hidden">Price: </span>
            {formatPrice(item.price)}
          </p>
          {available ? (
            <Button size="md" onClick={order} aria-label={`Order ${item.name}`}>
              Order Now
            </Button>
          ) : (
            <span className="badge">Unavailable</span>
          )}
        </div>
      </div>
    </article>
  );
}
