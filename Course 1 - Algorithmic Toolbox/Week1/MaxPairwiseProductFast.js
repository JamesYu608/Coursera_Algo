// Failed case #1/17: Cannot check answer. Perhaps output format is wrong.
//
// Input:
// 3
// 1 2 3
//
// Your output:
// NaN
//
// Correct output:
// 6
// (Time used: 0.10/5.00, memory used: 19083264/536870912.)

const readline = require('readline')

process.stdin.setEncoding('utf8')
const rl = readline.createInterface({
  input: process.stdin,
  terminal: false
})

let n
let a = []
rl.on('line', (input) => {
  if (input !== '\n') {
    if (n === undefined) {
      n = parseInt(input)
      return
    }

    if (a.length === 0) {
      const numbers = input.split(' ')
      for (const number of numbers) {
        a.push(parseInt(number))
      }
      computeResult(n, a)
      process.exit()
    }
  }
})

function computeResult (n, a) {
  // 找出最大的
  let maxIndex1 = -1
  for (let i = 0; i < n; i++) {
    if (maxIndex1 === -1 || a[i] > a[maxIndex1]) {
      maxIndex1 = i
    }
  }

  // 找出第二大的
  let maxIndex2 = -1
  for (let i = 0; i < n; i++) {
    if (a[i] !== a[maxIndex1] && // 跳過最大的
      (maxIndex2 === -1 || a[i] > a[maxIndex2])) {
      maxIndex2 = i
    }
  }

  console.log(a[maxIndex1] * a[maxIndex2])
}
