import express from "express"
import bodyParser from "body-parser"
import { loginRouter } from "./handler/login"
import { signUpRouter } from "./handler/signup"
import mongoose from "mongoose"
import { errorHandler } from "./middleware/error"
import { NotFoundError } from "./error/not-found-error"
import "express-async-errors" // this library allows the route handlers with Async throw an error without passing to the Next function
import cookieParser from "cookie-parser"
import { logOutRouter } from "./handler/logout"

const app = express()
app.use(cookieParser())
app.use(bodyParser.json())

app.use("/api/user", loginRouter)
app.use("/api/user", signUpRouter)
app.use("/api/user", logOutRouter)

app.all('*', async () => {
    throw new NotFoundError()
})

app.use(errorHandler)

app.listen(3000, async () => {
    console.log("Listening to 3000 from Auth")
    await mongoose.connect("mongodb://auth-mongo-srv-cip:27017/db")
    console.log("Connect to MongoDB")
})