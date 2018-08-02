'use strict';

// This is used to generate the "Storage" class (you don't need to understand
// the implementation details). Just invoke this class with an argument "size",
// to get an instance of that size. Each instance then has a "get" and a "set"
// method, that can be invoked passing the index value you receive from the hashing function,
// and throws an error if you try to access indexes outside of the storage size.

// For example:
// let storage = Storage(5);
// storage.set(3, {key: 'hello', value: 'world'});
// storage.get(3); -> {key: 'hello', value: 'world'}
// storage.get(5); -> undefined
// storage.get(8); -> Error
exports.Storage = function (size) {

  const storage = [];

  return {
    get: function (index) {
      checkLimit(index, size);
   //   console.log(index, '::', getValue(storage, index));
      return getValue(storage, index);
    },
    set: function (index, value) {
      checkLimit(index, size);
      setValue(storage, index, value);
    }
  };

};

function checkLimit (index, size) {
  if (typeof index !== 'number') throw new Error('The first argument must be a number');
  if (index >= size) throw new Error('You are trying to access an over-the-limit index');
}

function getValue (storage, index) {
  return storage[index];
}

function setValue (storage, index, value) {
  storage[index] = value;
}

// This is a "hashing" function. You don't need to worry about it, just use it
// to turn any string into an integer that is well-distributed between the
// numbers 0 and "max".
exports.hash = function (str, max) {
  let res = 0;
  for (let i = 0; i < str.length; i++) {
    res = (res<<5) + res + str.charCodeAt(i);
    res = res & res; // Convert to 32bit integer
    res = Math.abs(res);
  }
  return res % max;
};
