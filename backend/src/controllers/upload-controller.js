import { uploader } from "../config/config.js"
import { cloudinary } from "../config/config.js"
import { PrismaClient } from '@prisma/client'

export default {
    upload: async (req, res) => {
        try{
            if(!req.file) return res.status(400).json({message: 'Nenhum arquivo enviado.'})

            //Converter arquivo em base64
            const base64Img = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`

            const result = await cloudinary.uploader.upload(base64Img, { folder: 'profile_pictures'})

            res.json({url: result.secure_url})

        }catch(error){
            res.status(500).json({ error: err.message })
        }
    },
    updateProfilePicture: async (req, res) => {
        const {id, profilePicture} = req.body

        const prisma = new PrismaClient()

        try{
            const userUpdate = prisma.users.update({
                where: {id},
                data:{profilePicture}
            })

            res.status(201).json({message: {user}})
        }catch(error){
            res.status(500).json({mesage: `Erro: ${error}`})
        }
    }
}