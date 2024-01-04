import { Types } from 'mongoose'
import { BadRequest } from '../errors'
import Note from '../models/Note'
import { INote } from '../interfaces/note'

export const _getAllNotes = async (id: Types.ObjectId) => {
    try {
        const notes: INote[] = await Note.find({ owner: id })
        return notes
    } catch (error: any) {
        throw new BadRequest(error.message)
    }
}

export const _getNoteById = async (id: Types.ObjectId) => {
    try {
        const note: INote | null = await Note.findById(id)
        return note
    } catch (error: any) {
        throw new BadRequest(error.message)
    }
}

export const _createNote = async (payload: INote) => {
    try {
        const note: INote = await Note.create(payload)
        return note
    } catch (error: any) {
        throw new BadRequest(error.message)
    }
}

export const _updateNote = async (
    note_id: Types.ObjectId,
    user_id: Types.ObjectId,
    payload: INote
) => {
    try {
        const note: INote | null = await Note.findOneAndUpdate(
            { _id: note_id, owner: user_id },
            payload,
            { new: true }
        )

        if (!note) {
            throw new BadRequest('Something went Wrong!!')
        }

        return note
    } catch (error: any) {
        throw new BadRequest(error.message)
    }
}

export const _deleteNote = async (
    note_id: Types.ObjectId,
    user_id: Types.ObjectId
) => {
    try {
        const note = await Note.deleteOne({ _id: note_id, owner: user_id })
        if (!note) {
            throw new BadRequest('Something went Wrong!!')
        }
        return note
    } catch (error: any) {
        throw new BadRequest(error.message)
    }
}

export const _shareNote = async (
    note_id: Types.ObjectId,
    shared_with: Types.ObjectId[]
) => {
    try {
        const note: INote | null = await Note.findOneAndUpdate(
            { _id: note_id },
            { $push: { shared_with } },
            { new: true }
        )
        if (!note) {
            throw new BadRequest('Something went Wrong!!')
        }
        return note
    } catch (error: any) {
        throw new BadRequest(error.message)
    }
}

export const _searchNotes = async (user_id: Types.ObjectId, search: string) => {
    try {
        const searchQuery = {
            $text: {
                $search: search,
                $caseSensitive: false,
                $diacriticSensitive: true,
            },
        }
        const note: INote[] = await Note.find({
            owner: user_id,
            ...searchQuery,
        })
        return note
    } catch (error: any) {
        throw new BadRequest(error.message)
    }
}
