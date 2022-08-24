import { Room } from './room'
import { Transmitter } from './transmitter'
import { Transport } from './transports/socket'
import { User } from './rooms/default'
import { RoomClass } from './interfaces/room.interface'
import { BehaviorSubject } from 'rxjs'

export class WorldClass {

    private rooms: Map<string, RoomClass> = new Map()
    public users: {
        [key: string]: User
    } = {}
    private userClass = User
    changes: BehaviorSubject<any> = new BehaviorSubject({})

    /**
     * Define user class
     * 
     * @method setUserClass()
     * @returns {void}
     */
    setUserClass(userClass: any) {
        this.userClass = userClass
    }

    /**
     * Define transportation. You can set socket.io as default
     * 
     * @method transport()
     * @param {object} io
     * @returns {void}
     */
    transport(io): void {
        const transport = new Transport(io)
        transport.onConnected(this.connectUser.bind(this))
        transport.onDisconnected(this.disconnectUser.bind(this))
        transport.onJoin(this.joinRoom.bind(this))
        transport.onInput((id: string, prop: string, value: any) => {
            this.forEachUserRooms(id, (room: RoomClass, user) => {
                if (room.$inputs && room.$inputs[prop]) {
                    room[prop] = value
                }
            })
        })
        transport.onAction((id: string, name: string, value: any) => {
            this.forEachUserRooms(id, async (room, user) => {
                if (room.$actions && room.$actions[name]) {
                    room[name](user, value)
                }
            })
        })
    }

    /**
     * Loop over all rooms of a user
     * 
     * Example
     * 
     * ```js
     * World.forEachUserRooms('userid', (room, user) => {
     *      console.log(room.id)
     * })
     * ```
     * 
     * @method forEachUserRooms()
     * @param {string} userId
     * @param {(room: RoomClass, user: User)} cb
     * @returns {void}
     */
    forEachUserRooms<T = User>(userId: string, cb: (room: RoomClass, user: T) => void): void {
        const user = this.getUser(userId)
        if (!user) return
        for (let roomId of user._rooms) {
            const room = this.getRoom(roomId) as RoomClass
            cb(room, user as any)
        }
    }

     /**
     * Retrieves all users in the world
     * 
     * @method getUsers()
     * @returns { {[id: string]: User} }
     */
    getUsers<T = User>(): { [id: string]: T } {
        return this.users as any
    }

    /**
     * Get a user in the world
     * 
     * @param {string} id User Id 
     * @param {boolean} [getProxy] Retrieves the proxied user. (true by default) 
     * @returns {User | null}
     */
    getUser<T = User>(id: string, getProxy: boolean = true): T | null {
        if (!this.users[id]) return null
        if (getProxy && this.users[id]['proxy']) {
            return this.users[id]['proxy'] 
        }
        return this.users[id] as any
    }

    setUser(user, socket?) {
        if (socket) user._socket = socket
        user._rooms = []
        this.users[user.id] = user
        return this.users[user.id]
    }

    /**
     * Send the packages to the rooms. 
     * 
     * @method send()
     */
    send(): void {
        this.rooms.forEach((room: any, id: string) => {
            const obj = room.$currentState()
            if (Object.keys(obj).length == 0) {
                return
            }
            Transmitter.addPacket(room, obj)
            for (let id in room.users) {
                const user = room.users[id]
                const packets = Transmitter.getPackets(room)
                if (packets) {
                    for (let packet of packets) {
                        Transmitter.emit(user, packet, room)
                    }
                }
            }
            room.$clearCurrentState()
        })
        Transmitter.clear()
    }

    /**
     * Connect a user
     * 
     * @method connectUser()
     * @param {object} socket 
     * @param {id} userId 
     * @returns {User}
     */
    connectUser<T = User>(socket, id: string): T {
        const user = new this.userClass()
        user.id = id
        socket.emit('uid', id)
        this.setUser(user, socket)
        return user as any
    }

    /**
     * Removes the user from all rooms and removes him from the world
     * 
     * @method disconnectUser()
     * @param {string} userId 
     * @returns {void}
     */
    disconnectUser(userId: string): void {
        this.forEachUserRooms(userId, (room: RoomClass, user: User) => {
            if (room.$leave) room.$leave(user)
        })
        delete this.users[userId]
    }

    private joinOrLeaveRoom(type: string, roomId: string, userId: string): RoomClass | undefined  {
        const room = this.getRoom(roomId)
        if (!room) return
        if (room[type]) room[type](this.getUser(userId, false))
        return room
    }

    /**
     * Leave an existing room
     * 
     * @param {string} roomId 
     * @param {string} userId 
     * @returns {RoomClass | undefined}
     */
    leaveRoom(roomId: string, userId: string): RoomClass | undefined {
        return this.joinOrLeaveRoom('$leave', roomId, userId)
    }

    /**
     * Join an existing room
     * 
     * @param {string} roomId 
     * @param {string} userId 
     * @returns {RoomClass | undefined}
     */
    joinRoom(roomId: string, userId: string): RoomClass | undefined {
        return this.joinOrLeaveRoom('$join', roomId, userId)
    }

    /**
     * Add Room
     * 
     * Example 1:
     * 
     * ```js
     * class ChessRoom {
     * 
     * }
     * 
     * World.addRoom('myroom', ChessRoom)
     * ```
     * 
     * Example 2:
     * 
     * ```js
     * class ChessRoom {
     *  constructor(name) { }
     * }
     * 
     * World.addRoom('myroom', new ChessRoom('test'))
     * ```
     * 
     * @param {string} id room id 
     * @param {Class or instance of Class} roomClass 
     * @returns instance of Class
     */
    addRoom(id: string, roomClass): any {
        if (roomClass.constructor.name == 'Function') {
            roomClass = new roomClass()
        }
        const room = new Room().add(id, roomClass)
        this.rooms.set(id, room)
        return room
    }

    /**
     * Get an existing room
     * 
     * @param {string} roomId 
     * @returns {RoomClass}
     */
    getRoom(id: string): RoomClass | undefined {
        return this.rooms.get(id)
    }

    /**
     * Recover the rooms of the world
     * 
     * @param {string} roomId 
     * @returns {Map<string, RoomClass>}
     */
    getRooms() {
        return this.rooms
    }

    /**
     * Delete the room
     * 
     * @param {string} roomId 
     * @returns {void}
     */
    removeRoom(id: string): void {
        this.rooms.delete(id)
    }

    /**
     * Remove all rooms and users
     */
    clear() {
        this.rooms.clear()
        this.users = {}
    }
}

export const World = new WorldClass()