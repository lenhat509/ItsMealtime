import { Response, Request, Router } from "express"
import { body, FieldValidationError, validationResult } from "express-validator"
import { RequestValidationError } from "../error/request-validation-error"
import { User } from "../models/user"
import "express-async-errors"
import { BadRequestError } from "../error/bad-request-error"

const router = Router()

router.post("/signup", [
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
        
        if(existingUser)
            throw new BadRequestError("Email already existed")


        const user = User.build({
            email: req.body.email,
            password: req.body.password,
            avatar: ""
        })
        await user.save()

        res.status(201).json({})
})



export { router as signUpRouter }