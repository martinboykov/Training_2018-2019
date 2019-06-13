// Find sets of numbers that satisfie a condition - https://www.youtube.com/watch?v=nqlNzOcnCfs&list=PLBZBJbE_rGRU5PrgZ9NBHJwcaZsNpf8yD&index=4

// recursion with memoization ("Top Down" Dynamic programming)

function getSets(total, arr, index = 0, memo = {}) {
  if (memo[[index, total]]) return memo[[index, total]];
  if (index > arr.length) return 0;
  if (total === 0) return 1;
  if (total < 0) return 0;
  let sets = 0;
  // two options for first index:
  // 1. is not counted
  let newTotal = total;
  sets += getSets(newTotal, arr, index + 1, memo);
  // 2. is counted
  newTotal -= arr[index];
  sets += getSets(newTotal, arr, index + 1, memo);
  // memoization
  memo[[index, total]] = sets;
  return sets;
}

// console.log(getSets(3, [3, 1, 2])); // 2
// console.log(getSets(10, [2, 5, 3, 6, 11])); // 1
// console.log(getSets(5, [1, 2, 3, 4, 5])); // 3
console.log(getSets(9, [1, 2, 3, 4, 5, 6, 7, 8, 9])); // 3

// dummy main tests
// console.log(getSets(1230, [697, 953, 900, 438, 899, 593, 591, 963, 31, 160, 894, 493, 782, 445, 326, 452, 988, 657, 7, 544, 768, 398, 791, 650, 818, 12, 347, 928, 828, 336, 692, 339, 130, 837, 548, 487, 989, 333, 875, 711, 957, 341, 821, 319, 338, 328, 234, 7, 670, 328, 451, 200, 685, 699, 855, 668, 609, 322, 752, 386, 81, 635, 952, 618, 133, 73, 548, 163, 221, 105, 773, 398, 639, 579, 660, 746, 718, 918, 224, 984, 265, 242, 506, 762, 734, 98, 324, 100, 896, 346, 344, 27, 420, 353, 532, 105, 914, 130, 695]));
// console.log(getSets(1230, [438, 591, 768, 160, 777, 894, 782, 398, 445, 306, 326, 282, 452, 607, 241, 513, 185, 7, 544, 12, 347, 828, 336, 83, 924, 143, 692, 339, 130, 515, 837, 466, 989, 875, 711, 957, 338, 266, 305, 480, 328, 28, 7, 670, 328, 699, 849, 668, 609, 979, 100, 322, 283, 386, 655, 263, 826, 169, 635, 952, 618, 73, 238, 897, 221, 863, 34, 372, 732, 398, 579, 666, 545, 660, 794, 746, 526, 718, 918, 403, 615, 946, 224, 822, 242, 506, 734, 324, 100, 55, 346, 704, 24, 650, 678, 532, 914, 130, 423, 998]));
