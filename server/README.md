# 🛍️ Product Management API (Node.js + Express + TypeScript + MongoDB)

A simple, modular, and production-ready backend for managing products — built with **Node.js**, **Express**, **TypeScript**, and **MongoDB**.

---

## 🚀 Features

✅ **Product CRUD APIs** (Create, Read, Update, Delete)  
✅ **Image upload using Multer** (stored in `/public/uploads`)  
✅ **Validation using Joi** (for body and file fields)  
✅ **Static file serving** for uploaded images  
✅ **Modular architecture** (controllers, routes, middlewares, validation)  
✅ **Error handling and response standardization**  
✅ **TypeScript** for type safety  
✅ **MongoDB + Mongoose** for database  
✅ **Swagger API Documentation** (OpenAPI 3.0 compatible) --> (Accessable on http://IP:PORT/api-docs/)

---

## ⚙️ Tech Stack

| Layer                   | Technology             |
| ----------------------- | ---------------------- |
| Runtime                 | Node.js                |
| Framework               | Express.js             |
| Language                | TypeScript             |
| Database                | MongoDB (via Mongoose) |
| Validation              | Joi                    |
| File Upload             | Multer                 |
| API Docs                | Swagger (YAML)         |
| Caching (Future)        | Redis                  |
| Authentication (Future) | JWT (JSON Web Token)   |

---

## 🏗️ Folder Structure

├── 📁 src
│ ├── 📁 controllers
│ │ └── productController.ts
│ ├── 📁 middleware
│ │ └── upload.ts
│ ├── 📁 models
│ │ └── productModel.ts
│ ├── 📁 routes
│ │ └── productRoutes.ts
│ ├── 📁 validation
│ │ └── productValidation.ts
│ ├── 📁 config
│ │ ├── db.ts
│ │ └── redis.ts (future)
│ ├── app.ts
│ ├── router.ts
│ └── server.ts
│
├── 📁 public
│ └── 📁 uploads # Uploaded images stored here
│
├── 📁 yml-docs
│ ├── product-docs.yml
│ └── testing-docs.yml
│
├── .env
├── package.json
├── tsconfig.json
└── README.md

## 🧰 Installation & Setup

1️⃣ Install Dependencies

npm install

2️⃣ Create a .env File

PORT=8002
MONGO_URI=mongodb://localhost:27017/productsdb

3️⃣ Run in Development Mode

npm run dev

4️⃣ Build for Production

npm run build
npm start

> **Note:** The following features are _not implemented yet_ in the repository, but the codebase is structured so they can be added easily:
>
> - User authentication / authorization (JWT)
> - Pagination & filtering for listing endpoints
> - Redis caching for frequently-read endpoints
> - Rate limiting, logging, advanced error handling, automated tests, and CI/CD

🧑‍💻 Author

Sanjiv Kumar
Full-Stack Developer (React.js, Node.js, Express, MongoDB)
