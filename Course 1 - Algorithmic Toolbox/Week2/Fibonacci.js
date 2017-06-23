// Starter Solution (Java):
// private static long calc_fib(int n) {
//   if (n <= 1)
//     return n;
//
//   return calc_fib(n - 1) + calc_fib(n - 2);
// }
// 缺點: 太慢

const readline = require('readline')

process.stdin.setEncoding('utf8')
const rl = readline.createInterface({
  input: process.stdin,
  terminal: false
})

rl.on('line', input => {
  if (input !== '\n') {
    const n = parseInt(input)
    const result = calcFib(n)
    console.log(result)
    process.exit()
  }
})

function calcFib (n) {
  if (n < 2) return n

  const fib = [0, 1]
  for (let i = 2; i < n + 1; i++) {
    fib[i] = fib[i - 1] + fib[i - 2]
  }

  return fib[n]
}
