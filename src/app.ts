import type { Application, Request, Response } from 'express'

import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'
import express from 'express'
import compression from 'compression'

dotenv.config()

const app: Application = express()

const isDevelopment = process.env.NODE_ENV === 'development'

app.use(express.json())
app.use(compression())
app.use(helmet({
  crossOriginEmbedderPolicy: !isDevelopment,
  contentSecurityPolicy: !isDevelopment,
}))
app.use(cors({ origin: '*' }))

app.get('/', (_req: Request, res: Response) => {
  try { res.status(200).json({ Status: 'Ok', created: Date.now().toString(), version: '1.0.0' }) }
  catch { res.status(500).json({ Status: 'Error', created: Date.now().toString(), version: '1.0.0' }) }
})

export default app
