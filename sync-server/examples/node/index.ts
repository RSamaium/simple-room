import { createServer } from 'http';
import { Server } from 'socket.io';
import { World, Transmitter, Utils } from 'simple-room';
import Room from './room.js';
import Player from './player.js'
import jwt from 'jsonwebtoken'

const SECRET_KEY = 'shhhhh'

const httpServer = createServer((req, res) => {
  // cors
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.url === '/set-cookie') {
      if (true) {
          let sessionId = 'pp';
          const token = jwt.sign({ sessionId }, SECRET_KEY);
          res.setHeader('Set-Cookie', `sessionId=${token}; HttpOnly; Path=/`);
      }
      res.end('Cookie set');
  } else {
      res.end('HTTP');
  }
});

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true
  }
});

World.transport(io, {
  maxKbpsIncoming: 0.2,
  clientCanJoinRoom: true,
  timeoutDisconnect: 10000,
  auth(socket) {
    const token = socket.request.headers.cookie?.split('=')[1]
    const decoded = jwt.verify(token, SECRET_KEY);
    return decoded.sessionId
  }
})


World.setUserClass(Player)

World.addRoom('myroom', Room)

setInterval(() => {
  World.send()
}, 100)

httpServer.listen(3050, () => console.log('listening on *:3050'));   