// Failed case #40/95: Wrong answer

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
      if (n === 0) { // Empty tree is considered correct
        console.log('CORRECT')
        process.exit()
      } else {
        return
      }
    }

    // Information about vertices
    const inputs = input.split(' ').map(value => parseInt(value))
    keys[currentVertexIndex] = inputs[0]
    lefts[currentVertexIndex] = inputs[1]
    rights[currentVertexIndex] = inputs[2]
    currentVertexIndex++

    if (currentVertexIndex === n) {
      const result = isBinarySearchTree(0, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY)
        ? 'CORRECT' : 'INCORRECT'
      console.log(result)
      process.exit()
    }
  }
})

function isBinarySearchTree (nodeIndex, min, max) {
  if (nodeIndex === -1) {
    return true
  }

  const key = keys[nodeIndex]
  if (key < min || key >= max) {
    return false
  }

  return isBinarySearchTree(lefts[nodeIndex], min, key) &&
    isBinarySearchTree(rights[nodeIndex], key, max)
}
