import { Router, Request, Response } from "express"
import { body, validationResult, FieldValidationError } from "express-validator"
import { RequestValidationError } from "../error/request-validation-error"
import { User } from "../models/user"
import "express-async-errors"
import { Password } from "../utilites/password"
import jwt from "jsonwebtoken"
import { BadRequestError } from "../error/bad-request-error"

const router = Router()

const SECRET = 'hg83g0bnwhgobs5d83905bsyw92nd'

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
    ],
    async (req: Request, res: Response) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            throw new RequestValidationError(errors.array() as FieldValidationError[])
        }

        const existingUser = await User.findOne({
            email: req.body.email
        })

        if(!existingUser)
            throw new BadRequestError("User does not exist")
        
        const matchPasswords = Password.compare(req.body.password, existingUser.password)
        
        if(!matchPasswords)
            throw new BadRequestError("Invalid Password")

        const token = jwt.sign({ email: existingUser.email }, SECRET)    

        res.cookie("token", token)

        res.status(200).json({})
})

// router.post("/test", (req: Request, res: Response) => {
//     console.log(req.cookies)
// })

export { router as loginRouter }
