import {v7 as uuidv7} from 'uuid'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


export default {
    register: async (req, res) => {
        const {name, lastName, email, password, passwordConfirmation} = req.body

        const userVerify = async () => {
            const emailExists = await prisma.users.findUnique({
                select:{
                    where: { email }
                }
            })
            return emailExists
        }

        try{
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

        }catch(error){
            console.log('error')
        }
    }
}

