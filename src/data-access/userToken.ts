import { Types } from 'mongoose'
import { BadRequest } from '../errors'
import { IUserToken } from '../interfaces/user_token'
import UserToken from '../models/UserToken'

export const _getTokenByUserId = async (id: Types.ObjectId) => {
    try {
        const token: IUserToken | null = await UserToken.findOne({ user_id: id })
        return token
    } catch (error: any) {
        throw new BadRequest(error.message)
    }
}

export const _createToken = async (payload: IUserToken) => {
    try {
        const token = await UserToken.create(payload)
        return token
    } catch (error: any) {
        throw new BadRequest(error.message)
    }
}
