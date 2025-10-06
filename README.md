# 📚 Bookstore MVC (Express + Sequelize + MySQL)

A ready-to-run **Express.js backend** built using **MVC + Repository Pattern**, with authentication, validation, logging, and transactional checkout.

---

## 🚀 Features
- 🔐 **JWT Authentication** (1 active device per user)
- 🧩 **Sequelize ORM** with MySQL
- ✅ **Joi Validation** for input checking
- 🪵 **Error Logging** stored in database
- ⚡ **Rate Limiting** middleware
- 💳 **Transactional Checkout**
- 🦺 **Helmet** for security headers
- 🧠 **CORS** and **Body Parser** pre-configured

---

## 🧭 Project Structure
```
src/
├── config/ # Database & app configuration
├── controllers/ # Request handlers
├── middlewares/ # Auth, error handler, and rate limiter
├── models/ # Sequelize models
├── repositories/ # Data access layer
├── routes/ # Route definitions
├── utils/ # Helper and utility functions
├── validations/ # Joi validation schemas
├── app.js # Main application entry point
├── swagger.js # Swagger setup
└── swagger.json # Swagger definition file
```

---

## ⚙️ Quickstart

1. **Copy** `.env.example` → `.env`  
   Then fill in your MySQL credentials and JWT secret.

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run migrations & seed data**
   ```bash
   npm run migrate
   ```
   This will create all tables and insert sample users/books.

4. **Start the server**
   ```bash
   npm start
   ```
   Or run in dev mode with auto-restart:
   ```bash
   npm run dev
   ```

---

## 👤 Default Seeded Accounts

| Role      | Email              | Password     |
|------------|--------------------|---------------|
| Admin      | admin@gmail.com    | password123   |
| Customer   | cust@gmail.com     | password123   |

---

## 📘 API Documentation (Swagger)

After starting the server, you can access the Swagger UI here:
👉 http://localhost:3000/api/docs/

GitHub Repository:
🔗 https://github.com/danangsptro/bookstore
---

## 🧩 Scripts

| Command | Description |
|----------|--------------|
| `npm start` | Start production server (`src/app.js`) |
| `npm run dev` | Start development server (with `nodemon`) |
| `npm run migrate` | Sync database & seed sample data |
| `npm test` | Placeholder for tests |

---

## 🧠 Tech Stack
- **Node.js** + **Express.js**
- **MySQL** + **Sequelize ORM**
- **JWT** (jsonwebtoken)
- **Joi** (validation)
- **Helmet**, **CORS**, **Rate Limiter**
- **UUID**, **Bcrypt**, **Dotenv**

---

## 🐞 Issues
If you find a bug or have a suggestion, open an issue here:  
👉 [https://github.com/danangsptro/bookstore/issues](https://github.com/danangsptro/bookstore/issues)

---

## 👨‍💻 Author
**danangsptro**  
📦 [GitHub Repository](https://github.com/danangsptro/bookstore)
