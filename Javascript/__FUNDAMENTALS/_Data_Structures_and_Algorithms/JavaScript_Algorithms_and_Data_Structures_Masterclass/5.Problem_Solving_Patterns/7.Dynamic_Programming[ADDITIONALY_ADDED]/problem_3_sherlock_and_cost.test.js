const getMaxCost = require('./problem_3_sherlock_and_cost.js');
// edge cases
describe('getMaxCost', () => {
  it(`getMaxCost - should return 0
  if arra=[1]`, () => {
      const array = [1];
      const result = getMaxCost(array);
      expect(result).toBe(0);
    });
});
describe('getMaxCost', () => {
  it(`getMaxCost - should return 0
  if arra=[1, 1, 1]`, () => {
      const array = [1];
      const result = getMaxCost(array);
      expect(result).toBe(0);
    });
});

// cases from https://www.hackerrank.com/challenges/sherlock-and-cost/problem?utm_campaign=challenge-recommendation&utm_medium=email&utm_source=24-hour-campaign

// test case base
describe('getMaxCost', () => {
  it(`
  --------------
  test base case
  --------------
  getMaxCost - should return 36
  if array=[10, 1, 10, 1, 10]`, () => {
      const array = [10, 1, 10, 1, 10];
      const result = getMaxCost(array);
      expect(result).toBe(36);
    });
});


// test case 0
describe('getMaxCost', () => {
  it(`
  ------------
  test case 0
  ------------
  getMaxCost - should return 5001
  if array=[69,19,15,81,93,100,35,18,81,16,65,20,4,45,81,83,90,14,82,85,43,7,64,76,33,47,95,12,78,93,14,22,97,36,65,66,36,26,59,81,81,82,44,79,89,94,32,94,22,33,19,46,46,62,19,47,70,91,97,62,17,43,11,25,74,73,64,98,73,7,40,8,2,96,89,81,80,17,88,13,31,44,64]`, () => {
      const array = [69, 19, 15, 81, 93, 100, 35, 18, 81, 16, 65, 20, 4, 45, 81, 83, 90, 14, 82, 85, 43, 7, 64, 76, 33, 47, 95, 12, 78, 93, 14, 22, 97, 36, 65, 66, 36, 26, 59, 81, 81, 82, 44, 79, 89, 94, 32, 94, 22, 33, 19, 46, 46, 62, 19, 47, 70, 91, 97, 62, 17, 43, 11, 25, 74, 73, 64, 98, 73, 7, 40, 8, 2, 96, 89, 81, 80, 17, 88, 13, 31, 44, 64];
      const result = getMaxCost(array);
      expect(result).toBe(5001);
    });
});
// test case 15
describe('getMaxCost', () => {
  it(`
  ------------
  test case 15
  ------------
  getMaxCost - should return 396
  if array=[100, 2 ,100, 2, 100]`, () => {
      const array = [100, 2, 100, 2, 100];
      const result = getMaxCost(array);
      expect(result).toBe(396);
    });
});


// test case 16
describe('getMaxCost', () => {
  it(`
  ------------
  test case 16
  ------------
  getMaxCost - should return 50
  if array=[3, 15, 4, 12, 10]`, () => {
      const array = [3, 15, 4, 12, 10];
      const result = getMaxCost(array);
      expect(result).toBe(50);
    });
});
describe('getMaxCost', () => {
  it(`
  ------------
  test case 16
  ------------
  getMaxCost - should return 12
  if array=[4, 7, 9]`, () => {
      const array = [4, 7, 9];
      const result = getMaxCost(array);
      expect(result).toBe(12);
    });
});
