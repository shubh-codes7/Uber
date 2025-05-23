# Uber Clone Backend

This is the backend for the Uber Clone project, built with Node.js, Express, and MongoDB.

## Getting Started

1. Install dependencies:
   ```sh
   npm install
   ```
2. Create a `.env` file in the `backend/` directory (see `.env.example` for required variables).
3. Start the development server:
   ```sh
   npm run dev
   ```

## Environment Variables

- `PORT`: Port number (default: 4000)
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT

## API Endpoints

### User Routes

#### Register User

- **URL:** `/users/register`
- **Method:** `POST`
- **Body Parameters:**
  - `fullname.firstname` (string, required, min 3 chars)
  - `fullname.lastname` (string, optional, min 3 chars)
  - `email` (string, required, must be valid email)
  - `password` (string, required, min 6 chars)
- **Responses:**
  - `201 Created`: `{ user, token }`
  - `422 Unprocessable Entity`: `{ errors: [...] }`
  - `500 Internal Server Error`: `{ message: ... }`

**Example Request:**
```json
POST /users/register
{
  "fullname": { "firstname": "John", "lastname": "Doe" },
  "email": "john@example.com",
  "password": "secret123"
}
```

**Example Success Response:**
```json
{
  "user": {
    "_id": "...",
    "fullname": { "firstname": "John", "lastname": "Doe" },
    "email": "john@example.com"
  },
  "token": "..."
}
```

---

## Project Structure

- `controllers/` - Route handlers
- `db/` - Database connection
- `middlewares/` - Express middlewares
- `models/` - Mongoose models
- `routes/` - API route definitions
- `services/` - Business logic

---
## Libraries Used
- express
- mongoose
- dotenv
- cors
- express-validator
- bcryptjs
- jsonwebtoken
- cookie-parser
