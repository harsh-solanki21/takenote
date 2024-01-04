import { model, Schema } from 'mongoose'
import { IUserToken } from '../interfaces/user_token'

const UserTokensSchema: Schema = new Schema(
    {
        user_id: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'User id is required'],
        },
        user_token: {
            type: String,
            required: [true, 'User token is required'],
        },
        ip: {
            type: String,
            required: [true, 'IP is required'],
        },
        is_valid: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
)

export default model<IUserToken>('UserToken', UserTokensSchema)
