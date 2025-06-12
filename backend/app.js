import express from 'express'
import dotenv from 'dotenv'
import Razorpay from 'razorpay'
dotenv.config()
import cors from 'cors'
import cookieParser from 'cookie-parser'
import connectDB from '../backend/db/db.js'
import userRoutes from './routes/user.routes.js'
import captainRoutes from './routes/captain.routes.js'
import mapRoutes from './routes/map.routes.js'
import rideRoutes from './routes/ride.routes.js'
import paymentRoutes from './routes/razorpay.routes.js'



const app = express()

// Initialize Razorpay
export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

connectDB()

app.use(cors({
  origin: ['https://uber-two-sage.vercel.app', 'https://uber-shubhams-projects-c201ede4.vercel.app/', process.env.CLIENT_URL,  'https://rctxllw9-5173.inc1.devtunnels.ms', 'http://localhost:5173'],
  // origin: process.env.CLIENT_URL,
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())



app.use('/user', userRoutes)
app.use('/captain', captainRoutes)
app.use('/map', mapRoutes)
app.use('/ride', rideRoutes)
app.use('/payment', paymentRoutes)

export default app