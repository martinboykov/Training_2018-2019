// Follows LIFO princple - last in, first out

// Ways to be implemented:
// 1. Using Build in Array in our own class
// 2. Using Singly linked list (shift/unshift as push/pop, as pop in SLL is not done in constant time <= need to iterate from first to last)
// 3. Using Doubly Linked List (using shift/unshift or pop/push as pop push)

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
class Stack {
  constructor() {
    this.first = null;
    this.last = null;
    this.length = 0;
  }
  push(value) { // unshift
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
  pop() { // shift
    // return top most element in the stack
    // and removes it from the stack
    if (!this.first) return null;
    const element = this.first.value;
    if (this.last === this.first) {
      this.last = null;
      this.first = null;
      this.length -= 1;
      return element;
    }
    const afterfirstNode = this.first.next;
    this.first = afterfirstNode;
    this.length -= 1;
    return element;
  }
  peek() {
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

const stack = new Stack();
console.log(stack.isEmpty());
stack.push(1);
stack.push(2);
stack.push(3);
stack.push(4);
console.log(stack.isEmpty());
stack.pop();
// stack.pop();
stack.pop();
console.log(stack.peek());
// stack.pop();
// console.log(stack.isEmpty());
console.log(stack.printStack());
