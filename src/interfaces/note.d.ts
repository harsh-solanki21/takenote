import { Document, Types } from 'mongoose'

export interface INote extends Document {
    readonly _id: Types.ObjectId
    title: string
    body: string
    owner: Types.ObjectId
    shared_with?: [Types.ObjectId]
}
