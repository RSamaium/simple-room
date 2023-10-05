import { World } from '../lib/world.js'
import { Transmitter } from '../lib/transmitter.js'

Transmitter.encode = true

function generateId() {
    return Math.random().toString(36).substr(2, 9)
}

class MockSocket {
    constructor() {
        this.id = 'mock-socket-id'
    }

    emit() { }

    on() { }

    join() { }

    leave() { }
}

World.changes.subscribe((rooms) => {
    if (!rooms['myroom']) return
})

const complexSchemaFake = {
    count: 0,
    users: [
        { name: String, 
            age: Number, 
            address: { street: String, num: Number },
            friends: [{ name: String, age: Number }],
            address: { street: String, number: Number },
            items: [{ name: String, price: Number }],

        }
    ]
}

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

class Room { 
    $schema = complexSchemaFake
}

let room = World.addRoom('myroom', Room)

const createUser = () => {
    const userId = generateId()
    World.connectUser(new MockSocket(), userId)
    World.joinRoom('myroom', userId)
    return userId
}

room = {
    users: {}
}


console.time('test')
for (let i = 0; i < 1000; i++) {
    const userId = createUser()
    room.users[userId] = { items: [] }
    for (let i=0 ; i < 100; i++) {
        room.users[userId].items.push({ name: 'Item ' + i, price: 20 })
    }   
}
console.timeEnd('test')
