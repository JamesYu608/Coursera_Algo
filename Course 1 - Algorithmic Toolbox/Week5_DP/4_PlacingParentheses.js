// Test Case: 5-8+7*4-8+9
// Result: 200 = (5 − ((8 + 7) × (4 − (8 + 9))))

const readline = require('readline')

process.stdin.setEncoding('utf8')
const rl = readline.createInterface({
  input: process.stdin,
  terminal: false
})

rl.on('line', input => {
  if (input !== '\n') {
    console.log(parentheses(input))

    process.exit()
  }
})

function parentheses (exp) {
  const {numbers, ops} = parseExpression(exp)
  const minValues = getZeroMatrix(numbers.length, numbers.length)
  const maxValues = getZeroMatrix(numbers.length, numbers.length)

  // 先把斜的填滿 (自己單一個number)
  for (let i = 0; i < numbers.length; i++) {
    minValues[i][i] = numbers[i]
    maxValues[i][i] = numbers[i]
  }

  // 斜著填，只填右上半邊 (畫圖trace看看)
  for (let s = 1; s < numbers.length; s++) { // 可視為每一round往右shift幾格，因此，j = i + s
    for (let i = 0; i < numbers.length - s; i++) { // i: 直的，越來越短 (s越來越大)
      const j = i + s
      // 找到min和max
      let min = Number.POSITIVE_INFINITY
      let max = Number.NEGATIVE_INFINITY
      for (let k = i; k < j; k++) {
        // Case 1: M & M
        const a = evaluate(maxValues[i][k], maxValues[k + 1][j], ops[k])
        if (a < min) min = a
        if (a > max) max = a
        // Case 2: M & m
        const b = evaluate(maxValues[i][k], minValues[k + 1][j], ops[k])
        if (b < min) min = b
        if (b > max) max = b
        // Case 3: m & M
        const c = evaluate(minValues[i][k], maxValues[k + 1][j], ops[k])
        if (c < min) min = c
        if (c > max) max = c
        // Case 4: m & m
        const d = evaluate(minValues[i][k], minValues[k + 1][j], ops[k])
        if (d < min) min = d
        if (d > max) max = d
      }

      // Assign min and max cost to this round
      minValues[i][j] = min
      maxValues[i][j] = max
    }
  }

  return maxValues[0][numbers.length - 1]
}

// ====== The following functions are support functions ======
function parseExpression (exp) {
  const numbers = []
  const ops = []
  for (let i = 0; i < exp.length; i++) {
    if (i % 2 === 0) {
      numbers.push(parseInt(exp[i]))
    } else {
      ops.push(exp[i])
    }
  }

  return {numbers, ops}
}

function getZeroMatrix (n, m) {
  const matrix = []
  for (let i = 0; i < n; i++) {
    const row = new Array(m)
    matrix.push(row.fill(0))
  }

  return matrix
}

function evaluate (a, b, op) {
  switch (op) {
    case '+':
      return a + b
    case '-':
      return a - b
    case '*':
      return a * b
  }
}
