import { createApp } from 'vue'
import { World } from '@rpgjs/sync-client'
import io from 'socket.io-client'
import App from './App.vue'

import './assets/main.css'

const socket = io('localhost:3000')
World.listen(socket).join('myroom')

createApp(App).mount('#app')
