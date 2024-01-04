import { Schema, Types, model } from 'mongoose'
import { INote } from '../interfaces/note'

const NoteSchema: Schema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'Note Title is Required'],
        },
        body: {
            type: String,
            required: [true, 'Note Body is Required'],
        },
        owner: {
            type: Types.ObjectId,
            ref: 'User',
            required: [true, 'Note Owner is Required'],
        },
        shared_with: [
            {
                type: Types.ObjectId,
                ref: 'User',
            },
        ],
    },
    {
        timestamps: true,
    }
)

NoteSchema.index({ body: 'text' })
NoteSchema.index({ title: 'text' })

export default model<INote>('Note', NoteSchema)
