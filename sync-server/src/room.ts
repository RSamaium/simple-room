import { Utils, GENERIC_KEY_SCHEMA } from './utils'
import { Transmitter } from './transmitter'
import { Packet } from './packet'
import { RoomClass } from './interfaces/room.interface';
import { User, UserState } from './rooms/default'
import { World } from './world'
import { NotAuthorized } from './errors/not-authorized';

const { set, get } = Utils

export interface RoomOptions {
    /**
     * If true, the old room will be propagated to the new room when the user changes rooms
     * @default true
     * @type {boolean}
     * @memberof RoomOptions
     * @since 3.1.0
     */
    propagateOldRoom?: boolean
}

export class Room {
    private proxyRoom: RoomClass
    private memoryTotalObject: object = {}
    private memoryObject: object = {}
    private permanentObject: string[] = []
    private propagateOldRoom: boolean = true

    static readonly propNameUsers: string = 'users'

    static hasExtraProp(obj: any) {
        return obj.$default !== undefined ||
            obj.$syncWithClient !== undefined ||
            obj.$permanent !== undefined ||
            obj.$validate !== undefined ||
            obj.$effects !== undefined ||
            obj.$type !== undefined
    }

    static compileSchema(schema, room?): { masks: object, dict: object, permanentObject: string[] } {
        const dict = {}
        const masks = {}
        const permanentObject: string[] = []

        function specialObject(val, p) {
            if (Room.hasExtraProp(val)) {
                if (val.$permanent ?? true) permanentObject.push(p)
                if (room && val.$default !== undefined) {
                    // TODO
                    //set(room, p, val.$default)
                }
                if (val.$syncWithClient === false) {
                    return
                }
                // Force to take a type (number here - not important) and not object. Otherwise, Proxy will traverse this object from 
                dict[p] = {
                    ...val
                }
            }
            else {
                dict[p] = val
                masks[p] = Utils.propertiesToArray(val)
                compile(val, p)
            }
        }

        function compile(schema, path = '') {
            for (let prop in schema) {
                const val = schema[prop]
                let p = (path ? path + '.' : '') + prop
                if (Array.isArray(val)) {
                    dict[p] = GENERIC_KEY_SCHEMA
                    p += '.' + GENERIC_KEY_SCHEMA
                    if (val[0] === undefined) val[0] = {}
                    if (Utils.isObject(val[0])) {
                        specialObject(val[0], p)
                    }
                    else {
                        dict[p] = val[0]
                        compile(val[0], p)
                    }
                }
                else if (Utils.isObject(val)) {
                    specialObject(val, p)
                }
                else {
                    permanentObject.push(p)
                    dict[p] = val
                }
            }
        }

        compile(schema)

        return {
            masks,
            dict,
            permanentObject
        }
    }

    constructor(private options: RoomOptions) {
        if (options.propagateOldRoom) {
            this.propagateOldRoom = options.propagateOldRoom
        }
    }

    private async join(user: User, room: RoomClass): Promise<boolean> {
        if (room['canJoin']) {
            const authBool = await Utils.resolveValue(room['canJoin'](user, user._socket))
            if (authBool === false || typeof authBool == 'string') {
                Transmitter.error(user, new NotAuthorized(authBool))
                return false
            }
        }

        if (World.agonesSDK) {
            await World.agonesSDK.allocate()
        }

        let firstJoin = !room.users[user.id]

        room.users[user.id] = user

        const userProxy = World.users[user.id]['proxy']
        userProxy.$state = UserState.Connected

        if (firstJoin) {
            if (room['onJoin']) await Utils.resolveValue(room['onJoin'](userProxy))
        }

        if (this.getUsersLength(room) == 1) {
            // If it's the first to arrive in the room, we save the default values of the room
            this.memoryTotalObject = Room.extractObjectOfRoom(room, room.$schema)
        }
        const packet = new Packet({
            ...this.memoryTotalObject,
            join: firstJoin
        }, <string>room.id)

        await Transmitter.emit(userProxy, packet, room)

        return true
    }

    private async leave(user: User, room: RoomClass): Promise<void> {
        if (room['onLeave']) room['onLeave'](user)
        const index = user._rooms.findIndex(id => room.id == id)
        user._rooms.splice(index, 1)
        delete room.users[user.id]
        delete World.users[user.id]['proxy']
        if (World.nbUsers == 0 && World.agonesSDK) {
            const { onBeforeShutdown, shutdownIfNotPlayers } = World.agonesOptions
            if (shutdownIfNotPlayers) {
                if (onBeforeShutdown) await onBeforeShutdown()
                await World.agonesSDK.shutdown()
            }
        }
    }

