require('dotenv').config()
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cookieParser = require('cookie-parser')
const cors = require("cors")
const {route} = require("./routes/user")

app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true, 
}))

app.use("/", route)


function main(){
    mongoose.connect(process.env.MONGO_URL)
    app.listen(3000)
    console.log("App listing on port 3000")
}
main()