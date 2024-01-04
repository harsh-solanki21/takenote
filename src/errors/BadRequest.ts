import { BaseError } from './BaseError'
import StatusCode from './ErrorCodes'

export class BadRequest extends BaseError {
    statusCode: number
    constructor(message: string) {
        super(message)
        this.statusCode = StatusCode.BAD_REQUEST
    }

    serializeErrors(): Array<{ message: string; field?: string | undefined }> {
        return [{ message: this.message }]
    }
}
