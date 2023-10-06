import { createServer } from 'http';
import { Server } from 'socket.io';
import { World, Transmitter } from 'simple-room';
import Room from './room.js';
import Player from './player.js'


const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
      origin: '*'
    }
});

const transport = World.transport(io, {
  maxKbpsIncoming: 0.2
})


World.setUserClass(Player)
World.addRoom('myroom', Room)

setInterval(() => {
    World.send()
}, 100) 

httpServer.removeAllListeners("upgrade");

httpServer.on("upgrade", (req, socket, head) => {
  if (req.url.startsWith("/socket.io/")) {
    io.engine.handleUpgrade(req, socket, head);
  } else {
    socket.destroy();
  }
});

httpServer.listen(3050, () => console.log('listening on *:3050'));   