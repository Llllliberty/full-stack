/* Exercise 1: Find Max Value
Write a function that finds the maximum value in an array
of numbers
Input: [1,5,3,6,2,9,4]
Output: 9
function findMaxValue([]) {xxx
return
} */

function findMaxValue(list) {
  if (!Array.isArray(list)) {
    return null;
  }
  if (list.length === 0) {
    return null;
  }
  let max = list[0];
  list.forEach((item) => {
    if (item > max) {
      max = item;
    }
  });
  return max;
}

console.log(findMaxValue([1, 5, 3, 6, 2, 9, 4]));

// Reverse String Write a function that reverses a given string.
function reverseString(str) {
  return str.split("").reverse().join("");
}

// isPrime(a)
function isPrime(n) {
  if (n <= 1) return false;
  for (let i = 2; i * i <= n; i++) {
    if (n % i == 0) return false;
  }
  return true;
}
