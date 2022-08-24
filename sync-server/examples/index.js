import { createServer } from 'http';
import { Server } from 'socket.io';
import { World } from 'simple-room';
import Room from './room.js';
import Player from './player.js'

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
      origin: '*'
    }
});

World.transport(io)
World.setUserClass(Player)
World.addRoom('myroom', Room)

setInterval(() => {
    World.send()
}, 100) 

httpServer.listen(3000);   