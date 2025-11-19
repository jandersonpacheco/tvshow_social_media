import express from 'express'
import userController from '../controllers/users-controller.js'

const authRouter = express.Router()

authRouter.post('/register', userController.register)

export default authRouter