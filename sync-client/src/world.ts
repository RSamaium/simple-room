import msgpack from 'msgpack-lite'
import merge from 'lodash.mergewith'
import { BehaviorSubject } from 'rxjs'
import { room } from './store'
import { Collection } from './collection'
import { User } from './user'

type ListenOptions = {
    encoded?: boolean
}

export class WorldClass {
    socket: any
    static userId: string | null = null
    private obs$: BehaviorSubject<any> = new BehaviorSubject({})
    private users: Collection<any> = new Collection(User)

    get value() {
        return this.obs$.asObservable()
    }

    /**
     * Join an existing room
     * 
     * @param {string} roomId 
     */
    join(roomId: string) {
        this.socket.emit(':join', roomId)
    }

    /**
     * Change the value of a property
     * 
     * @param {string} prop 
     * @param {any} value
     */
    input(prop, value) {
        this.socket.emit(':input', { prop, value })
        return {
            catchError: (cb) => this.socket.once(':error', cb)
        }
    }

     /**
     * Do an action
     * 
     * @param {string} name 
     * @param {any} value
     */
    action(name: string, value) {
        this.socket.emit(':action', { name, value })
        return {
            catchError: (cb) => this.socket.once(':error', cb)
        }
    }

    /**
     * Listen to the changes on a socket
     * 
     * @param {string} socket 
     * @return {World}
     */
    listen(socket, options: ListenOptions = {}) {
        if (options.encoded === undefined) options.encoded = true
        
        this.socket = socket
        this.socket.on('uid', (response) => {
            WorldClass.userId = response
        })

        this.socket.on('connect', () => {
            this.obs$.next({})
        })

        this.socket.on('w', (response) => {

            if (options.encoded) {
                const bufView = new Uint8Array(response)
                response = msgpack.decode(bufView)
            }

            const [roomId, time, data] = response
    
            const lastRoomId = this.obs$.value.roomId 
            let mergeData: any = {}
            let resetProps: string[] = []

            if (lastRoomId == roomId) {
                data.join = false
                mergeData = merge({...(this.obs$.value.data || {})}, data, (objValue, srcValue, key, object, source, stack) => {
                    if (srcValue != null && typeof srcValue == 'object') {
                        if (Object.values(srcValue).length == 0) {
                            return {}
                        }
                        if (srcValue.$reset) {
                            resetProps.push(key)
                            delete srcValue.$reset
                            return srcValue
                        }
                    }
                })
            }
            else {
                // not merge 
                mergeData = data
            }
 
            if (data.users) {
                mergeData.users = this.users.detectChanges(mergeData.users)
            }

            this.obs$.next({
                roomId, 
                data: mergeData,
                partial: data,
                time,
                resetProps
            })

            room.set({...mergeData})
        })
        return this
    }

    reset() {
        this.obs$ = new BehaviorSubject({})
    }
}

export const World = new WorldClass()