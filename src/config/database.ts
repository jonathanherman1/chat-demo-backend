// src/config/database.ts
import mongoose from 'mongoose'

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/mydatabase'

export const connectDatabase = async () => {
  try {
    await mongoose.connect(mongoUri)
    console.log('Connected to MongoDB')
  } catch (err) {
    console.error(`MongoDB connection error: ${err}`)
    process.exit(1)
  }
}
