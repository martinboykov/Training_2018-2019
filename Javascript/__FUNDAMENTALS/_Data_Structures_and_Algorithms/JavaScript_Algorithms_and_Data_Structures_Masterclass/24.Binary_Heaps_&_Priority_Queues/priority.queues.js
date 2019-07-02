// --------------
// PRIORITY QUEUE
// --------------

// Same as binary heap, but with Nodes(value,priority) instead of only values
// Elements(Nodes) with higher priorities are served before elements with lower priorities.

// Can be implemented with array (not effective O(n)), heap, ...

// Time Complexity
// ---------------
// Insertion -   O(log N)
// Removal -   O(log N)
// Search -   O(N) // not realy made for searching (no rules for siblings positioniing (left/right <-> small/big))

// Nodes with same priority can be further refined by using date of creation
class Node {
  constructor(value, priority) {
    this.value = value;
    this.priority = priority;
    // this.dateCreated = new Date();
  }
}

class PriorityQueue { // similar to MinBinaryHeap, but with Nodes(value,priority) instead of only values
  constructor() {
    this.values = [];
  }
  hasValue(value) {
    return this.values.some((v) => v.value === value);
  }
  isEmpty() {
    return !this.values.length;
  }
  enqeue(val, prior) { // push
    const newNode = new Node(val, prior);
    this.values.push(newNode);
    let childIndex = this.values.length - 1;
    let parentIndex = Math.floor((childIndex - 1) / 2);
    let parent = this.values[parentIndex];

    // bubble up (from bottom element to root)
    while (parent && parent.priority > newNode.priority) {
      // swap parent and children(element)
      this.values[parentIndex] = newNode;
      this.values[childIndex] = parent;

      // set parents' and childrens'(elements') indexes
      childIndex = parentIndex;
      parentIndex = Math.floor((childIndex - 1) / 2);
      // set parent value
      parent = this.values[parentIndex];
    }
    // return this.values;
    return this.values.map((node) => node.priority);
  }
  deqeue() { // === extractMin removes the root
    if (this.values.length === 0) return null;
    const root = this.values[0];
    this.values[0] = this.values[this.values.length - 1];
    this.values.pop();
    let parentIndex = 0;
    let parent = this.values[parentIndex];
    let childLeftIndex = parentIndex * 2 + 1;
    let childRightIndex = parentIndex * 2 + 2;
    let childLeft = this.values[childLeftIndex] || null;
    let childRight = this.values[childRightIndex] || null;
    let childSmallerIndex;
    let childSmaller;
    getChildSmaller(); // get the child index and node

    // bubble down (from root to bottom elements)
    // swapping position only with the smallest child
    while (childSmaller && parent.priority > childSmaller.priority) {
      // swap parent and the Smaller children
      this.values[parentIndex] = childSmaller;
      this.values[childSmallerIndex] = parent;

      // set parent index and value
      parentIndex = childSmallerIndex;
      parent = this.values[parentIndex];

      // set childrens' indexes and values
      childLeftIndex = parentIndex * 2 + 1;
      childRightIndex = parentIndex * 2 + 2;
      childLeft = this.values[childLeftIndex] || null;
      childRight = this.values[childRightIndex] || null;

      // set childSmaller index and value
      getChildSmaller();
    }
    // return this.values
    // return this.values.map((node) => node.priority);
    return root; // for djekstra algorithm

    function getChildSmaller() {
      if (childLeft && childRight) {
        childSmallerIndex = childLeft.priority < childRight.priority
          ? childLeftIndex : childRightIndex;
        childSmaller = childLeft.priority < childRight.priority
          ? childLeft : childRight;
      } else if (childLeft) {
        childSmallerIndex = childLeftIndex;
        childSmaller = childLeft;
      } else if (childRight) {
        childSmallerIndex = childRightIndex;
        childSmaller = childRight;
      } else {
        childSmallerIndex = null;
        childSmaller = null;
      }
    }
  }
}


// const newPriorQueue = new PriorityQueue();
// console.log(newPriorQueue.values);
// console.log(newPriorQueue.enqeue(`# ${Math.floor(Math.random() * 1000)}`, 41));
// console.log(newPriorQueue.enqeue(`# ${Math.floor(Math.random() * 1000)}`, 39));
// console.log(newPriorQueue.enqeue(`# ${Math.floor(Math.random() * 1000)}`, 27));
// console.log(newPriorQueue.enqeue(`# ${Math.floor(Math.random() * 1000)}`, 12));
// console.log(newPriorQueue.enqeue(`# ${Math.floor(Math.random() * 1000)}`, 18));
// console.log(newPriorQueue.enqeue(`# ${Math.floor(Math.random() * 1000)}`, 33));
// console.log(newPriorQueue.enqeue(`# ${Math.floor(Math.random() * 1000)}`, 33));
// console.log(newPriorQueue.enqeue(`# ${Math.floor(Math.random() * 1000)}`, 33));
// console.log(newPriorQueue.enqeue(`# ${Math.floor(Math.random() * 1000)}`, 33));
// console.log(newPriorQueue.enqeue(`# ${Math.floor(Math.random() * 1000)}`, 55));
// console.log(newPriorQueue.enqeue(`# ${Math.floor(Math.random() * 1000)}`, 39));

// console.log(newPriorQueue.deqeue());
// console.log(newPriorQueue.deqeue());
// console.log(newPriorQueue.deqeue());
// console.log(newPriorQueue.deqeue());
// console.log(newPriorQueue.deqeue());
// console.log(newPriorQueue.deqeue());
// console.log(newPriorQueue.deqeue());
// console.log(newPriorQueue.deqeue());
// console.log(newPriorQueue.deqeue());
// console.log(newPriorQueue.deqeue());
// console.log(newPriorQueue.deqeue());

module.exports = {
  PriorityQueue,
};
