import { MxObjectIdentity } from './MxObjectIdentity.js';
/**
 * Class: mxDictionary
 *
 * A wrapper class for an associative array with object keys. Note: This
 * implementation uses <mxObjectIdentitiy> to turn object keys into strings.
 *
 * Constructor: mxEventSource
 *
 * Constructs a new dictionary which allows object to be used as keys.
 */
export class MxDictionary {
    /**
     * Stores the (key, value) pairs in this dictionary.
     * @type {null}
     */
    map = null;

    constructor() {
        this.clear();
    }

    /**
     * Clears the dictionary.
     */
    clear() {
        this.map = {};
    }

    /**
     * Returns the value for the given key.
     * @param key
     * @returns {*}
     */
    get(key) {
        let id = MxObjectIdentity.get(key);
        return this.map[id];
    }

    /**
     * Stores the value under the given key and returns the previous
     * value for that key.
     * @param key
     * @param value
     * @returns {*}
     */
    put(key, value) {
        let id = MxObjectIdentity.get(key);
        let previous = this.map[id];
        this.map[id] = value;
        return previous;
    }

    /**
     * Removes the value for the given key and returns the value that
     * has been removed.
     * @param key
     * @returns {*}
     */
    remove(key) {
        let id = MxObjectIdentity.get(key);
        let previous = this.map[id];
        delete this.map[id];
        return previous;
    }

    /**
     * Returns all keys as an array.
     * @returns {*[]}
     */
    getKeys() {
        let result = [];

        for (let key in this.map) {
            result.push(key);
        }

        return result;
    }

    /**
     * Returns all values as an array.
     * @returns {*[]}
     */
    getValues() {
        let result = [];

        for (let key in this.map) {
            result.push(this.map[key]);
        }

        return result;
    }

    /**
     * Visits all entries in the dictionary using the given function with the
     * following signature: function(key, value) where key is a string and
     * value is an object.
     * @param visitor - A function that takes the key and value as arguments.
     */
    visit(visitor) {
        for (let key in this.map) {
            visitor(key, this.map[key]);
        }
    }

}
