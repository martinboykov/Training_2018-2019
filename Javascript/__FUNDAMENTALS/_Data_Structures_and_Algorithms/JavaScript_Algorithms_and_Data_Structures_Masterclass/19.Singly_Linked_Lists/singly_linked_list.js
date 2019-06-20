// BIG O
// Insertion - O(1)
// Removal - O(1) from beggining "shift" - O(n) from end "pop"
// Searching - O(n)
// Access - O(n)

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  // prepend
  unshift(value) { // sets new node as new head
    const newNode = new Node(value);
    const headBefore = this.head;
    this.head = newNode;
    if (!this.tail) { // if list was empty
      this.tail = newNode;
      this.length += 1;
      return this;
    }
    this.head.next = headBefore;
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
      // this.tail.next = newNode; ??
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    return this;
  }

  // remove tail
  pop() { // removes current tail and sets the previous node as tail
    const removedNode = this.tail;
    let preLastNode = null;
    let node = this.head;
    if (!this.tail) return null;
    if (this.tail === this.head) {
      this.tail = null;
      this.head = null;
      this.length -= 1;
      return removedNode;
    }
    while (node.next !== null) {
      preLastNode = node;
      node = node.next;
    }
    preLastNode.next = null;
    this.tail = preLastNode;
    this.length -= 1;
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
    const afterHeadNode = this.head.next;
    this.head = afterHeadNode;
    this.length -= 1;
    return this;
  }

  get(position) {
    let node = this.head;
    let currentPosition = 0;
    if (!this.head) return null;
    if (this.length <= position || position < 0) return null;
    while (currentPosition < position) {
      node = node.next;
      currentPosition += 1;
    }
    return node;
  }
  set(position, value) {
    let node = this.head;
    let currentPosition = 0;
    if (!this.head) {
      const newNode = new Node(value);
      this.head = newNode;
      this.tail = newNode;
      this.length += 1;
      return true;
    }
    if (this.length <= position || position < 0) return false;
    while (currentPosition < position) {
      node = node.next;
      currentPosition += 1;
    }
    node.value = value;
    return true;
  }
  insert(index, value) {
    if (this.length < index || index < 0) return false;
    if (index === 0) return !!this.unshift(value);
    if (index === this.length) return !!this.push(value);
    const newNode = new Node(value);
    const prevNode = this.get(index - 1);
    const tempNode = prevNode.next;
    prevNode.next = newNode;
    newNode.next = tempNode;
    this.length += 1;
    return true;
  }
  remove(index) {
    if (this.length <= index || index < 0) return false;
    if (index === 0) return !!this.shift();
    if (index === this.length - 1) return !!this.pop();
    const node = this.get(index);
    const prevNode = this.get(index - 1);
    const nextNode = node.next;
    prevNode.next = nextNode;
    this.length -= 1;
    return true;
  }

  reverse() {
    let prev = null;
    let curr = this.head;
    let next = null;
    while (curr) {
      // POINTERS
      // NEW - remember the pointer to next node (curr.next) before reversing
      next = curr.next;
      // OLD - set the new pointer for reversed node
      curr.next = prev;

      // NODES SWITCH - OLD
      prev = curr;
      curr = next; // from the remembered value at start
    }
    this.head = this.tail;
    this.tail = prev;

    return this;
  }

  printList() {
    let head = this.head;
    let str = '';
    while (head) {
      if (head.next) {
        str += `${head.value}, `;
      } else {
        str += `${head.value}`;
      }
      head = head.next;
    }
    return str;
  }
}

// const newNode = new Node(1);
// console.log(newNode);
// const newLinkedList = new SinglyLinkedList();

// newLinkedList.push(1);

// newLinkedList.push(13);
// newLinkedList.push(28);
// newLinkedList.push(35);
// newLinkedList.push(55);
// newLinkedList.unshift(111);
// newLinkedList.unshift(122);
// newLinkedList.unshift(333);

// console.log(newLinkedList.get(6));
// console.log(newLinkedList.set(0, 11));
// console.log(newLinkedList.printList());
// console.log(newLinkedList.insert(0, 12));
// console.log(newLinkedList.printList());
// console.log(newLinkedList.remove(7));
// console.log(newLinkedList.printList());
// newLinkedList.reverse();
// console.log(newLinkedList.printList());

module.exports = {
  Node,
  SinglyLinkedList,
};
