const readline = require('readline')

process.stdin.setEncoding('utf8')
const rl = readline.createInterface({
  input: process.stdin,
  terminal: false
})

let queries // Number of queries
// For hashing string (題目給的)
const PRIME_NUMBER = 1000000007
const X_NUMBER = 263
let bucketCount

let strSet

rl.on('line', (input) => {
  if (input !== '\n') {
    // First line
    if (bucketCount === undefined) {
      bucketCount = parseInt(input)
      // 這邊我們使用固定大小的array以符合作業的目的
      strSet = new Array(bucketCount)
      return
    }

    // Second line
    if (queries === undefined) {
      queries = parseInt(input)
      return
    }

    // Process queries
    const [queryType, arg] = input.split(' ')
    switch (queryType) {
      case 'add':
        add(arg)
        break
      case 'del':
        del(arg)
        break
      case 'find':
        console.log(find(arg))
        break
      case 'check':
        console.log(check(arg))
    }
    queries--

    if (queries === 0) {
      process.exit()
    }
  }
})

// Hashing strings
// world -> 4 (bucketCount: 5)
function getHashValue (str) {
  let value = 0
  for (let i = str.length - 1; i >= 0; i--) {
    value = (value * X_NUMBER + str.charCodeAt(i)) % PRIME_NUMBER
  }

  return value % bucketCount
}

function add (newStr) {
  const hashValue = getHashValue(newStr)
  const strList = strSet[hashValue]
  if (strList) {
    for (const str of strList) {
      if (str === newStr) {
        return
      }
    }
    strList.unshift(newStr) // 符合題目輸出，用unshift而非push
  } else {
    strSet[hashValue] = []
    strSet[hashValue].push(newStr)
  }
}

function del (targetStr) {
  const hashValue = getHashValue(targetStr)
  const strList = strSet[hashValue]
  if (strList) {
    for (let i = 0; i < strList.length; i++) {
      if (strList[i] === targetStr) {
        strList.splice(i, 1) // 使用array內建API移除list item
        return
      }
    }
  }
}

function find (targetStr) {
  const hashValue = getHashValue(targetStr)
  const strList = strSet[hashValue]
  if (strList) {
    for (const str of strList) {
      if (str === targetStr) {
        return 'yes'
      }
    }
  }
  return 'no'
}

function check (index) {
  return strSet[index] ? strSet[index].join(' ') : ''
}
