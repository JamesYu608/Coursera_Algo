const readline = require('readline')

process.stdin.setEncoding('utf8')
const rl = readline.createInterface({
  input: process.stdin,
  terminal: false
})

let n, m
let jobs = []
const records = []
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
    if (jobs.length === 0) {
      jobs = inputs

      processJobs(n, jobs)
      for (const record of records) {
        console.log(record[0], record[1])
      }

      process.exit()
    }
  }
})

class Thread {
  constructor (id) {
    this.id = id
    this.freeTime = 0
  }
}

function processJobs (n, jobs) {
  // 初始化priority queue
  const threadQueue = []
  for (let i = 0; i < n; i++) {
    threadQueue.push(new Thread(i))
  }

  // 開始依序處理jobs
  for (let i = 0; i < jobs.length; i++) {
    // 找出priority最高的thread (index: 0) 來處理這個job，把目前job所需的時間加到thread的freeTime
    records.push([threadQueue[0].id, threadQueue[0].freeTime])
    changeThreadFreeTime(threadQueue, 0, threadQueue[0].freeTime + jobs[i])
  }
}

// 實作課堂的ChangePriority(i, p)
function changeThreadFreeTime (threadQueue, index, freeTime) {
  threadQueue[index].freeTime = freeTime
  // 注意: 這邊是min-heap，freeTime小的priority高
  // 只用考慮siftDown的情況，因為我們的freeTime只會比之前高
  siftDown(threadQueue, index)
}

function siftDown (a, i) {
  let maxIndex = i // 要交換的index，先指向自己，接下來要找最小的
  // 比較左邊child
  const leftChildIndex = 2 * i + 1
  if (leftChildIndex <= a.length - 1) { // 必要: Child沒有超出範圍
    // Child比較小，或是
    if ((a[leftChildIndex].freeTime < a[maxIndex].freeTime) ||
      // 一樣小，但是child的id比較小
      (a[leftChildIndex].freeTime === a[maxIndex].freeTime && a[leftChildIndex].id < a[maxIndex].id)) {
      maxIndex = leftChildIndex
    }
  }

  // 比較右邊child
  const rightChildIndex = 2 * i + 2
  if (rightChildIndex <= a.length - 1) {
    if ((a[rightChildIndex].freeTime < a[maxIndex].freeTime) ||
      (a[rightChildIndex].freeTime === a[maxIndex].freeTime && a[rightChildIndex].id < a[maxIndex].id)) {
      maxIndex = rightChildIndex
    }
  }

  // 若有需要換
  if (i !== maxIndex) {
    swap(a, i, maxIndex)

    // Recursive
    siftDown(a, maxIndex)
  }
}

function swap (a, i, j) {
  const temp = a[i]
  a[i] = a[j]
  a[j] = temp
}
