export abstract class BaseError extends Error {
    abstract statusCode: number

    abstract serializeErrors(): Array<{ message: string; field?: string }>
}
