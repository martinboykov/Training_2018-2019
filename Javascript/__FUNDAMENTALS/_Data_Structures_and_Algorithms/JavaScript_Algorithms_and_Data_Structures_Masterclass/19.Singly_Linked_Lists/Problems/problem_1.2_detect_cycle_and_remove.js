// PART OF Top 10 algorithms in Interview Questions: https://www.geeksforgeeks.org/top-10-algorithms-in-interview-questions/
// Detect and Remove Loop in a Linked List
// SLL - https://www.geeksforgeeks.org/detect-and-remove-loop-in-a-linked-list/

//  Detect if threre is a cycle in the linked list
// Cycle in linked list - the list loops back to itself (not nessaccery to the beggining (head))

// o-o-o-o-o
//     |   |
//     o-o-o

// 1. Solution - if changing the List is possible - loop over the list and reasign each node value as marked
// 2. Solution - make two loops at different speed, if path node coinside at some point => cyrclular dependency

const { SinglyLinkedList } = require('../singly_linked_list');


// Solution 1: with renaiming
// function detectCycle(head, k) {
//   if (!head) return 0;
//   let ifCycle = false;
//   let curr = head;
//   while (curr) {
//     console.log(curr);
//     if (!curr.value) return 1;
//     curr.value = false;
//     curr = curr.next;
//   }
//   return 0;
// }

// Solution 2: without renaiming
function hasCycle(sll) {
  let slowLooper = sll.head;
  let fastLooper = sll.head.next;
  while (fastLooper && fastLooper.next) {
    // console.log(fastLooper);
    if (fastLooper === slowLooper) {
      slowLooper.next = null;
      fastLooper.next = null;
      return sll;
    }
    slowLooper = slowLooper.next;
    fastLooper = fastLooper.next.next;
  }
  return false;
}

const singlyLinkedList = new SinglyLinkedList();
singlyLinkedList.push(1);
singlyLinkedList.push(2);
singlyLinkedList.push(3);
singlyLinkedList.push(4);
singlyLinkedList.push(5);
singlyLinkedList.push(6);
singlyLinkedList.get(5).next = singlyLinkedList.get(3);
// const node = singlyLinkedList.head;
// while (node) {
//   console.log(node);
//   node = node.next;
// }

console.log(singlyLinkedList);
console.log(hasCycle(singlyLinkedList));

// const node = singlyLinkedList.head;
// while (node) {
//   console.log(node);
//   node = node.next;
// }
