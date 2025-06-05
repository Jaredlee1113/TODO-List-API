# TODO-List-API

![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
![Express](https://img.shields.io/badge/Express.js-4.x-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-6.x-brightgreen)
![Vitest](https://img.shields.io/badge/Tested_with-Vitest-yellow)
![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)

A simple, secure RESTful API for managing personal to-do list, built with **Node.js**, **Express**, and **MongoDB**. Includes user registration, login with JWT-based authentication, and full CRUD for to-do items.

---

## Features

-   User registration and login
-   Passwords hashed with bcrypt
-   JWT-based authentication
-   Protected routes
-   CRUD operations for personal to-dos
-   Full test suite with Vitest and Supertest

---

## Tech Stack

-   Node.js + Express(ESModule)
-   MongoDB + Mongoose
-   JWT for auth
-   bcrypt for password hashing
-   Vitest + Supertest for testing
-   dotenv for environment config

---

## Project Structure

```js
todo-api/
├── controllers/
├── routes/
├── models/
├── middleware/
├── utils/
├── tests/
├── app.js
├── .env
└── README.md
```

---

## Getting Started

### 1. Clone and install dependencies

```bash
git clone https://github.com/Jaredlee1113/TODO-List-API.git
cd TODO-List-API
npm install
```

### 2. Set up environment variables

Create a .env file

```env
PORT=5000
MONGO_URI=mongodb_connection_string(cloud or local)
MONGO_URI_TEST=test_db_connection_string
JWT_SECRET=secret_key
JWT_EXPIRATION=7d
```

### 3. Run the server(in dev mode)

```bash
npm run dev
```

The API will be served at http://localhost:5000

---

## API Endpoints

### Auth

| Method | Endpoint           | Description       |
| ------ | ------------------ | ----------------- |
| POST   | /api/auth/register | Register new user |
| POST   | /api/auth/login    | Login and get JWT |

---

### Todos(Protected)

| Method | Endpoint       | Description          |
| ------ | -------------- | -------------------- |
| GET    | /api/todos     | Get all user's todos |
| POST   | /api/todos     | Create a new todo    |
| PUT    | /api/todos/:id | Update a todo        |
| DELETE | /api/todos/:id | Delete a todo        |

---

## Authentication

All /api/todos/\* endpoints require:

```
Authorization: Bearer <token>
```

Get token from `/api/auth/login` or `/api/auth/register`

---

## Run Tests

Make sure .env includes MONGO_URI_TEST.

```bash
npm run test
```

Tests include all endpoints.

## Notes

-   All data is scoped to the authenticated user.
-   Passwords are hashed using bcrypt.
-   Tokens expire in 7 days if JWT_EXPIRATION is not set.
-   Clean architecture and modular file structure for maintainability.

---

## Author

Built by Jared Lee.
Feel free to fork, or use as a boilerplate for learning Node.js backend development.

---
