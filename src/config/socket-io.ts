import { Server } from 'socket.io'

let io: Server

/**
 * Sets up and initializes the Socket.IO server with the provided HTTP server.
 * Configures CORS settings and sets up connection and disconnection event handlers.
 * 
 * @param server - The HTTP server instance to attach Socket.IO to.
 * @returns The initialized Socket.IO server instance.
 */
export const setupSocketIo = (server: any) => {
  io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization']
    }
  })

  io.on('connection', (socket) => {
    console.log('a user connected')
    socket.on('disconnect', () => {
      console.log('user disconnected')
    })
  })

  return io
}

/** Retrieves the Socket.IO server instance singleton. */
export const getIo = () => {
  if (!io) {
    throw new Error('Socket.io not initialized')
  }
  return io
}
