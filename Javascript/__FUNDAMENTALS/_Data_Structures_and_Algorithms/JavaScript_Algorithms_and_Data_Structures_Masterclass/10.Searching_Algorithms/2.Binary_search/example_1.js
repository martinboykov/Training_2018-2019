// Follows Divide and Conquer pattern

// Only works on sorted arrays!!

// Time Complexity
// worst O(logn) | best O(1)

const countries = [
  'Albania',
  'Argentina',
  'Armenia',
  'Belgium',
  'Botswana',
  'Brazil',
  'Bulgaria',
  'Chile',
  'China',
  'Colombia',
  'Democratic Republic of the Congo',
  'France',
  'Germany',
  'Greece',
  'Guatemala',
  'Honduras',
  'Indonesia',
  'Israel',
  'Japan',
  'Kenya',
  'Latvia',
  'Madagascar',
  'Malaysia',
  'Mexico',
  'Mongolia',
  'Nigeria',
  'Palestinian Territory',
  'Peru',
  'Philippines',
  'Poland',
  'Portugal',
  'Russia',
  'South Korea',
  'Sweden',
  'Syria',
  'Tajikistan',
  'Thailand',
  'Ukraine',
  'United States',
  'Venezuela',
  'Wallis and Futuna',
];

// recursive 1
// ---------------
// function binarySearch(arr, val) {
//   let bool = false;
//   let counter = 1;
//   function helper(arrTemp) {
//     counter += 1;
//     if (arrTemp.length === 0) return;
//     if (arrTemp.length === 1 && arrTemp !== val) return;
//     const half = Math.floor((arrTemp.length) / 2);
//     if (arrTemp[half] === val) {
//       bool = true;
//       return;
//     }
//     let tempArr;
//     if (arrTemp[half] > val) {
//       tempArr = arrTemp.slice(1, half);
//     } else {
//       tempArr = arrTemp.slice(half, arrTemp.length);
//     }
//     helper(tempArr, val);
//   }
//   helper(arr);
//   if (bool) return counter;
//   return bool;
// }

// recursive 2
// ---------------
// function binarySearch(arr, val) {
//   let index;
//   let start = 0;
//   let end = arr.length - 1;
//   function helper() {
//     let middleIndex = Math.floor((start + end) / 2);
//     const middleEl = arr[middleIndex];
//     if (middleEl === val) {
//       index = middleIndex;
//       return middleIndex;
//     }
//     if (middleEl < val) start = ++middleIndex;
//     if (middleEl > val) end = --middleIndex;
//     if (start > end) {
//       return false;
//     }
//     return helper();
//   }
//   helper();
//   if (index) return index;
//   return -1;
// }

// iterative
// ---------------
function binarySearch(arr, val) {
  let start = 0;
  let end = arr.length - 1;

  while (start <= end) {
    let middleIndex = Math.floor((start + end) / 2);
    const middleEl = arr[middleIndex];

    if (middleEl === val) return middleIndex;
    if (middleEl < val) start = ++middleIndex;
    if (middleEl > val) end = --middleIndex;
  }

  return -1;
}

console.log(binarySearch(countries, 'Latvia'));
