import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"


//app config
const app = express()
const port = 4500


//middleware
app.use(express.json())
app.use(cors())

//db connection
connectDB();


//api
app.use("/api/food", foodRouter)

app.get("/", (req, res) => {
    res.send("Lets go, API is active")
})

app.listen(port, () => {
    console.log(`Serer started on http://localhost:${port}`)
})