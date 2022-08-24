import { createServer } from 'http';
import { Server } from 'socket.io';
import { World } from '@rpgjs/sync-server';
import Room from './room.js';

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
      origin: '*'
    }
});

World.transport(io)
World.addRoom('myroom', Room)

setInterval(() => {
    World.send()
}, 100) 

httpServer.listen(3000);   