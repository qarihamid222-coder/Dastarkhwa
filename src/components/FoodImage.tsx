import { useState } from "react";
import type { ArtVariant } from "../data/menu";
import { FoodArt } from "./FoodArt";

interface Props {
  src?: string;
  /** Used if `src` is missing or fails to load. */
  fallbackSrc?: string;
  alt: string;
  variant: ArtVariant;
  /** "contain" shows the whole picture (never cropped) on a soft blurred backdrop; "cover" fills the frame. */
  fit?: "cover" | "contain";
}

/** Shows the photo when it exists; otherwise the fallback photo; otherwise the built-in artwork. */
export function FoodImage({ src, fallbackSrc, alt, variant, fit = "cover" }: Props) {
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
    <div className={`food-image${fit === "contain" ? " food-image--contain" : ""}`}>
      {fit === "contain" && <img className="food-image__backdrop" src={current} alt="" aria-hidden="true" decoding="async" />}
      <img
        key={current}
        className="food-image__main"
        src={current}
        alt={alt}
        loading="lazy"
        decoding="async"
        width={472}
        height={352}
        onError={() => setFailed((n) => n + 1)}
      />
    </div>
  );
}
