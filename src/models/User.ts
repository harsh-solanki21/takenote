import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'
import { IUser } from '../interfaces/user'
import { BadRequest } from '../errors/index'

const UserSchema: Schema = new Schema(
    {
        user_no: {
            type: Number,
        },
        name: {
            type: String,
            required: [true, 'Name is Required'],
            trim: true,
        },
        email: {
            type: String,
            lowercase: true,
            trim: true,
            unique: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please fill Valid Email',
            ],
            required: [true, 'Email is Required'],
        },
        password: {
            type: String,
            trim: true,
            minLength: [4, 'Password must be atleast 4 characters long'],
            required: [true, 'Password is Required'],
        },
        is_active: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
)

UserSchema.index({ email: 1 }, { unique: true })

UserSchema.pre('save', async function (next) {
    try {
        if (this.isNew) {
            const lastUserNo: any = await this.model('User')
                .findOne({})
                .sort({ createdAt: -1 })
            this.user_no = !lastUserNo ? 1 : lastUserNo.user_no + 1
        }
        next()
    } catch (error: any) {
        throw new BadRequest(error.message)
    }
})

UserSchema.pre('save', async function (next) {
    try {
        const user = this
        if (user.isModified('password') && user.password) {
            const salt = await bcrypt.genSalt(10)
            user.password = await bcrypt.hash(user.password, salt)
        }
        next()
    } catch (error: any) {
        throw new BadRequest(error.message)
    }
})

UserSchema.methods.matchPassword = async function (password: string) {
    return await bcrypt.compare(password, this.password)
}

export default model<IUser>('User', UserSchema)
