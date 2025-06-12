# Uber Clone

A full-stack Uber clone application built with React, Node.js, Express, and MongoDB. This application includes features like real-time ride booking, user authentication, and payment integration.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Google Maps API Key
- Razorpay Account (for payments)

## Project Structure

```
├── frontend/          # React frontend application
├── backend/           # Node.js backend server
└── README.md
```

## Getting Started

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=4000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   MAP_API=your_google_maps_api_key
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   CLIENT_URL=http://localhost:5173
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the frontend directory with the following variables:
   ```
   VITE_BASE_URL=http://localhost:4000(backend url)
   MAP_API = google map api key
   VITE_RAZORPAY_KEY_ID = razorpay id
   ```

4. Start the frontend development server:
   ```bash
   npm run dev
   ```

## Environment Variables

### Backend (.env)
- `PORT`: The port number for the backend server (default: 4000)
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token generation
- `MAP_API`: Google Maps API key for location services
- `RAZORPAY_KEY_ID`: Razorpay API key ID for payment integration
- `RAZORPAY_KEY_SECRET`: Razorpay API secret key
- `CLIENT_URL`: Frontend application URL

### Frontend (.env)
- `VITE_BASE_URL`: Backend API URL
- `MAP_API`: google map api key, go to google map console and generate it.
- `VITE_RAZORPAY_KEY_ID`: razorpay id

## Features

- User authentication (signup/login)
- Ride booking
- Used Gsap for smooth transitions
- Location services with Google Maps
- Payment integration with Razorpay
- Socket.IO for real-time communication
- Responsive design

## Technologies Used

### Frontend
- React
- Redux Toolkit
- React Router
- Socket.IO Client
- Google Maps API
- Tailwind CSS
- Axios
- React-Toastify
- Gsap

### Backend
- Node.js
- Express
- MongoDB
- Socket.IO
- JWT Authentication
- Bcrypt
- Razorpay Integration
- Google Maps API


##

📬 shubhamcodes7@gmail.com

