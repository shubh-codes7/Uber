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

#### ✅Register User

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

#### ✅Login User

- **URL:** `/users/login`
- **Method:** `POST`
- **Body Parameters:**
  - `email` (string, required, must be valid email)
  - `password` (string, required, min 6 chars)
- **Responses:**
  - `200 OK`: `{ user, token }`
  - `401 Unauthorized`: `{ message: 'Invalid email or password' }`
  - `422 Unprocessable Entity`: `{ errors: [...] }`

**Example Request:**

```json
POST /users/login
{
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

#### ✅Get User Profile

- **URL:** `/users/profile`
- **Method:** `GET`
- **Headers:**
  - `Authorization: Bearer <token>` (or send token as cookie)
- **Auth Required:** Yes
- **Responses:**
  - `200 OK`: `{ user }`
  - `401 Unauthorized`: `{ message: 'Unauthorized' }`

**Example Success Response:**

```json
{
  "user": {
    "_id": "...",
    "fullname": { "firstname": "John", "lastname": "Doe" },
    "email": "john@example.com"
  }
}
```

---

#### ✅Logout User

- **URL:** `/users/logout`
- **Method:** `GET`
- **Auth Required:** Yes
- **Responses:**
  - `200 OK`: `{ message: 'Logged out successfully' }`
  - `401 Unauthorized`: `{ message: 'Unauthorized' }`

> Note: This route only clears the authentication cookie. If you use Authorization headers (Bearer tokens), server-side token blacklisting is not implemented yet.

---

### Captain Routes

#### ✅Register Captain

- **URL:** `/captains/register`
- **Method:** `POST`
- **Body Parameters:**
  - `fullname.firstname` (string, required, min 3 chars)
  - `fullname.lastname` (string, optional, min 3 chars)
  - `email` (string, required, must be valid email)
  - `password` (string, required, min 6 chars)
  - `vehicle.color` (string, required, min 3 chars)
  - `vehicle.plate` (string, required, min 3 chars)
  - `vehicle.capacity` (number, required, min 1)
  - `vehicle.vehicleType` (string, required, one of: 'car', 'auto', 'motorcycle')
- **Responses:**
  - `201 Created`: `{ captain }`
  - `409 Conflict`: `{ message: 'Captain already exists' }`
  - `422 Unprocessable Entity`: `{ errors: [...] }`
  - `500 Internal Server Error`: `{ message: ... }`

**Example Request:**

```json
POST /captains/register
{
  "fullname": { "firstname": "Jane", "lastname": "Smith" },
  "email": "jane@example.com",
  "password": "secret123",
  "vehicle": {
    "color": "Red",
    "plate": "XYZ123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

**Example Success Response:**

```json
{
  "captain": {
    "_id": "...",
    "fullname": { "firstname": "Jane", "lastname": "Smith" },
    "email": "jane@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "XYZ123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

---

#### ✅Login Captain

- **URL:** `/captains/login`
- **Method:** `POST`
- **Body Parameters:**
  - `email` (string, required, must be valid email)
  - `password` (string, required, min 6 chars)
- **Responses:**
  - `200 OK`: `{ captain, token }`
  - `401 Unauthorized`: `{ message: 'Captain does not exists' }` or `{ message: 'Invalid email or password' }`
  - `422 Unprocessable Entity`: `{ errors: [...] }`

**Example Request:**

```json
POST /captains/login
{
  "email": "jane@example.com",
  "password": "secret123"
}
```

**Example Success Response:**

```json
{
  "captain": {
    "_id": "...",
    "fullname": { "firstname": "Jane", "lastname": "Smith" },
    "email": "jane@example.com"
  },
  "token": "..."
}
```

---

#### ✅Get Captain Profile

- **URL:** `/captains/profile`
- **Method:** `GET`
- **Headers:**
  - `Authorization: Bearer <token>` (or send token as cookie)
- **Auth Required:** Yes
- **Responses:**
  - `200 OK`: `{ captain }`
  - `401 Unauthorized`: `{ message: 'Unauthorized' }`

**Example Success Response:**

```json
{
  "captain": {
    "_id": "...",
    "fullname": { "firstname": "Jane", "lastname": "Smith" },
    "email": "jane@example.com"
  }
}
```

---

#### ✅Logout Captain

- **URL:** `/captains/logout`
- **Method:** `GET`
- **Auth Required:** Yes
- **Responses:**
  - `200 OK`: `{ message: 'Logged out successfully' }`
  - `401 Unauthorized`: `{ message: 'Unauthorized' }`

> Note: This route only clears the authentication cookie. If you use Authorization headers (Bearer tokens), server-side token blacklisting is not implemented yet.

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
