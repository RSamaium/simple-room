```js
export class Room {
    $schema = {
        count: Number
    }
    $actions = {
        increment: true
    }
    
    count = 0

    increment() {
       this.count++
    }
}
```