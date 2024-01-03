import type { ValidationError } from 'express-validator'
import { BaseError } from './BaseError'
import StatusCode from './ErrorCodes'

export class RequestValidationErrors extends BaseError {
    statusCode: number = StatusCode.BAD_REQUEST

    constructor(public errors: ValidationError[]) {
        super('')
    }

    serializeErrors(): Array<{ message: string; field?: string | undefined }> {
        return this.errors.map((err: any) => {
            return { message: err.msg, field: err.path }
        })
    }
}
