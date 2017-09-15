// Test Case: 以課堂上的例子，EDITING / DISTANCE的optimal edit distance是5

const readline = require('readline')

process.stdin.setEncoding('utf8')
const rl = readline.createInterface({
  input: process.stdin,
  terminal: false
})

let str1, str2
rl.on('line', input => {
  if (input !== '\n') {
    // Fist line
    if (str1 === undefined) {
      str1 = input
      return
    }
    // Second line
    str2 = input
    console.log(optimalEditDistance(str1, str2))

    process.exit()
  }
})

function optimalEditDistance (str1, str2) {
  const editDistances = getZeroMatrix(str1.length + 1, str2.length + 1)  // +1是因為要把0 (empty string) 也算進來
  // 首先填滿D(i, 0)跟D(0, j)
  for (let i = 0; i < str1.length + 1; i++) {
    editDistances[i][0] = i
  }
  for (let j = 0; j < str2.length + 1; j++) {
    editDistances[0][j] = j
  }

  // 注意我們讓index從1開始，所以真正要拿str[index]時，index要-1
  for (let i = 1; i < str1.length + 1; i++) {
    for (let j = 1; j < str2.length + 1; j++) {
      let minCost = Number.POSITIVE_INFINITY

      // 1. insertion
      const insertion = editDistances[i][j - 1] + 1
      if (insertion < minCost) {
        minCost = insertion
      }
      // 2. deletion
      const deletion = editDistances[i - 1][j] + 1
      if (deletion < minCost) {
        minCost = deletion
      }

      if (str1[i - 1] === str2[j - 1]) { // 記得-1
        // 3. match
        const match = editDistances[i - 1][j - 1]
        if (match < minCost) {
          minCost = match
        }
      } else {
        // 4. mismatch
        const mismatch = editDistances[i - 1][j - 1] + 1
        if (mismatch < minCost) {
          minCost = mismatch
        }
      }

      // Assign min cost to this round
      editDistances[i][j] = minCost
    }
  }

  return editDistances[str1.length][str2.length]
}

function getZeroMatrix (n, m) {
  const matrix = []
  for (let i = 0; i < n; i++) {
    const row = new Array(m)
    matrix.push(row.fill(0))
  }

  return matrix
}
