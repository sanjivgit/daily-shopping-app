# SmartShop Client

SmartShop is a Vite-powered React 19 application that helps households plan shopping lists, discover nearby vendors with the best coverage and price, and place prepaid orders via Razorpay. Vendors get their own portal to manage stock availability so shoppers can match against real inventory in real time.

## Features

### Shopper experience

- Authentication, routing, and protected dashboard flows managed through Redux slices in `src/stores/slices`
- Shopping list CRUD with inline editing forms (`src/features/user-dashboard/components/shopping-list`)
- Item panels that display per-list inventory needs and allow quick adjustments before matching vendors
- Vendor matching screen that requests the user’s location, highlights coverage/price trade-offs, and feeds an order summary (`vendor-matching-panel.tsx`)
- One-tap online checkout backed by Razorpay once a vendor is selected (`order-summary.tsx`)

### Vendor experience

- Separate auth flow (`/vendor/login` & `/vendor/register`) rendered inside `VendorAuthLayout`
- Dashboard with inventory CRUD powered by React Query mutations (`vendor-stock-manager.tsx`)
- Stock endpoints and queries defined under `src/features/vendor-dashboard/services`

### Cross-cutting

- Axios instances that automatically inject JWT tokens from `localStorage` for both shoppers and vendors
- React Query caching via `QueryProvider` plus toast-based UX feedback (`sonner`)
- Tailwind CSS 4, Radix UI primitives, and custom shadcn-inspired components located in `src/components/ui`

## Tech stack

- React 19 with TypeScript
- Vite 7 for dev server and builds
- Redux Toolkit & React Router 7 for state + navigation
- @tanstack/react-query for data fetching
- Tailwind CSS 4 + tw-animate for styling
- Razorpay Checkout integration

## Project structure

```text
client/
├── src/
│   ├── features/
│   │   ├── auth | vendor-auth | user-dashboard | vendor-dashboard
│   │   └── ...domain-specific components & hooks
│   ├── layout/         # shared shells, navigation, vendor layouts
│   ├── lib/            # providers, helpers
│   ├── stores/         # Redux store + slices
│   ├── utils/          # axios instances, API constants, config helpers
│   └── pages/          # route-level views wired into App.tsx
├── public/             # Vite static assets
└── package.json        # scripts + dependencies
```

## Getting started

### Prerequisites

- Node.js 18+ (recommended 20 LTS)
- npm 10+ (or any compatible package manager)

### Installation

```bash
git clone <repo-url>
cd ShopingList/client
npm install
```

### Configure API targets

Edit `src/utils/config.ts` to point to your backend and Razorpay credentials:

```1:3:src/utils/config.ts
export const API_BASE_URL = "http://localhost:8002/api/v1/shopping-list/"
export const RAZORPAY_KEY_ID = "djlsjldfjlsdf"
```

- `API_BASE_URL` should resolve to the shopping-list REST API root (all relative endpoints in `src/utils/apis.ts` are appended to this value).
- `IMAGE_BASE_URL` feeds any asset URLs returned by the backend.
- Replace `RAZORPAY_KEY_ID` with your dashboard key for production.

If your backend issues vendor tokens separately, mirror the same changes in `src/utils/axios-instance-vendor.ts`.

### Run the app

```bash
npm run dev
```

Visit `http://localhost:5173`. The dev server hot-reloads React components and Tailwind styles automatically.

### Lint & build

```bash
npm run lint      # ESLint 9 (flat config)
npm run build     # Type-check via tsc --build, then vite build
npm run preview   # Serve the production bundle locally
```

## API & integration notes

- Shopper routes under `/dashboard` assume authenticated responses from `APIs.LIST`, `APIs.ITEMS`, `APIs.ORDERS`, and `APIs.VENDOR`.
- Vendor dashboards call `/vendor/stock` endpoints; ensure CORS allows the Vite dev origin.
- `useGetMatchedVendor` requests geolocation permission and falls back to hardcoded coordinates; replace with real `latitude/longitude` if shipping to production.
- Razorpay embeds via `window.Razorpay`, so include their checkout script tag (`https://checkout.razorpay.com/v1/checkout.js`) in `index.html` or your host template.

## Conventions & tips

- Redux persists the `user` object (including tokens) in `localStorage`; keep payloads consistent with what `auth-slice` expects.
- React Query keys map directly to entries in `src/utils/apis.ts`. When adding new endpoints, export them there to keep cache keys consistent.
- UI primitives (Button, Card, Tabs, etc.) live under `src/components/ui`; extend them instead of duplicating styles within feature folders.

---

Happy building! If you add tests, start with service hooks (React Query) and reducers so the critical shopping & vendor flows stay stable.
