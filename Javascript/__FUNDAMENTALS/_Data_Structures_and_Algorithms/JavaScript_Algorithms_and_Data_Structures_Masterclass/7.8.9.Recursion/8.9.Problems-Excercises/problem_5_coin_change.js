// The Coin Change Problem - https://www.youtube.com/watch?v=sn0DWI-JdNA&list=PLI1t_8YX-ApvMthLj56t1Rf-Buio5Y8KL&index=10
// https://www.hackerrank.com/challenges/coin-change/problem
// let result = 0;

let memoCounter = 0;
let memoSize = 0;
// recursion with memoization ("Top Down" Dynamic programming)
function getWays(change, coins, index = 0, memo = {}) {
  if (change === 0) return 1;
  if (index >= coins.length) return 0;
  // coins = coins.sort(compare);
  let combos = 0;
  let amountWithCoin = 0;
  let key = `${change} - ${index}`;
  if (memo[key]) {
    memoCounter++;

    return memo[key];
  }
  while (amountWithCoin <= change) {
    const remaining = change - amountWithCoin;
    combos += getWays(remaining, coins, index + 1, memo);
    amountWithCoin += coins[index];
  }
  memo[key] = combos;
  memoSize += 1;
  return combos;
}
function compare(x, y) {
  return y - x;
}
// console.log(getWays(4, [1, 2, 3]));
// console.log(getWays(10, [2, 5, 3, 6, 11]));
memoCounter = 0;
memoSize = 0;
console.log(getWays(5, [1, 2, 3, 4, 5]));
console.log(memoSize);
console.log(memoCounter);
console.log('............');
console.log(getWays(5, [5, 4, 3, 2, 1]));
console.log(memoSize);
console.log(memoCounter);

