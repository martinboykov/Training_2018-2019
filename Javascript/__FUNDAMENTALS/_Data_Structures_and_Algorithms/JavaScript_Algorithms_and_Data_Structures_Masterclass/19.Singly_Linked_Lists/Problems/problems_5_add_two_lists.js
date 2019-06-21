// PART OF Top 10 algorithms in Interview Questions: https://www.geeksforgeeks.org/top-10-algorithms-in-interview-questions/
// Add two numbers represented by linked lists | Set 2
// SLL - https://www.geeksforgeeks.org/sum-of-two-linked-lists/

const { Node, SinglyLinkedList } = require('../singly_linked_list');

function addTwoLists(node1, node2) {
  node1 = reverse(node1);
  node2 = reverse(node2);
  const node3 = new SinglyLinkedList();
  let add = 0;
  while (true) {
    if (node1 && node2) {
      const sum = node1.value + node2.value + add;
      if (sum >= 10) {
        add = 1;
      } else {
        add = 0;
      }
      node3.push(sum % 10);
    } else {
      if (node1 === null && node2 === null) {
        if (add > 0) node3.push(1);
        break;
      }
      // else if (node1 === null) .....; // if node2 is longer
      // else if (node2 === null) return 1; // if node1 is longer
    }
    node1 = node1.next;
    node2 = node2.next;
  }
  const tail = node3.head;
  node3.head = reverse(node3.head);
  node3.tail = tail;
  return node3.printList();
  function reverse(node) {
    let head = node;
    let prev = null;
    let curr = node;
    let next = null;
    while (curr) {
      next = curr.next;
      curr.next = prev;
      head = curr;
      prev = curr;
      curr = next;
    }
    // head = prev;
    return head;
  }
}

// test case 1
const sll1 = new SinglyLinkedList();
sll1.push(9);
sll1.push(9);
sll1.push(9);
const sll2 = new SinglyLinkedList();
sll2.push(1);
sll2.push(0);
sll2.push(1);
console.log(addTwoLists(sll1.head, sll2.head)); // 1405


// test case 2
// const sll1 = new SinglyLinkedList();
// sll1.push('g');
// sll1.push('e');
// sll1.push('e');
// sll1.push('k');
// sll1.push('s');
// sll1.push('a');
// const sll2 = new SinglyLinkedList();
// sll2.push('g');
// sll2.push('e');
// sll2.push('e');
// sll2.push('k');
// sll2.push('s');
// console.log(addTwoLists(sll1.head, sll2.head));

// test case 3
// const sll1 = new SinglyLinkedList();
// sll1.push('g');
// sll1.push('e');
// sll1.push('e');
// sll1.push('k');
// sll1.push('s');
// const sll2 = new SinglyLinkedList();
// sll2.push('g');
// sll2.push('e');
// sll2.push('e');
// sll2.push('k');
// sll2.push('s');
// console.log(addTwoLists(sll1.head, sll2.head));
