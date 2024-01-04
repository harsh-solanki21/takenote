import { Router } from 'express'
import { cretaeNoteValidations, paramValidation, queryValidation, shareNoteValidations } from '../validations/noteValidations'
import { createNote, deleteNote, getAllNotes, getNoteById, searchNote, shareNote, updateNote } from '../controllers/noteController'

const router: Router = Router()

// routes for current user
router.get('/', getAllNotes)

router.get('/search', [], searchNote)

router.get('/:id', [...paramValidation], getNoteById)

router.post('/create', [...cretaeNoteValidations], createNote)

router.put('/:id', [...paramValidation], updateNote)

router.delete('/:id', [...paramValidation], deleteNote)

router.post('/:id/share', [...shareNoteValidations], shareNote)


export default router
