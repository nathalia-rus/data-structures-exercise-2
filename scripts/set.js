'use strict';
// passes all the tests!
// - A value can belong to more than one set, and for each value you can say what sets it belongs to.
// - You can find the intersection of multiple sets (a list of the values that they share).
// - In the two tasks above there’s a trade-off between space (memory) and time (computation), can you figure out the possible implementations?


class Set {
  constructor () {
    this.storage = {};
  }
  add (value) {
    if (!this.contains(value)) {
      this.storage[value] = value;
    }
    return true;
  }
  contains (value) {
    return (this.storage[value] !== undefined);
  }
  remove (value) {
    if (this.contains(value)) {
      delete this.storage[value];
    }
    return true;
  }

  values () {
    let values = [];
    for (let key in this.storage) { // {1}
      if (this.storage.hasOwnProperty(key)) { // {2}
        values.push(key);
      }
    }
    return values;
  }

  union (otherSet) {
    const unionSet = new Set();
    let values = this.values();
    for (let i = 0; i < values.length; i++) {
      unionSet.add(values[i]);
    }
    values = otherSet.values();
    for (let i = 0; i < values.length; i++) {
      unionSet.add(values[i]);
    }
    return unionSet;
  }


  intersection (otherSet) {
    const intersectionSet = new Set(); // {1}
    const values = this.values(); // {2}
    const otherValues = otherSet.values(); // {3}
    let biggerSet = values; // {4}
    let smallerSet = otherValues; // {5}
    if (otherValues.length - values.length > 0) { // {6}
      biggerSet = otherValues;
      smallerSet = values;
    }
    smallerSet.forEach(value => { // {7}
      if (biggerSet.includes(value)) {
        intersectionSet.add(value);
      }
    });
    return intersectionSet.values();
  }
}


/*
  difference(otherSet) {
    const differenceSet = new Set();
    this.values().forEach(value => {
      if (!otherSet.contains(value) {
        differenceSet.add(value);
      };
    });
    return differenceSet;
  };

  isSubsetOf(otherSet) {
    if (this.size() > otherSet.size()) { // {1}
      return false;
    }
    let isSubset = true; // {2}
    this.values().every(value => { // {3}
      if (!otherSet.has(value)) { // {4}
        isSubset = false; // {5}
        return false;
      }
      return true; // {6}
    });
    return isSubset; // {7}
  }
  };
*/


/*
// or :
  values() {
    return Object.values(this, storage);
  };

*/
// union operation - ES6: 
/*
union(otherSet) {
  const unionSet = new Set();
  this.values().forEach(value => unionSet.add(value));
  otherSet.values().forEach(value => unionSet.add(value));
  return unionSet;
};
*/

// union operation - not ES6: 
// whateverset.union(otherSet):

/*
// union tests

const setA = new Set();
setA.add(1);
setA.add(2);
setA.add(3);
const setB = new Set();
setB.add(3);
setB.add(4);
setB.add(5);
setB.add(6);
const unionAB = setA.union(setB);
console.log(unionAB.values());



// intersection tests

const setA = new Set();
setA.add(1);
setA.add(2);
setA.add(3);
const setB = new Set();
setB.add(2);
setB.add(3);
setB.add(4);
const intersectionAB = setA.intersection(setB);
console.log(intersectionAB.values()); // [2, 3]

// need a better version: because expensive loop. So see above.
/*
intersection(otherSet) {
  const intersectionSet = new Set(); // {1}
  const values = this.values();
  // returns an array
  for (let i = 0; i < values.length; i++) {
    if (otherSet.contains(values[i])) {
      // not push because set: method add we created so no duplicate.
      intersectionSet.add(values[i]);
    }
  };
  return intersectionSet;
};



// difference tests

const setA = new Set();
setA.add(1);
setA.add(2);
setA.add(3);
const setB = new Set();
setB.add(2);
setB.add(3);
setB.add(4);
const differenceAB = setA.difference(setB);
console.log(differenceAB.values());


// subset :

.every() returns a boolean - true if every element in this array satisfies 
the provided testing function. 
An important difference with .every() is that the test function may not 
always be called for every element in the array. 
Once the testing function returns false for any element, no more array elements 
are iterated. Therefore, the testing function should usually have no side effects.


// subset tests:

const setA = new Set();
setA.add(1);
setA.add(2);
const setB = new Set();
setB.add(1);
setB.add(2);
setB.add(3);
const setC = new Set();
setC.add(2);
setC.add(3);
setC.add(4);
console.log(setA.isSubsetOf(setB));
console.log(setA.isSubsetOf(setC));
// false.

// ES6 

console.log(new Set([...setA, ...setB])); // union
console.log(new Set([...setA].filter(x => setB.has(x)))); // intersection
console.log(new Set([...setA].filter(x => !setB.has(x)))); // difference
*/
module.exports = Set;
