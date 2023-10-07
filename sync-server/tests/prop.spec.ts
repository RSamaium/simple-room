import { World } from '../src/world'
import { Transmitter } from '../src/transmitter'
import { testSend } from './fixture'
import MockSocketIo from '../src/testing/mock-socket'
import { beforeEach, test, expect, describe } from 'vitest'

let room: any

beforeEach(() => {
    World.transport(MockSocketIo.serverIo)
    Transmitter.encode = false
})

beforeEach(() => {
    class Room {
        $schema = {
            keys: {
                a: {
                    public: {
                        $default: 15,
                        $syncWithClient: true,
                        $permanent: true
                    }
                },
                b: {
                    private: {
                        $syncWithClient: false,
                        $permanent: true
                    },
                    tmp: {
                        $syncWithClient: false,
                        $permanent: false
                    }
                }
            }
        }
        keys = {}
    }

    room = World.addRoom('room', Room)
})

/*
TODO
test('Test default value', async () => {
    const value: any = await testSend(room)
    expect(value[2].keys).toMatchObject({ a: { public: 15 }})
})
*/

test('Test with extra properties', async () => {
    room.keys = {
        a: {
            public: 5
        },
        b: {
            private: 'secret',
            tmp: 'trash'
        }
    }
    const value: any = await testSend(room)
    expect(value[2].keys).toMatchObject({ a: { public: 5 } })
})

test('Change with extra properties', async () => {
    room.keys = {
        a: {
            public: 5
        },
        b: {
            private: 'secret',
            tmp: 'trash'
        }
    }
    await testSend(room)
    room.keys.a.public = 10
    room.keys.b = {
        private: 'other'
    }
    const value: any = await testSend(room)
    expect(value[2].keys).toMatchObject({ a: { public: 10 } })
})

describe('Snapshot', () => {
    beforeEach(() => {
        class Room {
            $schema = {
                users: [{
                    id: true,
                    name: true,
                    secret: {
                        $syncWithClient: false
                    },
                    items: [
                        {
                            info: {
                                $syncWithClient: false
                            }
                        }
                    ]
                }]
            }
        }
        room = World.addRoom('room', Room)
    })

    test('Snapshot Room', async () => {
        await testSend(room)
        const user = room.users['test']
        user.name = 'frank'
        user.secret = 'aaa'
        user.items = []
        user.items.push({
            info: 'bbb'
        })
        const snapshot = room.$snapshot()
        const userObject = snapshot.users.test
        expect(userObject).toBeDefined()
        expect(userObject.secret).toBe('aaa')
        expect(userObject.items[0]).toHaveProperty('info', 'bbb')
    })

    test('Snapshot User in Room', async () => {
        await testSend(room)
        const user = room.users['test']
        user.name = 'frank'
        user.secret = 'aaa'
        user.items = []
        user.items.push({
            info: 'bbb'
        })
        const snapshot = room.$snapshotUser('test')
        expect(snapshot.name).toBe('frank')
        expect(snapshot.secret).toBe('aaa')
        expect(snapshot.items[0]).toHaveProperty('info', 'bbb')
    })
})

describe('Sync properties dependencies', () => {
    test('dependencies is sync', () => {
        class Room {
            $schema = {
                a: {
                    $effects: ['result']
                },
                b: Number
            }

            a = 1
            b = 2

            get result() {
                return this.a + this.b
            }
        }
        room = World.addRoom('room', Room)

        return new Promise(async (resolve: any, reject) => {
            await testSend(room)
            const user = room.users['test']

            room.a = 10

            user._socket.emit = (ev, value) => {
                try {
                    const object = value[2]
                    expect(object.result).toBeDefined()
                    expect(object.result).toBe(12)
                    resolve()
                }
                catch (e) {
                    reject(e)
                }
            }

            World.send()
        })
    })

    test('Test object dependencies', async () => {

        class UserClass {
            name = 'test'

            get fullname() {
                return this.name + ' yo'
            }
        }

        World.setUserClass(UserClass)

        class Room {
            $schema = {
                users: [{
                    name: {
                        $effects: ['$this.fullname']
                    }
                }]
            }
        }
        room = World.addRoom('room', Room)

        return new Promise(async (resolve: any, reject) => {
            await testSend(room)
            const user = room.users['test']

            user.name = 'frank'

            user._socket.emit = (ev, value) => {
                try {
                    const object = value[2].users.test
                    expect(object.fullname).toBeDefined()
                    expect(object.name).toBe('frank')
                    expect(object.fullname).toBe('frank yo')
                    resolve()
                }
                catch (e) {
                    reject(e)
                }
            }

            World.send()
        })
    })
})