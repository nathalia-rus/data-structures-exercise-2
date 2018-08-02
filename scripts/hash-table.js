'use strict';

const helpers = require('./hash-table-helpers');

const Storage = helpers.Storage;
const hash = helpers.hash;

class HashTable {

  constructor (size) {
    this.size = size;
    this.storage = new Storage(size);
  }

  insert (key, value) {
    const address = hash(key, this.size); //  generates position of pair 
    const got = this.storage.get(address); 
    // got gets the position of pairs in the storage so sees if it returns something already
    const node = { key: key, value: value, next: null }; // if linked list. node; go next.
    if (got) {
      // if returns true then something already exists at the address
      // we either need to update it
      // or there is a collision and we need to traverse the linked list
      if (got.key === key) {
        // means need to replace:
        // we update the value and exit
        got.value = value;
        return true;
      }
      // (else) => the val doesn't exist, just a question of linked list so 
      // we need to traverse the linked list
      let pointer = got; // pointer to traverse the linked list, starts @ the address
      while (pointer !== null) {
        // until we are at the end of the linked list
        if (pointer.key === key) {
          // if at any point during the traversal we meet the same key
          // we update the value and exit
          pointer.value = value;
          return true;
        }
        pointer = pointer.next; // iteration over the whole linked list
      }
      // end of linked list reached
      // need to insert new pair, which we now know doesn't exist in the linked list
      node.next = got; // we point the new node(key, value) to the previous nodes
      this.storage.set(address, node); // we update the storage and exit
      return true;
    }
    // (else)
    // there is nothing at the address, no collision: simple:
    // we create a new node at the address and exit
    this.storage.set(address, node); // with next null, remember, because no linked list
    return true;
  }

  retrieve (key) {
    const address = hash(key, this.size);
    const got = this.storage.get(address);
    if (got) {
      // something already exists at the address
      // if there is no collision, we return the value and exit
      if (got.key === key) return got.value;
      // (else)
      // there may or may not be a linked list
      // if there is, the next value will be set to something other than null
      //     key may exist inside or or it may not exist
      // if there is not, we don't enter the while loop, return undefined and exit
      let pointer = got;
      while (pointer !== null) {
        // until we are at the end of the linked list
        // if at any point during the traversel, the key matches with the one required
        // we return the value and exit
        if (pointer.key === key) return pointer.value;
        pointer = pointer.next; // iteration over the whole linked list
      }
      // the key was not found
      // we return undefined and exit
      return undefined;
    }
    // (else)
    // nothing exists at the address, we return undefined and exit
    return undefined;
  }

  remove (key) {
    const address = hash(key, this.size); 
    const got = this.storage.get(address); // got gets at the adress 
    if (got) {
      // something already exists at the address
      if (got.key === key && got.next === null) {
        // the key at the address matches with the one we want to remove AND there is no linked list
        // we delete the node at the address (set it to undefiend) and exit
        // true: we deleted it
        this.storage.set(address, undefined);
        return true;
      } else if (got.key === key) {
        // the key at the address matches with the one we want to remove
        // BUT there is a linked list
        // we update the node at the address to the rest of the linked list (delete the head)
        // and we exit
        // true: we deleted it
        this.storage.set(address, got.next);
        return true;
      } else {
        // there is a linked list and the key may be somewhere it, we need to traverse it
        let pointer = got;
        let node;
        while (pointer !== null) {
          if (pointer.key === key) {
            // we found the key to delete in the linked list
            // we skip it by updating the next value to the following node and exit
            // true: we deleted it inside the linked list
            node.next = pointer.next;
            return true;
          }
          node = pointer;
          pointer = pointer.next; // iteration over the whole linked list
        }
        // the key wasn't in the linked list, we exit
        // false: the key to delete doen't exist
        return false;
      }
    }
    // (else)
    // nothing exists at the address, we exit
    // false: there is nothing to delete
    return false;
  }
}

module.exports = HashTable;
