<template>
    <Sandpack template="node" :customSetup="{
        dependencies: {
            'simple-room': 'latest',
            'simple-room-client': 'latest',
            'socket.io': 'latest',
        }
    }" :files="files" :options="{
    showConsole: true,
    showConsoleButton: true,
    showTabs: true,
    showNavigator: false,
    editorHeight: 500
}" />
</template>

<script setup>
import dd from 'dedent'
import { Sandpack } from 'sandpack-vue3';

const files = {
    'index.js': dd`
        import { createServer } from 'http'
        import { Server } from 'socket.io'
        import { World } from 'simple-room'
        import Room  from './room.js'

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
    `,
    'room.js': dd`
        export default class Room {
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
        }`
}
</script>
