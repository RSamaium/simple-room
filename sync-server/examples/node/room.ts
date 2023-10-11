export default class PokerRoom {
    $schema = {
        users: [{ count: Number, $state: String }],
    }

    onJoin(user) {
        user.count = 0
        user._interval = setInterval(() => {
            user.count++
        }, 1000)
    }

    onLeave(user) {
        clearInterval(user._interval)
    }
}
