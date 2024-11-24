import http from 'http'
import { Server } from 'socket.io'
import { setupSocketIo, getIo } from './socket-io'

describe('Socket.IO setup', () => {
  let server: http.Server

  beforeAll(() => {
    server = http.createServer()
  })

  afterAll(() => {
    server.close()
  })

  beforeEach(() => {
    jest.resetModules()
  })

  it('initializes Socket.IO server', () => {
    const io = setupSocketIo(server)
    expect(io).toBeInstanceOf(Server)
  })

  it('throws error if getIo is called before setup', () => {
    // Import the module again to reset the state
    const { getIo } = require('./socket-io')
    expect(() => getIo()).toThrow('Socket.io not initialized')
  })

  it('returns the Socket.IO instance after setup', () => {
    setupSocketIo(server)
    const io = getIo()
    expect(io).toBeInstanceOf(Server)
  })
})
