// PART OF Top 10 algorithms in Interview Questions: https://www.geeksforgeeks.org/top-10-algorithms-in-interview-questions/
// https://www.hackerrank.com/challenges/detect-whether-a-linked-list-contains-a-cycle/problem
// SLL - https://www.geeksforgeeks.org/reverse-a-list-in-groups-of-given-size/

const { Node, SinglyLinkedList } = require('../singly_linked_list');

function detectCycle(head, k) {
  if (!head) return 0;
  let ifCycle = false;
  let curr = head;
  while (curr) {
    console.log(curr);
    if (!curr.value) return 1;
    curr.value = false;
    curr = curr.next;
  }
  return 0;
}

const sll1 = new SinglyLinkedList();
sll1.push(1);
sll1.push(2);
sll1.push(3);
sll1.push(4);
sll1.push(5);
sll1.push(6);
sll1.push(7);
// sll1.get(5).next = sll1.get(3);
console.log(detectCycle(sll1.head));

