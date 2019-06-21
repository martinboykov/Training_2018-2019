// PART OF Top 10 algorithms in Interview Questions: https://www.geeksforgeeks.org/top-10-algorithms-in-interview-questions/
// sll - https://www.geeksforgeeks.org/given-a-linked-list-which-is-sorted-how-will-you-insert-in-sorted-way/
// DLL - https://www.hackerrank.com/challenges/insert-a-node-into-a-sorted-doubly-linked-list/problem
const { Node, DoublyLinkedList } = require('../doubly_linked_list');

const dll = new DoublyLinkedList();
dll.push(2);
dll.push(5);
dll.push(7);
dll.push(10);
dll.push(15);
function insertSorted(list, value) {
  // check if head is bigger
  if (list.head.value > value) {
    list.unshift(value);
    // check if head is the only node and is smaller
  } else if (list.head.value < value && list.length === 1) {
    list.push(value);
    // check if tail is smaller
  } else if (list.tail.value < value) {
    list.push(value);
  } else {
    // if inbetween nodes
    let node = list.head;
    let index = 1;
    while (node.next) {
      if (node.value < value && node.next.value > value) {
        list.insert(index, value);
        break;
      }
      index += 1;
      node = node.next;
    }
  }
  return list;
}
console.log(insertSorted(dll, 9));
console.log(dll.get(3));
