import { Utils } from '../src'
import { describe, test, expect } from 'vitest'

describe('Utils.bufferFrom', () => {
    // Example test for string input
    test('should convert string to Uint8Array', () => {
        const input = 'Hello World';
        const result = Utils.bufferFrom(input);
        expect(result).toBeInstanceOf(Uint8Array);
        expect(result).toEqual(new TextEncoder().encode(input));
    });

    // Example test for ArrayBuffer input
    test('should handle ArrayBuffer input', () => {
        const buffer = new ArrayBuffer(10);
        const result = Utils.bufferFrom(buffer);
        expect(result).toBeInstanceOf(Uint8Array);
        expect(result.byteLength).toBe(buffer.byteLength);
    });

    // Example test for input that is a view of ArrayBuffer
    test('should handle ArrayBufferView input', () => {
        const buffer = new Uint8Array([1, 2, 3]);
        const result = Utils.bufferFrom(buffer);
        expect(result).toBeInstanceOf(Uint8Array);
        expect(result).toEqual(buffer);
    });

    // Example test for unsupported input types
    test('should throw error for unsupported input types', () => {
        const input = { not: 'supported' };
        expect(() => Utils.bufferFrom(input as any)).toThrow('Input type not supported');
    });
});