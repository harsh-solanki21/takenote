import { Application } from "express";
import UserRoutes from './userRoutes'

const loadRoutes = (app: Application) => {
    app.use('/api/auth', [], UserRoutes)
    // app.use('/api/notes', [authMiddleware], NotesRoutes)
    // app.use('/api/search', [authMiddleware], SearchRoutes)
}

export default loadRoutes
