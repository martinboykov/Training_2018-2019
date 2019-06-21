// PART OF Top 10 algorithms in Interview Questions: https://www.geeksforgeeks.org/top-10-algorithms-in-interview-questions/
// Compare two strings represented as linked lists
// SLL - https://www.geeksforgeeks.org/compare-two-strings-represented-as-linked-lists/
// https://www.hackerrank.com/challenges/compare-two-linked-lists/problem

const { Node, SinglyLinkedList } = require('../singly_linked_list');

function compareLists(llist1, llist2) {
  while (true) {
    if (llist1 && llist2) {
      // geeksforgeeks
      let char1 = llist1.value.toString().charCodeAt(0);
      let char2 = llist2.value.toString().charCodeAt(0);
      if (char1 > char2) return 1;
      if (char1 < char2) return -1;

      // hackerrank
      // let char1 = llist1.value;
      // let char2 = llist2.value;
      // if (char1 > char2) return 0;
      // if (char1 < char2) return 0;
    } else {
      // geeksforgeeks
      if (llist1 === null && llist2 === null) return 0;
      else if (llist1 === null) return -1;
      else if (llist2 === null) return 1;

      // hackerrank
      // if (llist1 === null && llist2 === null) return 1;
      // else if (llist1 === null) return 0;
      // else if (llist2 === null) return 0;
    }
    llist1 = llist1.next;
    llist2 = llist2.next;
  }
}

// test case 1
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
// sll2.push('б');
// console.log(compareLists(sll1.head, sll2.head));

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
// console.log(compareLists(sll1.head, sll2.head));

// test case 3
const sll1 = new SinglyLinkedList();
sll1.push('g');
sll1.push('e');
sll1.push('e');
sll1.push('k');
sll1.push('s');
const sll2 = new SinglyLinkedList();
sll2.push('g');
sll2.push('e');
sll2.push('e');
sll2.push('k');
sll2.push('s');
console.log(compareLists(sll1.head, sll2.head));
