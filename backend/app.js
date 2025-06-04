import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import connectDB from '../backend/db/db.js'
import userRoutes from './routes/user.routes.js'
import captainRoutes from './routes/captain.routes.js'
import mapRoutes from './routes/map.routes.js'
dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())


app.use('/user', userRoutes)
app.use('/captain', captainRoutes)
app.use('/map', mapRoutes)

app.get("/", (req, res) => {
    console.log("Hello")
    res.send("hello")
}) 

app.listen(port, ()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
    connectDB()
})