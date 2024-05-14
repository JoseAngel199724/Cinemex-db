import express from 'express'
import { register, login } from '../controllers/authController.js'

const authRoutes = express.Router()

authRoutes.post('/register', register)
authRoutes.post('/entrar', login)

export default authRoutes