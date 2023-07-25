import { Room } from "./room";

export const GENERIC_KEY_SCHEMA = '@'

export class Utils {

    static isObject(val) {
        return typeof val === 'object' && !Array.isArray(val) && val != null
    }

    static propertiesToArray(obj: any) {
        const addDelimiter = (a, b) =>
            a ? `${a}.${b}` : b;

        const paths = (obj = {}, head = '') => {
            return Object.entries(obj)
                .reduce((product, array) => {
                    const [key] = array
                    const value: any = array[1]
                    const extraProp = Room.hasExtraProp(value)
                    let fullPath = addDelimiter(head, key == '0' ? GENERIC_KEY_SCHEMA : key)
                    if (extraProp) {
                        if (value.$syncWithClient === false) {
                            return product
                        }
                    }
                    if (key[0] != '_' && !extraProp && (Utils.isObject(value) || Array.isArray(value))) {
                        if (Object.keys(value).length == 0) {
                            return product.concat(fullPath)
                        }
                        return product.concat(paths(value, fullPath))
                    }
                    else {
                        return product.concat(fullPath)
                    }
                }, []);
        }
        return paths(obj);
    }

    static generateId() {
        return '$' + (Date.now().toString(36) + Math.random().toString(36).substr(2, 5))
    }

    // https://stackoverflow.com/questions/54733539/javascript-implementation-of-lodash-set-method
    static set(obj, path, value, onlyPlainObject = false) {
        if (Object(obj) !== obj) return obj; // When obj is not an object
        // If not yet an array, get the keys from the string-path
        if (!Array.isArray(path)) path = path.toString().match(/[^.[\]]+/g) || [];
        path.slice(0, -1).reduce((a, c, i) => // Iterate all of them except the last one
            Object(a[c]) === a[c] // Does the key exist and is its value an object?
                // Yes: then follow that path
                ? a[c]
                // No: create the key. Is the next key a potential array-index?
                : a[c] = Math.abs(path[i + 1]) >> 0 === +path[i + 1]
                    ? onlyPlainObject ? {} : [] // Yes: assign a new array object
                    : {}, // No: assign a new plain object
            obj)[path[path.length - 1]] = value; // Finally assign the value to the last key
        return obj; // Return the top-level object to allow chaining
    };
}