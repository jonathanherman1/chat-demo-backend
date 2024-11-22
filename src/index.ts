import express from 'express'
import dotenv from 'dotenv-flow'
import dotenvSafe from 'dotenv-safe'
dotenv.config()
// Validate required environment variables
dotenvSafe.config({
  example: './.env.example'
})

import * as routes from './routes'
// import morgan from 'morgan' # can improve logging with morgan for production environments
import helmet from 'helmet'
import compression from 'compression'
import cors from 'cors'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { connectDatabase } from './config/database'

const app = express()
app.use(express.json())
// app.use(morgan('dev'))
app.use(helmet())
app.use(compression())
app.use(cors())

// Programmatically add all routes to the app
Object.values(routes).forEach((route) => {
  app.use(route)
})

// Normally, express internally creates the http server
// but we need access to it directly to pass to socket.io
const server = createServer(app)
export const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }
})

io.on('connection', (socket) => {
  console.log('a user connected')
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

const port = process.env.PORT
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})

connectDatabase()
