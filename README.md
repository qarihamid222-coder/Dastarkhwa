# Karachi Biryani Center

Restaurant website with menu, ordering flow, contact form and location page.
Built with React, TypeScript, Vite and React Router.

## Run

```bash
npm install
npm run dev        # local development
npm run build      # type-check + production build (output in dist/)
npm run preview    # serve the production build locally
```

When hosting `dist/`, configure the host to serve `index.html` for unknown paths (SPA fallback) so routes like `/menu` work on refresh.

## Editing content

| What | Where |
| --- | --- |
| Address, phone, WhatsApp, email, opening hours, social links (English + Urdu) | `src/data/restaurant.ts` |
| Menu items (English + Urdu), prices, images, availability | `src/data/menu.ts` |
| All other website text, English and Urdu | `src/i18n/translations.ts` |
| Colours and spacing | CSS variables at the top of `src/styles/global.css` |
| Logo | `src/components/Logo.tsx` |

Only the details supplied by the owner are filled in (address, phone/WhatsApp, email, opening hours, biryani full-plate price). Items without a price are `null` and display as "Add Price"; set a number (PKR) to enable order totals. To use real food photos, set `image` on a menu item (missing or broken images fall back to built-in artwork).

## Urdu (RTL) and Nastaliq fonts

The header has an English / اردو toggle (remembered in the browser). Urdu switches the page to right-to-left and uses a Nastaliq font. The Urdu font can be chosen from the footer (and the mobile menu):

1. **Mehr Nastaliq**
2. **Noori Nastaliq**
3. **Noto Nastaliq Urdu** (default)

Noto Nastaliq Urdu is bundled with the site (self-hosted, loaded only when Urdu is used), so Urdu always renders correctly. Mehr and Noori Nastaliq are commercial/third-party fonts that cannot be bundled without a licence, so they are used when installed on the visitor's device; otherwise the browser automatically falls back to the closest Nastaliq font. If you hold a licence for either font, add it with an `@font-face` rule in `src/styles/global.css` using the family names `Mehr Nastaliq Web` / `Noori Nastaleeq`. Font stacks are defined in the "Urdu (RTL)" section of `global.css`.

## Connecting order and contact channels

Copy `.env.example` to `.env` and set (all values are public because they are bundled into the site):

- `VITE_WHATSAPP_NUMBER` — optional override; the site already uses 03237185867 (WhatsApp) by default.
- `VITE_ORDER_ENDPOINT` — POST orders as JSON to your backend/API.
- `VITE_CONTACT_ENDPOINT` — POST contact messages as JSON to a form service/backend.
- `VITE_MAP_EMBED_URL` — Google Maps embed URL for the Find Us page.

Orders are sent through WhatsApp ("Send order on WhatsApp") and the contact form offers email / WhatsApp buttons until `VITE_CONTACT_ENDPOINT` is set. Order and contact delivery lives in `src/lib/orderService.ts`, so a payment provider or another channel can be added there without touching the UI. No payment gateway is included.

Never put secret keys in `VITE_` variables or in the repository.
