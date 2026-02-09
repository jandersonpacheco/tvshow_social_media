import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { v2 as Cloudinary } from 'cloudinary'
import multer from "multer"

//Resolve o caminho para o .env na raiz
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

//Carrega as variáveis
dotenv.config({ path: join(__dirname, '../../.env')})

export const PORT  = process.env.PORT

//Cloudinary configs.
export const cloudinaryAPI = Cloudinary.config ({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})

//Multer configs.
export const uploader = multer ({
    storage: multer.memoryStorage()
})