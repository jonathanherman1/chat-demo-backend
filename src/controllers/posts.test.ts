import request from 'supertest'
import { disconnectDatabase } from '../config'
import { getIo } from '../config/socket-io'
import { app, server } from '../index'
import { Post } from '../models/Post'

jest.mock('socket.io', () => {
  return {
    Server: jest.fn().mockImplementation(() => {
      return {
        on: jest.fn(),
        emit: jest.fn(),
        close: jest.fn((callback) => callback && callback()),
      }
    }),
  }
})

describe('Posts Controller', () => {
  let emitSpy: jest.SpyInstance
  let io: ReturnType<typeof getIo>

  beforeAll(async () => {
    await Post.deleteMany({})
    io = getIo()
    emitSpy = jest.spyOn(io, 'emit')
  })

  afterEach(async () => {
    await Post.deleteMany({})
    emitSpy.mockClear()
  })

  afterAll(async () => {
    await Post.deleteMany({})
    io.close()
    await disconnectDatabase()
    await new Promise<void>((resolve) => {
      server.close(() => {
        resolve()
      })
    })
  })

  it('creates a new post', async () => {
    const res = await request(app)
      .post('/posts')
      .send({ username: 'Jon', message: 'Hello' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)

    // Correct content
    expect(res.body.username).toBe('Jon')
    expect(res.body.message).toBe('Hello')

    // Emits Socket.IO event
    expect(emitSpy).toHaveBeenCalledWith(
      'newPost',
      expect.objectContaining({
        username: 'Jon',
        message: 'Hello',
      }),
    )
    expect(emitSpy).toHaveBeenCalledTimes(1)
  })

  it('gets all posts', async () => {
    await new Post({ username: 'Jon', message: 'Hello' }).save()

    const res = await request(app)
      .get('/posts')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)

    expect(res.body).toHaveLength(1)
    expect(res.body[0].username).toBe('Jon')
    expect(res.body[0].message).toBe('Hello')
  })
})
