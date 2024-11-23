import mongoose from 'mongoose'
import { connectDatabase } from './database'

jest.mock('mongoose', () => ({
  connect: jest.fn(),
}))

describe('Database Connection Tests', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('logs an error and exit process if connection fails', async () => {
    const error = new Error('Connection failed')
    ;(mongoose.connect as jest.Mock).mockRejectedValueOnce(error)
    const exitSpy = jest.spyOn(process, 'exit').mockImplementation((code) => {
      throw new Error(`process.exit: ${code}`)
    })
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {})

    await expect(connectDatabase()).rejects.toThrow('process.exit: 1')
    expect(console.error).toHaveBeenCalledWith(
      `MongoDB connection error: ${error}`,
    )
    expect(exitSpy).toHaveBeenCalledWith(1)

    consoleErrorSpy.mockRestore()
    exitSpy.mockRestore()
  })

  it('logs a success message if connection succeeds', async () => {
    ;(mongoose.connect as jest.Mock).mockResolvedValueOnce({})
    const consoleLogSpy = jest
      .spyOn(console, 'log')
      .mockImplementation(() => {})

    await connectDatabase()

    expect(console.log).toHaveBeenCalledWith('Connected to MongoDB')

    consoleLogSpy.mockRestore()
  })

  it('throws an error if MONGO_URI is missing', async () => {
    const originalEnv = process.env
    process.env = { ...originalEnv, MONGO_URI: '' }

    try {
      await connectDatabase()
    } catch (error) {
      expect(error).toEqual(
        new Error('Mongo_URI environment variable is missing'),
      )
    } finally {
      process.env = originalEnv
    }
  })
})
