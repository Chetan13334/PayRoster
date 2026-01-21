import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import workerRoutes from './routes/workers.routes.js'
import paymentRoutes from './routes/payments.routes.js'
import authRoutes from './routes/auth.routes.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/workers', workerRoutes)
app.use('/api/payments', paymentRoutes)
app.use('/api/auth', authRoutes)

export default app
