import { useState } from "react";
import type { ArtVariant } from "../data/menu";
import { FoodArt } from "./FoodArt";

interface Props {
  src?: string;
  alt: string;
  variant: ArtVariant;
}

/** Shows the item photo when provided; falls back to built-in artwork if missing or broken. */
export function FoodImage({ src, alt, variant }: Props) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) {
    return (
      <div className="food-image" role="img" aria-label={alt}>
        <FoodArt variant={variant} />
      </div>
    );
  }
  return (
    <div className="food-image">
      <img src={src} alt={alt} loading="lazy" decoding="async" width={472} height={352} onError={() => setFailed(true)} />
    </div>
  );
}
