<script setup>
import { room, World } from '../../../lib'
import { useStore } from '@nanostores/vue'

const $room = useStore(room)

const increment = () => World.action('increment').catchError((err) => {
   console.log(err)
})
</script>

<template>
  <h1>{{ $room.count }}</h1>
  <button @click="increment">Increment</button>
</template>
