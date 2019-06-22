// PART OF Top 10 algorithms in Interview Questions: https://www.geeksforgeeks.org/top-10-algorithms-in-interview-questions/
// Reverse a Linked List in groups of given size | Set 1
// SLL - https://www.geeksforgeeks.org/reverse-a-list-in-groups-of-given-size/

const { Node, SinglyLinkedList } = require('../singly_linked_list');

function reverseList(head, k) {
  let prev = null;
  let curr = head;
  let next = null;
  let count = 1;
  while (curr && count <= k) {
    next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
    count += 1;
  }
  console.log(head);
  if (next) head.next = reverseList(next, k); // if there are more groups
  return prev; // if no more groups return the current rebersed (prev === pointer to curr.next)
}

const sll1 = new SinglyLinkedList();
sll1.push(1);
sll1.push(2);
sll1.push(3);
sll1.push(4);
sll1.push(5);
sll1.push(6);
sll1.push(7);
sll1.push(8);

// test case 1
// const k = 3;
// const result = reverseList(sll1.head, k);
// sll1.head = result;
// console.log(sll1.printList()); // 3->2->1->6->5->4->8->7->NULL.

// test case 2
const k = 5;
const result = reverseList(sll1.head, k);
sll1.head = result;
console.log(sll1.printList()); // 3->2->1->6->5->4->8->7->NULL.

