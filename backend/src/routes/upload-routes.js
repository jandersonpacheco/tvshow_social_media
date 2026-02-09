import express from 'express'
import uploadController from '../controllers/upload-controller.js'

const uploadRouter = express.Router()

uploadRouter.post('/upload', uploadController.upload)
uploadRouter.put('/update-profile', uploadController.updateProfilePicture)

export default uploadRouter