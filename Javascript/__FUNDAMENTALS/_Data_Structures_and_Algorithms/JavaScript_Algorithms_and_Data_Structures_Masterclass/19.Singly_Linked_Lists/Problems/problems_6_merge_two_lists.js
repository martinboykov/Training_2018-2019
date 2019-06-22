// PART OF Top 10 algorithms in Interview Questions: https://www.geeksforgeeks.org/top-10-algorithms-in-interview-questions/
// Merge a linked list into another linked list at alternate positions
// SLL - https://www.geeksforgeeks.org/merge-a-linked-list-into-another-linked-list-at-alternate-positions/

const { Node, SinglyLinkedList } = require('../singly_linked_list');

// // Solution 1: naive (with additional space) O(n^2)
// function addTwoLists(l1, l2) {
//   const length = l1.length;
//   let iterations = 0;
//   let position1 = 0;
//   while (iterations < length && l2.head) { // O(n || m)
//     position1 += 1;
//     l1.insert(position1, l2.head.value); // O(n)
//     l2.remove(0);
//     iterations += 1;
//     position1 += 1;
//   }
//   if (!l2.head) {
//  /   let last1 = l1.get(position1);
//     while (last1) { // O(n-m)
//       l2.push(last1.value);
//       last1 = last1.next;
//       l1.remove(position1); // O(position1)
//     }
//   }
//   return true;
// }

// Solution 2: creating only new pointers Space O(1), Time O(n)
// function addTwoLists(l1, l2) {
//   let node1 = l1.head;
//   let node2 = l2.head;
//   let temp1;
//   let temp;
//   let lastValue2;
//   while (node1 && node2) {
//     temp1 = node1.next; // save the pointer
//     node1.next = new Node(node2.value); // new Node()
//     temp = node1.next;
//     if (node2.next) temp.next = temp1;
//     node1 = temp1; // get reference to next node
//     lastValue2 = node2.value;
//     node2 = node2.next;
//     l1.length += 1;
//     l2.length -= 1;
//   }
//   // if l1 is longer than l2
//   if (node1) {
//     node2 = new Node(node1.value); // new Node()
//     l1.length -= 1;
//     l2.length += 1;
//     while (node1.next) {
//       node2.next = new Node(node1.next.value); // new Node()
//       node1 = node1.next;
//       l1.length -= 1;
//       l2.length += 1;
//     }
//     l2.tail = new Node(node1.value);
//     // if l2 is longer than l1 =>
//   }
//   if (!node2) {
//     l2.tail = null;
//   }
//   l1.tail = new Node(lastValue2);
//   l2.head = node2;
//   return 'done';
// }

// Solution 3: from geeksforgeeks creating only new pointers Space O(1), Time O(n)
function addTwoLists(l1, l2) {
  let curr1 = l1.head;
  let curr2 = l2.head;
  while (curr1 && curr2) {
    // Save next pointers
    const next1 = curr1.next;
    const next2 = curr2.next;

    // make curr1 as next of curr2
    curr2.next = next1;
    curr1.next = curr2;

    // update current pointers for next iteration
    curr1 = next1;
    curr2 = next2;
  }
  l2.head = curr2;


  return 'done';
}

// test case 1
const sll1 = new SinglyLinkedList();
sll1.push(5);
sll1.push(7);
sll1.push(17);
sll1.push(13);
sll1.push(11);
sll1.push(111);
sll1.push(222);

const sll2 = new SinglyLinkedList();
sll2.push(12);
sll2.push(10);
sll2.push(2);
sll2.push(4);
sll2.push(6);
// sll2.push(333);
// sll2.push(444);

console.log(sll1.printList()); // 5->12->7->10->17->2->13->4->11->6
console.log(sll2.printList()); // null
console.log(addTwoLists(sll1, sll2));
console.log(sll1.printList()); // 5->12->7->10->17->2->13->4->11->6
console.log(sll2.printList()); // null


// // test case 2
// const sll1 = new SinglyLinkedList();
// sll1.push(1);
// sll1.push(2);
// sll1.push(3);

// const sll2 = new SinglyLinkedList();
// sll2.push(4);
// sll2.push(5);
// sll2.push(6);
// sll2.push(7);
// sll2.push(8);
// console.log(addTwoLists(sll1, sll2));
// console.log(sll1.printList()); // 1->4->2->5->3->6
// console.log(sll2.printList()); // 7->8
