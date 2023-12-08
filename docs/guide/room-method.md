# Room Methods: Documentation

Within the `Room` class, you're provided with an array of methods that assist in managing the state of the room, user interactions, and more. These methods offer fine-grained control over various aspects of the room lifecycle and its properties.

## Overview

```js
class Room {
    onJoin() {
        console.log(this.$snapshot());
    }
}
```

## Detailed Breakdown

- **`$join(user: User | string)`**: This method allows a user (either represented as an object or a string) to attempt to join the room. It returns a `Promise` which will resolve to a `boolean`, indicating the success or failure of the join request.

- **`$leave(user: User | string)`**: A method allowing a user to leave the room. This method returns a `Promise` which resolves once the user has been successfully removed from the room.

- **`$currentState()`**: A method that returns the current state of the room as an object.

- **`$setCurrentState(path: string, value: any)`**: This method allows you to directly set a specific value within the room's state. You can specify the path (or key) where you want to set the value.

- **`$clearCurrentState()`**: Clears or resets the room's current state.

- **`$setSchema(schema: any)`**: This method allows you to set the schema of the room. The schema can be any object which will act as the structure or blueprint for the room's state.

- **`$patchSchema(schema: any)`**: Similar to `$setSchema`, but instead of setting the entire schema, it allows you to update or patch a specific part of the current schema.

- **`$snapshot()`**: Returns a snapshot of the current state of the room. This snapshot provides a deep clone of the state, ensuring that the original state remains immutable.

- **`$snapshotUser(userId: string)`**: Returns a snapshot of the current state related to a specific user. If the user does not exist or if there's no state associated with the user, it will return `null`.