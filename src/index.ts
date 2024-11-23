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

// Exporting to use in tests
export const app = express()
export let server: ReturnType<typeof createServer>

const startServer = async () => {
  setupEnv()
  await connectDatabase()

  setupMiddleware(app)
  setupRoutes(app)

  // Normally, express internally creates the http server
  // but we need access to it directly to pass to socket.io
  server = createServer(app)
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
    if (process.env.NODE_ENV === 'production') {
      console.error('Failed to start server:', err);
      process.exit(1);
    } else {
      throw new Error(`Failed to start server: ${err}`);
    }
  })
