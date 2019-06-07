// Connected cells
// https://www.youtube.com/watch?v=R4Nh-EgWjyQ&list=PLI1t_8YX-ApvMthLj56t1Rf-Buio5Y8KL&index=5
// https://www.hackerrank.com/challenges/connected-cell-in-a-grid/problem

// Using DFS and memoization
// Time - O(n) going only where is 1 once
// Space - O(1)

function getCurrentMaxCount(matrix, i, j, result = { count: 0 }) {
  if (!matrix[i]) return 0;
  if (!matrix[i][j]) return 0;
  if (matrix[i][j] > 0) {
    matrix[i][j] = -1;
    result.count += 1;
    // console.log(matrix);
    // console.log(i, j);
    // console.log(result.count);
    for (let ii = -1; ii <= 1; ii++) {
      for (let jj = -1; jj <= 1; jj++) {
        getCurrentMaxCount(matrix, i + ii, j + jj, result);
      }
    }
    // getCurrentMaxCount(matrix, i - 1, j - 1, result); // top-left
    // getCurrentMaxCount(matrix, i - 1, j, result); // top-center
    // getCurrentMaxCount(matrix, i - 1, j, result); // top-right
    // getCurrentMaxCount(matrix, i, j - 1, result); // middle-left
    // getCurrentMaxCount(matrix, i, j + 1, result); // middle-right
    // getCurrentMaxCount(matrix, i + 1, j - 1, result); // bottom-left
    // getCurrentMaxCount(matrix, i + 1, j, result); // bottom-center
    // getCurrentMaxCount(matrix, i + 1, j + 1, result); // bottom-right
  }
  return result.count;
}


function solve(matrix) {
  let maxCount = 0;
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      const currentCount = getCurrentMaxCount(matrix, row, col); // top-left
      if (currentCount > maxCount) maxCount = currentCount;
    }
  }
  return maxCount;
}

const matrix1 = Array(5).fill(0).map(() => Array(5).fill(0));
matrix1[0][0] = 1;
matrix1[0][1] = 1;
matrix1[1][1] = 1;
matrix1[1][2] = 1;
matrix1[2][2] = 1;
matrix1[2][4] = 1;
matrix1[3][0] = 1;
matrix1[3][4] = 1;
matrix1[4][1] = 1;
matrix1[4][3] = 1;
matrix1[4][4] = 1;
// console.log(matrix1);
console.log(solve(matrix1));


const matrix2 = Array(4).fill(0).map(() => Array(4).fill(0));
matrix2[0][0] = 1;
matrix2[0][1] = 1;
matrix2[1][1] = 1;
matrix2[1][2] = 1;
matrix2[2][2] = 1;
matrix2[3][0] = 1;

// console.log(matrix2);
console.log(solve(matrix2));


const matrix3 = Array(6).fill(0).map(() => Array(7).fill(0));
matrix3[0][3] = 1;
matrix3[0][4] = 1;
matrix3[1][1] = 1;
matrix3[1][4] = 1;
matrix3[1][5] = 1;
matrix3[2][0] = 1;
matrix3[2][1] = 1;
matrix3[2][3] = 1;
matrix3[2][6] = 1;
matrix3[3][5] = 1;
matrix3[4][0] = 1;
matrix3[4][1] = 1;
matrix3[5][3] = 1;
console.log(matrix3);
console.log(solve(matrix3));
