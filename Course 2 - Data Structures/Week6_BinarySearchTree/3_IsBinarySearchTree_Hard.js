const readline = require('readline')

process.stdin.setEncoding('utf8')
const rl = readline.createInterface({
  input: process.stdin,
  terminal: false
})

class Node {
  constructor (key, leftIndex, rightIndex) {
    this.key = key
    this.leftIndex = leftIndex
    this.rightIndex = rightIndex
    this.isPop = false
  }
}

const MAX_VALID_KEY = Math.pow(2, 31) - 1
const MIN_VALID_KEY = -1 * Math.pow(2, 31)
let n // number of vertices, vertex 0 is the root
let currentVertexIndex = 0
const nodes = []
rl.on('line', (input) => {
  if (input !== '\n') {
    // First line
    if (n === undefined) {
      n = parseInt(input)
      if (n === 0) { // Empty tree is considered correct
        console.log('CORRECT')
        process.exit()
      } else {
        return
      }
    }

    // Information about vertices
    const inputs = input.split(' ').map(value => parseInt(value))
    const key = inputs[0]
    if (key > MAX_VALID_KEY || key < MIN_VALID_KEY) { // 檢查key有沒有在題目允許範圍
      console.log('INCORRECT')
      process.exit()
    }
    nodes.push(new Node(key, inputs[1], inputs[2]))
    currentVertexIndex++

    if (currentVertexIndex === n) {
      const result = inOrderTraversal(nodes[0])
        ? 'CORRECT' : 'INCORRECT'
      console.log(result)
      process.exit()
    }
  }
})

// [想法]
// 跟key不重複的版本(作業二)比起來，當top時key相等的話，就檢查它的left subtree有沒有符合題目要求
function inOrderTraversal (root) {
  const results = []
  const stack = []
  stack.push(root)
  while (stack.length !== 0) {
    const top = stack[stack.length - 1]

    const leftIndex = top.leftIndex
    // 1. 有leftChild，push leftChild
    if (leftIndex !== -1 && !nodes[leftIndex].isPop) { // 記得檢查有沒有被pop過
      stack.push(nodes[leftIndex])
    } else { // 2. 沒有leftChild，或已經pop過
      // 2.1 檢查有沒有違反排序
      const resultsTop = results[results.length - 1]
      if (resultsTop > top.key) {
        return false
      }
      if (resultsTop === top.key && !isLeftSubtreeValid(top)) { // 檢查left subtree
        return false
      }

      // 2.2 pop目前top node (記錄到results)
      results.push(top.key)
      stack.pop()
      top.isPop = true

      // 2.3 檢查剛才pop的rightChild，若有rightChild，push rightChild
      const rightIndex = top.rightIndex
      if (rightIndex !== -1 && !nodes[rightIndex].isPop) { // 記得檢查有沒有被pop過
        stack.push(nodes[rightIndex])
      }
    }
  }

  return true
}

// 使用"BFS"依序走訪所有left subtree的nodes，若大於等於root key，則違反題目條件
function isLeftSubtreeValid (root) {
  if (root.leftIndex === -1) {
    return true
  }

  const queue = []
  queue.push(nodes[root.leftIndex])
  while (queue.length !== 0) {
    const top = queue.shift()
    if (top.key >= root.key) { // 其實不會有大於的cases (在進來前已經判斷過)，只有等於會進到這
      return false
    }

    if (top.leftIndex !== -1) {
      queue.push(nodes[top.leftIndex])
    }
    if (top.rightIndex !== -1) {
      queue.push(nodes[top.rightIndex])
    }
  }

  return true
}

// recursive version (input structure: keys, lefts, rights)
// const result = isBinarySearchTree(0, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY)
// 不使用這個做法是因為在test case #40/95好像會stack overflow
// function isBinarySearchTree (nodeIndex, min, max) {
//   if (nodeIndex === -1) {
//     return true
//   }
//
//   const key = keys[nodeIndex]
//   if (key < min || key >= max) {
//     return false
//   }
//
//   return isBinarySearchTree(lefts[nodeIndex], min, key) &&
//     isBinarySearchTree(rights[nodeIndex], key, max)
// }
