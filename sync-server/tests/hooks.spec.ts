import { World } from '../src/world'
import MockSocketIo from '../src/testing/mock-socket'
import { beforeEach, test, expect, vi, describe } from 'vitest'
import { RoomClass } from '../src/interfaces/room.interface'

const CLIENT_ID = 'test'
let socket

beforeEach(() => {
    World.transport(MockSocketIo.serverIo)
    socket = new MockSocketIo.ClientIo(CLIENT_ID)
    socket.connection()
})

test('onInit()', () => {
    const onInit = vi.fn()
    class Room {
        onInit = onInit
    }
    World.addRoom('room', Room)
    expect(onInit).toHaveBeenCalled()
})

test('onJoin()', () => {
    const onJoin = vi.fn()
    class Room {
        onJoin = onJoin
    }
    World.addRoom('room', Room)
    World.joinRoom('room', CLIENT_ID)
    expect(onJoin).toHaveBeenCalled()
    expect(onJoin).toHaveBeenCalledWith(expect.objectContaining({
        id: CLIENT_ID
    }))
})

describe('canJoin()', () => {
    test('canJoin() called', async () => {
        const canJoin = vi.fn()
        const onJoin = vi.fn()
        class Room {
            onJoin = onJoin
            canJoin = canJoin
        }
        interface Room extends RoomClass { }
        const room = World.addRoom<Room>('room', Room)
        await room.$join(CLIENT_ID)
        expect(canJoin).toHaveBeenCalled()
        expect(onJoin).toHaveBeenCalled()
        expect(canJoin).toHaveBeenCalledWith(expect.objectContaining({
            id: CLIENT_ID
        }), expect.objectContaining({
            id: CLIENT_ID
        }))
    })
    test('canJoin() called with false return', async () => {
        const canJoin = vi.fn().mockReturnValue(false)
        const onJoin = vi.fn()
        class Room {
            onJoin = onJoin
            canJoin = canJoin
        }
        interface Room extends RoomClass { }

        const room = World.addRoom<Room>('room', Room)
        await room.$join(CLIENT_ID)
        expect(canJoin).toHaveBeenCalled()
        expect(onJoin).not.toHaveBeenCalled()
    })

    function canJoinErrorTest(returnValue) {
        return new Promise((resolve: any, reject) => {
            const canJoin = vi.fn().mockReturnValue(returnValue)
            class Room {
                canJoin = canJoin
            }
            interface Room extends RoomClass { }

            socket.on('error', (error) => {
                try {
                    expect(error).toBeDefined()
                    expect(error).toEqual({
                        code: 'NOT_AUTHORIZED',
                        message: returnValue || 'Not authorized',
                        status: 401
                    })
                    resolve()
                }
                catch (e) {
                    reject(e)
                }
            })

            World.addRoom<Room>('room', Room)
            World.joinRoom('room', CLIENT_ID)
        })
    }

    test('canJoin() called. Error handling', () => {
        canJoinErrorTest(false)
    })

    test('canJoin() called. Error handling. Custom Message', () => {
        canJoinErrorTest('msg')
    })
})

test('onLeave()', () => {
    const onLeave = vi.fn()
    class Room {
        onLeave = onLeave
    }
    World.addRoom('room', Room)
    World.joinRoom('room', CLIENT_ID)
    socket.disconnect()
    expect(onLeave).toHaveBeenCalled()
    expect(onLeave).toHaveBeenCalledWith(expect.objectContaining({
        id: CLIENT_ID
    }))
})

test('onChanges()', () => {
    const onChanges = vi.fn()
    class Room {
        $schema = {
            count: Number
        }
        onChanges = onChanges
        count = 0
    }
    const room = World.addRoom<Room>('room', Room)
    World.joinRoom('room', CLIENT_ID)
    room.count++
    expect(onChanges).toHaveBeenCalled()
    expect(onChanges).toHaveBeenCalledWith(expect.objectContaining({
        count: 1
    }))
})