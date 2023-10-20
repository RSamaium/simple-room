export class ChatRoom {
    $schema = {
        messages: [String]
    }

    $actions = {
        message: true
    }

    messages: string[] =  []

    onJoin (client) {
        this.messages.push(`${ client.id } joined.`)
    }

    onLeave (client) {
        this.messages.push(`${ client.id } left.`)
    }

    message(client, message) {
        this.messages.push(`${ client.id } ${message}`)
    }
}