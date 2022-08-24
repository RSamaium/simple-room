import { WorldClass } from "./world"

export class User {
    constructor(data, private id: string) {
        Object.assign(this, data)
    }

    isMe() {
        return WorldClass.userId == this.id
    }
}