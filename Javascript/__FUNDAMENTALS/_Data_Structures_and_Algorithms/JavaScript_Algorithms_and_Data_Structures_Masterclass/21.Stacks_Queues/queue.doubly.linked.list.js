// Follows FIFO princple - (First in First Out)

// Ways to be implemented:
// 1. Using Build in Array in our own class
// 2. Using Singly linked list (unshift/pop as push/pop)
// 3. Using Doubly Linked List (using unshift/pop or push/shift as pop/push)

// BIG O
// Insertion - O(1)
// Removal - O(1)
// Searching - O(n)
// Access - O(n)

// 2. Using Doubly Linked List
class Node {
  constructor(value) {
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}
class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.length = 0;
  }
  enqueue(value) {
    // push element into the items
    if (!value) return null;
    const newNode = new Node(value);
    this.length += 1;
    if (!this.first) {
      this.first = newNode;
      this.last = newNode;
      return this;
    }
    this.last.next = newNode;
    newNode.prev = this.last;
    this.last = newNode;
    return this;
  }
  dequeue() {
    // return bottom most element in the queue
    // and removes it from the queue
    if (!this.first) return null;
    if (this.last === this.first) {
      this.last = null;
      this.first = null;
      this.length -= 1;
      return this;
    }
    const oldfirst = this.first;
    this.first = this.first.next;
    this.first.prev = null; // removing the old refs
    oldfirst.next = null; // removing the old refs
    this.length -= 1;
    return this;
  }
  front() {
    // return the first element in the queue, but doesn't delete it.
    if (!this.first) return null;
    const element = this.first.value;
    return element;
  }
  isEmpty() {
    // return true if stack is empty
    return this.length === 0;
    // or return !!this.items.length; // returns false only if === 0
  }
  printStack() {
    let first = this.first;
    let str = '{ ';
    while (first) {
      if (first.next) {
        str += `${first.value}, `;
      } else {
        str += `${first.value} `;
      }
      first = first.next;
    }
    str += '}';
    return str;
    // return str.split('').reverse().join(''); // expensive if we want to read them left to right
  }
}

// const stack = new Queue();
// console.log(stack.isEmpty());
// stack.enqueue(1);
// stack.enqueue(2);
// stack.enqueue(3);
// stack.enqueue(4);
// console.log(stack.isEmpty());
// stack.dequeue();
// stack.dequeue();
// stack.dequeue();
// console.log(stack.front());
// stack.dequeue();
// console.log(stack.isEmpty());
// console.log(stack.printStack());

module.exports = {
  Node,
  Queue,
};
