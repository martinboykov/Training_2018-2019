// -----------
// BINARY HEAP
// -----------
// type of binary tree

// Rules:
// ------------------
//   - Each parent has at most TWO CHILD NODES.
//   - LEFT children are filled out FIRST.
//   - NO OTHER GUARANTEES (left/right is not smaller/bigger) BETWEEN SIBLING NODES.
//   - A binary heap is as compact as possible ==> TAKES THE LEAST AMOUNT OF SPACE
//     (All the children of each node are as full as they can be)

// Use Cases:
// ------------------
//   - Binary Heaps are used to implement Priority Queues, which are very commonly used data structures
//   - They are also used quite a bit, with graph traversal algorithms. (Dijkstra’s Shortest Path and Prim’s Minimum Spanning Tree)
//   - Heap Sort algorithm uses Binary Heap to sort an array in O(nLogn) time.

// Types:
// ------------------
// 1. Max Binary Heap - parent nodes are always LARGER than child nodes
// 2. Min Binary Heap - parent nodes are always SMALLER than child nodes

// 1. Max Binary Heap
// ------------------
// Sub-Rules:
//   - The value of each PARENT NODE IS ALWAYS GREATER THAN ITS CHILD NODES.

// 1.1. Using Array
class MaxBinaryHeap {
  constructor() {
    this.values = [];
  }
  insert(element) {
    this.values.push(element);
    let childIndex = this.values.length - 1;
    let parentIndex = Math.floor((childIndex - 1) / 2);
    let parent = this.values[parentIndex];

    // bubble up (from bottom element to root)
    while (parent < element) {
      // swap parent and children(element)
      this.values[parentIndex] = element;
      this.values[childIndex] = parent;

      // set parents' and childrens'(elements') indexes
      childIndex = parentIndex;
      parentIndex = Math.floor((childIndex - 1) / 2);

      // set parent value
      parent = this.values[parentIndex];
    }
    return this.values;
  }
  getMax() {
    return this.values[0];
  }
  extractMax() { // removes the root
    this.values[0] = this.values[this.values.length - 1];
    this.values.pop();
    let parentIndex = 0;
    let parent = this.values[parentIndex];
    let childLeftIndex = parentIndex * 2 + 1;
    let childRightIndex = parentIndex * 2 + 2;
    let childLeft = this.values[childLeftIndex] || null;
    let childRight = this.values[childRightIndex] || null;
    let childBiggerIndex =
      childLeft > childRight ? childLeftIndex : childRightIndex;
    let childBigger = childLeft > childRight ? childLeft : childRight;
    // bubble down (from root to bottom elements)
    while (parent < childBigger) {
      // swap parent and the Smaller children
      this.values[parentIndex] = childBigger;
      this.values[childBiggerIndex] = parent;

      // set parent index and value
      parentIndex = childBiggerIndex;
      parent = this.values[parentIndex];

      // set childrens' indexes and values
      childLeftIndex = parentIndex * 2 + 1;
      childRightIndex = parentIndex * 2 + 2;
      childLeft = this.values[childLeftIndex];
      childRight = this.values[childRightIndex];

      // set child Smaller index and value
      childBiggerIndex =
        childLeft > childRight ? childLeftIndex : childRightIndex;
      childBigger = childLeft > childRight ? childLeft : childRight;
    }
    return this.values;
  }
  heapSort() {
    const result = [];
    let currentVal = this.getMax();
    while (currentVal) {
      result.push(currentVal);
      this.extractMax();
      console.log(this.values);
      currentVal = this.getMax();
    }
    return result;
  }
}
// const newMaxBinHeap = new MaxBinaryHeap();
// console.log(newMaxBinHeap.values);
// console.log(newMaxBinHeap.insert(41));
// console.log(newMaxBinHeap.insert(27));
// console.log(newMaxBinHeap.insert(12));
// console.log(newMaxBinHeap.insert(18));
// console.log(newMaxBinHeap.insert(39));
// console.log(newMaxBinHeap.insert(33));
// console.log(newMaxBinHeap.insert(55));
// console.log(newMaxBinHeap.extractMax());
// console.log(newMaxBinHeap.extractMax());
// console.log(newMaxBinHeap.extractMax());
// console.log(newMaxBinHeap.extractMax());
// console.log(newMaxBinHeap.extractMax());
// console.log(newMaxBinHeap.extractMax());
// console.log(newMaxBinHeap.extractMax());
// console.log(newMaxBinHeap.heapSort());

