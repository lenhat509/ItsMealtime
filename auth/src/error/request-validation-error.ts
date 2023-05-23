import { CustomError } from "./custom-error";
import { FieldValidationError, ValidationError } from "express-validator";

export class RequestValidationError<T> extends CustomError {
    public statusCode:number = 400
    public errors: FieldValidationError[]

    constructor(errors: FieldValidationError[]) {
        super("Invalid Parameters")
        this.errors = errors
        
        Object.setPrototypeOf(this, RequestValidationError.prototype)
    }
    
    serializeErrors() {
        return this.errors.map((error: FieldValidationError) => ({
            message: error.msg,
            field: error.path
        }))
    }
}