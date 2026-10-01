import { useState } from "react";
import type { ArtVariant } from "../data/menu";
import { FoodArt } from "./FoodArt";

interface Props {
  src?: string;
  /** Used if `src` is missing or fails to load. */
  fallbackSrc?: string;
  alt: string;
  variant: ArtVariant;
}

/** Shows the photo when it exists; otherwise the fallback photo; otherwise the built-in artwork. */
export function FoodImage({ src, fallbackSrc, alt, variant }: Props) {
  const sources = [src, fallbackSrc].filter((s): s is string => !!s);
  const [failed, setFailed] = useState(0);
  const current = sources[failed];
  if (!current) {
    return (
      <div className="food-image" role="img" aria-label={alt}>
        <FoodArt variant={variant} />
      </div>
    );
  }
  return (
    <div className="food-image">
      <img key={current} src={current} alt={alt} loading="lazy" decoding="async" width={472} height={352} onError={() => setFailed((n) => n + 1)} />
    </div>
  );
}
