// PART OF Top 10 algorithms in Interview Questions: https://www.geeksforgeeks.org/top-10-algorithms-in-interview-questions/
// Merge two sorted linked lists
// SLL - https://www.hackerrank.com/challenges/merge-two-sorted-linked-lists/problem

const { Node, SinglyLinkedList } = require('../singly_linked_list');

// taken from hackerrank editor
function mergeLists(head1, head2) {
  let node1 = head1;
  let node2 = head2;

  while (node1 && node2) {
    if (node1.value < node2.value) {
      if (node1.next) {
        if (node1.next.value > node2.value) {
          const temp0 = node1.next;
          node1.next = new Node(node2.value);
          const temp1 = node1.next;
          temp1.next = temp0;
          node1 = temp1.next;
          node2 = node2.next;
        } else {
          node1 = node1.next; // skip
        }
      } else {
        node1.next = new Node(node2.value);
        node1 = node1.next;
        node2 = node2.next;
        break;
      }
    } else if (node1.value > node2.value) {
      const temp0 = node1.next;
      const temp1Data = node1.value;
      node1.value = node2.value;
      node1.next = new Node(temp1Data);
      const temp1 = node1.next;
      node1 = temp1;
      node1.next = temp0;
      node2 = node2.next;
    } else if (node1.value === node2.value) {
      const temp0 = node1.next;
      node1.next = new Node(node2.value);
      const tempNew = node1.next;
      tempNew.next = temp0;
      if (temp0) {
        node1 = tempNew.next;
      } else {
        node1 = tempNew;
      }
      node2 = node2.next;
    }
  }
  while (node2) {
    node1.next = new Node(node2.value);
    node1 = node1.next;
    node2 = node2.next;
  }

  return head1;
}
const sll1 = new SinglyLinkedList();
sll1.push(1);
sll1.push(2);
sll1.push(3);


const sll2 = new SinglyLinkedList();
sll2.push(3);
sll2.push(4);

let result = mergeLists(sll1.head, sll2.head);
let str = '';
while (result) {
  str+=result.value + ' ';
  result = result.next;
}
console.log(str);
