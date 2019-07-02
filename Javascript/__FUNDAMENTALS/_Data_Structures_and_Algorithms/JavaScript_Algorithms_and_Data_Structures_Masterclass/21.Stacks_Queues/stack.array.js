// Follows LIFO princple - last in, first out

// Ways to be implemented:
// 1. Using Build in Array in our own class
// 2. Using Singly linked list (shift/unshift as push/pop, as pop in SLL is not done in constant time <= need to iterate from head to tail)
// 3. Using Doubly Linked List (using shift/unshift or pop/push as pop push)

// BIG O
// Insertion - O(1)
// Removal - O(1)
// Searching - O(n)
// Access - O(n)

// 1. Using build in array
class Stack {
  constructor() {
    this.items = [];
  }
  push(element) {
    // push element into the items
    this.items.push(element);
  }
  pop() {
    // return top most element in the stack
    // and removes it from the stack
    if (this.items.length === 0) return null;
    return this.items.pop();
  }
  peek() {
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
module.exports = { Stack };

// const stack = new Stack();
// console.log(stack.isEmpty());
// stack.push(1);
// stack.push(2);
// stack.push(3);
// stack.push(4);
// console.log(stack.isEmpty());
// stack.pop();
// stack.pop();
// stack.pop();
// console.log(stack.peek());
// stack.pop();
// console.log(stack.isEmpty());
// console.log(stack.printStack());
