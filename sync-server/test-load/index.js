import { World } from '../lib/world.js'
import MockSocket from '../lib/testing/mock-socket.js'
import { Transmitter } from '../lib/transmitter.js'

Transmitter.encode = false

function generateDataFake() {
    return {
        name: 'John Doe',
        age: 20,
        address: {
            street: 'Fake Street',
            num: 123
        },
        friends: [
            { name: 'Jane Doe', age: 20 },
            { name: 'John Doe', age: 20 },
            { name: 'John Doe', age: 20 },
            { name: 'John Doe', age: 20 },
        ],
        items: [
            { name: 'Item 1', price: 20 },
            { name: 'Item 2', price: 20 },
            { name: 'Item 3', price: 20 },
            { name: 'Item 4', price: 20 },
        ]
    }
}

class User {
    constructor() {
        Object.assign(this, generateDataFake())
    }
}

World.setUserClass(User)
World.transport(MockSocket.serverIo)

class Room {
    $schema = {
        count: 0,
        users: [
            {
                name: String,
                age: Number,
                address: { street: String, num: Number },
                friends: [{ name: String, age: Number }],
                address: { street: String, number: Number },
                items: [{ name: String, price: Number }],

            }
        ]
    }
    users = {}
}

let room = World.addRoom('myroom', Room)
//let room = new Room()

const createUser = () => {
    const socket = new MockSocket.ClientIo()
    socket.connection()
    return socket.id
}

console.time('test')
for (let i = 0; i < 1000; i++) {
    const userId = createUser()
    room.users[userId] = { items: [] }
    for (let j = 0; j < 100; j++) {
        room.users[userId].items.push({ name: 'Item ' + j, price: 20 })
    }
}
console.timeEnd('test')