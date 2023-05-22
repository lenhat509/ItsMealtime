import express from "express"
import bodyParser from "body-parser"
import auth from "./handlers"
import mongoose from "mongoose"
import { User } from "./models/user"
const app = express()
app.use(bodyParser.json())
app.use(auth)

app.listen(3000, async () => {
    console.log("Listening to 3001 from Auth")
    await mongoose.connect("mongodb://auth-mongo-srv-cip:27017/db")
    console.log("Connect to MongoDB")
})