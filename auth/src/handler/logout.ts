import { Router, Request, Response } from "express"
import { requireAuth } from "../middleware/require-auth"

const router = Router()

router.post('/logout', requireAuth, (req: Request, res: Response) => {
    res.clearCookie("token")
    res.status(200).json({})
})

export { router as logOutRouter}