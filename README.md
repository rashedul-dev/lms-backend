# Library Management System API

A simple and efficient RESTful API built with Node.js, Express, TypeScript, and MongoDB. It helps you manage your library's books and borrowing records with ease.

---

## Features

- Add, update, delete, and view all books in the library
- Borrow books with automatic stock validation
- View summaries of borrowed books
- Well-structured code using TypeScript and Express
- Proper error handling and modular organization

---

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Language:** TypeScript

---

## Getting Started

Follow these steps to set up the project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/rashedul-dev/lms-backend.git
cd lml-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory:

```env
NODE_ENV= development
PORT= 5000
MONGO_URI= mongodb+srv://<db_username>:<db_password>@cluster0.ds2xf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
```

You can replace the Mongo URI with a local version if needed.

### 4. Start the Server

```bash
npm run dev
```

Now, your API is running on `http://localhost:5000`

---

## Folder Structure

```bash
src/
├── app/
│   ├── controllers/     # Logic for handling API requests
│   ├── models/          # Mongoose schemas and models
│   ├── interfaces/      # TypeScript type definitions
├── app.ts               # Express app configuration
├── server.ts            # Entry point to start the server
```

---

## API Endpoints

### Books

| Method | Endpoint         | Description    |
| ------ | ---------------- | -------------- |
| GET    | `/api/books`     | Get all books  |
| POST   | `/api/books`     | Add a new book |
| PATCH  | `/api/books/:id` | Update a book  |
| DELETE | `/api/books/:id` | Delete a book  |

### Borrow

| Method | Endpoint      | Description                |
| ------ | ------------- | -------------------------- |
| POST   | `/api/borrow` | Borrow a book              |
| GET    | `/api/borrow` | View borrowed book summary |

---

## Testing the API

You can test the endpoints using:

- **Postman**
- **Thunder Client** (VS Code extension)

Make sure MongoDB is running locally or use a remote Mongo URI.

---

## Live Demo

🔗The API is also hosted on Vercel: ➡ [LMS_BACKEND_API] (https://lmsbackendapi.vercel.app/api/books)

---
