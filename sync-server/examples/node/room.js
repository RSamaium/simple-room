class Room {
    $schema = {
        count: Number,
        users: [{ name: String }]
    }
    $actions = {
        increment: true
    }

    count = 0
    test = ''

    increment(player) {
       this.count++
       console.log(this.$snapshot())
    }

    onJoin(player) {
        player.name = ''+Math.random()
    }
}
    
export default Room