// 2. Min Binary Heap
// ------------------
// Sub-Rules:
//   - The value of each PARENT NODE IS ALWAYS SMALLER THAN ITS CHILD NODES.

class MinBinaryHeap {
  constructor() {
    this.values = [];
  }
  insert(element) {
    this.values.push(element);
    let childIndex = this.values.length - 1;
    let parentIndex = Math.floor((childIndex - 1) / 2);
    let parent = this.values[parentIndex];

    // bubble up (from bottom element to root)
    while (parent > element) {
      // swap parent and children(element)
      this.values[parentIndex] = element;
      this.values[childIndex] = parent;

      // set parents' and childrens'(elements') indexes
      childIndex = parentIndex;
      parentIndex = Math.floor((childIndex - 1) / 2);
      // set parent value
      parent = this.values[parentIndex];
    }
    return this.values;
  }
  getMin() {
    return this.values[0];
  }
  extractMin() { // removes the root
    this.values[0] = this.values[this.values.length - 1];
    this.values.pop();
    let parentIndex = 0;
    let parent = this.values[parentIndex];
    let childLeftIndex;
    let childRightIndex;
    let childLeft;
    let childRight;
    let childSmallerIndex;
    let childSmaller;

    getChildren(this.values);
    // bubble down (from root to bottom elements)
    // swapping position only with the smallest child
    while (childSmaller) {
      // swap parent and the Smaller children
      this.values[parentIndex] = childSmaller;
      this.values[childSmallerIndex] = parent;

      // set parent index and value
      parentIndex = childSmallerIndex;
      parent = this.values[parentIndex];

      // set childrens' indexes and values
      getChildren(this.values);
    }
    return this.values;

    function getChildren(values) {
      childLeftIndex = parentIndex * 2 + 1;
      childRightIndex = parentIndex * 2 + 2;
      childLeft = values[childLeftIndex] || null;
      childRight = values[childRightIndex] || null;
      getChildSmaller();
    }
    function getChildSmaller() {
      if (childLeft && childRight &&
        childLeft < parent && childRight < parent) {
        childSmallerIndex =
          childLeft < childRight ? childLeftIndex : childRightIndex;
        childSmaller =
          childLeft < childRight ? childLeft : childRight;
      } else if (childLeft && childLeft < parent) {
        childSmallerIndex = childLeftIndex;
        childSmaller = childLeft;
      } else if (childRight && childLeft < parent) {
        childSmallerIndex = childRightIndex;
        childSmaller = childRight;
      } else {
        childSmallerIndex = null;
        childSmaller = null;
      }
    }
  }
  heapSort() {
    const result = [];
    let currentVal = this.getMin();
    while (currentVal) {
      result.push(currentVal);
      this.extractMin();
      currentVal = this.getMin();
    }
    return result;
  }
}

// const newMinBinHeap = new MinBinaryHeap();
// console.log(newMinBinHeap.values);
// console.log(newMinBinHeap.insert(41));
// console.log(newMinBinHeap.insert(57));
// console.log(newMinBinHeap.insert(58));
// console.log(newMinBinHeap.insert(59));
// console.log(newMinBinHeap.insert(50));
// console.log(newMinBinHeap.insert(27));
// console.log(newMinBinHeap.insert(12));
// console.log(newMinBinHeap.insert(18));
// console.log(newMinBinHeap.insert(39));
// console.log(newMinBinHeap.insert(33));
// console.log(newMinBinHeap.insert(55));
// console.log(newMinBinHeap.insert(56));
// console.log(newMinBinHeap.values);
// console.log(newMinBinHeap.extractMin());
// console.log(newMinBinHeap.extractMin());
// console.log(newMinBinHeap.extractMin());
// console.log(newMinBinHeap.extractMin());
// console.log(newMinBinHeap.extractMin());
// console.log(newMinBinHeap.extractMin());
// console.log(newMinBinHeap.extractMin());
// console.log(newMinBinHeap.extractMin());
// console.log(newMinBinHeap.extractMin());
// console.log(newMinBinHeap.extractMin());
// console.log(newMinBinHeap.extractMin());
// console.log(newMinBinHeap.extractMin());
// console.log(newMinBinHeap.heapSort());


module.exports = { MinBinaryHeap, MaxBinaryHeap };
