import express from 'express'
import { createServer } from 'http'
import {
  connectDatabase,
  setupEnv,
  setupMiddleware,
  setupRoutes,
  setupSocketIo,
} from './config'
import { setupProcessHandlers } from './config/processHandlers'

const startServer = async () => {
  const app = express()
  setupEnv()
  await connectDatabase()

  setupMiddleware(app)
  setupRoutes(app)

  // Normally, express internally creates the http server
  // but we need access to it directly to pass to socket.io
  const server = createServer(app)
  setupSocketIo(server)

  const port = process.env.PORT
  server.listen(port, () => {
    if (process.env.NODE_ENV !== 'production') {
      console.log(`Server is running on http://localhost:${port}`)
    }
  })

  setupProcessHandlers(server)
}

startServer()
  .then(() => {
    console.log('Server started successfully')
  })
  .catch((err) => {
    console.error('Failed to start server:', err)
    process.exit(1)
  })
