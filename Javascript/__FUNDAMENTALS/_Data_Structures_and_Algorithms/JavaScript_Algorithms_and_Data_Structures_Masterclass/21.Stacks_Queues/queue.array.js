// Follows FIFO princple - (First in First Out)

// Ways to be implemented:
// 1. Using Build in Array in our own class (unshift/pop or push/shift both cases are !expensive)
// 2. Using Singly linked list (shift/pop)
// 3. Using Doubly Linked List (using shift/unshift or pop/push as pop push)

// BIG O
// depending of what array method we implement unshift/pop or push/shift
// Insertion - O(1) or O(n) => always better to use Singly/Doubly linked lists
// Removal - O(n) or O(1) => always better to use Singly/Doubly linked lists
// Searching - O(n)
// Access - O(n)

// 1. Using build in array
class Queue {
  constructor() {
    this.items = [];
  }
  enqueue(element) {
    // push element into the items
    this.items.unshift(element);
  }
  dequeue() {
    // removes an element from the queue
    if (this.items.length === 0) return null;
    return this.items.pop();
  }
  front() {
    // return the top most element from the stack
    // but does'nt delete it.
    if (this.items.length === 0) return null;
    return this.items[this.items.length - 1];
  }
  isEmpty() {
    // return true if stack is empty
    return this.items.length === 0;
    // or return !!this.items.length; // returns false only if === 0
  }
  printStack() {
    let str = '{ ';
    const length = this.items.length;
    for (let i = 0; i < length; i++) {
      if (i === length - 1) {
        str += this.items[i];
      } else {
        str += this.items[i] + ', ';
      }
    }
    str += ' }';
    return str;
  }
}

module.exports = { Queue };

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
