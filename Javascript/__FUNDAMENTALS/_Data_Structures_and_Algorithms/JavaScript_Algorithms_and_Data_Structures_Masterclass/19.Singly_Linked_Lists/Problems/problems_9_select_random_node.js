// PART OF Top 10 algorithms in Interview Questions: https://www.geeksforgeeks.org/top-10-algorithms-in-interview-questions/
// Select a Random Node from a Singly Linked List
// SLL - https://www.geeksforgeeks.org/select-a-random-node-from-a-singly-linked-list/

const { Node, SinglyLinkedList } = require('../singly_linked_list');

function getRandomNode(l1) {
  let size = 0;
  let node = l1;
  while (node) {
    size += 1;
    node = node.next;
  }
  const random = getRandom(size);
  console.log(random);
  function getRandom(n) {
    return Math.floor(Math.random() * Math.floor(n));
  }
  node = l1;
  let position = 0;
  while (position < random) {
    node = node.next;
    position += 1;
  }
  return node;
}
const sll1 = new SinglyLinkedList();
sll1.push(10);
sll1.push(15);
sll1.push(4);
sll1.push(20);

// test case 1
const result = getRandomNode(sll1.head);
console.log(result);
// console.log(sll1.printList());


