import { disconnectDatabase } from "./database"
import type { Server } from 'http'

/**
 * Gracefully shuts down the server by closing the database connection and then the server itself.
 * 
 * @param server - The HTTP server instance to close.
 */
export const gracefulShutdown = async (server: Server) => {
  console.log('\nShutting down gracefully...\n')
  await disconnectDatabase()

  server.close((err) => {
    if (err) {
      console.error('Error during server close:', err)
      process.exit(1)
    } else {
      console.log('Closed out remaining connections')
      process.exit(0)
    }
  })
}
