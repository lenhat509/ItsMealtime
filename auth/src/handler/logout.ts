import { Router, Request, Response } from "express"

const router = Router()

router.post('/logout', (req: Request, res: Response) => {
    // check jwt

    res.clearCookie("token")
    res.status(200).json({})
})

export { router as logOutRouter}