// Starter Solution (Java):
// private static long lcm_naive(int a, int b) {
//   for (long l = 1; l <= (long) a * b; ++l)
//   if (l % a == 0 && l % b == 0)
//     return l;
//
//   return (long) a * b;
// }
// 缺點: 太慢

// 連外部module一起打包: ../../node_modules/.bin/browserify --node ./Lcm.js > ./Lcm_bundle.js

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
    const a = parseInt(inputs[0])
    const b = parseInt(inputs[1])
    const result = lcm(a, b)
    console.log(result)
    process.exit()
  }
})

// a * b = lcm(a, b) * gcd(a, b)
function lcm (a, b) {
  // 有些input的計算過程會超出JavaScript能處理的整數位數
  if (a * b > Number.MAX_SAFE_INTEGER) {
    const aPlusB = Big(a).times(Big(b))
    return aPlusB.div(gcd(a, b)).toString()
  } else { // 一般情況
    return (a * b) / gcd(a, b)
  }
}

function gcd (a, b) {
  if (b === 0) return a

  return (a < b) ? gcd(b, a) : gcd(b, a % b)
}
