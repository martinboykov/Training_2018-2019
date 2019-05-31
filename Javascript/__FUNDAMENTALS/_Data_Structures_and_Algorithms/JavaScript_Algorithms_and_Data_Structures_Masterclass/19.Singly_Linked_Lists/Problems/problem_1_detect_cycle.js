//  Detect if threre is a cycle in the linked list
// Cycle in linked list - the list loops back to itself (not nessaccery to the beggining (head))

// o-o-o-o-o
//     |   |
//     o-o-o

// 1. Solution - if changing the List is possible - loop over the list and reasign each node value as marked
// 2. Solution - make two loops at different speed, if path node coinside at some point => cyrclular dependency

const { SinglyLinkedList } = require('../singly_linked_list');

function hasCycle(sll) {
  let slowLooper = sll.head;
  let fastLooper = sll.head.next;
  while (fastLooper && fastLooper.next) {
    console.log(fastLooper);
    if (fastLooper === slowLooper) return true;
    slowLooper = slowLooper.next;
    fastLooper = fastLooper.next.next;
  }
  return false;
}


const singlyLinkedList = new SinglyLinkedList();
singlyLinkedList.push(1);
singlyLinkedList.push(2);
singlyLinkedList.push(3);
singlyLinkedList.push(4);
singlyLinkedList.push(5);
singlyLinkedList.push(6);
singlyLinkedList.get(5).next = singlyLinkedList.get(3);
console.log(hasCycle(singlyLinkedList));
