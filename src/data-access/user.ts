import { BadRequest } from '../errors'
import { IUser } from '../interfaces/user'
import User from '../models/User'

export const _getUserByEmail = async (email: string) => {
    try {
        const user = await User.findOne({ email })
        return user
    } catch (error: any) {
        throw new BadRequest(error.message)
    }
}

export const _createUser = async (user_data: IUser) => {
    try {
        const user: IUser = await User.create(user_data)
        return user._id
    } catch (error: any) {
        throw new BadRequest(error.message)
    }
}

