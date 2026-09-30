import { useState } from "react";
import { menuCategories, menuItems } from "../data/menu";
import { MenuCard } from "./MenuCard";

/** Category filter + grid of menu cards. */
export function MenuBrowser() {
  const [active, setActive] = useState("all");
  const visible = active === "all" ? menuItems : menuItems.filter((i) => i.category === active);

  return (
    <div>
      <div className="filters" role="group" aria-label="Filter menu by category">
        {[{ id: "all", label: "All" }, ...menuCategories].map((c) => (
          <button
            key={c.id}
            type="button"
            className={`chip${active === c.id ? " is-on" : ""}`}
            aria-pressed={active === c.id}
            onClick={() => setActive(c.id)}
          >
            {c.label}
          </button>
        ))}
      </div>
      <p className="visually-hidden" aria-live="polite">
        Showing {visible.length} {visible.length === 1 ? "item" : "items"}
      </p>
      {visible.length === 0 ? (
        <p className="empty">No items are available in this category right now. Please check back soon.</p>
      ) : (
        <div className="grid-cards">
          {visible.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      )}
      <p className="menu-note">
        Menu items, descriptions and prices shown are sample content and will be updated by the restaurant.
      </p>
    </div>
  );
}
