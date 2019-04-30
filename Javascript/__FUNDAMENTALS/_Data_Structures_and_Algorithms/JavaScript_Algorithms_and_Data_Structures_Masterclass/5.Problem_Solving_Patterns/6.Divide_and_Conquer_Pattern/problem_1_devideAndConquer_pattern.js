// Given a sorted array of integers, write a function called search,
// that accepts a value and returns the index where the value passed
// to the function is located. If the values is not found, return -1.

// binary search
// https://en.wikipedia.org/wiki/Binary_search_algorithm

function search(arr, val) {
    let min = 0;
    let max = arr.length - 1;
    let index = 0;
    while (min <= max) {
        index = Math.floor((min + max) / 2);
        if (arr[index] === val) {
            return index;
        } else if (arr[index] < val) {
            min = index + 1;
        } else {
            max = index - 1;
        }
    }
    return -1;
}

console.log(search([1, 2, 3, 4, 5, 6], 3));
console.log(search([1, 2, 3, 4, 5, 6], 4));
