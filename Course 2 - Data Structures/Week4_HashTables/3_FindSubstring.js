// Failed case #52/52: time limit exceeded (Time used: 5.96/5.00, memory used: 132698112/536870912.)

const readline = require('readline')

process.stdin.setEncoding('utf8')
const rl = readline.createInterface({
  input: process.stdin,
  terminal: false
})

let pattern
let text
// For hashing string (題目給的)
const PRIME_NUMBER = 1000003 // p的長度限制在5*10^5
const X_NUMBER = 263
rl.on('line', (input) => {
  if (input !== '\n') {
    // First line
    if (pattern === undefined) {
      pattern = input
      return
    }

    // Second line
    if (text === undefined) {
      text = input
      const results = rabinKarp(text, pattern)
      for (const result of results) {
        process.stdout.write(`${result} `)
      }
      process.exit()
    }
  }
})

function rabinKarp (text, pattern) {
  const results = []
  const patternHash = getHashValue(pattern)
  const textHashes = precomputeHashes(text, pattern.length)

  for (let i = 0; i < text.length - pattern.length + 1; i++) {
    if (patternHash !== textHashes[i]) {
      continue
    }
    if (text.substring(i, i + pattern.length) === pattern) {
      // 這邊我們後來還是使用內建的===，因為底層較快，自己實作會超時
      // 自己實作的部分，不使用substring而是用index，來避免多次create new string
    // if (areEqual(text, i, i + pattern.length, pattern)) {
      results.push(i)
    }
  }

  return results
}

function precomputeHashes (text, patternLength) {
  const H = new Array(text.length - patternLength + 1)
  const S = text.substring(text.length - patternLength)
  H[text.length - patternLength] = getHashValue(S)

  let y = 1
  for (let i = 1; i < patternLength + 1; i++) {
    y = y * X_NUMBER % PRIME_NUMBER
  }
  for (let i = text.length - patternLength - 1; i >= 0; i--) {
    const a = X_NUMBER * H[i + 1] + text.charCodeAt(i) - y * text.charCodeAt(i + patternLength)
    // 避免mod負數出來結果是負數，我們希望一律是正的
    H[i] = (a % PRIME_NUMBER + PRIME_NUMBER) % PRIME_NUMBER
  }

  return H
}

function getHashValue (str) {
  let value = 0
  for (let i = str.length - 1; i >= 0; i--) {
    value = (value * X_NUMBER + str.charCodeAt(i)) % PRIME_NUMBER
  }

  return value
}

// end is excluded
function areEqual (text, start, end, pattern) {
  if ((end - start) !== pattern.length) {
    return false
  } else {
    for (let i = 0, textIndex = start; i < pattern.length; i++, textIndex++) {
      if (text[textIndex] !== pattern[i]) {
        return false
      }
    }
    return true
  }
}

// 測試precomputeHashes，下面兩個結果應該一樣
// console.log([getHashValue('abc'), getHashValue('bcb'), getHashValue('cbd')])
// console.log(precomputeHashes('abcbd', 'abc'))

// 測試areEqual
// let testText = ' '
// console.log(areEqual(testText, 0, testText.length, '')) // false
// testText = 'hellO'
// console.log(areEqual(testText, 1, testText.length, 'ellO')) // true
// testText = 'hi'
// console.log(areEqual(testText, 0, testText.length, 'hi')) // true
