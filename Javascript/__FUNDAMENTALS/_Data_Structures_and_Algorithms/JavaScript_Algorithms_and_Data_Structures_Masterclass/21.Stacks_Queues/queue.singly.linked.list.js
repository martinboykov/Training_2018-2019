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

// 2. Using Singly Linked List
class Node {
  constructor(value) {
    this.value = value;
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
    const newNode = new Node(value);
    const firstBefore = this.first;
    this.first = newNode;
    if (!this.last) { // if list was empty
      this.last = newNode;
      this.length += 1;
    }
    this.first.next = firstBefore;
    this.length += 1;
  }
  dequeue() {
    // return bottom most element in the queue
    // and removes it from the queue
    const removedNode = this.last;
    let preLastNode = null;
    let first = this.first;
    if (!this.last) return null;
    if (this.last === this.first) {
      this.last = null;
      this.first = null;
      this.length -= 1;
      return removedNode.value;
    }
    while (first.next !== null) {
      preLastNode = first;
      first = first.next;
    }
    preLastNode.next = null;
    this.last = preLastNode;
    this.length -= 1;
    return removedNode.value;
  }
  front() {
    // return the top most element from the stack
    // but does'nt delete it.
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
    let str = '{ '; // ' }';
    while (first) {
      if (first.next) {
        str += `${first.value}, `; //  ' ,'
      } else {
        str += `${first.value} `;
      }
      first = first.next;
    }
    str += '}'; // '{'
    return str;
    // return str.split('').reverse().join(''); // expensive if we want to read them left to right
  }
}

const stack = new Queue();
console.log(stack.isEmpty());
stack.enqueue(1);
stack.enqueue(2);
stack.enqueue(3);
stack.enqueue(4);
console.log(stack.isEmpty());
stack.dequeue();
stack.dequeue();
// stack.dequeue();
// console.log(stack.front());
// stack.dequeue();
// console.log(stack.isEmpty());
console.log(stack.printStack());
