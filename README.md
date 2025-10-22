# B2D KITCHEN Front-end Skeleton

Premium, production-ready HTML5/CSS3/JS skeleton for the B2D KITCHEN fast food platform with both public and admin interfaces.

## Getting Started
1. Install dependencies for a static dev server (optional):
   ```bash
   npm install -g serve
   ```
2. Serve the project locally from the repo root:
   ```bash
   serve .
   ```
3. Visit `http://localhost:3000/index.html` (or the printed URL) and allow the service worker to register.
4. Use the “Install App” browser prompt to test the PWA experience and offline shell.

## Features
- Responsive design system following Chili Red + Honey Gold brand tokens.
- Autosuggest search, cart drawer, checkout stepper, loyalty UI stubs.
- Admin dashboards with seeded mock data.
- PWA manifest + service worker with offline shell.
- JSON-LD placeholders, SEO meta tags, sitemap and robots instructions.

## Key Pages
- `index.html` – homepage hero, promos, featured categories, and testimonials.
- `menu.html` – sticky filter bar with category pills and product grid (2/3/4 responsive rule).
- `product.html` – PDP gallery, nutrition panel, variants, add-ons, and reviews tab.
- `cart.html`, `checkout.html`, `order-tracking.html` – cart, checkout stepper, and timeline UI.
- `account.html` – tabs for orders, addresses, loyalty, and wishlist.
- `admin/*` – dashboard, orders, menu, categories, coupons, customers, delivery, reservations, content, media, users, and settings shells.

## Development Notes
- Global styles live in `css/base.css`, `css/layout.css`, `css/components.css`, and `css/utilities.css` with CSS custom properties for the brand system.
- JavaScript modules under `js/` are ES6 modules that attach themselves to the `window.B2D` namespace. Each page loads only the required behaviors.
- `js/data.js` seeds menu items, categories, coupons, LGAs, FAQs, testimonials, and blog posts used across the experience.
- `js/ui.js` exports drawers, modals, tabs, accordions, skeleton loaders, and toast helpers used by public and admin shells.
- Register additional analytics or marketing pixels by extending the stub in `js/analytics.js` to call real GA4/Tag Manager endpoints.

## Structure
```
css/
js/
admin/
```

## Customisation
- Update `js/data.js` to manage products, categories, coupons, locations, FAQs, testimonials, and blog posts.
- Replace the shared data-URI placeholders defined in `js/data.js` with real image URLs or restore an `/assets` directory when production imagery is ready.
- Extend UI behaviors inside `js/*` modules (vanilla ES6).

## Accessibility & Performance
- Semantic landmarks, ARIA attributes, focus outlines.
- Lazy-loaded imagery, responsive grids and local caching for offline support.
- Reduced motion support and keyboard-friendly navigation for drawers, modals, and carousels.

## License
MIT
