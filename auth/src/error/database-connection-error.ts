import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError {
    public statusCode: number = 500
    public static error: string = 'Fail to connect to database'

    constructor() {
        super(DatabaseConnectionError.error)

        Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
    }

    serializeErrors() {
        return [{
            message: DatabaseConnectionError.error
        }]
    }
}