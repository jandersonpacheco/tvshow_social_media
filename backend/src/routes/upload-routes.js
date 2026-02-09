import express from 'express'
import uploadController from '../controllers/upload-controller.js'
import { upload } from '../controllers/upload-controller.js'

const uploadRouter = express.Router()

uploadRouter.post('/upload', upload.single('photo'), uploadController.uploadPhoto)


export default uploadRouter