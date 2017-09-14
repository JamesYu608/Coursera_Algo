// Starter Solution (Java):
// private static long getFibonacciHugeNaive(long n, long m) {
//   if (n <= 1)
//     return n;
//
//   long previous = 0;
//   long current  = 1;
//
//   for (long i = 0; i < n - 1; ++i) {
//     long tmp_previous = previous;
//     previous = current;
//     current = tmp_previous + current;
//   }
//
//   return current % m;
// }
// 缺點: 太慢

// 連外部module一起打包: ../../node_modules/.bin/browserify --node ./5_FibonacciHuge.js > ./FibonacciHuge_bundle.js

const readline = require('readline')
const Big = require('big.js')

process.stdin.setEncoding('utf8')
const rl = readline.createInterface({
  input: process.stdin,
  terminal: false
})

rl.on('line', input => {
  if (input !== '\n') {
    const inputs = input.split(' ')
    const n = inputs[0] // 這有可能非常大，我們保持它是string，之後透過Big來處理
    const m = parseInt(inputs[1])
    const result = calcFibHuge(n, m).toString()
    console.log(result)
    process.exit()
  }
})

function calcFibHuge (n, m) {
  // 這邊我們需要用陣列紀錄Fib mod後的結果，因為最後會用到
  const fibMod = [0, 1]

  // 找出Pisano Period
  let period
  let i = 2
  while (true) {
    fibMod[i] = (fibMod[i - 1] + fibMod[i - 2]) % m
    // 一直跑到連續出現0, 1，表示pattern已經開始重複，目前index - 1就是Pisano Period
    if (fibMod[i] === 1 && fibMod[i - 1] === 0) {
      period = i - 1
      break
    } else {
      i++
    }
  }

  // 有了Pisano Period，我們不需要真正算出很大的F[n]，找跟它結果相同的F[n % period]即可
  const target = Big(n).mod(period).toString()
  return fibMod[target]
}
