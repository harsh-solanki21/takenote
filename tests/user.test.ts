import request from 'supertest'
import app from '../src/server'

describe('User Authentication', () => {
    let token: string

    // Unit Test: Signup
    test('should sign up a new user', async () => {
        const response = await request(app).post('/api/auth/signup').send({
            name: 'harsh',
            email: 'harsh@gmail.com',
            password: 'harsh123',
            confirm_password: 'harsh123',
        })

        expect(response.status).toBe(200)
    })

    // Integration Test: Login
    test('should log in an existing user', async () => {
        const response = await request(app)
            .post('/api/auth/login')
            .send({ email: 'harsh@gmail.com', password: 'harsh123' })

        expect(response.status).toBe(200)
    })
})
