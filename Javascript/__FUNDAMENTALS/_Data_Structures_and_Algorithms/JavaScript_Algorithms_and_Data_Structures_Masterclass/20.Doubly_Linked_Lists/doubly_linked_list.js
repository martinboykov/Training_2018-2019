// BIG O
// Insertion - O(1)
// Removal - O(1) always (different from singly linked list <= no traversal from one side)
// Searching - O(n)
// Access - O(n)

// more memory (one more link)

class Node {
  constructor(value) {
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  printList() {
    let head = this.head;
    let str = '{ ';
    while (head) {
      if (head.next) {
        str += `${head.value}, `;
      } else {
        str += `${head.value} `;
      }
      head = head.next;
    }
    str += '}';
    return str;
  }
  // prepend
  unshift(value) { // sets new node as new head
    if (!value) return null;
    const newNode = new Node(value);
    const oldHead = this.head;
    this.head = newNode;
    if (!this.tail) { // if list was empty
      this.tail = newNode;
      this.length += 1;
      return this;
    }
    this.head.next = oldHead;
    oldHead.prev = this.head;
    this.length += 1;
    return this;
  }

  // append
  push(value) { // adds new tail
    if (!value) return null;
    const newNode = new Node(value);
    this.length += 1;
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      return this;
    }
    this.tail.next = newNode;
    newNode.prev = this.tail;
    this.tail = newNode;
    return this;
  }

  // remove tail
  pop() { // removes current tail
    const removedNode = this.tail;
    if (!this.tail) return null;
    if (this.tail === this.head) {
      this.tail = null;
      this.head = null;
      this.length -= 1;
      removedNode.prev = null; // to remove the ref
      return removedNode;
    }
    this.tail = this.tail.prev;
    this.tail.next = null;
    this.length -= 1;
    removedNode.prev = null; // to remove the ref
    return removedNode;
  }

  // remove head
  shift() { // removes the current head and set head.next node as new head
    if (!this.head) return null;
    if (this.tail === this.head) {
      this.tail = null;
      this.head = null;
      this.length -= 1;
      return this;
    }
    const oldHead = this.head;
    this.head = this.head.next;
    this.head.prev = null; // removing the old refs
    oldHead.next = null; // removing the old refs
    this.length -= 1;
    return this;
  }

  get(position) {
    if (!position) return null;
    let node;
    let currentPosition;
    if (!this.head) return null;
    if (this.length < position || position < 0) return null;
    if (position <= this.length - position) {
      node = this.tail;
      currentPosition = this.length - 1;
      while (currentPosition > position) {
        node = node.prev;
        currentPosition -= 1;
      }
    } else {
      node = this.head;
      currentPosition = 0;
      while (currentPosition < position) {
        node = node.next;
        currentPosition += 1;
      }
    }
    return node;
  }
  set(position, value) {
    if (!position || !value) return false;
    const node = this.get(position, value);
    if (!node) return false;
    node.value = value;
    return true;
  }
  insert(position, value) {
    if (!position || !value) return false;
    if (position < 0 || position > this.length) return false;
    if (position === 0) return !!this.unshift(value);
    if (position === this.length) return !!this.push(value);
    const nextNode = this.get(position);
    const prevNode = nextNode.prev;
    const newNode = new Node(value);
    prevNode.next = newNode;
    nextNode.prev = newNode;
    newNode.prev = prevNode;
    newNode.next = nextNode;
    this.length += 1;
    return true;
  }
  remove(position) {
    if (!position && position !== 0) return false;
    if (this.length <= position || position < 0) return false;
    if (position === 0) return !!this.shift();
    if (position === this.length - 1) return !!this.pop();
    const node = this.get(position);
    const prevNode = node.prev;
    const nextNode = node.next;
    node.next = null;
    node.prev = null;
    prevNode.next = nextNode;
    nextNode.prev = prevNode;
    this.length -= 1;
    return true;
  }
  // reverse() { // TODO
  //   let currNode = this.head;
  //   let prevNode = null;
  //   let nextNode = null;
  //   while (currNode) {
  //     // Store next node.
  //     nextNode = currNode.next;
  //     prevNode = currNode.previous;
  //     // Change next node of the current node so it would link to previous node.
  //     // future tail.next = null (in first iteration)
  //     currNode.next = prevNode;
  //     currNode.previous = nextNode;
  //     // Move prevNode and currNode nodes one step forward.
  //     prevNode = currNode; // head (in first iteration)
  //     currNode = nextNode; // head.next (in first iteration)
  //   }
  //   // Reset head and tail.
  //   this.tail = this.head;
  //   this.head = prevNode;
  //   return true;
  // }
}

// const newLinkedList = new DoublyLinkedList();
// newLinkedList.push(1);
// newLinkedList.push(13);
// newLinkedList.push(26);
// newLinkedList.push(28);
// newLinkedList.push(35);
// newLinkedList.push(55);
// newLinkedList.pop();
// newLinkedList.shift();
// newLinkedList.unshift(111);
// newLinkedList.unshift(122);
// console.log(newLinkedList.get(7));
// console.log(newLinkedList.set(7, 11));
// console.log(newLinkedList.insert(0, 12));
// console.log(newLinkedList.remove(0));
// console.log(newLinkedList.reverse());
// console.log(newLinkedList.printList());
