# Uber Clone API Documentation


## User Endpoints

### Register User
- **Endpoint:** `POST /user/register`
- **Authentication:** Not required
- **Body Parameters:**
  - `email` (string): Valid email address
  - `password` (string): Minimum 6 characters
  - `fullname.firstname` (string): Minimum 3 characters
- **Response:** 
  ```json
  {
    "user": {
      "_id": "string",
      "firstname": "string",
      "lastname": "string",
      "email": "string"
    },
    "token": "string"
  }
  ```
- **Error Responses:**
  - `422`: Validation errors
  - `409`: User already exists
  - `500`: Server error

### Login User
- **Endpoint:** `POST /user/login`
- **Authentication:** Not required
- **Body Parameters:**
  - `email` (string): Valid email address
  - `password` (string): User's password
- **Response:**
  ```json
  {
    "user": {
      "_id": "string",
      "firstname": "string",
      "lastname": "string",
      "email": "string"
    },
    "token": "string"
  }
  ```
- **Error Responses:**
  - `401`: Invalid credentials
  - `500`: Server error

### Get User Profile
- **Endpoint:** `GET /user/profile`
- **Authentication:** Required (User)
- **Response:**
  ```json
  {
    "user": {
      "_id": "string",
      "firstname": "string",
      "lastname": "string",
      "email": "string"
    }
  }
  ```

## Captain (Driver) Endpoints

### Register Captain
- **Endpoint:** `POST /captain/register`
- **Authentication:** Not required
- **Body Parameters:**
  - `email` (string): Valid email address
  - `password` (string): Minimum 6 characters
  - `fullname.firstname` (string): Minimum 3 characters
  - `vehicle.color` (string): Minimum 3 characters
  - `vehicle.plate` (string): Minimum 3 characters
  - `vehicle.capacity` (number): Minimum 1
  - `vehicle.type` (string): One of ['car', 'auto', 'motorcycle']
- **Response:**
  ```json
  {
    "captain": {
      "_id": "string",
      "firstname": "string",
      "lastname": "string",
      "email": "string",
      "vehicle": {
        "color": "string",
        "plate": "string",
        "capacity": "number",
        "type": "string"
      }
    },
    "token": "string"
  }
  ```
- **Error Responses:**
  - `422`: Validation errors
  - `409`: Captain already exists
  - `500`: Server error

### Get Captain Profile
- **Endpoint:** `GET /captain/profile`
- **Authentication:** Required (Captain)
- **Response:**
  ```json
  {
    "captain": {
      "_id": "string",
      "firstname": "string",
      "lastname": "string",
      "email": "string",
      "vehicle": {
        "color": "string",
        "plate": "string",
        "capacity": "number",
        "type": "string"
      }
    }
  }
  ```

### Logout Captain
- **Endpoint:** `GET /captain/logout`
- **Authentication:** Required (Captain)
- **Response:**
  ```json
  {
    "message": "Logged out successfully"
  }
  ```

## Ride Endpoints

### Create Ride
- **Endpoint:** `POST /ride/create`
- **Authentication:** Required (User)
- **Body Parameters:**
  - `pickup` (string): Minimum 3 characters
  - `destination` (string): Minimum 3 characters
  - `vehicleType` (string): One of ['auto', 'car', 'moto']
- **Response:**
  ```json
  {
    "_id": "string",
    "user": "string",
    "pickup": "string",
    "destination": "string",
    "vehicleType": "string",
    "status": "string",
    "createdAt": "string"
  }
  ```
- **Error Responses:**
  - `400`: Invalid input
  - `500`: Server error

### Get Fare
- **Endpoint:** `GET /ride/get-fare`
- **Authentication:** Not required
- **Query Parameters:**
  - `pickup` (string): Minimum 3 characters
  - `destination` (string): Minimum 3 characters
- **Response:**
  ```json
  {
    "fare": "number",
    "distance": "number",
    "duration": "number"
  }
  ```
