import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

const connectDatabaseProduction = async () => {
  const mongoUri = process.env.MONGO_URI

  if (!mongoUri) {
    throw new Error('Mongo_URI environment variable is missing')
  }
  try {
    await mongoose.connect(mongoUri)
    console.log('Connected to MongoDB')
  } catch (err) {
    console.error(`MongoDB connection error: ${err}`)
    process.exit(1)
  }
}

const disconnectDatabaseProduction = async () => {
  await mongoose.disconnect()
}

let mongoServer: MongoMemoryServer

const connectDatabaseTest = async () => {
  mongoServer = await MongoMemoryServer.create()
  const mongoUri = mongoServer.getUri()

  try {
    await mongoose.connect(mongoUri)
    console.log('Connected to in-memory MongoDB')
  } catch (err) {
    console.error(`In-memory MongoDB connection error: ${err}`)
    process.exit(1)
  }
}

const disconnectDatabaseTest = async () => {
  await mongoose.disconnect()
  await mongoServer.stop()
}

/**
 * Connects to the appropriate MongoDB instance based on the environment.
 *
 * If the `NODE_ENV` environment variable is set to 'test', it connects to an in-memory MongoDB instance
 * using `connectDatabaseTest`. Otherwise, it connects to the production MongoDB instance using `connectDatabaseProduction`.
 *
 * @throws {Error} If the `MONGO_URI` environment variable is missing in production mode.
 * @throws {Error} If there is an error connecting to MongoDB.
 */
export const connectDatabase =
  process.env.NODE_ENV === 'test'
    ? connectDatabaseTest
    : connectDatabaseProduction


/** 
 * Disconnects from the appropriate MongoDB instance based on the environment.
 */
export const disconnectDatabase =
  process.env.NODE_ENV === 'test'
    ? disconnectDatabaseTest
    : disconnectDatabaseProduction
