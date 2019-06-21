// PART OF Top 10 algorithms in Interview Questions: https://www.geeksforgeeks.org/top-10-algorithms-in-interview-questions/
// Delete a given node in Linked List under given constraints
// SLL - https://www.geeksforgeeks.org/delete-a-given-node-in-linked-list-under-given-constraints/
// https://www.hackerrank.com/challenges/delete-a-node-from-a-linked-list/problem

// Complete the deleteNode function below.

/*
 * For your reference:
 *
 * SinglyLinkedListNode {
 *     int data;
 *     SinglyLinkedListNode next;
 * }
 *
 */
function deleteNode(head, position) {
  if (head === null) {
    head = null;
  } else if (head.next === null && position === 0) {
    head = null;
  } else if (head.next !== null) {
    if (position === 0) return head.next;
    let currentPosition = 0;
    let node = head;
    let previousNode = null;
    while (node) {
      if (currentPosition === position) {
        if (node.next) {
          previousNode.next = node.next;
        } else {
          previousNode.next = null;
        }
        break;
      }
      currentPosition += 1;
      previousNode = node;
      node = node.next;
    }
  }
  return head;
}

class SinglyLinkedListNode {
  constructor(nodeData) {
    this.data = nodeData;
    this.next = null;
  }
}
class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  insertNode(nodeData) {
    const node = new SinglyLinkedListNode(nodeData);

    if (this.head === null) {
      this.head = node;
    } else {
      this.tail.next = node;
    }

    this.tail = node;
  }
}

// function main() {
//     const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

//     const llistCount = parseInt(readLine(), 10);

//     let llist = new SinglyLinkedList();

//     for (let i = 0; i < llistCount; i++) {
//         const llistItem = parseInt(readLine(), 10);
//         llist.insertNode(llistItem);
//     }

//     const position = parseInt(readLine(), 10);

//     let llist1 = deleteNode(llist.head, position);

//     printSinglyLinkedList(llist1, " ", ws)
//     ws.write("\n");

//     ws.end();
// }

