<script setup>
import { room, World } from '../../../lib'
import { useStore } from '@nanostores/vue'

const $room = useStore(room)

room.listen(() => {
  
})

const increment = () => World.action('increment')
</script>

<template>
  <h1>{{ $room.count }}</h1>
  <button @click="increment">Increment</button>

  <div v-for="user in $room.users">{{ user.isMe() }}</div>
</template>
