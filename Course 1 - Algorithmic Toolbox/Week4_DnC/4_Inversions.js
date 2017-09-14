const readline = require('readline')

process.stdin.setEncoding('utf8')
const rl = readline.createInterface({
  input: process.stdin,
  terminal: false
})

let n
const a = []
rl.on('line', input => {
  if (input !== '\n') {
    const inputs = input.split(' ')
    // Fist line
    if (n === undefined) {
      n = parseInt(inputs[0])
      return
    }
    // Second line
    for (const number of inputs) {
      a.push(parseInt(number))
    }

    const result = mergeSort(a, 0, a.length - 1, 0)
    console.log(result.inversionCount)

    process.exit()
  }
})

function mergeSort (a, low, high) {
  if (low === high) return {mergeArray: [a[low]], inversionCount: 0}

  const mid = parseInt((low + high) / 2)
  const left = mergeSort(a, low, mid)
  const right = mergeSort(a, mid + 1, high)

  return merge(left.mergeArray, right.mergeArray, left.inversionCount + right.inversionCount)
}

function merge (a1, a2, inversionCount) {
  const mergeArray = []
  let [i, j] = [0, 0]
  while (i < a1.length || j < a2.length) {
    if (i === a1.length) { // a1已經為空，直接放a2
      mergeArray.push(a2[j++])
    } else if (j === a2.length) { // a2已經為空，直接放a1
      mergeArray.push(a1[i++])
      inversionCount += j // 放a1進來，表示這個a1只小於當前a2[j]，也就是a1大於a2的[0...j-1]，共有j個
    } else if (a1[i] <= a2[j]) { // a1小，放a1
      mergeArray.push(a1[i++])
      inversionCount += j // 同上面放a1的case
    } else { // a2小，放a2
      mergeArray.push(a2[j++])
    }
  }

  return {mergeArray, inversionCount}
}
