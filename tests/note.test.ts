import request from 'supertest'
import app from '../src/server'
import { Types } from 'mongoose'

describe('Notes Tests', () => {
    let createdNoteId: number

    test('POST /notes should create a new note', async () => {
        const response = await request(app)
            .post('http://localhost:5000/api/notes/create')
            .send({
                title: 'The test note',
                body: 'The content for the test note',
                owner: new Types.ObjectId('6597d2232b4f4f5170db96f4'),
            })

        expect(response.status).toBe(200)
        expect(response.body.message).toBe('Note created successfully')
        createdNoteId = response.body.id // saving ID for later use in update and delete tests
    })

    test('GET /notes should return all notes', async () => {
        const response = await request(app).get('/api/notes/')
        expect(response.status).toBe(200)
    })

    test('GET /notes/:id should return a specific note', async () => {
        const response = await request(app).get(`/api/notes/${createdNoteId}`)
        expect(response.status).toBe(200)
        expect(response.body.title).toBe('The test note')
        expect(response.body.content).toBe('The content for the test note')
    })

    test('POST /notes/:id/share should share an existing note', async () => {
        const response = await request(app)
            .post(`/api/notes/${createdNoteId}/share`)
            .send({
                share_with: [new Types.ObjectId('6597d2232b4f4f5170db96f4')],
            })

        expect(response.status).toBe(200)
        expect(response.body.message).toBe('Note shared successfully')
    })

    test('PUT /notes/:id should update an existing note', async () => {
        const response = await request(app)
            .put(`/api/notes/${createdNoteId}`)
            .send({
                title: 'The updated test note',
                body: 'The content for the updated test note',
            })

        expect(response.status).toBe(200)
        expect(response.body.title).toBe('The updated test note')
        expect(response.body.body).toBe('The content for the updated test note')
    })

    test('DELETE /notes/:id should delete an existing note', async () => {
        const response = await request(app).delete(
            `/api/notes/${createdNoteId}`
        )

        expect(response.status).toBe(200)
        expect(response.body.message).toBe('Note deleted successfully')

        // Verify that the note has been deleted by attempting to retrieve it
        const getNoteResponse = await request(app).get(
            `/api/notes/${createdNoteId}`
        )
        expect(getNoteResponse.status).toBe('Something went Wrong!!')
    })

    test('GET /notes/search?q=update should return all the notes matching with keyword', async () => {
        const query: string = 'update'
        const response = await request(app).get(`/api/notes/search?q=${query}`)
        expect(response.status).toBe(200)
        expect(response.body).toHaveLength(1)
    })
})
