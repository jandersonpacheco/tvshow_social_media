import {v7 as uuidv7} from 'uuid'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


export default {
    register: async (req, res) => {
        const {name, lastName, userName, email, password, passwordConfirmation} = req.body

        if (!name || !lastName || !email || !password || !passwordConfirmation) return res.status(400).json({ message: 'Preencha todos os campos.'})
        if (password !== passwordConfirmation) return res.status(400).json({ message: 'Senhas não conferem.'})

        const emailExists = await prisma.users.findUnique({ where: {email} })
        if(emailExists) return res.status(400).json({message: 'Email já cadastrado.'})

        try{
            const user = await prisma.users.create({
                data:{
                    name,
                    lastName,
                    password,
                    userName,
                    email,
                    publicId: uuidv7()
                }
            })
            
            const createdUser = {
                ...user,
                id: user.id.toString()
            }

            res.status(201).json({message: `Usuário criado com sucesso:`, user: createdUser})
        }catch(error){
            console.error(error)
            res.status(400).json({message: `Erro ao criar o usuário`, error})
        }
    }
}