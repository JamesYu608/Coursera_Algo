const readline = require('readline')

process.stdin.setEncoding('utf8')
const rl = readline.createInterface({
  input: process.stdin,
  terminal: false
})

let n
let a
rl.on('line', input => {
  if (input !== '\n') {
    const inputs = input.split(' ')
    // Fist line
    if (n === undefined) {
      n = parseInt(inputs[0])
      return
    }
    // Second line
    // 這邊我們希望inputs先保持string方便之後組合
    const result = largestNumber(inputs)
    console.log(result)
    process.exit()
  }
})

function largestNumber (digits) {
  // 直接從大到小排序，規則: 以2, 21為例，比較221跟212誰比較大，得出221，因此2 > 21
  digits.sort((a, b) => parseInt(b + a) - parseInt(a + b))

  // 1. 快速版本
  // return digits.join('')

  // 2. Redundant版本，展示greedy algorithm的過程
  let result = ''
  while (digits.length !== 0) {
    result += digits.shift()
  }

  return result
}
