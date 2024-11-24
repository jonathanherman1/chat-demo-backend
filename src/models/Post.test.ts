import mongoose from 'mongoose'
import { Post, postZodSchema } from './Post'
import { connectDatabase, disconnectDatabase } from '../config'

describe('Post Zod Schema', () => {
  it('should validate a correct post', () => {
    const validPost = {
      message: 'Hello World',
      username: 'user123',
    }
    expect(() => postZodSchema.parse(validPost)).not.toThrow()
  })

  it('should invalidate a post without a message', () => {
    const invalidPost = {
      username: 'user123',
    }
    expect(() => postZodSchema.parse(invalidPost)).toThrow()
  })

  it('should invalidate a post without a username', () => {
    const invalidPost = {
      message: 'Hello World',
    }
    expect(() => postZodSchema.parse(invalidPost)).toThrow()
  })
})

describe('Post Mongoose Model', () => {
  beforeEach(async () => {
    await connectDatabase()
  })

  afterEach(async () => {
    await Post.deleteMany({})
    await disconnectDatabase()
  })

  afterAll(async () => {
    await mongoose.connection.close()
  })

  it('should create a post successfully', async () => {
    const post = new Post({
      message: 'Hello World',
      username: 'user123',
    })
    const savedPost = await post.save()
    expect(savedPost._id).toBeDefined()
    expect(savedPost.message).toBe('Hello World')
    expect(savedPost.username).toBe('user123')
  })

  it('should fail to create a post without a message', async () => {
    const post = new Post({
      username: 'user123',
    })
    await expect(post.save()).rejects.toThrow()
  })

  it('should fail to create a post without a username', async () => {
    const post = new Post({
      message: 'Hello World',
    })
    await expect(post.save()).rejects.toThrow()
  })
})