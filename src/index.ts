import express from 'express'
import dotenv from 'dotenv-safe'
dotenv.config()
import * as routes from './routes'
// import morgan from 'morgan' # can improve logging with morgan for production environments
import helmet from 'helmet'
import compression from 'compression'
import cors from 'cors'
import { connectDatabase } from './config/database'

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
// app.use(morgan('dev'))
app.use(helmet())
app.use(compression())
app.use(cors())

// Programmatically add all routes to the app
Object.values(routes).forEach((route) => {
  app.use(route)
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})

connectDatabase()
