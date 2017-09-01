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

    const result = (majorityElement(a, 0, a.length - 1) !== -1) ? 1 : 0 // 有找到為1否則為0
    console.log(result)
    process.exit()
  }
})

// 思考: 若一個array有majority element (數量 > n/2)，那麼將這個array切成兩半
// 該element一定也會是其中一半的majority element
// 也就是一直二分下去，再從最下面的majority一路往上找是否也為majority，一定至少可以找到一條路是通的，否則就是沒有
function majorityElement (a, low, high) {
  // leaf，必為majority
  if (low === high) {
    return a[low]
  }

  // 切兩半，用recursion找各自的majority
  const mid = parseInt((low + high) / 2)
  const leftMajority = majorityElement(a, low, mid)
  const rightMajority = majorityElement(a, mid + 1, high)

  // 關鍵: 只用計算左右兩邊的majority在當前array是否也為majority，因此複雜度是O(n)
  // 由於recursion的深度為log n，因此複雜度可以壓在O(n*log n)
  // 1. 左右兩邊都沒有majority，這條路不用再找了
  if (leftMajority === -1 && rightMajority === -1) {
    return -1
  }

  // 2. 計算左右兩邊的majority在當前array的數量
  let leftMajorityCount = 0
  let rightMajorityCount = 0
  for (let i = low; i < high + 1; i++) {
    if (a[i] === leftMajority) leftMajorityCount++
    if (a[i] === rightMajority) rightMajorityCount++
  }

  // 3. 是否為也majority?
  const halfSize = (high - low + 1) / 2
  if (leftMajorityCount > halfSize) {
    return leftMajority
  } else if (rightMajorityCount > halfSize) {
    return rightMajority
  } else {
    return -1
  }
}
