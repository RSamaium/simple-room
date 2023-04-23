import msgpack from 'msgpack-lite'
import merge from 'lodash.mergewith'
import { BehaviorSubject } from 'rxjs'
import { room } from './store'
import { Collection } from './collection'
import { User } from './user'

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
    listen(socket, transformData?: Function) {
        this.socket = socket
        this.socket.on('uid', (response) => {
            WorldClass.userId = response
        })
        this.socket.on('w', (response) => {
            const bufView = new Uint8Array(response)
            const decode = msgpack.decode(bufView)
            const [roomId, time, data] = decode
            const lastRoomId = this.obs$.value.roomId 
            let mergeData: any = {}
            
            if (lastRoomId == roomId) {
                data.join = false
                mergeData = merge({...(this.obs$.value.data || {})}, data, (objValue, srcValue) => {
                    if (typeof srcValue == 'object' && srcValue != null && Object.values(srcValue).length == 0) {
                        return {}
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
                time
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