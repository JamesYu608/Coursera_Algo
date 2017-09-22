// 這題我們照常實作disjoint set，只是在union的時候多紀錄、更新合併後的table有多少row

const readline = require('readline')

process.stdin.setEncoding('utf8')
const rl = readline.createInterface({
  input: process.stdin,
  terminal: false
})

let n, m
let r = [] // the number of rows in the 𝑖-th table
let queries = []
let maxSize = Number.NEGATIVE_INFINITY
// Disjoint Set
const parent = []
const rank = []
rl.on('line', (input) => {
  if (input !== '\n') {
    const inputs = input.split(' ').map(value => parseInt(value))
    // First line
    if (n === undefined) {
      n = inputs[0]
      m = inputs[1]
      return
    }

    // Second line
    if (r.length === 0) {
      r = inputs
      return
    }

    // The following m lines describing merge queries
    queries.push(inputs.map(value => --value))
    if (queries.length === m) {
      mergingTables(n, queries)

      process.exit()
    }
  }
})

function mergingTables (n, queries) {
  // 初始化
  for (let i = 0; i < n; i++) {
    makeSet(i)
    if (r[i] > maxSize) {
      maxSize = r[i]
    }
  }

  // 執行m queries (union操作)
  for (const query of queries) {
    union(query[0], query[1])
    console.log(maxSize)
  }
}

function makeSet (i) {
  parent[i] = i
  rank[i] = 0
}

function union (i, j) {
  const iId = find(i)
  const jId = find(j)

  if (iId === jId) {
    return
  }

  if (rank[iId] > rank[jId]) {
    parent[jId] = iId
    r[iId] += r[jId] // 更新table row number
    if (r[iId] > maxSize) {
      maxSize = r[iId]
    }
  } else {
    parent[iId] = jId
    r[jId] += r[iId] // 更新table row number
    if (r[jId] > maxSize) {
      maxSize = r[jId]
    }
    if (rank[iId] === rank[jId]) {
      rank[jId]++
    }
  }
}

function find (i) {
  let currentIndex = i
  while (currentIndex !== parent[currentIndex]) {
    currentIndex = parent[currentIndex]
  }

  return currentIndex
}