    private getUsersLength(room: RoomClass) {
        return Object.keys(room.users).length
    }

    addInputs(room: RoomClass, obj: Object): void {
        room.$schema = {
            ...obj,
            ...room.$schema
        }
    }

    snapshotUser(room: RoomClass, userId: string) {
        const userSchema = this.permanentObject
            .filter(path => path.startsWith('users.@'))
            .map(path => path.replace('users.@.', ''))
        const userObject = room.users[userId]
        if (!userObject) return null
        return Room.extractObjectOfRoom(userObject, userSchema)
    }

    snapshot(room: RoomClass) {
        return Room.extractObjectOfRoom(room, this.permanentObject)
    }

    setProxy(room: RoomClass) {
        const self = this
        const { dict, permanentObject, masks } = Room.compileSchema(room.$schema, room)
        const proxifiedObjects = new WeakSet()

        this.permanentObject = permanentObject
        room.$dict = dict

        const getInfoDict = (path, key, dictPath): { fullPath: string, genericPath: string, infoDict: any, mask: string[] } => {
            const basePath = dict[dictPath]
            const p: string = (path ? path + '.' : '') + key as string
            const genericPath = (dictPath ? dictPath + '.' : '') +
                (basePath == GENERIC_KEY_SCHEMA ? GENERIC_KEY_SCHEMA : key as string)
            return {
                fullPath: p,
                genericPath,
                infoDict: dict[genericPath],
                mask: masks[genericPath],
            }
        }

        function deepProxy(object, path = '', dictPath = '') {
            if (proxifiedObjects.has(object)) {
                return object;
            }
            return new Proxy(object, {
                set(target, key: string, val, receiver) {
                    const { fullPath: p, infoDict, genericPath, mask } = getInfoDict(path, key, dictPath)
                    // TODO: block set if deleted. Not apply in player
                    // if (target._isDeleted) {
                    //     return false
                    // }
                    if (typeof val == 'object' && infoDict && val != null) {
                        const valProxy = deepProxy(val, p, genericPath)
                        proxifiedObjects.add(valProxy);
                        if (path == 'users') {
                            if (!room.users[key]) {
                                if (!valProxy._rooms) valProxy._rooms = []
                                valProxy._rooms.push(room.id)
                                if (!valProxy.id) valProxy.id = Utils.generateId()
                            }
                            World.users[key]['proxy'] = valProxy
                        }
                        Reflect.set(target, key, val, receiver)
                        val = target[key]
                    }
                    else {
                        if (infoDict?.$validate) {
                            const { error } = infoDict.$validate.validate(val)
                            if (error) return true
                        }
                        Reflect.set(target, key, val, receiver)
                        val = target[key] // Reflect calls the modifiers, so we get the new value
                    }
                    if (key == 'length' && dict[dictPath] == GENERIC_KEY_SCHEMA) {
                        return true
                    }
                    if (infoDict) {
                        if (infoDict.$effects) {
                            for (let propEffect of infoDict.$effects) {
                                let pathEffect = ''
                                if (propEffect.startsWith('$this')) {
                                    // replace last property in string. Example: users.test.name by users.test.fullname
                                    if (p) {
                                        const pSplit = p.split('.')
                                        pSplit[pSplit.length - 1] = propEffect.replace('$this.', '')
                                        pathEffect = pSplit.join('.')
                                    }
                                    else {
                                        pathEffect = propEffect.replace('$this.', '')
                                    }
                                }
                                else {
                                    pathEffect = propEffect
                                }
                                self.editMemoryObject(pathEffect, room)
                            }
                        }
                        let newObj
                        if (Utils.isObject(infoDict) && val != null && !Room.hasExtraProp(infoDict)) {
                            newObj = Room.extractObjectOfRoom(val, mask)
                        }
                        else if (infoDict == GENERIC_KEY_SCHEMA) {
                            newObj = {}
                            // reset the object
                            if (Object.keys(val).length == 0) {
                                newObj['$reset'] = true
                            }
                            for (let key in val) {
                                const item = val[key]
                                if (typeof item == 'string' ||
                                    typeof item == 'number' ||
                                    typeof item == 'boolean') {
                                    newObj[key] = item
                                    continue
                                }
                                newObj[key] = Room.extractObjectOfRoom(item, dict[genericPath + '.' + GENERIC_KEY_SCHEMA])
                            }
                        }
                        else {
                            newObj = val
                        }
                        self.detectChanges(room, newObj, p)
                    }
                    return true
                },
                get(target, key, receiver) {
                    const toProxy = (val, path) => {
                        if (typeof key != 'string') {
                            return val
                        }
                        if (key[0] == '_' || val == null) {
                            return val
                        }
                        const { fullPath: p, infoDict, genericPath } = getInfoDict(path, key, dictPath)
                        if (typeof val == 'object' && infoDict) {
                            val = deepProxy(val, p, genericPath)
                            proxifiedObjects.add(val);
                        }
                        return val
                    }
                    let val = Reflect.get(target, key, receiver)
                    val = toProxy(val, path)
                    return val
                },
                deleteProperty(target, key) {
                    const { fullPath: p, infoDict } = getInfoDict(path, key, dictPath)
                    //target[key]._isDeleted = true

                    Reflect.deleteProperty(target, key)
                    if (infoDict) self.detectChanges(room, null, p)
                    return true
                }
            })
        }

        return deepProxy(room)
    }

