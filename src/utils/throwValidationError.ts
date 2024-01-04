import { Request } from 'express'
import { validationResult } from 'express-validator'
import { RequestValidationErrors } from '../errors/RequestValidationError'

export const throwValidationErrors = (req: Request) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        throw new RequestValidationErrors(errors.array())
    }
}
