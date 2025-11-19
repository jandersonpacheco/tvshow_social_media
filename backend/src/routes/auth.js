import express from 'express'
import userController from '../controllers/users-controller.js'

const authRouter = express.Router()

authRouter.post('/register', userController.register)
authRouter.post('/login', userController.login)

export default authRouter