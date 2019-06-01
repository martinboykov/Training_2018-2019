// Continuous Median of array
// median = middle of sorted array
// if total elements is odd -> median = middle = arr.length/2
// if total elements is even -> median = (Math.floor(middle) + (Math.floor(middle)+1))/2

// 1. Solution (mine) - build min or max binary heap and than sort it
// Time -> build O(n) + sort/extracting O(nlogn) ->  O(nlogn);
// Space -> O(n) (one heap)

// 2. Solution (mine) - sort the array (quicksort/mergesort)
// Time -> sort/extracting | average O(nlogn) | worst O(n^2) ->   average O(nlogn) | worst O(n^2);
// Space -> O(1) (no additional data structures)


// 3. Solution - build one min heap on higher half of array and
// one max heap on higher half of the numbers in array->
// than get their roots if even lengths or the root of the heap with higher length
// Time -> building/inserting O(n); extracting O(nlogn)  ->  O(nlogn);
// Space -> O(n) (two heaps)

const { MinBinaryHeap, MaxBinaryHeap } = require('../binary.heaps');

// 1. Solution (mine) - build min or max binary heap and than sort it
// ------------------------------------------------------------------
// function getMedian(arr) {
//   if (!Array.isArray(arr) || arr.length === 0) return null;
//   const heap = new MinBinaryHeap();
//   const arrLength = arr.length;
//   fillHeap();
//   return findMedian();
//   function fillHeap() {
//     for (let index = 0; index < arrLength; index++) {
//       heap.insert(arr[index]);
//       console.log(heap);
//     }
//   }
//   function findMedian() {
//     let result;
//     let extractions = Math.floor(arrLength / 2) + 1; // extractions to reach median(s)
//     let mid;
//     let mid2;
//     if (extractions === 1) return heap.getMin();
//     while (extractions > 0) {
//       if (extractions === 2) mid = heap.getMin();
//       if (extractions === 1) mid2 = heap.getMin();
//       heap.extractMin();
//       extractions -= 1;
//     }
//     if (arrLength % 2 === 0) { // if even
//       result = (mid + mid2) / 2;
//     } else { // if odd
//       result = mid;
//     }
//     return result;
//   }
// }

// 2. Solution (mine) - sort the array (quicksort/mergesort)
const quickSort = require('../../16.Quick_Sort/quick_sort_mine');
// function getMedian(arr) {
//   const result = [];
//   const arrLength = arr.length;

//   const sortedArr = quickSort(arr);
//   let iteration = 1;
//   for (let index = 0; index < iteration; index++) {
//     const mid1 = Math.floor((iteration - 1) / 2);
//     const mid2 = Math.floor((iteration - 1) / 2) + 1;
//     if (iteration % 2 === 0) { // if even
//       result.push((sortedArr[mid1] + sortedArr[mid2]) / 2);
//     } else { // if odd
//       result.push(sortedArr[mid1]);
//     }
//     iteration += 1;
//     if (iteration === arrLength) break;
//   }

//   return result;
// }

// 3. Solution - two heaps (minHeap and maxHeap)
// ---------------------------------------------
function getMedian(arr) {
  const arrLength = arr.length;
  const minHeap = new MinBinaryHeap(); // all bigger values
  const maxHeap = new MaxBinaryHeap(); // all smaller values

  const medians = [];
  for (let index = 0; index < arrLength; index += 1) {
    addToHeap(arr[index]);
    balanceHeaps();
    const currentMedian = getCurrentMedian();
    medians.push((currentMedian));
  }

  return medians;
  function addToHeap(element) {
    const minHeapLength = minHeap.values.length;
    const maxHeapLength = maxHeap.values.length;
    if (minHeapLength <= maxHeapLength) {
      minHeap.insert(element);
    } else {
      maxHeap.insert(element);
    }
  }
  function balanceHeaps() {
    let min = minHeap.getMin();
    let max = maxHeap.getMax();
    while (min < max) {
      maxHeap.extractMax();
      minHeap.extractMin();
      minHeap.insert(max);
      maxHeap.insert(min);
      min = minHeap.getMin();
      max = maxHeap.getMax();
    }
    // console.log(minHeap, maxHeap);
  }
  function getCurrentMedian() {
    const minHeapLength = minHeap.values.length;
    const maxHeapLength = maxHeap.values.length;
    const min = minHeap.getMin();
    const max = maxHeap.getMax();
    // console.log(minHeapLength, maxHeapLength);
    if (minHeapLength > maxHeapLength) return min;
    else if (minHeapLength < maxHeapLength) return max;
    return (min + max) / 2;
  }
}
const arr = Array.from(Array(1000).keys()).map((el) => Math.floor(Math.random() * 10000 ** 2));
console.log(arr);
console.log(getMedian(arr));
