import { World } from '../src/world'
import { Transmitter } from '../src/transmitter'
import MockSocketIo from '../src/testing/mock-socket'
import { beforeEach, test, expect, afterEach, vi } from 'vitest'

const CLIENT_ID = 'mock'
let socket

beforeEach(() => {
    World.transport(MockSocketIo.serverIo, {
        auth() {
            return CLIENT_ID
        }
    })
    Transmitter.encode = false

    class Player {
        hp = 10
    }

    World.setUserClass(Player)

    socket = new MockSocketIo.ClientIo(CLIENT_ID)
    socket.connection()
})

test('Merge Specific Value in Room', async () => {
    const fn = vi.fn()

    class Room {
        value = 'test'

        $additionalEmitProperties() {
            return {
                value: this.value
            }
        }
    }

    socket.on('w', fn)

    const room = World.addRoom('room', Room)
    await World.joinRoom(room.id, CLIENT_ID)
    await World.send()

    expect(fn).toHaveBeenCalled()
    expect(fn).toHaveBeenCalledWith([
        room.id,
        expect.any(Number), 
        expect.objectContaining({ value: 'test' })
    ], undefined)
})

test('Merge Specific Value in Room (string)', async () => {
    const fn = vi.fn()

    class Room {
        $additionalEmitProperties(user) {
            return `users.${user.id}.hp`
        }
    }

    socket.on('w', fn)

    const room = World.addRoom('room', Room) 
    await World.joinRoom(room.id, CLIENT_ID)
    await World.send()

    expect(fn).toHaveBeenCalled()
    expect(fn).toHaveBeenCalledWith([
        room.id,
        expect.any(Number), 
        expect.objectContaining({ users: { [CLIENT_ID]: expect.objectContaining({ hp: 10 }) } })
    ], undefined)
})

afterEach(() => {
    World.clear()
})