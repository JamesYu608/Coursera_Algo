// Starter Solution (Java):
// private static long getFibonacciPartialSumNaive(long from, long to) {
//   if (to <= 1)
//     return to;
//
//   long previous = 0;
//   long current  = 1;
//
//   for (long i = 0; i < from - 1; ++i) {
//     long tmp_previous = previous;
//     previous = current;
//     current = tmp_previous + current;
//   }
//
//   long sum = current;
//
//   for (long i = 0; i < to - from; ++i) {
//     long tmp_previous = previous;
//     previous = current;
//     current = tmp_previous + current;
//     sum += current;
//   }
//
//   return sum % 10;
// }
// 缺點: 太慢、當n很大，int放不下

// 連外部module一起打包: ../../node_modules/.bin/browserify --node ./7_FibonacciPartialSum.js > ./FibonacciPartialSum_bundle.js

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
    // 這有可能非常大，我們保持它是string，之後透過Big來處理
    const from = inputs[0]
    const to = inputs[1]
    const result = calcFibPartialSumLastDigit(from, to)
    console.log(result)
    process.exit()
  }
})

function calcFibPartialSumLastDigit (from, to) {
  // 前面的習題我們已經可以快速出算從0到n的結果
  // 這邊只要算出0到to，再扣掉0到"from - 1"，就是from到to的結果

  // 先算0到to
  const toPartExtraCount = parseInt(Big(to).mod(60).toString())
  if (toPartExtraCount < 2) return toPartExtraCount // 直接回傳不用管from (不影響)
  const toPartSum = calcFibSum(toPartExtraCount)

  // 再計算0到from - 1
  const fromPartExtraCount = parseInt(Big(from).minus(1).mod(60).toString())
  const fromPartSum = fromPartExtraCount < 2
    ? fromPartExtraCount
    : calcFibSum(fromPartExtraCount)

  // 相減
  return (toPartSum - fromPartSum) % 10
}

function calcFibSum (extraCount) {
  let tempPrev = 0
  let prev = 1
  let curr = 1
  let sum = 2
  for (let i = 3; i < extraCount + 1; i++) {
    tempPrev = prev
    prev = curr
    curr = (curr + tempPrev) % 10
    // 這邊我們的sum不再只保留個位數了，因為需要和其它部分相減
    sum = (sum + curr)
  }

  return sum
}
