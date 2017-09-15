const readline = require('readline')

process.stdin.setEncoding('utf8')
const rl = readline.createInterface({
  input: process.stdin,
  terminal: false
})

rl.on('line', input => {
  if (input !== '\n') {
    console.log(input)

    process.exit()
  }
})

function getMaxiValue (exp) {

}

function eval(a, b, op) {

}
