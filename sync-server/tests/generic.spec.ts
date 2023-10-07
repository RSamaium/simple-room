import { World } from '../src/world'
import { Transmitter } from '../src/transmitter'
import MockSocketIo from '../src/testing/mock-socket'
import { testSend } from './fixture'
import { beforeEach, test, expect } from 'vitest'

let room: any

beforeEach(() => {
    World.transport(MockSocketIo.serverIo)
    Transmitter.encode = false
})

beforeEach(() => {
    class Room {
        $schema = {
            list: [{
                public: String
            }]
        }
    }

    room = World.addRoom('room', Room)
})

test('Test Generic Key 1', () => {
    return new Promise(async (resolve: any) => {
        room.list = {}
        await testSend(room)

        const user = room.users['test']

        room.list.mykey = {
            public: 'p',
            secret: 's'
        }

        user._socket.emit = (ev, value) => {
            expect(value[2]).toMatchObject({ list: { mykey: { public: 'p' } } })
            resolve()
        }

        World.send()
    })
})

test('Test Generic Key 3', () => {
    return new Promise(async (resolve: any) => {
        await testSend(room)

        const user = room.users['test']

        room.list = {
            mykey: {
                public: 'p',
                secret: 's'
            }
        }

        user._socket.emit = (ev, value) => {
            expect(value[2]).toMatchObject({ list: { mykey: { public: 'p' } } })
            resolve()
        }

        World.send()
    })
})

test('Test Generic Key with array', () => {
    return new Promise(async (resolve: any) => {

        class Room {
            $schema = {
                list: [{
                    nb: [String]
                }]
            }

            list = {}
        }

        room = World.addRoom('room', Room)

        room.list.mykey = {
            nb: []
        }

        await testSend(room)

        const user = room.users['test']

        room.list.mykey.nb.push('hello')

        user._socket.emit = (ev, value) => {
            expect(value[2]).toMatchObject({ list: { mykey: { nb: { '0': 'hello' } } } })
            resolve()
        }

        World.send()
    })
})


test('Test Generic Key with array / multi push', async () => {
    class UserClass {
        items = []
    }

    World.setUserClass(UserClass)

    class Room {
        $schema = {
            users: [{
                items: [{
                    nb: Number,
                    id: Number
                }]
            }]
        }
    }

    room = World.addRoom('room', Room)

    await testSend(room)

    room.users['test'].items.push({ id: 1, nb: 1 })
    room.users['test'].items.push({ id: 2, nb: 1 })

    World.send()

    room.users['test'].items[1].nb += 2

    expect(room.$currentState()).toHaveProperty('users.test.items.1.nb', 3)
    expect(room.$currentState().users.test.items).not.instanceOf(Array)
})