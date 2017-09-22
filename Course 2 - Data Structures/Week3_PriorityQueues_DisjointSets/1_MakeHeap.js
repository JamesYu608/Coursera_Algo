const readline = require('readline')

process.stdin.setEncoding('utf8')
const rl = readline.createInterface({
  input: process.stdin,
  terminal: false
})

let n
let a = []
const swaps = []
rl.on('line', (input) => {
  if (input !== '\n') {
    // First line
    if (n === undefined) {
      n = parseInt(input)
      return
    }

    // Second line
    if (a.length === 0) {
      const inputs = input.split(' ')
      const a = inputs.map(value => parseInt(value))

      buildHeap(a)
      console.log(swaps.length)
      for (const swap of swaps) {
        console.log(swap[0], swap[1])
      }

      process.exit()
    }
  }
})

function buildHeap (a) {
  // 注意: 課堂範例是1-based，這邊是0-based，index計算上要小心
  const lastParentIndex = parseInt(a.length / 2) - 1
  for (let i = lastParentIndex; i >= 0; i--) {
    // SiftDown，這邊我們的heap是min-heap，所以小的會在上面
    siftDown(a, i)
  }
}

function siftDown (a, i) {
  let maxIndex = i // 要交換的index，先指向自己，接下來要找最小的
  // 比較左邊child
  const leftChildIndex = 2 * i + 1
  if (leftChildIndex <= a.length - 1 && a[leftChildIndex] < a[maxIndex]) {
    maxIndex = leftChildIndex
  }
  // 比較右邊child
  const rightChildIndex = 2 * i + 2
  if (rightChildIndex <= a.length - 1 && a[rightChildIndex] < a[maxIndex]) {
    maxIndex = rightChildIndex
  }
  // 若有需要換
  if (i !== maxIndex) {
    swaps.push([i, maxIndex]) // 題目需要，紀錄swap過程
    const temp = a[i]
    a[i] = a[maxIndex]
    a[maxIndex] = temp

    // Recursive
    siftDown(a, maxIndex)
  }
}
