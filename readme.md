# simple-room

# Features

- Fast to write and intuitive.
- Bandwidth encoded with [msgpack-lite](https://github.com/kawanet/msgpack-lite)
- Auto synchronisation server/client. The properties are saved with Proxy so it's very fast!
- Only modified data is sent to the customer
- Use of client-side [nanostores](https://github.com/nanostores/nanostores) for fast integration with React, React Native, Preact, Vue, Svelte, and vanilla JS.
- Use the transport of your choice: socket.io, etc.
- It has good TypeScript support. Use decorators with Typescript!

## Quick Start

### Server

**Installation:**

`npm install simple-room socket.io`

`room.js`:
```js
export class Room {
    $schema = {
        count: Number
    }
    $actions = {
        increment: true
    }
    
    count = 0

    increment() {
       this.count++
    }
}
```

---

`index.js`:
```js
import { createServer } from 'http'
import { Server } from 'socket.io'
import { World } from 'simple-room'
import { Room } from './room.js'

const httpServer = createServer()
const io = new Server(httpServer)

// Define the transport (socket.io here)
World.transport(io)

// Add the room with an id
World.addRoom('myroom', Room)

// Set the server tick
setInterval(() => {
    World.send()
}, 100) 

httpServer.listen(3000)
```

### Client

**Installation:**

`npm install realtime socket.io-client`

Vanilla Javascript:

```html
<div id="count"></div>
<button id="actionCount">+1</button>

<script type="module">
import { room, World } from 'simple-room-client'
import io from 'socket.io-client'

room.listen(() => {
    document.getElementById('count').textContent = room.get().count
    console.log(room.get().users) // Users connected to the room (see below)
})

World.listen(socket)
World.join('myroom')

document.getElementById('actionCount').addEventListener('click', () => {
    World.action('increment')
})
</script>
```

## Users

By default a user of type "User" is created and used in a room. A user can be assigned to one or more rooms

You can read with `users` property

```js
export class Room {
    onJoin(user) {
        // users is an object. the key is the user's identifier
        const nbUsers = Object.values(this.users).length
        console.log(nbUsers)
    }
}
```

By default, the object is quite poor, let's improve it by adding our class:

`player.js`:
```js
class Player {
    name = ''
}
```

And add to the world:

`index.js`:
```js
import { createServer } from 'http'
import { Server } from 'socket.io'
import { World } from 'realtime'
import { Room } from './room.js'
import { Player } from './player.js'

const httpServer = createServer()
const io = new Server(httpServer)

World.transport(io)
World.setUserClass(Player)
World.addRoom('myroom', Room)

setInterval(() => {
    World.send()
}, 100) 

httpServer.listen(3000)
```

Synchronize the player's name:

`room.js`:
```js
export class Room {
    $schema = {
        count: Number,
        users: [{ name: String }]
    }
    $actions = {
        increment: true
    }
    
    count = 0

    increment() {
       this.count++
    }

    onJoin(player) {
        player.name = 'Fake Name'
    }
}
```

From now on, all users will be able to see the name of the person

## Room Hooks

```js
export class Room {
    onInit() {

    }

    onJoin(user) {

    }

    onLeave(user) {

    }
}
```

## Server Schema

Add Room Properties:

```js
class Page {
    $schema = {
        title: String
    }
    title = ''
}
```

After adding the room, if you change the property, it will be transmitted to everyone.


```js
const room = Word.addRoom('room_id', Page)
room.title = 'my app' // is send to users in room
```

## Normal Schema

Typescript
```ts
@Schema({
    title: String
})
export class Page {
    title: string = ''
}
```

Javascript
```js
export class Page {
    $schema = {
        title: String
    }
    title = ''
}
```

## Array Properties

Typescript
```ts
@Schema({
     list: [String]
})
export class Page {
    title: string[] = ['yo']
}
```

Javascript
```js
export class Page {
    $schema = {
        list: [String]
    }
    title = ['yo']
}
```

> Be careful, you get an object on the client side
> `{ "0": "yo" }`

## with collection :

Typescript
```ts
@Schema({
     list: [{ id: Number, name: String }]
})
export class Page {
    list: { id: Number, name: String }[] = []
    constructor() {
        this.list.push({
            id: 1,
            name: 'yo'
        })
    }
}
```

Javascript
```js
export class Page {
    $schema = {
        list: [{ id: Number, name: String }]
    }
    list = []
    
    constructor() {
        this.list.push({
            id: 1,
            name: 'yo'
        })
    }
}
```

## Object generic key

Typescript
```ts
@Schema({
     list: [{ id: Number }]
})
export class Page {
    list: any = {}
    constructor() {
        this.list['mykey'] = {
            id: 1
        }
    }
}
```

Javascript
```js
export class Page {
    $schema = {
        list: [{ id: Number }]
    } 
    list = {}
    
    constructor() {
        this.list['mykey'] = {
            id: 1
        }
    }
}
```