import {v7 as uuidv7} from 'uuid'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


export default {
    register: async (req, res) => {
        const {username, firstName, lastName, newEmail, newPassword, confirmedNewPassword} = req.body

        if (!firstName || !lastName || !newEmail || !newPassword || !confirmedNewPassword) return res.status(400).json({ message: 'Preencha todos os campos.'})
        if (newPassword !== confirmedNewPassword) return res.status(400).json({ message: 'Senhas não conferem.'})

        const emailExists = await prisma.users.findUnique({ where: {email: newEmail} })
        if(emailExists) return res.status(400).json({message: 'Email já cadastrado.'})

        try{
            const user = await prisma.users.create({
                data:{
                    name: firstName,
                    lastName,
                    password: newPassword,
                    username,
                    email: newEmail,
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