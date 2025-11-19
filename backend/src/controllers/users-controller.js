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

        const userVerify = async () => {
            const emailExists = await prisma.users.findUnique({
                select:{
                    where: { email }
                }
            })
            return emailExists
        }

        try{
<<<<<<< HEAD
            const user = await userVerify()

            if(user) return res.status(400).json({error: `Email: ${email} já cadastrado.`})
            
            const newUser = await prisma.users.create({
                data:{
                    name: 'Janderson',
                    lastName:'Pacheco',
                    password:'1234',
                    publicId: uuidv7(),
                    userName: 'Jangunners'
                }
            })
=======
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
>>>>>>> 04df75a2c0aca3e1c278cefcea92737e2ffb7bc3

            res.status(201).json({message: `Usuário criado com sucesso:`, user: createdUser})
        }catch(error){
<<<<<<< HEAD
            console.log('error')
=======
            console.error(error)
            res.status(400).json({message: `Erro ao criar o usuário`, error})
>>>>>>> 04df75a2c0aca3e1c278cefcea92737e2ffb7bc3
        }
    }
}

