import { BaseError } from './BaseError'
import StatusCode from './ErrorCodes'

export class NotAuthorize extends BaseError {
    statusCode: number
    constructor(message: string) {
        super(message)
        this.statusCode = StatusCode.UNAUTHORIZED
    }

    serializeErrors(): Array<{ message: string; field?: string | undefined }> {
        return [{ message: this.message }]
    }
}
