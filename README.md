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
| Address, phone, WhatsApp, email, opening hours, social links | `src/data/restaurant.ts` |
| Menu items, categories, prices, images, availability | `src/data/menu.ts` |
| Colours and spacing | CSS variables at the top of `src/styles/global.css` |
| Logo | `src/components/Logo.tsx` |

All business details are **placeholders** until real values are added. Prices are `null` and display as "Add Price"; set a number (PKR) to enable order totals. To use real food photos, set `image` on a menu item (missing or broken images fall back to built-in artwork).

## Connecting order and contact channels

Copy `.env.example` to `.env` and set (all values are public because they are bundled into the site):

- `VITE_WHATSAPP_NUMBER` — enables the "Send order on WhatsApp" button.
- `VITE_ORDER_ENDPOINT` — POST orders as JSON to your backend/API.
- `VITE_CONTACT_ENDPOINT` — POST contact messages as JSON to a form service/backend.
- `VITE_MAP_EMBED_URL` — Google Maps embed URL for the Find Us page.

Until these are set the site says so plainly: orders show a copyable summary, and the contact form explains it isn't connected yet. Order and contact delivery lives in `src/lib/orderService.ts`, so a payment provider or another channel can be added there without touching the UI. No payment gateway is included.

Never put secret keys in `VITE_` variables or in the repository.