- **Error Responses:**
  - `400`: Invalid input
  - `500`: Server error

### Confirm Ride
- **Endpoint:** `POST /ride/confirm`
- **Authentication:** Required (Captain)
- **Body Parameters:**
  - `rideId` (string): Valid MongoDB ID
- **Response:**
  ```json
  {
    "_id": "string",
    "user": {
      "_id": "string",
      "firstname": "string",
      "lastname": "string",
      "email": "string"
    },
    "captain": {
      "_id": "string",
      "firstname": "string",
      "lastname": "string",
      "vehicle": {
        "color": "string",
        "plate": "string",
        "type": "string"
      }
    },
    "status": "string",
    "pickup": "string",
    "destination": "string",
    "vehicleType": "string"
  }
  ```
- **Error Responses:**
  - `400`: Invalid input
  - `500`: Server error

### Start Ride
- **Endpoint:** `GET /ride/start-ride`
- **Authentication:** Required (Captain)
- **Query Parameters:**
  - `rideId` (string): Valid MongoDB ID
  - `otp` (string): 6-digit OTP
- **Response:** Same as Confirm Ride
- **Error Responses:**
  - `400`: Invalid input
  - `500`: Server error

### End Ride
- **Endpoint:** `POST /ride/end-ride`
- **Authentication:** Required (Captain)
- **Body Parameters:**
  - `rideId` (string): Valid MongoDB ID
- **Response:** Same as Confirm Ride
- **Error Responses:**
  - `400`: Invalid input
  - `500`: Server error

## Map Endpoints

### Get Coordinates
- **Endpoint:** `GET /map/get-coordinates`
- **Authentication:** Required (User)
- **Query Parameters:**
  - `address` (string): Minimum 3 characters
- **Response:**
  ```json
  {
    "ltd": "number",
    "lng": "number"
  }
  ```
- **Error Responses:**
  - `400`: Invalid input
  - `404`: Coordinates not found

### Get Distance and Time
- **Endpoint:** `GET /map/get-distance-time`
- **Authentication:** Required (User)
- **Query Parameters:**
  - `origin` (string): Minimum 3 characters
  - `destination` (string): Minimum 3 characters
- **Response:**
  ```json
  {
    "distance": "number",
    "duration": "number"
  }
  ```
- **Error Responses:**
  - `400`: Invalid input
  - `500`: Server error

### Get Auto-complete Suggestions
- **Endpoint:** `GET /map/get-suggestions`
- **Authentication:** Not required
- **Query Parameters:**
  - `input` (string): Minimum 3 characters
- **Response:**
  ```json
  [
    {
      "description": "string",
      "place_id": "string"
    }
  ]
  ```
- **Error Responses:**
  - `400`: Invalid input
  - `500`: Server error

## Payment Endpoints

### Create Order
- **Endpoint:** `POST /payment/create-order`
- **Authentication:** Required
- **Body Parameters:**
  - `amount` (number): Amount in INR
- **Response:**
  ```json
  {
    "id": "string",
    "amount": "number",
    "currency": "string",
    "receipt": "string",
    "status": "string"
  }
  ```
- **Error Responses:**
  - `400`: Invalid amount
  - `500`: Server error

### Verify Payment
- **Endpoint:** `POST /payment/verify`
- **Authentication:** Required
- **Body Parameters:**
  - `razorpay_order_id` (string)
  - `razorpay_payment_id` (string)
  - `razorpay_signature` (string)
  - `rideId` (string)
- **Response:**
  ```json
  {
    "message": "Payment verified successfully"
  }
  ```
- **Error Responses:**
  - `400`: Invalid signature
  - `500`: Server error

## Error Responses
All endpoints may return the following error responses:
- `400 Bad Request`: Invalid input parameters
- `401 Unauthorized`: Missing or invalid authentication
- `500 Internal Server Error`: Server-side error


