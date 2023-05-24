import { app } from "./app"
import mongoose from "mongoose"

const start = async () => {
    if(!process.env.JWT_SECRET)
        throw new Error("No JWT_KEY found")
        
    await mongoose.connect("mongodb://auth-mongo-srv-cip:27017/db")
    console.log("Connect to MongoDB")

    app.listen(3000, async () => {
        console.log("Listening to 3000 from Auth")
    })
}

start()