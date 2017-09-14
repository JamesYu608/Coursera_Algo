// Starter Solution (Python):
// def optimal_sequence(n):
//     sequence = []
//     while n >= 1:
//         sequence.append(n)
//         if n % 3 == 0:
//             n = n // 3
//         elif n % 2 == 0:
//             n = n // 2
//         else:
//             n = n - 1
//     return reversed(sequence)
// 這個greedy的解法會錯，Input: 10
// Your output:
// 1 2 4 5 10
// Correct output:
// 1 3 9 10
// 另外可以試試input: 96234，正確是14 (greedy: 15)

const readline = require('readline')

process.stdin.setEncoding('utf8')
const rl = readline.createInterface({
  input: process.stdin,
  terminal: false
})

rl.on('line', input => {
  if (input !== '\n') {
    const n = parseInt(input)

    const minNumOpts = calculateOptimalNumber(n)
    // Number of operations needed to get n from 1
    console.log(minNumOpts[n])
    // Sequence of intermediate numbers
    const sequence = reconstructing(minNumOpts)
    for (let i = sequence.length - 1; i >= 0; i--) {
      process.stdout.write(`${sequence[i]} `)
    }
    process.exit()
  }
})

function calculateOptimalNumber (n) {
  const minNumOpts = [0, 0] // minNumOpts[0]沒用到，我們從minNumOpts[1] = 0開始

  for (let i = 2; i < n + 1; i++) {
    minNumOpts[i] = Number.POSITIVE_INFINITY

    // Case 1: Multiply 2
    if (i % 2 === 0) {
      const num = minNumOpts[i / 2] + 1
      if (num < minNumOpts[i]) {
        minNumOpts[i] = num
      }
    }
    // Case 2: Multiply 3
    if (i % 3 === 0) {
      const num = minNumOpts[i / 3] + 1
      if (num < minNumOpts[i]) {
        minNumOpts[i] = num
      }
    }
    // Case 3: Add 1
    const num = minNumOpts[i - 1] + 1
    if (num < minNumOpts[i]) {
      minNumOpts[i] = num
    }
  }

  return minNumOpts
}

function reconstructing (minNumOpts) {
  const optimalSequences = []

  let currentValue = minNumOpts.length - 1 // 先從n開始，等同於minNumOpts的最大index
  optimalSequences.push(currentValue)

  while (currentValue !== 1) {
    let nextMinNumOpt = Number.POSITIVE_INFINITY
    let nextValue // 找nextMinNumOpt最小的，記錄起來

    // Case 1: Multiply 2
    if (currentValue % 2 === 0) {
      const num = minNumOpts[currentValue / 2]
      if (num < nextMinNumOpt) {
        nextMinNumOpt = num
        nextValue = currentValue / 2
      }
    }
    // Case 2: Multiply 3
    if (currentValue % 3 === 0) {
      const num = minNumOpts[currentValue / 3]
      if (num < nextMinNumOpt) {
        nextMinNumOpt = num
        nextValue = currentValue / 3
      }
    }
    // Case 3: Add 1
    const num = minNumOpts[currentValue - 1] + 1
    if (num < nextMinNumOpt) {
      nextMinNumOpt = num
      nextValue = currentValue - 1
    }

    currentValue = nextValue
    optimalSequences.push(currentValue)
  }

  return optimalSequences
}
