import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { getMenuItem, isAvailable } from "../data/menu";
import type { OrderLine } from "../lib/orderService";

interface CartContextValue {
  lines: OrderLine[];
  count: number;
  add: (id: string, quantity?: number) => void;
  setQuantity: (id: string, quantity: number) => void;
  remove: (id: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "kbc-cart";
const MAX_QTY = 50;

/** Only ids/quantities are stored; name and price are always re-read from the menu data. */
type Stored = { id: string; quantity: number }[];

function load(): Stored {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (p): p is { id: string; quantity: number } =>
        typeof p?.id === "string" && Number.isInteger(p?.quantity) && p.quantity > 0,
    );
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [stored, setStored] = useState<Stored>(load);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
    } catch {
      /* storage unavailable — cart still works in memory */
    }
  }, [stored]);

  const add = useCallback((id: string, quantity = 1) => {
    const item = getMenuItem(id);
    if (!item || !isAvailable(item)) return;
    setStored((prev) => {
      const existing = prev.find((l) => l.id === id);
      if (existing)
        return prev.map((l) =>
          l.id === id ? { ...l, quantity: Math.min(MAX_QTY, l.quantity + quantity) } : l,
        );
      return [...prev, { id, quantity: Math.min(MAX_QTY, quantity) }];
    });
  }, []);

  const setQuantity = useCallback((id: string, quantity: number) => {
    setStored((prev) =>
      quantity <= 0
        ? prev.filter((l) => l.id !== id)
        : prev.map((l) => (l.id === id ? { ...l, quantity: Math.min(MAX_QTY, quantity) } : l)),
    );
  }, []);

  const remove = useCallback((id: string) => setStored((p) => p.filter((l) => l.id !== id)), []);
  const clear = useCallback(() => setStored([]), []);

  const value = useMemo<CartContextValue>(() => {
    const lines: OrderLine[] = stored.flatMap((s) => {
      const item = getMenuItem(s.id);
      return item && isAvailable(item)
        ? [{ id: item.id, name: item.name, price: item.price, quantity: s.quantity }]
        : [];
    });
    return {
      lines,
      count: lines.reduce((n, l) => n + l.quantity, 0),
      add,
      setQuantity,
      remove,
      clear,
    };
  }, [stored, add, setQuantity, remove, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
