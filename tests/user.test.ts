import request from 'supertest'
import app from '../src/server'
import connectMongo from '../src/configs/mongo'

describe('User Authentication', () => {
    const numUsers: number = 3

    beforeAll(async () => {
        await connectMongo(process.env.MONGO_URI as string)
    })

    test('should sign up a new user', async () => {
        for (let i = 1; i <= numUsers; i++) {
            const response = await request(app)
                .post('/api/auth/signup')
                .send({
                    name: `harsh${i}`,
                    email: `harsh_${i}@gmail.com`,
                    password: `harsh_${i}`,
                    confirm_password: `harsh_${i}`,
                })

            expect(response.status).toBe(201)
            expect(response.body).toHaveProperty('user_id')
            expect(response.body.message).toBe('User created Successfully')
            // createdUserIds.push(response.body.user_id)
        }
    })

    test('should log in an existing user', async () => {
        for (let i = 1; i <= numUsers; i++) {
            const response = await request(app)
                .post('/api/auth/login')
                .send({ email: `harsh_${i}@gmail.com`, password: `harsh_${i}` })

            expect(response.status).toBe(200)
            expect(response.body.message).toBe('LoggedIn Succesfully')
        }
    })
})
