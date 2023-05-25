import { Router, Request, Response } from "express"
import { body } from "express-validator"
import { User } from "../models/user"
import "express-async-errors"
import { Password } from "../utilites/password"
import { BadRequestError } from "../error/bad-request-error"
import { requestValidation } from "../middleware/request-validation"
import { JWTAuth } from "../utilites/jwt-auth"
import { requireAuth } from "../middleware/require-auth"

const router = Router()

router.post("/login", [
        body("email")
        .isEmail()
        .withMessage("Invalid Email"),
        body("password")
        .isLength({
            min: 8,
            max: 20
        })
        .withMessage("Length should be between 8 and 20")
    ], requestValidation,
    async (req: Request, res: Response) => {
        const existingUser = await User.findOne({
            email: req.body.email 
        })

        if(!existingUser)
            throw new BadRequestError("User does not exist")
        
        const matchPasswords = Password.compare(req.body.password, existingUser.password)
        if(!matchPasswords)
            throw new BadRequestError("Invalid Password")

        console.log(process.env.JWT_SECRET)

        const token = JWTAuth.sign(existingUser.toJSON())    

        res.cookie("token", token)

        res.status(200).json(existingUser)
})

router.post("/test", requireAuth, (req: Request, res: Response) => {
    res.status(200).json(req.currentUser)
})

export { router as loginRouter }
