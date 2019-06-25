// PART OF Top 10 algorithms in Interview Questions: https://www.geeksforgeeks.org/top-10-algorithms-in-interview-questions/
// Merge Sort for Linked Lists
// SLL - https://www.geeksforgeeks.org/merge-sort-for-linked-list/

const { Node, SinglyLinkedList } = require('../singly_linked_list');

function mergeSort(l1, start = null, end = null) {
  // if (!l1) return null; // check if there is a list

  let node = l1;

  // bottom of recursion (returning one single node)
  if (start && end && start === end) {
    // get the corresponding node
    const nodeIndex = start; // or end (start===end)
    let currIndex = 1;
    while (currIndex < nodeIndex && node.next) {
      node = node.next;
      currIndex += 1;
    }
    node = new Node(node.value);
    return node;
  }

  // 1. get size
  let size = 0;
  // in the very beginning
  if (start && end) {
    size = end - start + 1;

    // on next iterations
  } else {
    if (node) size += 1;
    node = node.next;
    while (node) {
      node = node.next;
      size += 1;
    }
    start = 1;
    end = size;
  }

  // 2. get mid
  let mid = Math.floor((size) / 2);
  if ((size) % 2 !== 0) mid += 1;

  // 3. split - recursivley (only getting the relevant start/end till reach start===end => single nodes)
  const left = mergeSort(l1, start, start + mid - 1);
  const right = mergeSort(l1, start + mid, end);
  return merge(left, right);

  function merge(L, R) {
    // creatig new List
    const list = new SinglyLinkedList();
    while (L && R) {
      if (L.value <= R.value) {
        list.push(L.value);
        L = L.next;
      } else if (L.value > R.value) {
        list.push(R.value);
        R = R.next;
      }
    }
    while (L) {
      list.push(L.value);
      L = L.next;
    }
    while (R) {
      list.push(R.value);
      R = R.next;
    }
    return list.head;
  }
}

const sll1 = new SinglyLinkedList();
sll1.push(2);
sll1.push(10);
sll1.push(15);
sll1.push(4);
sll1.push(20);
sll1.push(1);

// test case 1
console.log(sll1.printList());
console.log(sll1);
let result = mergeSort(sll1.head);
sll1.head = result;
let last = null;
while (result) {
  last = result;
  result = result.next;
}
sll1.tail = last;
console.log(sll1.printList());
console.log(sll1);
