import { World } from '../src/world'
import MockSocketIo from '../src/testing/mock-socket'
import { beforeEach, test, expect, vi, describe, afterEach } from 'vitest'
import { RoomClass } from '../src/interfaces/room.interface'

const CLIENT_ID = 'test'
let socket
let auth = vi.fn()
let transport

beforeEach(() => {
    transport = World.transport(MockSocketIo.serverIo, {
        auth,
        timeoutDisconnect: 0
    })
})


test('socket.disconnect()', async () => {
    auth.mockReturnValue(CLIENT_ID)
    socket = new MockSocketIo.ClientIo(CLIENT_ID)
    await socket.connection()

    class Room {}
    const room = World.addRoom('room', Room)
    await World.joinRoom('room', CLIENT_ID)

    expect(room.users[CLIENT_ID]).toBeDefined()

    socket.disconnect()

    expect(room.users[CLIENT_ID]).toBeUndefined()
})

test('Multi User: socket.disconnect()', async () => {
    const firstPlayerId = 'first'
    const secondPlayerId = 'second'
    
    auth.mockReturnValue(firstPlayerId)
    const socket1 = new MockSocketIo.ClientIo(firstPlayerId)
    await socket1.connection()
    
    auth.mockReturnValue(secondPlayerId)
    const socket2 = new MockSocketIo.ClientIo(secondPlayerId)
    await socket2.connection()

    class Room {}
    const room = World.addRoom('room', Room)
    await World.joinRoom('room', firstPlayerId)
    await World.joinRoom('room', secondPlayerId)

    expect(room.users[firstPlayerId]).toBeDefined()
    expect(room.users[secondPlayerId]).toBeDefined()

    socket1.disconnect()

    expect(room.users[firstPlayerId]).toBeUndefined()
    expect(room.users[secondPlayerId]).toBeDefined()
})