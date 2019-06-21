// PART OF Top 10 algorithms in Interview Questions: https://www.geeksforgeeks.org/top-10-algorithms-in-interview-questions/
// SLL - https://www.geeksforgeeks.org/given-a-linked-list-which-is-sorted-how-will-you-insert-in-sorted-way/
// DLL - https://www.hackerrank.com/challenges/insert-a-node-into-a-sorted-doubly-linked-list/problem
const { Node, SinglyLinkedList } = require('../singly_linked_list');

const sll = new SinglyLinkedList();
sll.push(2);
sll.push(5);
sll.push(7);
sll.push(10);
sll.push(15);
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
console.log(insertSorted(sll, 9));
console.log(sll.get(2));


// from hackerrank
// class DoublyLinkedListNode {
//   constructor(nodeData) {
//     this.data = nodeData;
//     this.next = null;
//     this.prev = null;
//   }
// };

// class DoublyLinkedList {
//   constructor() {
//     this.head = null;
//     this.tail = null;
//   }

//   insertNode(nodeData) {
//     let node = new DoublyLinkedListNode(nodeData);

//     if (this.head === null) {
//       this.head = node;
//     } else {
//       this.tail.next = node;
//       node.prev = this.tail;
//     }

//     this.tail = node;
//   }
// };

// // Complete the sortedInsert function below.

// /*
//  * For your reference:
//  *
//  * DoublyLinkedListNode {
//  *     int data;
//  *     DoublyLinkedListNode next;
//  *     DoublyLinkedListNode prev;
//  * }
//  *
//  */
// function sortedInsert(head, data) {
//   let newNode = new DoublyLinkedListNode(data);
//   if (!data && data !== 0) return head;
//   if (head === null) {
//     head = newNode;
//   } else if (head.data > data) {
//     let tempNext = head;
//     head = newNode;
//     head.next = tempNext;
//     tempNext.prev = head;
//   } else if (head.data <= data && head.next !== null) {
//     let node = head;
//     let isInserted = false;
//     while (node.next !== null) {
//       if (node.data <= data && node.next.data > data) {
//         let tempNext = node.next;
//         node.next = newNode;
//         newNode.prev = node;
//         newNode.next = tempNext;
//         tempNext.prev = newNode;
//         isInserted = true;
//       }
//       if (node.next !== null) {
//         node = node.next;
//       }
//     }
//     if (!isInserted && node.next === null) {
//       node.next = newNode;
//       newNode.prev = node;
//     }
//   }
//   return head;
// }

// // function main() {
// //     const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

// //     const t = parseInt(readLine(), 10);

// //     for (let tItr = 0; tItr < t; tItr++) {
// //         const llistCount = parseInt(readLine(), 10);

// //         let llist = new DoublyLinkedList();

// //         for (let i = 0; i < llistCount; i++) {
// //             const llistItem = parseInt(readLine(), 10);
// //             llist.insertNode(llistItem);
// //         }

// //         const data = parseInt(readLine(), 10);

// //         let llist1 = sortedInsert(llist.head, data);

// //         printDoublyLinkedList(llist1, " ", ws)
// //         ws.write("\n");
// //     }

// //     ws.end();
// // }

