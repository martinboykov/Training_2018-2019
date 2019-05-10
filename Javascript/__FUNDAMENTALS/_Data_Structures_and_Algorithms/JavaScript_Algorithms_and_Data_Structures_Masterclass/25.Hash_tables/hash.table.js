// -------------
// HASH TABLES
// -------------

// DESCRIBTION
// -------------
// Hash tables are collections of key-value pairs
// Hash tables can find values quickly given a key
// Hash tables can add new key-values quickly
// Hash tables store data in a large array, and work by hashing the keys

// WHAT MAKES A GOOD HASH?
// -----------------------
//   - Fast (i.e. constant time)
//   - Doesn't cluster outputs at specific indices, but distributes uniformly
//     -> The prime number in the hash is helpful in spreading out the keys more uniformly.
//     -> It's also helpful if the array that you're putting values into has a prime length
//   - Deterministic (same input yields same output)

// COLLISIONS
// ----------
// 1.Separate Chaining - at each index in our array we store values using a more sophisticated data structure (e.g. an array or a linked list).
// 2.Linear Probing - With linear probing, when we find a collision, we search through the array to find the next empty slot.
//   Unlike with separate chaining, this allows us to store a single key-value at each index.

// TIME COMPLEXITY (BIG O)
// -----------------------
//           |   average  | worst (bad hash function with collision and distributing on one spot only)
// Insert:   |    O(1)    |    O(n)    |
// Deletion: |    O(1)    |    O(n)    |
// Access:   |    O(1)    |    O(n)    |
class HashTable {
  constructor(size = 53) {
    this.keyMap = new Array(size);
  }

  hash(key) { // hash function for english alfabet characters
    let total = 0;
    const PRIME_NUMBER = 31;
    for (let i = 0; i < Math.min(key.length, 100); i++) {
      const char = key[i];
      const value = char.charCodeAt(0) - 96;
      total = (total * PRIME_NUMBER + value) % this.keyMap.length;
    }
    return total;
  }
  set(key, value) {
    const index = this.hash(key);
    if (!this.keyMap[index]) {
      this.keyMap[index] = [];
    }
    this.keyMap[index].push([key, value]);
  }
  get(key) {
    const index = this.hash(key);
    if (this.keyMap[index]) {
      for (let i = 0; i < this.keyMap[index].length; i++) {
        if (this.keyMap[index][i][0] === key) {
          return this.keyMap[index][i][1];
        }
      }
    }
    return null;
  }
  keys() {
    const keysArr = [];
    for (let i = 0; i < this.keyMap.length; i++) {
      if (this.keyMap[i]) {
        for (let j = 0; j < this.keyMap[i].length; j++) {
          if (!keysArr.includes(this.keyMap[i][j][0])) {
            keysArr.push(this.keyMap[i][j][0]);
          }
        }
      }
    }
    return keysArr;
  }
  values() {
    const valuesArr = [];
    for (let i = 0; i < this.keyMap.length; i++) {
      if (this.keyMap[i]) {
        for (let j = 0; j < this.keyMap[i].length; j++) {
          if (!valuesArr.includes(this.keyMap[i][j][1])) {
            valuesArr.push(this.keyMap[i][j][1]);
          }
        }
      }
    }
    return valuesArr;
  }
}


const ht = new HashTable(17);
ht.set('maroon', '#800000');
ht.set('yellow', '#FFFF00');
ht.set('olive', '#808000');
ht.set('salmon', '#FA8072');
ht.set('lightcoral', '#F08080');
ht.set('mediumvioletred', '#C71585');
ht.set('plum', '#DDA0DD');
console.log(ht);
ht.keys().forEach(function(key) {
  console.log(ht.get(key));
});
console.log(ht.keys());
console.log(ht.values());
