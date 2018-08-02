'use strict';

class Tree {
  constructor (value) {
    this.value = value;
    this.children = [];
  }
  addChild (node) {
    this.children.push(node);
    return true;
  }
  contains (value) {
    if (this.value === value) return true;
    else {
      for (let i = 0; i < this.children.length; i++) {
        if (this.children[i].contains(value)) return true;
      }
    }
    return false;
  }
}

module.exports = Tree;
