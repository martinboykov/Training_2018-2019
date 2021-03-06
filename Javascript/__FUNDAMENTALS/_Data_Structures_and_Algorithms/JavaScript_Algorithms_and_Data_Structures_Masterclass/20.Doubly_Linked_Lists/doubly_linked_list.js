// BIG O
// Insertion - O(1)
// Removal - O(1) from beggining "shift()"; O(1) from end "pop()"; O(n) random "remove(position)"
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
    const length = this.length;
    let node;
    let currentPosition;
    if (!this.head) return null;
    if (length <= position || position < 0) return null;
    if (position >= length - position) {
      node = this.tail;
      currentPosition = length - 1;
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
    const node = this.get(position);
    if (!node) return false;
    node.value = value;
    return true;
  }
  insert(position, value) {
    if (position === null || !value) return false;
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

  reverse() {
    let prev = null;
    let curr = this.head;
    let next = null;
    while (curr) {
      // Set Pointers
      next = curr.next; // before reverse
      prev = curr.prev; // after reverse

      curr.next = prev; // before reverse
      curr.prev = next; // after reverse

      // Set Nodes
      prev = curr;
      curr = next;
    }
    // Reset head and tail
    this.tail = this.head;
    this.head = prev;
    // this.head.prev = prev.prev;
    return this;
  }
}

module.exports = {
  Node,
  DoublyLinkedList,
};


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
// newLinkedList.unshift(222);
// // console.log(newLinkedList.get(0));
// console.log(newLinkedList.set(7, 11));
// console.log(newLinkedList.insert(0, 12));
// console.log(newLinkedList.remove(0));
// console.log(newLinkedList.printList());
// newLinkedList.reverse();
// console.log(newLinkedList.get(6));
// console.log(newLinkedList.printList());
