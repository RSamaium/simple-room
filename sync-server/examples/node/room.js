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
    }

    onAuth() {
        return false
    }

    onJoin(player) {
        player.name =  'test'
    }
}
    
export default Room