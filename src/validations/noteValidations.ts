import { body, param, query } from 'express-validator'

export const paramValidation = [
    param('id').isMongoId().withMessage('Invalid ID'),
]

export const queryValidation = [
    query('q').isString().withMessage('Invalid query'),
]

export const cretaeNoteValidations = [
    body('title').trim().notEmpty().withMessage('Note Title is required'),
    body('body').trim().notEmpty().withMessage('Note Body is required'),
    body('owner').notEmpty().withMessage('Note Owner is required').isMongoId(),
]

export const shareNoteValidations = [
    ...paramValidation,
    body('share_with')
        .isArray()
        .notEmpty()
        .withMessage('Shared with should be an Array'),
    body('share_with.*').isMongoId().withMessage('Invalid ID'),
]
