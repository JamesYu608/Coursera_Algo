// Starter Solution (Java):
// private static int getFibonacciLastDigitNaive(int n) {
//   if (n <= 1)
//     return n;
//
//   int previous = 0;
//   int current  = 1;
//
//   for (int i = 0; i < n - 1; ++i) {
//     int tmp_previous = previous;
//     previous = current;
//     current = tmp_previous + current;
//   }
//
//   return current % 10;
// }
// 缺點: 當n很大，int放不下

const readline = require('readline')

process.stdin.setEncoding('utf8')
const rl = readline.createInterface({
  input: process.stdin,
  terminal: false
})

rl.on('line', input => {
  if (input !== '\n') {
    const n = parseInt(input)
    const result = calcFibLastDigit(n)
    console.log(result)
    process.exit()
  }
})

function calcFibLastDigit (n) {
  if (n < 2) return n

  const fib = [0, 1]
  for (let i = 2; i < n + 1; i++) {
    // 只存個位數就好，我們只在意個位數的變化
    fib[i] = (fib[i - 1] + fib[i - 2]) % 10
  }

  return fib[n]
}
