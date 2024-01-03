import { Document, Types } from 'mongoose'

export interface IUserToken extends Document {
    readonly _id: Types.ObjectId
    user_id: Types.ObjectId
    user_token: string
    ip: string
    is_valid: boolean
}
