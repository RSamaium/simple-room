import { World } from '../src/world'
import { Transmitter } from '../src/transmitter'
import MockSocketIo from '../src/testing/mock-socket'
import { beforeEach, test, expect, vi } from 'vitest'

let socket

const CLIENT_ID = 'mock'

beforeEach(() => {
    Transmitter.encode = false
    vi.clearAllMocks()
    World.clear()
})

test('Test Auth', () => {
    return new Promise((resolve: any, reject) => {
        World.transport(MockSocketIo.serverIo, {
            auth() {
                return CLIENT_ID
            }
        })
        socket = new MockSocketIo.ClientIo()
        socket.on('uid', (id) => {
            expect(id).toBe(CLIENT_ID)
            resolve()
        })
        socket.connection()
    })
})

test('Test Auth with promise', () => {
    return new Promise((resolve: any, reject) => {
        World.transport(MockSocketIo.serverIo, {
            async auth() {
                return CLIENT_ID
            }
        })
        socket = new MockSocketIo.ClientIo()
        socket.on('uid', (id) => {
            expect(id).toBe(CLIENT_ID)
            resolve()
        })
        socket.connection()
    })
})

test('Test Auth Error', () => {
    const errorFn = vi.fn()
    World.transport(MockSocketIo.serverIo, {
        auth() {
            throw 'err'
        }
    })
    socket = new MockSocketIo.ClientIo()
    socket.on('error', errorFn)
    socket.connection()
    expect(errorFn).toHaveBeenCalled()
})

