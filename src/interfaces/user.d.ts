import { Document, Types } from 'mongoose'

export interface IUser extends Document {
    readonly _id: Types.ObjectId
    user_no: number
    name: string
    email: string
    password: string
    is_active: boolean
    matchPassword: (password: string) => boolean
}
