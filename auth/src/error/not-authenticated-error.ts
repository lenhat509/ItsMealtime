import { CustomError } from "./custom-error";

export class NotAuthenticatedError extends CustomError {
    public statusCode = 401
    public static error = "Unauthenticated"

    constructor() {
        super(NotAuthenticatedError.error)

        Object.setPrototypeOf(this, NotAuthenticatedError.prototype)
    }

    public serializeErrors() {
        return [{
            message: NotAuthenticatedError.error
        }]
    }
}