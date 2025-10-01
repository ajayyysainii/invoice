import dotenv from 'dotenv'
dotenv.config()

import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import connectDB from './config/mongodb'
import MODULE_ROUTES_MAPPINGS from './modules'
import { handleError } from './utils/errors'

const app: Application = express()

// Error handling
if (process.env.NODE_ENV !== 'development') {
  handleError()
}

app.use(
  cors({
    origin: (process.env.ALLOWED_ORIGINS || '').split(','),
    optionsSuccessStatus: 200,
    credentials: true,
  }),
)
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// DB initialization and connection
connectDB()

// Routers
MODULE_ROUTES_MAPPINGS.forEach(({ prefix, router }) => {
  app.use(prefix, router)
})




// Endpoints
app.get('/', (req: Request, res: Response): void => {
  res.send('working!')
})

export default app
