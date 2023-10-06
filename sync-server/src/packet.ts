import msgpack from 'msgpack-lite'


export type MessageBuffer = [string, number, any]

export class Packet {
    constructor(private data: any, private roomId: string) { }

    get body() {
        return this.data
    }

    message(otherData?): MessageBuffer {
        return [this.roomId, Date.now(), otherData ?? this.data]
    }

    clone(data) {
        return new Packet(data, this.roomId)
    }

    encode(otherData?) {
        return msgpack.encode(this.message(otherData))
    }
}