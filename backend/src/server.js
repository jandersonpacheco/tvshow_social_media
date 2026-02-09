import express from 'express'
import { PORT } from './config/config.js'
import cors from 'cors'
import authRouter from './routes/auth.js'
import uploadRouter from './routes/upload-routes.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/auth', authRouter)
app.use('/profile', uploadRouter)

app.listen(PORT, () => { console.log( `SERVER ON: http://localhost:${PORT}`)})