import { Router } from 'express'
import { loginUser, signupUser } from '../controllers/userController'
import { loginValidations, signupValidations } from '../validations/userValidations'

const router: Router = Router()

router.post('/signup', [...signupValidations], signupUser)

router.post('/login', [...loginValidations], loginUser)

export default router
