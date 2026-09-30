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

## Going live

`npm run build` creates the site in `dist/`. It is a static site, so it can be hosted on Netlify, Vercel, Cloudflare Pages or any static host. The repository already contains the "serve `index.html` for every path" rule that routes like `/menu` need on refresh: `public/_redirects` (Netlify, Cloudflare Pages) and `vercel.json` (Vercel). On other hosts, add the same fallback rule. Once a domain exists, connect it in the host's dashboard.

## Editing content

| What | Where |
| --- | --- |
| Address, phone, WhatsApp, email, opening hours, social links (English + Urdu) | `src/data/restaurant.ts` |
| Menu items (English + Urdu), prices, images, availability | `src/data/menu.ts` |
| All other website text, English and Urdu | `src/i18n/translations.ts` |
| Colours and spacing | CSS variables at the top of `src/styles/global.css` |
| Logo | `src/components/Logo.tsx` |

Only the details supplied by the owner are filled in (address, phone/WhatsApp, email, opening hours, biryani full-plate price). Items with `price: null` display "Price on request" (the restaurant confirms the price); set a number (PKR) to show it and include it in order totals. Social links are hidden until a real URL is added to `socialLinks`. 
### Replacing the illustrations with real photos

The site currently uses built-in food illustrations. To switch an item to a real photo: copy the image into `public/images/menu/` (about 1200×900, JPG or WebP) and add `image: menuImage("your-file.jpg")` to that item in `src/data/menu.ts`. Photos are lazy-loaded, cropped to fit the card, and use the item name as alt text; if a photo is missing or fails to load, the illustration is shown instead.

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

Orders are sent through WhatsApp ("Send Order on WhatsApp"); the message contains the full order summary (items, quantities, prices, total, delivery/pickup, address, name, phone, instructions). Until `VITE_CONTACT_ENDPOINT` is set, the contact form does **not** claim to receive messages: it validates the input and then offers "email" and "WhatsApp" buttons that open the visitor's own app with the message prefilled.

To connect a backend/form service later, set `VITE_CONTACT_ENDPOINT` to an HTTPS URL that accepts a JSON `POST` of `{ name, phone, email, message }` and returns a 2xx status; the form then shows real success/error messages automatically. Orders can be forwarded the same way with `VITE_ORDER_ENDPOINT` (JSON `{ name, phone, fulfilment, address, notes, lines, text }`). Order and contact delivery lives in `src/lib/orderService.ts`, so a payment provider or another channel can be added there without touching the UI. No payment gateway is included.

Never put secret keys in `VITE_` variables or in the repository.
