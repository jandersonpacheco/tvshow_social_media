import { cloudinaryAPI } from "../config/config.js"
import {v2 as cloudinary} from 'cloudinary'
import multer from 'multer'

cloudinary.config({
    cloudinaryAPI
})

const storage = multer.memoryStorage()
export const upload = multer ({
    storage: storage
})

export default {
    uploadPhoto: (req, res) => {
        if(!req.file) return res.status(400).json({error: 'Nenhum arquivo enviado'})
        
        const stream = cloudinary.uploader.upload_stream({
            resource_type: 'auto'
        },
        (error, result) => {
            if (error) {
                console.log(error)
                return res.status(500).json({error: 'Erro ao enviar pra o Cloudinary'})
            }
            return res.json({public_id : result.public_id, url: result.secure_url })
        }
        )
        stream.end(req.file.buffer)
    },
}

