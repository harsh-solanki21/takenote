import { CookieOptions, Request, Response } from 'express'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

const jwt_secret: string = process.env.JWT_SECRET as string

export const verifyJwtToken = (token: string) => jwt.verify(token, jwt_secret)

const generateCookie = (token_type: 'access_token' | 'refresh_token') => {
    const expiry =
        token_type === 'access_token'
            ? 1000 * 60 * 60 * 24 // 1 day
            : 1000 * 60 * 60 * 24 * 7 // 7 days

    const cookie: CookieOptions = {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production' ? true : false,
        expires: new Date(Number(Date.now) + expiry),
        maxAge: expiry,
        signed: true,
        sameSite: 'lax',
        // domain: 'localhost',
    }

    return cookie
}

export const createJwtToken = (
    req: Request,
    res: Response,
    payload: Record<string, unknown>,
    user_token: string
) => {
    const accessToken = jwt.sign(payload, jwt_secret, {
        expiresIn: '1d',
    })

    const refreshToken = jwt.sign({ ...payload, user_token }, jwt_secret, {
        expiresIn: '7d',
    })

    const access_token_cookies = generateCookie('access_token')
    res.cookie('access_token', accessToken, access_token_cookies)

    const refresh_token_cookies = generateCookie('refresh_token')
    res.cookie('refresh_token', refreshToken, refresh_token_cookies)
}
