import type { Request, Response, NextFunction } from 'express'
import { BaseError } from '../errors/BaseError'

const ErrorHandlerMiddleware = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
): any => {
    if (err instanceof BaseError) {
        return res.status(err.statusCode).json({ error: err.serializeErrors() })
    }
    res.status(500).json({ message: err.message })
}

export default ErrorHandlerMiddleware
