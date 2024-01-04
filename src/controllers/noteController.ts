import { Request, Response, query } from 'express'
import { throwValidationErrors } from '../utils/throwValidationError'
import { BadRequest, NotFound } from '../errors'
import {
    _createNote,
    _deleteNote,
    _getAllNotes,
    _getNoteById,
    _searchNotes,
    _shareNote,
    _updateNote,
} from '../data-access/note'
import { INote } from '../interfaces/note'
import { Types } from 'mongoose'

export const getAllNotes = async (req: Request, res: Response) => {
    throwValidationErrors(req)
    const { id } = req.userInfo
    if (!id) {
        throw new BadRequest('Something went Wrong!!')
    }

    const notes = await _getAllNotes(id)

    res.status(200).json(notes)
}
export const getNoteById = async (req: Request, res: Response) => {
    throwValidationErrors(req)
    const note_id = new Types.ObjectId(req.params.id)
    const user_id = req.userInfo?.id
    if (!user_id) {
        throw new BadRequest('Something went Wrong!!')
    }

    const note = await _getNoteById(note_id)
    if (!note) {
        throw new NotFound('Note not found!')
    }

    if (note.owner != user_id) {
        throw new BadRequest('Something went Wrong!!')
    }

    res.status(200).json(note)
}
export const createNote = async (req: Request, res: Response) => {
    throwValidationErrors(req)
    const { title, body } = req.body
    const { id } = req.userInfo
    if (!id) {
        throw new BadRequest('Something went Wrong!!')
    }

    await _createNote({ title, body, owner: id } as INote)

    res.status(200).json({ message: 'Note created successfully' })
}
export const updateNote = async (req: Request, res: Response) => {
    throwValidationErrors(req)
    const { title, body } = req.body
    const note_id = new Types.ObjectId(req.params.id)
    const user_id = req.userInfo?.id
    if (!user_id) {
        throw new BadRequest('Something went Wrong!!')
    }

    const note = await _updateNote(note_id, user_id, { title, body } as INote)

    res.status(200).json(note)
}
export const deleteNote = async (req: Request, res: Response) => {
    throwValidationErrors(req)
    const note_id = new Types.ObjectId(req.params.id)
    const user_id = req.userInfo?.id
    if (!user_id) {
        throw new BadRequest('Something went Wrong!!')
    }

    await _deleteNote(note_id, user_id)

    res.status(200).json({ message: 'Note deleted successfully' })
}
export const shareNote = async (req: Request, res: Response) => {
    throwValidationErrors(req)
    const { share_with } = req.body
    const note_id = new Types.ObjectId(req.params.id)
    const user_id = req.userInfo?.id
    if (!user_id) {
        throw new BadRequest('Something went Wrong!!')
    }

    await _shareNote(note_id, share_with)

    res.status(200).json({ message: 'Note shared successfully' })
}
export const searchNote = async (req: Request, res: Response) => {
    throwValidationErrors(req)
    const { q } = req.query
    const user_id = req.userInfo?.id
    if (!user_id) {
        throw new BadRequest('Something went Wrong!!')
    }

    const notes: INote[] = await _searchNotes(user_id, q as string)

    res.status(200).json(notes)
}
