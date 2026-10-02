# Attock Beef Biryani & Pulao

Restaurant website (Attock Beef Biryani and Attock Beef Pulao, Chitral City) with menu, ordering flow, contact form and location page, in English and Urdu.
Built with React, TypeScript, Vite and React Router.

## Run

```bash
npm install
npm run dev        # local development
npm run build      # type-check + production build (output in dist/)
npm run preview    # serve the production build locally
```

## Going live

`npm run build` creates the site in `dist/`. It is a static site, so it can be hosted on Netlify, Vercel, Cloudflare Pages or any static host. Cloudflare Pages serves `index.html` for unknown routes (such as `/menu` on refresh) automatically, so no redirect file is needed there (adding a `/* /index.html 200` rule to `_redirects` makes Cloudflare report an infinite loop). `vercel.json` contains the equivalent rule for Vercel. On Netlify or other hosts, add a "serve `index.html` for every path" rewrite rule. Once a domain exists, connect it in the host's dashboard.

## Editing content

| What | Where |
| --- | --- |
| Address, phone, WhatsApp, email, opening hours, social links (English + Urdu) | `src/data/restaurant.ts` |
| Menu items (English + Urdu), prices, images, availability | `src/data/menu.ts` |
| All other website text, English and Urdu | `src/i18n/translations.ts` |
| Colours and spacing | CSS variables at the top of `src/styles/global.css` |
| Logo | `src/components/Logo.tsx` |

Only the details supplied by the owner are filled in (address, phone/WhatsApp, email, opening hours). Prices: Attock Beef Biryani Single Rs. 200 and Double Rs. 400 (a cold drink is included in that one combined price), Family Deal Rs. 1200, Extra Cold Drink Rs. 50. Attock Beef Pulao has no price yet and shows "Price on request". Items with `price: null` display "Price on request" (the restaurant confirms the price); set a number (PKR) to show it and include it in order totals. Social links are hidden until a real URL is added to `socialLinks`. 
### Photos (all optional; the site works without them)

Put JPG files (optimised, under about 500 KB) in these places. The original full-size PNGs for the menu cards are kept in `source-images/` (not deployed). Each photo appears automatically once its file exists; until then the site shows built-in artwork or simply hides that section, so nothing looks broken.

| File | Where it appears |
| --- | --- |
| `public/images/menu/chicken-biryani.jpg` | Home hero and About page |
| `public/images/menu/cold-drink-bottle.jpg` | The included cold-drink bottle on the biryani combo cards and Home combo section |
| `public/images/menu/single-biryani.jpg` | Attock Beef Biryani — Single card |
| `public/images/menu/double-biryani.jpg` | Attock Beef Biryani — Double card |
| `public/images/menu/star-cola.jpg` | Extra Cold Drink card |
| `public/images/menu/family-deal.jpg` | Family Deal card |
| `public/images/owner.png` | "Meet the owner" card on the Home and About pages (portrait about 4:5, transparent PNG or JPG; set `ownerName` / `ownerNameUr` in `src/data/restaurant.ts` to show a name) |
| `public/images/gallery/storefront.jpg`, `interior.jpg`, `dining.jpg`, `counter.jpg` | "Our restaurant" gallery on the About page (only the files that exist are shown) |

To use a photo for another menu item, add `image: menuImage("your-file.jpg")` to that item in `src/data/menu.ts`. Photos are cropped (never stretched) to fit, lazy-loaded, and use meaningful alt text.

## Urdu (RTL) and Nastaliq fonts

The header has an English / اردو toggle (remembered in the browser). Urdu switches the page to right-to-left and uses a Nastaliq font. The Urdu font can be chosen from the footer (and the mobile menu):

1. **Jameel Noori Nastaleeq** (default, used when installed)
2. **Noto Nastaliq Urdu** (bundled)
3. **Mehr Nastaliq** (used when installed)

The default font order is Jameel Noori Nastaleeq, then Noto Nastaliq Urdu, then Mehr Nastaliq, then an Urdu system font. Noto Nastaliq Urdu is bundled with the site (self-hosted, loaded only when Urdu is used), so Urdu always renders correctly. Jameel Noori and Mehr Nastaliq are third-party fonts that cannot be bundled without a licence, so they are used when installed on the visitor's device; otherwise the browser automatically falls back to the closest Nastaliq font. If you hold a licence for either font, add it with an `@font-face` rule in `src/styles/global.css` using the family names `Jameel Noori Nastaleeq` / `Mehr Nastaliq Web`. Font stacks are defined in the "Urdu (RTL)" section of `global.css`.

## Connecting order and contact channels

Copy `.env.example` to `.env` and set (all values are public because they are bundled into the site):

- `VITE_WHATSAPP_NUMBER` — optional override; the site already uses 03237185867 (WhatsApp) by default.
- `VITE_ORDER_ENDPOINT` — POST orders as JSON to your backend/API.
- `VITE_CONTACT_ENDPOINT` — POST contact messages as JSON to a form service/backend.
- `VITE_MAP_EMBED_URL` — Google Maps embed URL for the Find Us page.

Orders are sent through WhatsApp ("Send Order on WhatsApp"); the message contains the full order summary (items, quantities, prices, total, delivery/pickup, address, name, phone, instructions). Until `VITE_CONTACT_ENDPOINT` is set, the contact form does **not** claim to receive messages: it validates the input and then offers "email" and "WhatsApp" buttons that open the visitor's own app with the message prefilled.

To connect a backend/form service later, set `VITE_CONTACT_ENDPOINT` to an HTTPS URL that accepts a JSON `POST` of `{ name, phone, email, message }` and returns a 2xx status; the form then shows real success/error messages automatically. Orders can be forwarded the same way with `VITE_ORDER_ENDPOINT` (JSON `{ name, phone, fulfilment, address, notes, lines, text }`). Order and contact delivery lives in `src/lib/orderService.ts`, so a payment provider or another channel can be added there without touching the UI. No payment gateway is included.

Never put secret keys in `VITE_` variables or in the repository.
