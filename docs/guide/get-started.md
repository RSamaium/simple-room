# Get Started

Simple Room offers a seamless way to create a room with NodeJS. Built on a simple class structure, properties are automatically synchronized between the server and the client. Whether you're building a chat application, a multiplayer game or a collaborative platform, Simple Room is your go-to solution.

## Features:
- **Simple API**: Designed with developers in mind, Simple Room requires minimal setup and provides a straightforward API.
- **Real-time Synchronization**: Automatic synchronization of properties between the server and the client.
- **Lightweight**: No heavy dependencies or unnecessary bloat. Just what you need to get started.

## Installation

### Server Side:
```bash
npm install simple-room socket.io
```

## 1. Create a Room

```js
export default class Room {
    // add Schema to sync properties
    $schema = {
        count: Number
    }

    // Client can call this action
    $actions = {
        increment: true
    }
    
    count = 0

    increment() {
       this.count++
    }
}
```

## 2. Create a Server and Add the Room

```js
import { createServer } from 'http'
import { Server } from 'socket.io'
import { World } from 'simple-room'
import Room  from './room.js'

const httpServer = createServer()
const io = new Server(httpServer)

// Define the transport (socket.io here)
World.transport(io, {
     // the client can join the room using his id. Disable it if you want to do it on the server side
    clientCanJoinRoom: true
})

// Add the room with an id
World.addRoom('myroom', Room)

// Set the server tick
setInterval(() => {
    World.send()
}, 100) 

httpServer.listen(3000)
```

<Sand />