// Binary tree (unordered type of tree)

// Two main ways of TRAVERSING A TREE:
//   - Breadth-first Search (going across)
//   - Depth-first Search (going deep)

// ----------
// Big O Time
// ----------
// same for both BFS and DFS


// -----------
// Big O Space
// -----------
// Depends on destribution of the tree nodes
//   - if its more one-sided (list-like) -> BFS is better (rare case)
//   - if the destribution is more even (tree-like) -> DFS is better (often case)

// const BinarySearchTreeBase =
const BinarySearchTree =
  require('../22.Binary_Search_Trees/binary.search.tree').BinarySearchTree;
const { Queue } =
  require('../21.Stacks_Queues/queue.doubly.linked.list');

// class BinarySearchTree extends BinarySearchTreeBase { // or with prototype
//   constructor(value) {
//     super(value);
//   }
//   bfs() {
//     console.log('BFS');
//   }
// }

// --------------------------
// BFS (Breadth-first Search)
// --------------------------
// BFS - Recursive
// --------------------------
// BinarySearchTree.prototype.bfs = function() { // traverse
//   const queue = new Queue(); // queue (doubly linked list)
//   const traversedTree = [];
//   let currentNode = this.root;

//   if (!currentNode) return [];
//   queue.enqueue(currentNode);
//   traverse(currentNode);

//   function traverse(node) {
//     console.log(queue);
//     // console.log(traversedTree);
//     queue.dequeue();
//     traversedTree.push(node.value);
//     if (node.left) {
//       queue.enqueue(node.left);
//     }
//     if (node.right) {
//       queue.enqueue(node.right);
//     }
//     currentNode = queue.front();
//     if (!currentNode) return;
//     traverse(currentNode);
//   }
//   return traversedTree;
// };
// --------------------------
// BFS - Iterative
// --------------------------
BinarySearchTree.prototype.bfs = function() { // traverse
  const queue = new Queue(); // queue (doubly linked list)
  const traversedTree = [];
  let currentNode = this.root;
  queue.enqueue(currentNode);
  while (currentNode) {
    queue.dequeue();
    traversedTree.push(currentNode.value);
    if (currentNode.left) queue.enqueue(currentNode.left);
    if (currentNode.right) queue.enqueue(currentNode.right);
    currentNode = queue.front();
  }
  return traversedTree;
};

// --------------------------
// DFS (Depth-first Search)
// --------------------------
// DFS - PreOrder
// best suited for cloning/copying tree (as you know the root)
// Recursive
// --------------------------
BinarySearchTree.prototype.dfsPreOrder = function() { // traverse
  const traversedTree = [];
  traverse(this.root);
  return traversedTree;

  // helper function for the recursion
  function traverse(node) {
    if (!node) return; // bottom of recursion
    traversedTree.push(node.value);
    if (node.left) traverse(node.left);
    if (node.right) traverse(node.right);
  }
};
// --------------------------
// DFS - PostOrder
// Recursive
// --------------------------
BinarySearchTree.prototype.dfsPostOrder = function() { // traverse
  const traversedTree = [];
  traverse(this.root);
  return traversedTree;

  // helper function for the recursion
  function traverse(node) {
    if (!node) return; // bottom of recursion
    if (node.left) traverse(node.left);
    if (node.right) traverse(node.right);
    traversedTree.push(node.value);
  }
};

// Iterative
// ...

// --------------------------
// DFS - InOrder
// used commonly with Binary search trees
// Recursive
// --------------------------
BinarySearchTree.prototype.dfsInOrder = function() { // traverse
  const traversedTree = [];
  traverse(this.root);
  return traversedTree;

  // helper function for the recursion
  function traverse(node) {
    if (!node) return; // bottom of recursion
    if (node.left) traverse(node.left);
    traversedTree.push(node.value);
    if (node.right) traverse(node.right);
  }
};

// Iterative
// ...


const binaryTree = new BinarySearchTree();
binaryTree.insert(10);
binaryTree.insert(6);
binaryTree.insert(15);
binaryTree.insert(3);
// binaryTree.insert(1);
// binaryTree.insert(1);
binaryTree.insert(8);
binaryTree.insert(20);
console.log(binaryTree.bfs());
console.log(binaryTree.dfsPreOrder());
console.log(binaryTree.dfsPostOrder());
console.log(binaryTree.dfsInOrder());

module.exports = {
  BinarySearchTree, // with all bfs and dfs methods
};
