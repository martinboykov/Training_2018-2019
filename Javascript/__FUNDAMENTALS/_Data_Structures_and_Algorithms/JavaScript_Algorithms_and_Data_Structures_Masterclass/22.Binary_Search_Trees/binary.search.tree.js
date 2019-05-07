// TREE TERMINOLOGY
// Root - The top currentNode in a tree.
// Child -A currentNode directly connected to another currentNode when moving away from the Root.
// currentNode - The converse notion of a child.
// Siblings -A group of currentNodes with the same currentNode.
// Leaf - A currentNode with no children.
// Edge - The connection between one currentNode and another.

// TYPES (most wide used in programming)
// Binary tree
//  -Every currentNode currentNode has at most two children
// Binary search tree:
//  -Every currentNode currentNode has at most two children
//  -Every currentNode to the left of a currentNode currentNode is always less than the currentNode
//  -Every currentNode to the right of a currentNode currentNode is always greater than the currentNode

// Big O of BST
// ----------------------------------------------
//           |   best   |  average  |   worst   |
//           | -------  | --------- | --------- |
// Insertion |  O(logn) |  O(logn)  |    O(n)   |
// Find      |  O(logn) |  O(logn)  |    O(n)   |

// worst case is by one sided BST (like a linked list)

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}
class BinarySearchTree {
  constructor() {
    // root of a binary seach tree
    this.root = null;
  }
  insert(value) {
    const newNode = new Node(value);
    if (!this.root) {
      this.root = newNode;
      return this;
    }
    let isFound = false;
    let currentNode = this.root;
    while (!isFound) {
      if (currentNode.value > value) {
        if (currentNode.left === null) {
          currentNode.left = newNode;
          isFound = true;
        }
        currentNode = currentNode.left;
      } else if (currentNode.value < value) {
        if (currentNode.right === null) {
          currentNode.right = newNode;
          isFound = true;
        } else {
          currentNode = currentNode.right;
        }
      } else if (currentNode.value === value) {
        return null;
      }
    }
    return this;
  }
  find(value) {
    if (!this.root) return false;
    let isFound = false;
    let currentNode = this.root;
    while (!isFound) {
      if (currentNode.value > value) {
        if (currentNode.left === null) {
          break;
        }
        currentNode = currentNode.left;
      } else if (currentNode.value < value) {
        if (currentNode.right === null) {
          break;
        }
        currentNode = currentNode.right;
      } else if (currentNode.value === value) {
        isFound = true;
      }
    }
    if (isFound) return currentNode;
    return false;
  }
}

const tree = new BinarySearchTree();
console.log(tree.insert(10));
console.log(tree.insert(5));
console.log(tree.insert(1));
// console.log(tree.insert(1));
console.log(tree.insert(11));
console.log(tree.find(10));
// console.log(tree);
