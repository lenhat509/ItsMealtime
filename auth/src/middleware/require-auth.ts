import { Request, Response, NextFunction } from "express"
import { NotAuthenticatedError } from "../error/not-authenticated-error"
import { JWTAuth } from "../utilites/jwt-auth"

interface UserPayLoad {
    email: string,
    id: string
}

declare global{
    namespace Express {
        interface Request {
            currentUser?: UserPayLoad
        }
    }
}

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.cookies
    if(!token) throw new NotAuthenticatedError()
    try {
        const user = JWTAuth.verify(token) as UserPayLoad
        req.currentUser = user
        next()
    } catch {
        throw new NotAuthenticatedError()
    }
}
