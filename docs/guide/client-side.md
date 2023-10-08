## Client Side

**Installation:**

`npm install realtime socket.io-client`

Vanilla Javascript:

```html
<div id="count"></div>
<button id="actionCount">+1</button>

<script type="module">
import { room, World } from 'simple-room-client'
import io from 'socket.io-client'

const socket = io('SERVER_URL')

room.listen(() => {
    document.getElementById('count').textContent = room.get().count
    console.log(room.get().users) // Users connected to the room (see below)
})

World.listen(socket)
World.join('myroom') // If server accept with clientCanJoinRoom: true

document.getElementById('actionCount').addEventListener('click', () => {
    World.action('increment')
})
</script>
```

Certainly! Here's an explanation of the client-side code provided:

---

### Javascript:

1. **Listening to Room Changes**:
   ```javascript
   room.listen(() => {
       document.getElementById('count').textContent = room.get().count
       console.log(room.get().users)
   })
   ```
   This sets up a listener that fires whenever there's a change in the room's state. When this happens:
   - The displayed count (`<div id="count"></div>`) is updated to reflect the current value of `count`.
   - The users currently connected to the room are logged to the console.

2. **Setting up Socket Communication**:
   ```javascript
   World.listen(socket)
   ```
   Here, the `World` object from `simple-room-client` is set to listen to the socket events.

3. **Joining a Room**:
   ```javascript
   World.join('myroom')
   ```
   This line instructs the client to join a room with the identifier `myroom`. 

4. **Handling Button Click**:
   ```javascript
   document.getElementById('actionCount').addEventListener('click', () => {
       World.action('increment')
   })
   ```
   An event listener is added to the button (`<button id="actionCount">+1</button>`). When the button is clicked, it sends an action named `increment` to the server. The server will then handle this action (presumably by incrementing the `count` value in the room), and due to the `room.listen` listener set up earlier, all clients will see the updated count value in real-time.