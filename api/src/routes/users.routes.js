import { Router } from 'express';
import { profile, login, register, logout } from '../controllers/user.controllers.js'

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.get('/profile', profile)
router.post('/logout', logout)

export default router
