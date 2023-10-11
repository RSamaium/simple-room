export enum UserState {
    Connected = 'C',
    Disconnected = 'D'
}

export class User {
    static schema = {
        $state: String
    }
    id: string
    $state: UserState = UserState.Connected
    _socket
    _secretSessionId: string = ''
    _rooms: any[] = []
    _timeoutDisconnect: any
}

export class DefaultRoom  {
   $schema = {
        users: [User.schema]
   }
   users = {}
}