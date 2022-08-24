class Room {
    $schema = {
        count: Number,
        users: [{ name: String }]
    }
    $actions = {
        increment: true
    }

    count = 0

    increment() {
       this.count++
    }

    onJoin(player) {
        player.name = ''+Math.random()
    }
}
    
export default Room