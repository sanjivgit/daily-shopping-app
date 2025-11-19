# 🛒 Shopping List Services API

A TypeScript-based Node.js backend that powers a smart shopping experience for both customers and vendors. It provides user onboarding, collaboratively managed shopping lists, vendor discovery with coverage/cost insights, orders, and Razorpay-powered payments — all documented through OpenAPI/Swagger.

> This repository hosts the server that a React client can consume. It exposes RESTful JSON APIs under `http://localhost:<PORT>/api/v1/shopping-list`.

---

## ✨ Key Features

- User & vendor authentication via JWT, with role-based access guards.
- Shopping list lifecycle: create, update, delete, and retrieve user-specific lists.
- Item management per list, supporting quantity edits and deletions.
- Vendor portal for managing inventory and stocking data, secured by vendor tokens.
- Nearby vendor discovery that scores vendors by match coverage, distance, and price.
- Order management tied to authenticated users.
- Razorpay integration for order payments and persistence of payment records.
- Consistent API responses, structured logging (Winston), and request validation with Joi.
- OpenAPI 3 documentation served at `/api-docs`, generated from YAML specs.

---

## 🧱 Tech Stack

| Layer/Concern     | Technology / Library                |
| ----------------- | ----------------------------------- |
| Runtime           | Node.js (>=18)                      |
| Framework         | Express 5                           |
| Language          | TypeScript                          |
| Database          | MongoDB via Mongoose                |
| Auth              | JSON Web Tokens                     |
| Validation        | Joi                                 |
| Payments          | Razorpay SDK                        |
| Logging           | Winston (file + console transports) |
| API Documentation | Swagger UI + swagger-jsdoc          |

---

## 📁 Project Structure

```
src
├── app.ts                 # Express app setup, Swagger, DB bootstrap
├── server.ts              # HTTP server entrypoint
├── router.ts              # Top-level route registration
├── config/db.ts           # Mongo connection helper
├── controller/            # Request handlers (users, lists, vendors, etc.)
├── dao/                   # Data access layer (Mongoose + Razorpay)
├── middleware/            # Auth guards for users & vendors
├── models/                # Mongoose schemas
├── requests-validation/   # Joi schemas per resource
├── route/                 # Route definitions per domain
├── services/              # Domain helpers (vendor scoring)
├── utils/                 # Config, logger, response helpers, swagger setup
└── yml-docs/              # OpenAPI fragments consumed by swaggerSetup
```

Logs are written to `logs/error.log` and `logs/combined.log` (ignored in dev console output if `NODE_ENV !== production`).

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+ and npm v10+
- A running MongoDB instance
- Razorpay account (for live payment order creation) — optional in local dev but required if hitting `/payment/create-order`

### 1. Install dependencies

```bash
npm install
```

### 2. Create `.env`

```
PORT=8002
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/shopping-list
SECRET_KEY=replace-with-a-secure-secret
EXPIRE_IN=1d
KM_RANGE=4000
SUBSTITUTE_KM_RANGE=4000
RAZORPAY_KEY_ID=your-key
RAZORPAY_KEY_SECRET=your-secret
```

> Only `PORT`, `MONGO_URI`, `SECRET_KEY`, and Razorpay keys are strictly required for most flows. Distance-related env vars control vendor filtering thresholds.

### 3. Run the API

```bash
# Development (watch mode via nodemon)
npm run dev

# Production build & start
npm run build
npm start
```

Swagger UI will be available at `http://localhost:8002/api-docs` (adjust `PORT` if you changed it).

---

## 📡 Available Scripts

- `npm run dev` – Live reload server (nodemon + ts-node).
- `npm start` – Alias for `npm run dev` for now; adjust for production hosting.
- `npm run build` – Compile TypeScript to JavaScript (`dist/`).
- `npm run lint` – ESLint over `.ts` sources.
- `npm test` – Placeholder (exits with code 1). Add your test runner of choice.

---

## 🔐 Authentication

- User-protected routes use `Authorization: Bearer <token>` headers and `auth.jwtVerify`.
- Vendor-protected routes use a different JWT guard (`auth-vendor.ts`) to keep vendor payloads isolated from user auth.
- Admin-only helpers exist (`jwtVerifyIsAdmin`) for future elevated operations.

Tokens are signed with `SECRET_KEY` and respect `EXPIRE_IN` (e.g., `1d`).

---

## 🗺️ API Surface (Summary)

All endpoints are prefixed with `BASE_URL = /api/v1/shopping-list`.

| Domain   | Method & Path                                                                                                    | Notes                                 |
| -------- | ---------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| Auth     | `POST /auth/register`, `POST /auth/login`                                                                        | User lifecycle                        |
| Lists    | `POST /lists/create`, `GET /lists/get`, `PUT /lists/update`, `DELETE /lists/delete/:id`                          | Requires user JWT                     |
| Items    | `POST /items/create`, `GET /items/get/:listId`, `PUT /items/update`, `DELETE /items/delete/:itemId`              | Scoped to list owner                  |
| Vendors  | `POST /vendor/register`, `POST /vendor/login`                                                                    | Vendor onboarding                     |
|          | `POST /vendor/stock`, `PUT /vendor/stock/update`, `DELETE /vendor/stock/delete/:itemId`, `GET /vendor/stock/get` | Vendor inventory management           |
|          | `GET /vendor/nearby/:listId`                                                                                     | Finds nearby shops for a user’s list  |
| Orders   | `POST /orders/create`, `GET /orders/get`                                                                         | Authenticated order placement/history |
| Payments | `POST /payment/create-order`                                                                                     | Creates Razorpay order & logs payment |

Refer to Swagger UI for full request/response schemas. OpenAPI fragments live in `src/yml-docs`.

---

## 🧰 Implementation Details

- **Joi validation**: every controller consumes a schema from `requests-validation/*`. Invalid payloads are rejected with a structured 400 response.
- **Response envelope**: `utils/commonResponse` & `sendResponse` ensure consistent metadata (`apiId`, version, response time) and hook into Winston logging.
- **Data layer**: `dao/*` keeps controllers clean by abstracting Mongoose calls and third-party SDKs (e.g., Razorpay).
- **Vendor scoring**: `services/process-vendor.ts` compares user list items with vendor stock using `string-similarity`, tags vendors (Nearest, Cheapest, Best Coverage), and normalizes distances.
- **Swagger**: `swagger-setup.ts` loads YAML definitions (`src/**/*.yml`) and serves them through `swagger-ui-express`, persisting auth headers during interactive testing.

---

## 🧪 Testing & Quality

- ESLint is configured via `eslint.config.mts`. Run `npm run lint` to catch style and TypeScript issues.
- There are no automated tests yet (`npm test` is a placeholder). Recommended future work:
  - Add unit tests for DAOs and controllers (Jest or Vitest).
  - Add integration tests against an in-memory Mongo instance (mongodb-memory-server).
  - Automate contract/regression tests through Swagger examples.

---

## 📄 License

This project is currently unlicensed (default `ISC` from `package.json`). Update the license section if you decide to distribute the backend publicly.

---

## 🤝 Contributing

1. Fork & clone the repo.
2. Create a feature branch.
3. Ensure `npm run lint` passes and, if added, tests succeed.
4. Submit a pull request describing the change and affected routes.

---

## 📬 Support & Contact

Maintained by Sanjiv Kumar. Feel free to open GitHub issues for bugs, feature requests, or integration questions.
