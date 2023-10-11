import { Packet } from './packet'
import { RoomClass } from './interfaces/room.interface';
import { User } from './rooms/default';
import { CustomError } from './errors/error';
import { Utils } from './utils'

const { get, set } = Utils

class TransmitterClass {

    public encode: boolean = true

    private packets: {
        [roomId: string]: Packet[]
    } = {}

    addPacket(room: RoomClass, obj: Object): void {
        const { id } = room
        if (!id) return
        if (!this.packets[id]) this.packets[id] = []
        this.packets[id].push(new Packet(obj, id))
    }

    forEach(cb: (packet: Packet[], roomId: string) => void): void {
        for (let roomId in this.packets) {
            cb(this.packets[roomId], roomId)
        }
    }

    getPackets(room: RoomClass): Packet[] | undefined {
        if (!room.id) return
        return this.packets[room.id]
    }

    clear(room?: RoomClass): void {
        if (room && room.id) {
            this.packets[room.id] = []
        }
        else {
            this.packets = {}
        }
    }

    error(user: User, error: CustomError | string): void {
        const err =  error instanceof Error ? error.toObject ? error.toObject() : error.message : error
        user._socket.emit('error', err)
    }

    async emit(user: User, packet: Packet, room: RoomClass): Promise<void> {
        let data = packet.body
        if (room.$additionalEmitProperties) {
            let additionalData = await Utils.resolveValue(room.$additionalEmitProperties(user, packet.body))
            if (additionalData !== undefined) {
                if (typeof additionalData === 'string') {
                    additionalData = [additionalData]
                }
                if (Array.isArray(additionalData)){
                    const newData = structuredClone(data)
                    for (let path of additionalData) {
                        set(newData, path, get(room, path))
                    }
                    data = newData
                }
                else {
                    data = { ...data, ...additionalData }
                }
            }       
        }
        user._socket.emit('w', this.encode ? packet.encode(data) : packet.message(data))
    }
}

export const Transmitter = new TransmitterClass()