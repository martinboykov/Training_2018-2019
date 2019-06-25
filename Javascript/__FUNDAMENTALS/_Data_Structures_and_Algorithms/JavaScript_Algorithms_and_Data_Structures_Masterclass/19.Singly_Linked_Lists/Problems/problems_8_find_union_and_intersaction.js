// PART OF Top 10 algorithms in Interview Questions: https://www.geeksforgeeks.org/top-10-algorithms-in-interview-questions/
// Union and Intersection of two Linked Lists
// SLL - https://www.geeksforgeeks.org/union-and-intersection-of-two-linked-lists/
// Input:
//    List1: 10->15->4->20
//    lsit2:  8->4->2->10
// Output:
//    Intersection List: 4->10
//    Union List: 2->8->20->4->15->10

const { Node, SinglyLinkedList } = require('../singly_linked_list');

function findUandI(l1, l2) {
  let node1 = l1;
  let node1Size = 0;
  while (node1) {
    node1 = node1.next;
    node1Size += 1;
  }
  let node2 = l2;
  let node2Size = 0;
  while (node2) {
    node2 = node2.next;
    node2Size += 1;
  }

  // O(m || n) space
  let biggerList; // O(n) space
  let smallerList; // O(m) space

  if (node1Size <= node2Size) {
    smallerList = l1;
    biggerList = l2;
  } else {
    smallerList = l2;
    biggerList = l1;
  }
  const table = {};
  while (smallerList) {
    table[smallerList.value] = 0;
    smallerList = smallerList.next;
  }
  const intersactionList = new SinglyLinkedList();
  const unionList = new SinglyLinkedList();
  while (biggerList) {
    if (table[biggerList.value] >= 0) {
      table[biggerList.value] += 1;
      intersactionList.push(biggerList.value);
    }
    unionList.push(biggerList.value);
    biggerList = biggerList.next;
  }
  for (const node in table) {
    if (table[node] === 0) {
      unionList.push(node);
    }
  }
  console.log(intersactionList.printList());
  console.log(unionList.printList());
  return 'done';
}
const sll1 = new SinglyLinkedList();
sll1.push(10);
sll1.push(15);
sll1.push(4);
sll1.push(20);

const sll2 = new SinglyLinkedList();
sll2.push(8);
sll2.push(4);
sll2.push(2);
sll2.push(10);
// test case 1
const result = findUandI(sll1.head, sll2.head);
console.log(result);
// console.log(sll1.printList());
// console.log(sll2.printList());


