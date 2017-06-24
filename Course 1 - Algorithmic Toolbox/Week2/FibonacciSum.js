// Starter Solution (Java):
// private static long getFibonacciSumNaive(long n) {
//   if (n <= 1)
//     return n;
//
//   long previous = 0;
//   long current  = 1;
//   long sum      = 1;
//
//   for (long i = 0; i < n - 1; ++i) {
//     long tmp_previous = previous;
//     previous = current;
//     current = tmp_previous + current;
//     sum += current;
//   }
//
//   return sum % 10;
// }
// 缺點: 太慢、當n很大，int放不下

// 連外部module一起打包: ../../node_modules/.bin/browserify --node ./FibonacciSum.js > ./FibonacciSum_bundle.js

const readline = require('readline')
const Big = require('big.js')

process.stdin.setEncoding('utf8')
const rl = readline.createInterface({
  input: process.stdin,
  terminal: false
})

rl.on('line', input => {
  if (input !== '\n') {
    const n = input // 這有可能非常大，我們保持它是string，之後透過Big來處理
    const result = calcFibSumLastDigit(n)
    console.log(result)
    process.exit()
  }
})

function calcFibSumLastDigit (n) {
  // 從前面的習題我們知道Fib mod 10的Pasino Period是60
  // 然後我們算出每個period總和mod 10的結果剛好是0
  // 也就是說，"只要算多出period倍數的部分即可!"
  const extraCount = parseInt(Big(n).mod(60).toString())
  if (extraCount < 2) return extraCount

  let tempPrev = 0
  let prev = 1
  let curr = 1
  let sum = 2 // F[0] + F[1] + F[2]
  for (let i = 3; i < extraCount + 1; i++) {
    tempPrev = prev
    prev = curr
    // 過程及結果都只需要個位數
    curr = (curr + tempPrev) % 10
    sum = (sum + curr) % 10
  }

  return sum
}
