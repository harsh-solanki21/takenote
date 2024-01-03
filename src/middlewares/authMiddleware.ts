import { Request, Response, NextFunction } from 'express'
import { NotAuthorize } from '../errors'
import { createJwtToken, verifyJwtToken } from '../utils/jwt'
import { _getUserByEmail } from '../data-access/user'
import { _getTokenByUserId } from '../data-access/userToken'

export const authMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { access_token, refresh_token } = req.signedCookies

    if (!refresh_token) {
        throw new NotAuthorize('Not Authorize to access page!')
    }

    try {
        if (access_token) {
            const data = verifyJwtToken(access_token)
            req.userInfo = data
            next()
            return
        }

        const data: any = verifyJwtToken(refresh_token)
        const token = await _getTokenByUserId(data.id)

        if (!token || !token.is_valid) {
            throw new NotAuthorize('Not Authorized to access this page!')
        }

        createJwtToken(req, res, data, token.user_token)

        req.userInfo = { id: data.id, name: data.name, email: data.email }

        next()
    } catch (error) {
        throw new NotAuthorize('Not authorized')
    }
}
