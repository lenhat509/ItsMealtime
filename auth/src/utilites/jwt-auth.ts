import jwt, { JwtPayload } from "jsonwebtoken"

export class JWTAuth {
    public static SECRET: string = process.env.JWT_SECRET!

    public static verify(token: string): JwtPayload | string {
        return jwt.verify(token, JWTAuth.SECRET);
    }

    public static sign(payload: string | object): string {
        return jwt.sign(payload, JWTAuth.SECRET)
    }
}