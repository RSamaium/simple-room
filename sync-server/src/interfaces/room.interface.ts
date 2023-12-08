import { User } from '../rooms/default';
import { Packet } from '../packet';

export interface OnInit {
    onInit: () => void
}

export interface OnJoin {
    onJoin: (user: any) => void
}

export interface OnLeave {
    onLeave: (user: any) => void
}

export interface RoomClass {
    id: string
    users: {
        [userId: string]: User
    }
    $schema: any
    $dict?: any
    $inputs: {
        [key: string]: string
    }
    $actions: {
        [key: string]: string
    },
    $detectChanges: () => void,
    $join: (user: User | string) => Promise<boolean>
    $leave: (user: User | string) => Promise<void>
    $currentState: () => Object
    $setCurrentState: (path: string, value: any) => void
    $clearCurrentState: () => void
    $setSchema: (schema: any) => void
    $patchSchema: (schema: any) => void
    $snapshot: () => any
    $snapshotUser: (userId: string) => {
        [key: string]: any
    } | null

    $additionalEmitProperties?: (user: User, packet: Packet) => object
    $parent: any
}