# Room Hooks

Hooks are special methods within the `Room` class that act as life cycle events. These hooks allow developers to write custom logic to respond to different events within the room's life cycle.

Here's a breakdown of the hooks available in the `Room` class:

- **`onInit()`**: This method is invoked when a room is initialized. It is recommended to use `onInit` over other methods to set initial data because of its reactivity.

- **`canJoin(user)`**: This method determines if a user can join a room. It can return:
  - A `Promise` that resolves to a `boolean` or a `string`.
  - A `boolean` value directly (`true` if the user can join, and `false` otherwise).
  - A `string` value indicating a personalized error message if the user is not allowed to join.

- **`onJoin(user)`**: This method is called whenever a user joins the room. Custom logic related to a user joining can be written here.

- **`onLeave(user)`**: Similar to `onJoin`, this method is invoked when a user leaves the room. You can write custom logic related to a user's departure here.

- **`onChanges(newObject)`**: This method is triggered when there are changes to the room's properties. The method provides the current object or snapshot of the room properties.

```javascript
class Room {
    onInit() {
        // Initialize data or set up listeners.
    }

    canJoin(user) {
        // Implement logic to decide if a user can join.
        // Can return true, false, a string message, or a Promise.
    }

    onJoin(user) {
        // Logic to handle a user joining the room.
    }

    onLeave(user) {
        // Logic to handle a user leaving the room.
    }

    onChanges(newObject) {
        // Logic to handle changes in the room's properties.
    }
}
```

Use these hooks to customize your room's behavior to fit the requirements of your application. Whether it's ensuring only specific users can join or reacting to property changes in real-time, Simple Room provides the flexibility you need.