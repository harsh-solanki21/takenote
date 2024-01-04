import { Application } from "express";
import UserRoutes from './userRoutes'
import NotesRoutes from './noteRoutes'
import { authMiddleware } from "../middlewares/authMiddleware";

const loadRoutes = (app: Application) => {
    app.use('/api/auth', [], UserRoutes)
    app.use('/api/notes', [authMiddleware], NotesRoutes)
}

export default loadRoutes
