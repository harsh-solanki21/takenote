import { Request, Response } from 'express'
import { throwValidationErrors } from '../utils/throwValidationError'
import { BadRequest, NotFound } from '../errors'
import { _createUser, _getUserByEmail } from '../data-access/user'
import { _createToken, _getTokenByUserId } from '../data-access/userToken'
import { createJwtToken } from '../utils/jwt'
import { generateRandomHex } from '../utils/generateRandomHex'

export const signupUser = async (req: Request, res: Response) => {
    throwValidationErrors(req)
    const { email, password, confirm_password } = req.body

    const user = await _getUserByEmail(email)
    if (user) {
        throw new BadRequest('User already exists, please login')
    }

    if (password !== confirm_password) {
        throw new BadRequest('Passwords do not match')
    }

    await _createUser(req.body)

    res.status(200).json({ message: 'User created Successfully' })
}

export const loginUser = async (req: Request, res: Response) => {
    throwValidationErrors(req)
    const { email, password } = req.body

    const user = await _getUserByEmail(email)
    if (!user) {
        throw new NotFound('User not found, Please Signup!')
    }

    if (!user.is_active) {
        throw new BadRequest('User has been Blocked!!')
    }

    const match = user.matchPassword(password)
    if (!match) {
        throw new BadRequest('Invalid credentials!')
    }

    const userToken = await _getTokenByUserId(user._id)

    if (userToken) {
        const { is_valid } = userToken
        if (!is_valid) {
            throw new BadRequest('Not authorized!')
        }

        createJwtToken(
            req,
            res,
            {
                id: user._id,
                name: user.name,
                email: user.email,
            },
            userToken.user_token
        )

        return res.status(200).json({ message: 'LoggedIn Succesfully' })
    }

    const tokenPayload: any = {
        user_id: user._id,
        user_token: generateRandomHex(64),
        ip: req.ip,
    }

    const token = await _createToken(tokenPayload)

    createJwtToken(
        req,
        res,
        {
            id: user._id,
            name: user.name,
            email: user.email,
        },
        token.user_token
    )

    res.status(200).json({ message: 'LoggedIn Succesfully' })
}
