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

    quickSort3(a, 0, a.length - 1)
    for (const element of a) {
      process.stdout.write(`${element} `)
    }

    process.exit()
  }
})

function quickSort2 (a, low, high) {
  if (low >= high) return

  const mid = partition2(a, low, high)
  quickSort2(a, low, mid - 1)
  quickSort2(a, mid + 1, high)
}

function partition2 (a, low, high) {
  // 1. 隨機挑選一個index，然後換到開頭 (low)，當作pivot
  const randomIndex = randomInteger(low, high + 1)
  swap(a, low, randomIndex)
  const pivot = a[low]

  // 2. j是二分array的指標，i是過渡用的iterator
  // 最後j會停在<=pivot的最右邊，i會停在high
  let j = low
  for (let i = low + 1; i < high + 1; i++) {
    if (a[i] <= pivot) {
      j++
      swap(a, i, j)
    }
  }

  // 3. j跟pivot swap
  swap(a, low, j)
  // 4. 回傳pivot的最終位置
  return j
}

function quickSort3 (a, low, high) {
  if (low >= high) return

  const [m1, m2] = partition3(a, low, high)
  quickSort3(a, low, m1 - 1)
  quickSort3(a, m2 + 1, high)
}

function partition3 (a, low, high) {
  // 1. 隨機挑選一個index，然後換到"結尾" (high)，當作pivot
  const randomIndex = randomInteger(low, high + 1)
  swap(a, high, randomIndex)
  const pivot = a[high]

  // 2. j和k是三分array的指標，i是過渡用的iterator，最後 (注意順序low...j...k...high):
  // [low, j-1] < pivot
  // [j, k-1] > pivot
  // [k, high] == pivot
  let j = low
  let i = low
  let k = high
  while (i < k) {
    if (a[i] === pivot) {
      k--
      swap(a, i, k)
      continue // 這邊我們不需要i++，因為k--換過來的可能還是等於pivot，需要再判斷一次i
    }

    if (a[i] < pivot) {
      swap(a, i, j)
      j++
    }
    i++ // 繼續前進
  }

  // 3. 將等於pivot的移到中間，大於的移到最後
  // 3-1. 首先要判斷哪一種比較少，就是要移動的數量 (畫兩種狀況較極端的圖來幫助了解)
  const greaterSize = k - j // k - 1 - j + 1
  const equalSize = high - k + 1
  const moveSize = greaterSize < equalSize ? greaterSize : equalSize
  // 3-2. 交換[j, k+moveSize-1]、[high-moveSize+1, high]
  for (let i = 0; i < moveSize; i++) {
    swap(a, j + i, high - moveSize + 1 + i)
  }

  // 4. 回傳等於pivot的區間index
  return [j, j + equalSize - 1]
}

// 不包含max本身
function randomInteger (min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

function swap (a, index1, index2) {
  const temp = a[index1]
  a[index1] = a[index2]
  a[index2] = temp
}
