const readline = require('readline')

process.stdin.setEncoding('utf8')
const rl = readline.createInterface({
  input: process.stdin,
  terminal: false
})

let W // Capacity
let n // Number of bars
rl.on('line', input => {
  if (input !== '\n') {
    const inputs = input.split(' ')
    // Fist line
    if (W === undefined) {
      W = parseInt(inputs[0])
      n = parseInt(inputs[1])
      return
    }
    // Second line
    const bars = inputs.map(value => parseInt(value))
    console.log(optimalWeight(W, bars))

    process.exit()
  }
})

function optimalWeight (W, bars) {
  // Initialize a n X W matrix
  // maxValues[item][weight]
  // e.g. item: 2，表示item 1跟item 2可選
  const maxValues = getZeroMatrix(bars.length + 1, W + 1) // +1是因為要把0也算進來

  for (let i = 1; i < bars.length + 1; i++) { // Loop所有items
    for (let w = 1; w < W + 1; w++) { // Loop所有weights
      // Case 1: 沒有含i，直接找i-1的最佳解即可，因為多了i可以選也不影響
      maxValues[i][w] = maxValues[i - 1][w]
      // Case 2: 有含i，先把i扣掉，看最佳解是多少再加上i
      const bar = bars[i - 1] // 要-1只是因為index的位置，e.g. item: 1是在items[0]的位置
      if (bar <= w) {
        const value = maxValues[i - 1][w - bar] + bar
        if (value > maxValues[i][w]) {
          maxValues[i][w] = value
        }
      }
    }
  }

  return maxValues[bars.length][W]
}

function getZeroMatrix (n, m) {
  const matrix = []
  for (let i = 0; i < n; i++) { // columns
    const row = new Array(m)
    matrix.push(row.fill(0))
  }

  return matrix
}
