import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import cookieParser from 'cookie-parser'
import connectDB from '../backend/db/db.js'
import userRoutes from './routes/user.routes.js'
import captainRoutes from './routes/captain.routes.js'
import mapRoutes from './routes/map.routes.js'
import rideRoutes from './routes/ride.routes.js'



const app = express()

connectDB()

app.use(cors({
  origin: ['https://rctxllw9-5173.inc1.devtunnels.ms', 'http://localhost:5173'],
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())


app.use('/user', userRoutes)
app.use('/captain', captainRoutes)
app.use('/map', mapRoutes)
app.use('/ride', rideRoutes)

export default app