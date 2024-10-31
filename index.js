import express from "express"
import morgan from "morgan"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import dotenv from 'dotenv'

dotenv.config()

//app config
const app = express()
const port = 4500


//middleware
app.use(morgan('dev')); //logger
app.use(express.json()) //parse data to the body
app.use(express.urlencoded({extended:true}))
app.use(cors())

//db connection
connectDB();


//api
app.use("/api/food", foodRouter)
app.use("/images", express.static('uploads'))
app.use("/api/user", userRouter)


app.get("/", (req, res) => {
    res.send("Lets go, API is active")
})

//Error Middlewares
app.use((e, req, res, next) => {
    console.error(e);
    res.status(500).json({message: e.message, error: e })
})

app.listen(port, () => {
    console.log(`Serer started on http://localhost:${port}`)
})