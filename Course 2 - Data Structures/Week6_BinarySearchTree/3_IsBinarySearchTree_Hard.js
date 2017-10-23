// Binary search tree may contain equal keys

const readline = require('readline')

process.stdin.setEncoding('utf8')
const rl = readline.createInterface({
  input: process.stdin,
  terminal: false
})

let n // number of vertices, vertex 0 is the root
let currentVertexIndex = 0
const keys = []
const lefts = []
const rights = []
rl.on('line', (input) => {
  if (input !== '\n') {
    // First line
    if (n === undefined) {
      n = parseInt(input)
      return
    }

    // Information about vertices
    const inputs = input.split(' ').map(value => parseInt(value))
    keys[currentVertexIndex] = inputs[0]
    lefts[currentVertexIndex] = inputs[1]
    rights[currentVertexIndex] = inputs[2]
    currentVertexIndex++

    if (currentVertexIndex === n) {
      // for (const result of results) {
      //   process.stdout.write(`${result} `)
      // }
      console.log(keys)
      console.log(lefts)
      console.log(rights)
      process.exit()
    }
  }
})
