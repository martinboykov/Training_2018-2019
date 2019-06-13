// The Coin Change Problem - https://www.youtube.com/watch?v=sn0DWI-JdNA&list=PLI1t_8YX-ApvMthLj56t1Rf-Buio5Y8KL&index=10
// https://www.hackerrank.com/challenges/coin-change/problem
// let result = 0;

// recursion with memoization ("Top Down" Dynamic programming)
function getWays(change, coins, index = 0, memo = {}) {
  if (change === 0) return 1;
  if (index >= coins.length) return 0;
  let combos = 0;
  let amountWithCoin = 0;
  let key = `${change} - ${index}`;
  if (memo[key]) {
    return memo[key];
  }
  while (amountWithCoin <= change) {
    const remaining = change - amountWithCoin;
    combos += getWays(remaining, coins, index + 1, memo);
    amountWithCoin += coins[index];
  }
  memo[key] = combos;
  return combos;
}

console.log(getWays(3, [1, 2, 3]));
// console.log(getWays(10, [2, 5, 3, 6, 11]));
// console.log(getWays(5, [1, 2, 3, 4, 5]));

