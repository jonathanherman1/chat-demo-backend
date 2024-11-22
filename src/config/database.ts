import mongoose from 'mongoose'

const mongoUri = process.env.MONGO_URI

if (!mongoUri) {
  throw new Error('Mongo_URI environment variable is missing')
}

export const connectDatabase = async () => {
  try {
    await mongoose.connect(mongoUri)
    console.log('Connected to MongoDB')
  } catch (err) {
    console.error(`MongoDB connection error: ${err}`)
    process.exit(1)
  }
}
