import express from 'express'
import { GoogleLogin, Login, Logout, Register } from '../controllers/auth.controller.js'
import { authenticate } from '../middleware/authenticate.js'

const router = express.Router()

router.post('/register', Register)
router.post('/login', Login)
router.post('/google-login', GoogleLogin)
router.get('/logout', authenticate, Logout)

export default router