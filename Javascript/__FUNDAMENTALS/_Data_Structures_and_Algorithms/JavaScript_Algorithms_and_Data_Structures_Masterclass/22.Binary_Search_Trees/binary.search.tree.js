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
// Binary search tree:
//  ....
//  +
//  - NODEparent > NODEleft, NODEleft > NODEright(Every node on the left of a parent is always less than the parent and the node on the right)
//  - NODEparent < NODEright, NODEleft < NODEright(Every node on the right of a parent is always bigger than the parent and the node on the left)

// Big O of BST
// ----------------------------------------------
//           |   best   |  average  |   worst   |
//           | -------  | --------- | --------- |
// Insertion |  O(logn) |  O(logn)  |    O(n)   |
// Find      |  O(logn) |  O(logn)  |    O(n)   |

// worst happens when tree is like a linked list

// number of nodes in perfect (always two chldren) binary tree is N = 2^h - 1, where h is the height/depth
// most significant approximation --> log n = h --> log 8 = 3 --> 2^3 = 8

// ------------------
// BINARY SEARCH TREES
// ------------------

class Node {
  constructor(value) { //      o - node
    this.value = value; //    / \
    this.left = null; //     o   o
    this.right = null; // left    right
  }
}

class BinarySearchTree {
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
  find(value) { // lookup(value)
    if (value !== 0 && !value) return false; // error handling
    if (!this.root) return false;
    let currentNode = this.root;
    while (currentNode) {
      if (currentNode.value > value) {
        currentNode = currentNode.left;
      } else if (currentNode.value < value) {
        currentNode = currentNode.right;
      } else if (currentNode.value === value) {
        return true;
      }
    }
    return false;
  }
  findMinNode(node) {
    // if left of a node is null
    // then it must be minimum node
    if (node.left === null) {
      return node;
    }
    return this.findMinNode(node.left);
  }
  // https://www.geeksforgeeks.org/binary-search-tree-set-2-delete/
  remove(value) {
    // root is re-initialized with
    // root of a modified tree.
    return this.removeNode(this.root, value); // returns the root node === BST
  }

  // Method to remove node with a
  // given value
  // it recurrs over the tree to find the
  // value and removes it
  removeNode(node, value) {
    // if the root is null then tree is empty or reach bottom of recursion
    if (node === null) {
      return null;
    } else if (value < node.value) {
      // if value to be delete is less than current node value --> move to left subtree
      node.left = this.removeNode(node.left, value);
      return node; // if node.right is null => bubbling up the call stack
    } else if (value > node.value) {
      // if value to be delete is greater than current node value --> move to right subtree
      node.right = this.removeNode(node.right, value);
      return node; // if node.right is null => bubbling up the call stack
    } else if (value === node.value) {
      // recursivley reach the node
      // if value is similar to the root's value
      // then delete this node

      // deleting node with no children
      if (node.left === null && node.right === null) {
        node = null;
        return node;
      }

      // deleting node with one children
      if (node.left === null) {
        node = node.right;
        return node;
      } else if (node.right === null) {
        node = node.left;
        return node;
      }
      // Deleting node with two children
      // minumum node of the rigt subtree
      // is stored in aux
      const aux = this.findMinNode(node.right);

      // swaps node with min value on right side with node.value===value
      node.value = aux.value;

      // deletes the node with min value on right (aux)
      node.right = this.removeNode(node.right, aux.value); // in the end returns null
      return node; // returns the node with swaped values and deleted node with min value on right (aux)
    }
    // return true; // just to stop eslint return error
  }
}

// example 1
// ----------------
// const tree = new BinarySearchTree();
// console.log(tree.insert(10));
// console.log(tree.insert(5));
// console.log(tree.insert(1));
// // console.log(tree.insert(1));
// console.log(tree.insert(11));
// console.log(tree.find(10));
// // console.log(tree);

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
  BinarySearchTree,
};