    add(id: string, room: RoomClass): RoomClass {
        room.id = id
        room.$dict = {}
        if (!room.$schema) room.$schema = {}
        if (!room.$schema.users) room.$schema.users = [User.schema]
        if (!room.$inputs) room.$inputs = {}
        if (!room.users) room.users = {}
        if (room.$inputs) this.addInputs(room, room.$inputs)

        room.$detectChanges = () => {
            //this.detectChanges(room)
        }

        room.$setSchema = (schema) => {
            room.$schema = schema
            return this.setProxy(room)
        }

        room.$patchSchema = (schema) => {
            room.$schema = {
                ...room.$schema,
                ...schema
            }
            return this.setProxy(room)
        }

        room.$snapshot = () => {
            return this.snapshot(room)
        }

        room.$snapshotUser = (userId: string) => {
            return this.snapshotUser(room, userId)
        }

        room.$join = async (user: User | string): Promise<boolean> => {
            if (typeof user == 'string') {
                user = World.users[user]
            }
            if (user) {
                return this.join(user as any, room)
            }
            return false
        }

        room.$leave = async (user: User | string) => {
            if (typeof user == 'string') {
                user = World.users[user]['proxy']
            }
            await this.leave(user as User, room)
        }

        room.$currentState = () => this.memoryObject
        room.$setCurrentState = (path: string, value?) => {
            this.editMemoryObject(path, value === undefined ? room : value)
        }
        room.$clearCurrentState = () => {
            this.memoryObject = {}
        }

        room.$parent = this

        this.proxyRoom = room = this.setProxy(room)
        if (this.proxyRoom['onInit']) this.proxyRoom['onInit']()
        return this.proxyRoom
    }

    static extractObjectOfRoom(room: Object, schema): any {
        const newObj = {};
        const _schema = Array.isArray(schema) ? schema : Utils.propertiesToArray(schema);
        const regex = new RegExp('^(.*?)\\.\\' + GENERIC_KEY_SCHEMA);

        function extractAndSet(obj: any, path: string) {
            if (path.endsWith('@')) {
                return
            }
            const match = regex.exec(path);
            if (match) {
                const generic = get(room, match[1]);
                if (generic && typeof generic === 'object') {
                    for (let key in generic) {
                        if (generic.hasOwnProperty(key)) {
                            extractAndSet(obj, path.replace(GENERIC_KEY_SCHEMA, key));
                        }
                    }
                }
            } else {
                set(obj, path, get(room, path));
            }
        }
        for (let path of _schema) {
            extractAndSet(newObj, path);
        }
        return newObj;
    }

    detectChanges(room: RoomClass, obj: Object | null, path: string): void {

        const change = (room) => {
            const roomInstance = room.$parent
            roomInstance.editMemoryObject(path, obj)
            set(roomInstance.memoryTotalObject, path, obj)

            if (roomInstance.proxyRoom['onChanges']) roomInstance.proxyRoom['onChanges'](roomInstance.memoryObject)

            const id: string = room.id as string

            World.changes.next({
                ...World.changes.value,
                [id]: room
            })
        }

        // If after changing a room, we continue to use the wrong player instance, we ignore the changes made on an old proxy 
        if (obj != null) {
            const [prop, userId] = path.split('.')
            if (prop == 'users') {
                if (!this.propagateOldRoom && !room.users[userId]) {
                    return
                }
                World.forEachUserRooms(userId, change)
                return
            }
        }
        change(room)
    }

    editMemoryObject(path: string, roomOrValue: any): void {
        if (roomOrValue && typeof roomOrValue == 'object' && '$currentState' in roomOrValue) {
            set(this.memoryObject, path, get(roomOrValue, path), true)
        }
        else {
            set(this.memoryObject, path, roomOrValue, true)
        }
    }
}