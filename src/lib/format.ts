export const PRICE_PLACEHOLDER = "Add Price";

export const formatPrice = (price: number | null): string =>
  price === null ? PRICE_PLACEHOLDER : `Rs. ${price.toLocaleString("en-PK")}`;
