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
    // First line
    if (n === undefined) {
      n = parseInt(input)
      return
    }

    // Second line
    if (a.length === 0) {
      const inputs = input.split(' ')
      const a = inputs.map(value => parseInt(value))

      // TODO: write your code here

      process.exit()
    }
  }
})
