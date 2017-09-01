const readline = require('readline')

process.stdin.setEncoding('utf8')
const rl = readline.createInterface({
  input: process.stdin,
  terminal: false
})

// List of sorted integers
let n
const a = []
// List of target integers
let k
const b = []
rl.on('line', input => {
  if (input !== '\n') {
    const inputs = input.split(' ')
    // Fist line
    if (n === undefined) {
      n = parseInt(inputs[0])
      for (let i = 1; i < inputs.length; i++) {
        a.push(parseInt(inputs[i]))
      }
      return
    }
    // Second line
    if (k === undefined) {
      k = parseInt(inputs[0])
      for (let i = 1; i < inputs.length; i++) {
        b.push(parseInt(inputs[i]))
      }
    }

    const results = []
    for (const key of b) {
      results.push(binarySearch(a, 0, a.length - 1, key))
    }

    // 又要用這種方式output答案否則在#4/22會錯...
    for (const result of results) {
      process.stdout.write(`${result} `)
    }
    process.exit()
  }
})

// Recursion版本
// function binarySearch (A, low, high, key) {
//   if (low > high) return -1
//
//   const mid = parseInt((low + high) / 2)
//   if (A[mid] === key) {
//     return mid
//   } else if (A[mid] > key) {
//     return binarySearch(A, low, mid - 1, key)
//   } else {
//     return binarySearch(A, mid + 1, high, key)
//   }
// }

// Iterative版本
function binarySearch (A, low, high, key) {
  while (low <= high) {
    const mid = parseInt((low + high) / 2)

    if (A[mid] === key) {
      return mid
    } else if (A[mid] > key) {
      high = mid - 1
    } else {
      low = mid + 1
    }
  }

  return -1
}
