// ------------------
// BINARY TREES
// ------------------

// TREE TERMINOLOGY
// Node - the building block of the tree. Can store any kind of value
// Root - The top node in a tree.
// Child -A node directly connected to another node when moving away from the Root.
// node - The converse notion of a child.
// Siblings -A group of node with the same node.
// Leaf - A node with no children.
// Edge - The connection between one node and another.

// TYPES (most wide used in programming)
// Binary tree
//  -Every node has at most two children
const { Queue } = require('../21.Stacks_Queues/queue.array');

class Node {
  constructor(value) { //      o - node
    this.value = value; //    / \
    this.left = null; //     o   o
    this.right = null; // left    right
  }
}

class BinaryTree {
  constructor() {
    // root of a binary seach tree
    this.root = null;
  }
  insert(value) {
    if (value !== 0 && !value) return null; // error handling
    const newNode = new Node(value);
    if (!this.root) {
      this.root = newNode;
      return this;
    }
    const queue = new Queue();
    queue.enqueue(this.root);
    while (!queue.isEmpty()) {
      const currNode = queue.dequeue();
      if (!currNode.left) {
        currNode.left = newNode;
        return this;
      } else if (!currNode.right) {
        currNode.right = newNode;
        return this;
      }
      queue.enqueue(currNode.left);
      queue.enqueue(currNode.right);
    }
    return this;
  }
  print() {
    const queue = new Queue();
    queue.enqueue(this.root);
    while (!queue.isEmpty()) {
      const currNode = queue.dequeue();
      console.log(currNode.value);
      if (currNode.left) queue.enqueue(currNode.left);
      if (currNode.right) queue.enqueue(currNode.right);
    }
  }
}

// example 1
// ----------------
// const tree = new BinaryTree();
// console.log(tree.insert(10));
// console.log(tree.insert(5));
// console.log(tree.insert(1));
// console.log(tree.insert(1));
// console.log(tree.insert(11));
// console.log(tree.insert(12));
// console.log(tree.insert(22));
// console.log(tree.insert(222));
// console.log(tree.root.left);
// console.log(tree.root.right);

// example 2
// ----------------
// const tree = new BinarySearchTree();
// tree.insert(9);
// tree.insert(4);
// tree.insert(6);
// tree.insert(20);
// tree.insert(170);
// tree.insert(15);
// tree.insert(1);
// console.log(JSON.stringify(tree));
// // console.log(tree.find(0));
// console.log(tree.remove(11));
// console.log(JSON.stringify(tree));

module.exports = {
  Node,
  BinaryTree,
};
