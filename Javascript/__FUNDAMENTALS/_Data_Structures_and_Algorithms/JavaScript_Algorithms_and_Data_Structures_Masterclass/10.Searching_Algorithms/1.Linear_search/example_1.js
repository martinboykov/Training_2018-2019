/** Linear Search ***/

// Write a function called linearSearch which accepts an array
// and a value, and returns the index at which the value exists
// If the value does not exist in the array, return -1

function linearSearch(arr, val) {
  for (let index = 0; index < arr.length; index++) {
    const element = arr[index];
    if (element === val) return index;
  }
  return -1;
}

// All integrated searchin methods (indexOf, find ....) in javascript are using linear search

// Examples:

// console.log(linearSearch([10, 15, 20, 25, 30], 15)); // 1
// console.log(linearSearch([9, 8, 7, 6, 5, 4, 3, 2, 1, 0], 4)); // 5
// console.log(linearSearch([100], 100)); // 0
// console.log(linearSearch([1, 2, 3, 4, 5], 6)); // -1
// console.log(linearSearch([9, 8, 7, 6, 5, 4, 3, 2, 1, 0], 10)); // -1
// console.log(linearSearch([100], 200));// -1

const countries = [
  'Portugal',
  'Japan',
  'Israel',
  'Honduras',
  'Philippines',
  'China',
  'China',
  'Indonesia',
  'United States',
  'Latvia',
  'Sweden',
  'Russia',
  'Portugal',
  'China',
  'Colombia',
  'Madagascar',
  'Philippines',
  'China',
  'Philippines',
  'Venezuela',
  'Russia',
  'Bulgaria',
  'Russia',
  'Russia',
  'Indonesia',
  'Belgium',
  'Syria',
  'Russia',
  'France',
  'Wallis and Futuna',
  'China',
  'Russia',
  'China',
  'China',
  'Kenya',
  'Democratic Republic of the Congo',
  'Mexico',
  'China',
  'Malaysia',
  'Armenia',
  'Philippines',
  'China',
  'Democratic Republic of the Congo',
  'Guatemala',
  'South Korea',
  'Sweden',
  'Tajikistan',
  'Nigeria',
  'Portugal',
  'Ukraine',
  'Ukraine',
  'Brazil',
  'Chile',
  'Argentina',
  'Philippines',
  'China',
  'Botswana',
  'Sweden',
  'Peru',
  'United States',
  'United States',
  'Mongolia',
  'Brazil',
  'Botswana',
  'Philippines',
  'Albania',
  'Sweden',
  'Greece',
  'Portugal',
  'Brazil',
  'Poland',
  'Palestinian Territory',
  'Mexico',
  'Poland',
  'Indonesia',
  'Indonesia',
  'Mongolia',
  'Indonesia',
  'Germany',
  'China',
  'Brazil',
  'Indonesia',
  'Indonesia',
  'France',
  'Indonesia',
  'Sweden',
  'Mexico',
  'China',
  'Russia',
  'Ukraine',
  'China',
  'Greece',
  'Poland',
  'China',
  'Japan',
  'China',
  'China',
  'Sweden',
  'Argentina',
  'Thailand',
];

console.log(linearSearch(countries, 'Greece'));
