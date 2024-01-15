import { Room, RoomOptions } from './room'
import { Transmitter } from './transmitter'
import { Transport, TransportOptions } from './transports/socket'
import { User, UserState } from './rooms/default'
import { RoomClass } from './interfaces/room.interface'
import { BehaviorSubject } from 'rxjs'
import type { IAgonesOptions, IAgones } from './interfaces/agones.interface'

export class WorldClass {

    private rooms: Map<string, RoomClass> = new Map()
    public users: {
        [key: string]: User
    } = {}
    private userClass = User
    timeoutDisconnect: number = 0
    changes: BehaviorSubject<any> = new BehaviorSubject({})
    private _transport: Transport | null = null

    public agonesSDK: IAgones | null = null
    public agonesOptions: IAgonesOptions = {}

    /**
     * Define user class
     * 
     * @method setUserClass()
     * @returns {void}
     */
    setUserClass(userClass: any) {
        this.userClass = userClass
    }

    setAgones(agones: IAgones, options: IAgonesOptions = {}) {
        this.agonesSDK = agones
        this.agonesOptions = options
    }

    /**
     * Define transportation. You can set socket.io as default
     * 
     * @method transport()
     * @param {object} io
     * @returns {Transport}
     */
    transport(io, options: TransportOptions = {}): Transport {
        if (options.timeoutDisconnect) {
            this.timeoutDisconnect = options.timeoutDisconnect
        }
        const transport = new Transport(io, options)
        transport.onConnected(this.connectUser.bind(this))
        transport.onDisconnected(this.disconnectUser.bind(this))
        transport.onJoin(this.joinRoom.bind(this))
        transport.onInput((id: string, prop: string, value: any) => {
            this.forEachUserRooms(id, (room: RoomClass, user) => {
                try {
                    if (room.$inputs && room.$inputs[prop]) {
                        room[prop] = value
                    }
                }
                catch (err: any) {
                    Transmitter.error(user, err)
                }
            })
        })
        transport.onAction((id: string, name: string, value: any) => {
            this.forEachUserRooms(id, async (room, user) => {
                if (room.$actions && room.$actions[name]) {
                    try {
                        room[name](user, value)
                    }
                    catch (err: any) {
                        Transmitter.error(user, err)
                    }
                }
            })
        })
        return this._transport = transport
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
        const user = this.getUser(userId, true)
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

    get nbUsers(): number {
        return Object.keys(this.users).length
    }

    /**
     * Send the packages to the rooms. 
     * 
     * @method send()
     */
    async send(): Promise<void> {
        for (let [_, room] of this.rooms) {
            const obj = room.$currentState()
            if (Object.keys(obj).length == 0) {
                continue
            }
            Transmitter.addPacket(room, obj)
            for (let id in room.users) {
                const user = room.users[id]
                const packets = Transmitter.getPackets(room)
                if (packets) {
                    for (let packet of packets) {
                        await Transmitter.emit(user, packet, room)
                    }
                }
            }
            room.$clearCurrentState()
        }
        Transmitter.clear()
    }

    /**
     * Connect a user
     * 
     * @method connectUser()
     * @param {object} socket 
     * @param {id} userId 
     * @param {object} options
     *  - getUserInstance: function that returns a new instance of the user
     * @returns {User}
     */
    connectUser<T = User>(socket, id: string, options: {
        getUserInstance?: any
    } = {}): T {
        const existingUser = this.getUser(id, false)
        if (existingUser) {
            if (existingUser._timeoutDisconnect) {
                clearTimeout(existingUser._timeoutDisconnect)
                delete existingUser._timeoutDisconnect
            }
            existingUser._socket = socket
            existingUser.$state = UserState.Connected
            return existingUser as any
        }
        const user = options.getUserInstance?.(socket) ?? new this.userClass()
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
    disconnectUser(userId: string): Promise<void> {
        return new Promise((resolve: any, reject) => {
            const user = this.getUser(userId)

            if (!user) return resolve()

            user.$state = UserState.Disconnected

            const leave = () => {
                const leaveAllPromises: Promise<void>[] = []
                this.forEachUserRooms(userId, async (room: RoomClass, user: User) => {
                    if (room.$leave) leaveAllPromises.push(room.$leave(user))
                })
                delete this.users[userId]
                Promise.all(leaveAllPromises)
                    .then(resolve)
                    .catch(err => {
                        Transmitter.error(user as User, err)
                        reject(err)
                    })
            }

            if (!this.timeoutDisconnect) {
                leave()
                return
            }

            user._timeoutDisconnect = setTimeout(leave, this.timeoutDisconnect)
        })
    }

    httpUpgrade(httpServer, io) {
        httpServer.removeAllListeners("upgrade");

        httpServer.on("upgrade", (req: any, socket, head) => {
            if (req.url.startsWith("/socket.io/")) {
                io.engine.handleUpgrade(req, socket, head);
            } else {
                socket.destroy();
            }
        })
    }

    private async joinOrLeaveRoom(type: string, roomId: string, userId: string): Promise<RoomClass | undefined> {
        const room = this.getRoom(roomId)
        if (!room) return
        if (room[type]) {
            try {
                await room[type](this.getUser(userId, false))
            }
            catch (err: any) {
                Transmitter.error(this.getUser(userId, false) as User, err)
                throw err
            }
        }
        return room
    }

    /**
     * Leave an existing room
     * 
     * @param {string} roomId 
     * @param {string} userId 
     * @returns {RoomClass | undefined}
     */
    async leaveRoom(roomId: string, userId: string): Promise<RoomClass | undefined> {
        return this.joinOrLeaveRoom('$leave', roomId, userId)
    }

    /**
     * Join an existing room
     * 
     * @param {string} roomId 
     * @param {string} userId 
     * @returns {RoomClass | undefined}
     */
    async joinRoom(roomId: string, userId: string): Promise<RoomClass | undefined> {
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
    addRoom<T = any>(id: string, roomClass, options: RoomOptions = {}): T {
        if (roomClass.constructor.name == 'Function') {
            roomClass = new roomClass()
        }
        const room = new Room(options).add(id, roomClass)
        this.rooms.set(id, room)
        if (this.agonesSDK) {
            this.agonesSDK.setLabel('room.id', id)
        }
        return room as any
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
        this.changes.next({})
        this.users = {}
        if (this._transport) {
            this._transport.io?.clear?.()
        }
    }
}

export const World = new WorldClass()