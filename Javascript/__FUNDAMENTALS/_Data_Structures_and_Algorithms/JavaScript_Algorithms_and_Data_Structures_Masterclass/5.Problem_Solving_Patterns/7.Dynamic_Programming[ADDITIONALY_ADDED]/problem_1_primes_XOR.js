// https://www.hackerrank.com/challenges/prime-xor/problem
// !!! NOT FINISHED!!!!
function sieveOfEratosthenes(maxNumber) {
  const isPrime = new Array(maxNumber + 1).fill(true);
  isPrime[0] = false;
  isPrime[1] = false;

  const primes = [];
  primes.push(0);
  primes.push(0);
  for (let number = 2; number <= maxNumber; number += 1) {
    if (isPrime[number] === true) {
      // primes.push(number);
      primes.push(1);
      /*
       * Optimisation.
       * Start marking multiples of `p` from `p * p`, and not from `2 * p`.
       * The reason why this works is because, at that point, smaller multiples
       * of `p` will have already been marked `false`.
       *
       * Warning: When working with really big numbers, the following line may cause overflow
       * In that case, it can be changed to:
       * let nextNumber = 2 * number;
       */
      let nextNumber = number * number;

      while (nextNumber <= maxNumber) {
        isPrime[nextNumber] = false;
        nextNumber += number;
      }
    } else {
      primes.push(0);
    }
  }

  return primes;
}
// const eratosthenes = function(m) {
//   // Eratosthenes algorithm to find all primes under n
//   const array = [], upperLimit = Math.sqrt(m), output = {};

//   // Make an array from 2 to (n - 1)
//   for (let i = 0; i <= m; i++) {
//     array.push(1);
//   }
//   array[0] = 0;
//   array[1] = 0;
//   // Remove multiples of primes starting from 2, 3, 5,...
//   for (let i = 2; i <= upperLimit; i++) {
//     if (array[i]) {
//       for (let j = i * i; j < m; j += i) {
//         array[j] = 0;
//       }
//     }
//   }
//   // All array[i] set to true are primes
//   for (let i = 2; i <= m; i++) {
//     if (array[i]) {
//       array[i] = 1;
//     }
//   }
//   return array;
// };


// Complete the primeXor function below.
function primeXor(arr, n = arr.length, memo = {}) {
  // Maximum possible XOR value: m = pow(2,(log2(max(arr))+1))­ – 1
  const m = parseInt((Math.pow(2, (+'4500').toString(2).length) - 1), 10); // 8191
  // get all primes in range [0-8191]
  const primes = sieveOfEratosthenes(m);
  const dp = new Array(n).fill(0).map((item) => (new Array(n).fill(0)));
  // const dp = Array.from(Array(n), () => new Array(n));
  // for (let i = 0; i < n; i++) {
  //   for (let j = 0; j < n; j++) {
  //     dp[i][j] = 0;
  //   }
  // }
  for (let i = 0; i < n; i++) {
    if (!memo[arr[i]]) {
      memo[arr[i]] = true;
      dp[i][0] += primes[arr[i]];
      console.log(arr[i], primes[arr[i]]);
    }
    for (let j = i + 1; j <= n - 1; j++) {
      const arrayAcc = [arr[i], arr[j]];
      let k = i - 1;
      let acc = arr[i] ^ arr[j];
      if (!memo[arrayAcc]) {
        memo[arrayAcc] = true;
        dp[i][j] += primes[acc];
        console.log(arrayAcc, primes[acc]);
      }
      while (arr[k]) {
        arrayAcc.push(arr[k]);
        acc ^= arr[k];

        if (!memo[arrayAcc]) {
          memo[arrayAcc] = true;
          dp[i][j] += primes[acc];
          console.log(arrayAcc, primes[acc]);
        }
        k -= 1;
      }
    }
  }
  console.log(JSON.stringify(dp));

  let res = 0;
  for (let i = 0; i < n; i++) {
    res += dp[i][0];
    for (let j = i + 1; j < n; j++) {
      res += dp[i][j];
    }
  }

  console.log(memo);
  console.log(res);
  return res;
}


const arr = [3511, 3519];
const arr1 = [3511, 3511, 3511, 3511]; // 2
const arr2 = [3504, 3518, 3503, 3501, 3511]; // 10 (0,0,0,1)
const arr3 = [3520, 3508, 3503, 3515, 3511, 3513]; // 11
// primeXor(arr, arr.length);
// primeXor(arr1, arr1.length);
primeXor(arr2, arr2.length);
// primeXor(arr3, arr3.length);

// function primeXor(arr, n = arr.length) {
//   // Maximum possible XOR value: m = pow(2,(log2(max(arr))+1))­ – 1
//   const m = parseInt((Math.pow(2, (+'4500').toString(2).length) - 1), 10); // 8191
//   // get all primes in range [0-8191]
//   const primes = eratosthenes(m);

//   // The value of dp[i][j] is the number of subsets having
//   // XOR of their elements as j from the set arr[0...i-1]

//   // initialize dp[n + 1][m + 1] and fill with 0
//   // const dp = new Array(n + 1).fill(0).map((item) => (new Array(m + 1).fill(0)));
//   const dp = Array.from(Array(n + 1), () => new Array(m + 1));
//   for (let i = 0; i <= n; i++) {
//     for (let j = 0; j <= m; j++) {
//       dp[i][j] = 0;
//     }
//   }
//   // The xor of empty subset is 0
//   dp[0][0] = 1;

//   // Fill the dp table
//   // j -> 1-8191
//   for (let i = 1; i <= n; i++) {
//     for (let j = 0; j <= m; j++) {
//       dp[i][j] = primes[[dp[i - 1][j]]] + primes[[dp[i - 1][j ^ arr[i - 1]]]];
//       console.log(dp[i - 1][j], dp[i - 1][j ^ arr[i - 1]]);
//     }
//   }
//   //  The answer is the number of subset from set
//   //  arr[0..n-1] having XOR of elements as k
//   console.log(dp[n][m] % (1e9 + 7));
//   return dp[n][m] % (1e9 + 7);
// }
