const readline = require('readline')

process.stdin.setEncoding('utf8')
const rl = readline.createInterface({
  input: process.stdin,
  terminal: false
})

let n
let a
let b
rl.on('line', input => {
  if (input !== '\n') {
    const inputs = input.split(' ')
    // Fist line
    if (n === undefined) {
      n = parseInt(inputs[0])
      return
    }
    // Second line
    if (a === undefined) {
      a = inputs.map(value => parseInt(value))
      return
    }
    // Third line
    b = inputs.map(value => parseInt(value))
    const result = dotProduct(a, b)
    console.log(result)
    process.exit()
  }
})

function dotProduct (a, b) {
  let result = 0
  // 注意這邊如果沒有提供compare function，預設是會把a, b轉成string去做比較，有可能會有問題
  const sortedA = a.sort((a, b) => a - b)
  const sortedB = b.sort((a, b) => a - b)
  for (let i = 0; i < sortedA.length; i++) {
    result += sortedA[i] * sortedB[i]
  }

  return result
}
