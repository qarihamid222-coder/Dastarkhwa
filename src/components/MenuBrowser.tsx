import { useState } from "react";
import { menuCategories, menuItems } from "../data/menu";
import type { MenuItem } from "../data/menu";
import { useI18n } from "../i18n/LanguageContext";
import { MenuCard } from "./MenuCard";
import { IconCup } from "./Icons";

/**
 * Menu with clear groups: Attock Beef Biryani, Attock Beef Pulao, then the rest. The extra
 * "Biryani + Cold Drink Combo" filter shows the biryani items that include a cold drink
 * (it is a view of existing items, not duplicate items).
 */
export function MenuBrowser() {
  const { t } = useI18n();
  const [active, setActive] = useState("all");

  const groups: { id: string; title: string; items: MenuItem[] }[] =
    active === "combo"
      ? [{ id: "combo", title: t("menu.combo"), items: menuItems.filter((i) => i.drinkIncluded) }]
      : menuCategories
          .filter((c) => active === "all" || c.id === active)
          .map((c) => ({ id: c.id, title: t(c.labelKey), items: menuItems.filter((i) => i.category === c.id) }))
          .filter((g) => g.items.length > 0);

  const total = groups.reduce((n, g) => n + g.items.length, 0);
  const [first, second, ...rest] = menuCategories;
  const filters = [
    { id: "all", label: t("menu.all") },
    ...(first ? [{ id: first.id, label: t(first.labelKey) }] : []),
    ...(second ? [{ id: second.id, label: t(second.labelKey) }] : []),
    { id: "combo", label: t("menu.combo") },
    ...rest.map((c) => ({ id: c.id, label: t(c.labelKey) })),
  ];

  return (
    <div>
      <div className="menu-banner">
        <span className="menu-banner__icon">
          <IconCup />
        </span>
        <p>{t("menu.comboBanner")}</p>
      </div>
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
        {t("menu.showing", { n: total })}
      </p>
      {total === 0 ? (
        <p className="empty">{t("menu.empty")}</p>
      ) : (
        groups.map((g) => (
          <section key={g.id} className="menu-group" aria-labelledby={`group-${g.id}`}>
            <h2 id={`group-${g.id}`} className="menu-group__title">
              {g.title}
            </h2>
            <div className="grid-cards">
              {g.items.map((item) => (
                <MenuCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}
