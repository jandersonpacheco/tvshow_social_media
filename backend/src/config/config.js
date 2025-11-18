import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

//Resolve o caminho para o .env na raiz
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

//Carrega as variáveis
dotenv.config({ path: join(__dirname, '../../.env')})

export const PORT  = process.env.PORT
