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

    static generateId(n: number = 5) {
        return Math.random().toString(36).substring(n)
    }

    static async resolveValue(value) {
        if (value instanceof Promise) {
            return await value
        }
        return value
    }

    static set(obj, path, value, onlyPlainObject = false) {
        if (Object(obj) !== obj) return obj;

        if (typeof path === 'string') {
            path = path.split('.');
        }

        let len = path.length;
        if (!len) return obj;

        let current = obj;
        for (let i = 0; i < len - 1; i++) {
            let segment = path[i];
            let nextSegment = path[i + 1];
            let isNextNumeric = !isNaN(nextSegment) && isFinite(nextSegment);

            if (!current[segment] || typeof current[segment] !== 'object') {
                current[segment] = (isNextNumeric && !onlyPlainObject) ? [] : {};
            }

            current = current[segment];
        }

        current[path[len - 1]] = value;

        return obj;
    }

    static get(obj, path) {
        const keys = path.split('.');
        let current = obj;

        for (let key of keys) {
            if (current[key] === undefined) {
                return undefined;
            }
            current = current[key];
        }

        return current;
    }

    static bufferFrom(input: string | ArrayBuffer | ArrayBufferView): Uint8Array {
        if (typeof input === 'string') {
            // If the input is a string, convert it to an ArrayBuffer
            let encoder = new TextEncoder();
            return encoder.encode(input);
        } else if (input instanceof ArrayBuffer || ArrayBuffer.isView(input)) {
            // If the input is an ArrayBuffer or a view of it, return it as Uint8Array
            return new Uint8Array(input as ArrayBuffer);
        } else {
            // Extend this function for other types of inputs as needed
            throw new Error('Input type not supported');
        }
    }
}