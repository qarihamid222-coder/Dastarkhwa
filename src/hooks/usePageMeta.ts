import { useEffect } from "react";

const SUFFIX = "Karachi Biryani Center";
const DEFAULT_DESCRIPTION =
  "Karachi Biryani Center — delicious, aromatic and flavorful biryani inspired by the authentic taste of Karachi.";

/** Updates <title> and meta description per route (client-side SEO for the SPA). */
export function usePageMeta(title?: string, description?: string) {
  useEffect(() => {
    document.title = title
      ? `${title} | ${SUFFIX}`
      : `${SUFFIX} | Authentic Karachi Biryani`;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", description ?? DEFAULT_DESCRIPTION);
  }, [title, description]);
}
