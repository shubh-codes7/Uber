import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from '../backend/db/db.js'
import userRoutes from './routes/user.routes.js'
dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/users', userRoutes)

app.get("/", (req, res) => {
    console.log("Hello")
    res.send("hello")
})

app.listen(port, ()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
    connectDB()
})