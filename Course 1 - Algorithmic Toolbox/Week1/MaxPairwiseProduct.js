// Failed case #4/17: time limit exceeded (Time used: 10.00/5.00, memory used: 30650368/536870912.)

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
  let result = 0
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const currentResult = a[i] * a[j]
      if (currentResult > result) {
        result = currentResult
      }
    }
  }
  console.log(result)
}
