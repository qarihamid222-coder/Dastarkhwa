import { useState } from "react";
import { menuCategories, menuItems } from "../data/menu";
import { useI18n } from "../i18n/LanguageContext";
import { MenuCard } from "./MenuCard";

/** Category filter + grid of menu cards. */
export function MenuBrowser() {
  const { t } = useI18n();
  const [active, setActive] = useState("all");
  const visible = active === "all" ? menuItems : menuItems.filter((i) => i.category === active);
  const filters = [{ id: "all", label: t("menu.all") }, ...menuCategories.map((c) => ({ id: c.id, label: t(c.labelKey) }))];

  return (
    <div>
      <div className="filters" role="group" aria-label={t("menu.filter")}>
        {filters.map((c) => (
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
        {t("menu.showing", { n: visible.length })}
      </p>
      {visible.length === 0 ? (
        <p className="empty">{t("menu.empty")}</p>
      ) : (
        <div className="grid-cards">
          {visible.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
