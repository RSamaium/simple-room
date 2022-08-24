import { createApp } from 'vue'
import { World } from 'simple-room-client'
import io from 'socket.io-client'
import App from './App.vue'

const socket = io('localhost:3000')
World.listen(socket).join('myroom')

createApp(App).mount('#app')
