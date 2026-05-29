import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import './config/db'
import authRoutes from './routes/auth'

const app = express()
const PORT = process.env.PORT || 5000

// Middleware first
app.use(cors())
app.use(express.json())

// Then routes
app.use('/api/auth', authRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

export default app