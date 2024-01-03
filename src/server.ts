import 'express-async-errors'
import cookieParser from 'cookie-parser'
import express, { Application, Request, Response } from 'express'
import path from 'path'
import cors from 'cors'
import dotenv from 'dotenv'
import helmet from 'helmet'
import compression from 'compression'
import NotFoundRoute from './middlewares/notFoundHandler'
import loadRoutes from './routes'
import connectMongo from './configs/mongo'
import ErrorHandlerMiddleware from './middlewares/errorHandler'

dotenv.config()

const app: Application = express()

app.use(cors())
app.use(express.json())
app.use(helmet())
app.use(compression())
app.use(cookieParser(process.env.JWT_SECRET))

const port: number = Number(process.env.PORT) || 5000

loadRoutes(app)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')))
    app.get('*', (req: Request, res: Response) =>
        res.sendFile(
            path.resolve(__dirname, '../', 'client', 'build', 'index.html')
        )
    )
} else {
    app.get('/', async (req: Request, res: Response) =>
        res.send('Welcome to takenote 📝')
    )
}

app.use(NotFoundRoute)
app.use(ErrorHandlerMiddleware)

app.listen(port, async () => {
    await connectMongo(process.env.MONGO_URI as string)
    console.log(`Server is listening at http://localhost:${port}`)
})
