
export class Collection<T> {
    collection: Map<string, T> = new Map()

    constructor(private collectionClass?: any) {}

    private removeCb = (key: string) => {};
    private addCb = (key: string, data: any) => {};

    registerRemoveCallback(cb) {
        this.removeCb = cb
    }

    registerAddCallback(cb) {
        this.addCb = cb
    }

    detectChanges(data: { [id: string]: any }) {
        let newObj = {}
        for (let key in data) {
            const obj = data[key];
            if (obj == null) {
                this.collection.delete(key)
                this.removeCb(key)
                continue
            }
            const instance =  this.collectionClass ? new this.collectionClass(obj, key) : obj
            if (!this.collection.has(key)) {    
                this.addCb(key, instance)
            }
            this.collection.set(key, instance)
            newObj[key] = instance
        }
        return newObj
    }
}
