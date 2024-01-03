import { body } from 'express-validator'

export const signupValidations = [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').trim().notEmpty().withMessage('Email is required'),
    body('password')
        .trim()
        .notEmpty()
        .isLength({ min: 4 })
        .withMessage('Password must be at least 4 characters long'),
    body('confirm_password')
        .trim()
        .notEmpty()
        .isLength({ min: 4 })
        .withMessage('Password must be at least 4 characters long'),
]

export const loginValidations = [
    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email is required'),
    body('password')
        .trim()
        .isLength({ min: 4 })
        .withMessage('Password must be at least 4 characters long'),
]
