import { World } from '../src/world'
import { Transmitter } from '../src/transmitter'
import MockSocketIo from '../src/testing/mock-socket'
import { testSend } from './fixture'
import { beforeEach, test, expect, afterEach, vi } from 'vitest'

let auth = vi.fn()

beforeEach(() => {
    World.transport(MockSocketIo.serverIo, {
        auth
    })
    Transmitter.encode = false
})

test('Test Room properties', () => {
    class Room { }
    const room = World.addRoom('room', Room)
    expect(room.id).toBe('room')
    expect(room.$schema).toBeDefined()
    expect(room.$schema.users[0]).toBeDefined()
})

test('Get All after enter in room', async () => {
    class Room {
        $schema = {
            users: [
                {
                    id: String,
                    name: String
                }
            ]
        }
    }
    const room = World.addRoom('room', Room)
    await testSend(room)
    room.users['test'].name = 'myname'
    room.users['test'].private = 'key1'
    const value: any = await testSend(room, 'test2')
    room.users['test2'].name = 'myname2'
    room.users['test2'].private = 'key2'
    const users: any = Object.values(value[2].users)

    expect(users).toHaveLength(2)
    expect(users[0]).toHaveProperty('name')
    expect(users[0]).not.toHaveProperty('private')

    expect(users[1]).toHaveProperty('name')
    expect(users[1]).not.toHaveProperty('private')
})


test('Change properties', async () => {
    class Room {
        $schema = {
            position: {
                x: Number,
                y: Number
            }
        }
        position = {
            x: 1,
            y: 2
        }
    }
    const room: any = World.addRoom('room', Room)
    room.position.x = 5

    const value: any = await testSend(room)
    expect(value[2]).toMatchObject({ position: { x: 5 } })
})

test('change root propertie in room', async () => {
    class Room {
        $schema = {
            position: {
                x: Number,
                y: Number
            }
        }
        position = {
            x: 1,
            y: 2
        }
    }
    const room: any = World.addRoom('room', Room)
    room.position = { x: 5, y: 2 }
    const value: any = await testSend(room)
    expect(value[2]).toMatchObject({ position: { x: 5 } })
})

test('modifiers are correctly applied', async () => {
    class Room {
        $schema = {
            events: [{ hp: Number }]
        }
        events = {}
    }

    class CharaEvent {
        _hp = 100

        get hp() {
            return this._hp
        }

        set hp(value) {
            if (value <= 0) {
                value = 0
            }
            this._hp = value
        }
    }

    const room: any = World.addRoom('room', Room)

    await testSend(room)

    room.events['test'] = new CharaEvent()
    room.events['test'].hp -= 300

    expect(room.events['test'].hp).toBe(0)
    expect(room.$currentState()).toMatchObject({ events: { test: { hp: 0 } } })
})

test('Not listen properties', () => {
    class Room {
        position = {
            x: 1,
            y: 2
        }
    }
    const room: any = World.addRoom('room', Room)
    room.position.x = 5
    const packet = Transmitter.getPackets(room)
    expect(packet).toBeUndefined()
})

test('change current state', () => {
    class Room {
        $schema = {
            position: {
                x: Number,
                y: Number
            }
        }
        position = {
            x: 1,
            y: 2,
            z: 0
        }
    }
    const room: any = World.addRoom('room', Room)

    return new Promise(async (resolve: any, reject) => {
        await testSend(room)
        const user = room.users['test']

        room.$setCurrentState('position.z', 5)

        user._socket.emit = (ev, value) => {
            try {
                expect(value[2]).toMatchObject({ position: { z: 5 } })
                resolve()
            }
            catch (e) {
                reject(e)
            }
        }

        World.send()
    })
})

test('change current state', () => {
    class Room {
        $schema = {
            position: {
                x: Number,
                y: Number
            }
        }
        position = {
            x: 1,
            y: 2,
            z: 5
        }
    }
    const room: any = World.addRoom('room', Room)

    return new Promise(async (resolve: any, reject) => {
        const value: any = await testSend(room)
        const user = room.users['test']

        expect(value[2].position.z).toBeUndefined()

        room.$setCurrentState('position.z')

        user._socket.emit = (ev, value) => {
            try {
                expect(value[2]).toMatchObject({ position: { z: 5 } })
                resolve()
            }
            catch (e) {
                reject(e)
            }
        }

        World.send()
    })
})

test('World send: All Rooms', async () => {
    class Room {
        $schema = {
            test: String
        }
        test = 'aa'
    }

    const firstPlayerId = 'first'
    const secondPlayerId = 'second'

    auth.mockReturnValue(firstPlayerId)
    const socket1 = new MockSocketIo.ClientIo(firstPlayerId)
    await socket1.connection()

    auth.mockReturnValue(secondPlayerId)
    const socket2 = new MockSocketIo.ClientIo(secondPlayerId)
    await socket2.connection()

    const room1 = World.addRoom('room1', new Room())
    const room2 = World.addRoom('room2', new Room())

    const watch = vi.fn()
    socket2.on('w', watch)

    //await World.joinRoom('room1', firstPlayerId)
    await World.joinRoom('room2', secondPlayerId)

    await World.send()

    room2.test = 'bb'

    await World.send()

    expect(watch).toHaveBeenCalledTimes(3)
    expect(watch).toHaveBeenLastCalledWith([
        'room2', 
        expect.any(Number), 
        { test: 'bb' },
    ], undefined)

})

afterEach(() => {
    World.clear()
})

/*
test('sync state but is already deleted', async () => {
    await expect(async () => {
        class Room {
            $schema = {
                events: [{ id: String, name: String }]
            }
            events = {}
        }

        class CharaEvent {
            name = 'name'
            constructor(public id: string, public room: any) { }

            onDead() {
                delete this.room.events[this.id]
                this.name = 'newname'
            }
        }

        const room: any = World.addRoom('room', Room)

        await testSend(room)

        room.events['test'] = new CharaEvent('test', room)
        room.events['test'].onDead()
    }).rejects.toThrow('\'set\' on proxy: trap returned falsish for property \'name\'');
})*/