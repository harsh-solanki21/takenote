import { BaseError } from './BaseError'
import StatusCode from './ErrorCodes'

export class NotFound extends BaseError {
    statusCode: number
    constructor(message: string) {
        super(message)
        this.statusCode = StatusCode.NOT_FOUND
    }

    serializeErrors(): Array<{ message: string; field?: string | undefined }> {
        return [{ message: this.message }]
    }
}
