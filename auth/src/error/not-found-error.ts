import { CustomError } from "./custom-error";

export class NotFoundError extends CustomError {
    public statusCode: number = 404
    public static error:string = "Not Found"

    constructor() {
        super(NotFoundError.error)

        Object.setPrototypeOf(this, NotFoundError.prototype)
    }

    serializeErrors() {
        return [{
            message: NotFoundError.error
        }]
    }

}