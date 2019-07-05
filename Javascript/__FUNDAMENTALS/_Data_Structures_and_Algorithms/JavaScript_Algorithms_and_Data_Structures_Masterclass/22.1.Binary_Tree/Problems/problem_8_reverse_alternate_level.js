// https://www.geeksforgeeks.org/top-10-algorithms-in-interview-questions/

// Check if a binary tree is subtree of another binary tree | Set 2 - https://www.geeksforgeeks.org/check-binary-tree-subtree-another-binary-tree-set-2/

const { Node, BinaryTree } = require('../binary.tree');
const { Queue } =
  require('../../21.Stacks_Queues/queue.array');
const { PriorityQueue } =
  require('../../24.Binary_Heaps_&_Priority_Queues/priority.queues');

// With object level mapping
// Time: O(n)
// Space: O(n);
// BinaryTree.prototype.verticalOrderTraversalUtil =
//   function(node = this.root, memo = {}, level = 0) {
//     const queue = new Queue();
//     queue.enqueue(node);
//     // memo[level] = [node.value]; // for even levels
//     while (!queue.isEmpty()) { // O(n)
//       const currNode = queue.dequeue();
//       if (queue.items.length >= Math.pow(2, level) - 1) level += 1;

//       if (currNode.left) {
//         if (level % 2 !== 0 && level !== 0) {
//           if (!memo[level]) memo[level] = [];
//           memo[level].push(currNode.left.value);
//         }

//         queue.enqueue(currNode.left);
//       }
//       if (currNode.right) {
//         if (level % 2 !== 0 && level !== 0) {
//           if (!memo[level]) memo[level] = [];
//           memo[level].push(currNode.right.value);
//         }
//         queue.enqueue(currNode.right);
//       }
//     }
//     return memo;
//   };

// BinaryTree.prototype.reverseUtil =
//   function(node, memo, level = 0) {
//     const queue = new Queue();
//     queue.enqueue(node);
//     // memo[level] = [node.value]; // for even levels
//     while (!queue.isEmpty()) { // O(n)
//       const currNode = queue.dequeue();
//       if (queue.items.length >= Math.pow(2, level) - 1) level += 1;

//       if (currNode.left) {
//         if (level % 2 !== 0 && level !== 0) {
//           currNode.left.value = memo[level][0];
//           memo[level].shift();
//         }
//         queue.enqueue(currNode.left);
//       }
//       if (currNode.right) {
//         if (level % 2 !== 0 && level !== 0) {
//           currNode.right.value = memo[level][0];
//           memo[level].shift();
//         }
//         queue.enqueue(currNode.right);
//       }
//     }
//     return memo;
//   };

// // Time: O(n)
// // Space: O(n)
// function reverseAlternateLevels(tree) {
//   const memo = tree.verticalOrderTraversalUtil();
//   Object.keys(memo).forEach((key) => {
//     memo[key].reverse(); // of use two pointers for O(n)
//   });
//   tree.reverseUtil(tree.root, memo);
//   return tree;
// }


// With one array
BinaryTree.prototype.verticalOrderTraversalUtil =
  function(node = this.root, memo = [], level = 0) {
    const queue = new Queue();
    queue.enqueue(node);
    // memo[level] = [node.value]; // for even levels
    while (!queue.isEmpty()) { // O(n)
      const currNode = queue.dequeue();
      if (queue.items.length >= Math.pow(2, level) - 1) level += 1;

      if (currNode.left) {
        if (level % 2 !== 0 && level !== 0) {
          memo.push(currNode.left.value);
        }
        queue.enqueue(currNode.left);
      }
      if (currNode.right) {
        if (level % 2 !== 0 && level !== 0) {
          memo.push(currNode.right.value);
        }
        queue.enqueue(currNode.right);
      }
    }
    return memo;
  };

BinaryTree.prototype.reverseUtil =
  function(node, memo, level = 0) {
    const queue = new Queue();
    queue.enqueue(node);
    // memo[level] = [node.value]; // for even levels
    while (!queue.isEmpty()) { // O(n)
      const currNode = queue.dequeue();
      if (queue.items.length >= Math.pow(2, level) - 1) level += 1;

      if (currNode.left) {
        if (level % 2 !== 0 && level !== 0) {
          currNode.left.value = memo[0];
          memo.shift();
        }
        queue.enqueue(currNode.left);
      }
      if (currNode.right) {
        if (level % 2 !== 0 && level !== 0) {
          currNode.right.value = memo[0];
          memo.shift();
        }
        queue.enqueue(currNode.right);
      }
    }
    return memo;
  };

// Time: O(n)
// Space: O(1)
function reverse(arr, start = 0, end = 1, level = 1) {
  if (end <= arr.length) {
    let currStart = start;
    let currEnd = end;
    while (currStart <= currEnd) {
      const temp = arr[currStart];
      arr[currStart] = arr[currEnd];
      arr[currEnd] = temp;
      currStart += 1;
      currEnd -= 1;
    }
    level += 2;
    start = end + 1;
    end = end + Math.pow(2, level);
    reverse(arr, start, end, level);
  }
  return arr;
}

// Time: O(n)
// Space: O(sum Math.pow(2,level%2!==0)
function reverseAlternateLevels(tree) {
  const arr = tree.verticalOrderTraversalUtil(); // O(n)
  reverse(arr); // O(n)
  tree.reverseUtil(tree.root, arr); // O(n)
  return tree.root;
}


// test 1 - https://www.geeksforgeeks.org/check-binary-tree-subtree-another-binary-tree-set-2/
const tree = new BinaryTree();
tree.root = new Node('a');
tree.root.left = new Node('b');
tree.root.left.left = new Node('d');
tree.root.left.right = new Node('e');
tree.root.left.left.left = new Node('h');
tree.root.left.left.right = new Node('i');
tree.root.left.right.left = new Node('j');
tree.root.left.right.right = new Node('k');

tree.root.right = new Node('c');
tree.root.right.left = new Node('f');
tree.root.right.right = new Node('g');
tree.root.right.left.left = new Node('l');
tree.root.right.left.right = new Node('m');
tree.root.right.right.left = new Node('n');
tree.root.right.right.right = new Node('o');

console.log(reverseAlternateLevels(tree));

// // test 2 - // // test 1 - https://www.geeksforgeeks.org/check-binary-tree-subtree-another-binary-tree-set-2/
// const tree1 = new BinaryTree();
// tree1.root = new Node('x');
// tree1.root.left = new Node('a');
// tree1.root.left.left = new Node('c');
// tree1.root.right = new Node('b');

// const tree2 = new BinaryTree();
// tree2.root = new Node('x');
// tree2.root.left = new Node('a');
// tree2.root.left.left = new Node('c');
// tree2.root.right = new Node('b');
// tree2.root.right.right = new Node('d');

// console.log(tree1.root);
// console.log(tree2.root);
// console.log(isSubtree(tree1, tree2));
