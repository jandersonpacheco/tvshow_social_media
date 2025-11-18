import express from 'express'
import { PORT } from './config/config.js'
import cors from 'cors'
import authRouter from './routes/auth.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/auth', authRouter)

app.listen(PORT, () => { console.log( `SERVER ON: http://localhost:${PORT}`)})