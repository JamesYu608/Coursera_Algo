// Input:
// 5
// 4 -1 4 1 1
// Output: 3

// 注意這邊有使用class寫一些額外的data structure輔助
// Class不像function可以hoisting，在run test case function的時候注意順序

const readline = require('readline')
const fs = require('fs')
const path = require('path')

process.stdin.setEncoding('utf8')
const rl = readline.createInterface({
  input: process.stdin,
  terminal: false
})

let n
let parent = []
rl.on('line', (input) => {
  if (input !== '\n') {
    // First line
    if (n === undefined) {
      n = parseInt(input)
      return
    }

    // Second line
    if (parent.length === 0) {
      const inputs = input.split(' ')
      const parent = inputs.map(value => parseInt(value))

      const {nodes, rootIndex} = constructNodes(n, parent)
      console.log(getTreeHeight(nodes, rootIndex))

      process.exit()
    }
  }
})

// Iterative Version
// 想法是tree的max height等於max level，所以使用BFS走訪
// 然後額外使用一個array紀錄各node的levels，每次enqueue child的時候，都根據parent的level加一
function getTreeHeight (nodes, rootIndex) {
  // 紀錄各nodes的levels
  const levels = []
  levels[rootIndex] = 1 // 從root開始，一開始只知道root是level 1
  let maxLevel = Number.NEGATIVE_INFINITY

  // 實作一般的BFS，只是多紀錄levels
  const queue = new Queue()
  queue.enqueue(nodes[rootIndex])
  while (!queue.isEmpty()) {
    const currentNode = queue.dequeue()
    const currentLevel = levels[currentNode.key]
    // 由於input不一定是binary tree，所以要把所有child的height都跑過
    for (const child of currentNode.children) {
      const childLevel = 1 + currentLevel
      levels[child.key] = childLevel
      queue.enqueue(child)

      if (childLevel > maxLevel) {
        maxLevel = childLevel
      }
    }
  }

  return maxLevel
}

// Recursive Version: Stack overflow
// function getTreeHeight (tree) {
//   const children = tree.children
//   let maxChildrenHeight = 0
//
//   // 由於input不一定是binary tree，所以要把所有child的height都跑過
//   if (children.length > 0) {
//     for (let i = 0; i < children.length; i++) {
//       const height = getTreeHeight(children[i])
//       if (height > maxChildrenHeight) {
//         maxChildrenHeight = height
//       }
//     }
//   }
//
//   return maxChildrenHeight + 1 // +1是自己
// }

// ====== The following functions are support functions ======
// 1. 讀取題目的input轉成tree結構
// 2. 簡單用singly linked-list實作一個Queue API供BFS用
class Node {
  constructor (key) {
    this.key = key // 在iterative版本中，我們會需要知道node的位置來更新levels紀錄
    this.children = []
  }

  addChild (childIndex) {
    this.children.push(childIndex)
  }
}

function constructNodes (n, parent) {
  const nodes = []
  let rootIndex

  // 先allocate全新的nodes
  for (let i = 0; i < n; i++) {
    nodes[i] = new Node(i)
  }

  // 設定每個node的children
  for (let childIndex = 0; childIndex < nodes.length; childIndex++) {
    const parentIndex = parent[childIndex]
    if (parentIndex === -1) {
      rootIndex = childIndex
    } else {
      const [parentNode, childNode] = [nodes[parentIndex], nodes[childIndex]]
      parentNode.addChild(childNode)
    }
  }

  return {rootIndex, nodes}
}

class Queue {
  constructor () {
    this.linkedList = new LinkedList()
  }

  enqueue (key) {
    this.linkedList.pushBack(key)
  }

  dequeue () {
    return this.linkedList.popFront()
  }

  isEmpty () {
    return this.linkedList.isEmpty()
  }
}

class LinkedList {
  constructor () {
    this.head = null
    this.tail = null
  }

  pushBack (key) {
    const item = new Item(key)
    if (this.isEmpty()) {
      this.head = item
      this.tail = item
    } else {
      this.tail.next = item
      this.tail = item
    }
  }

  popFront () {
    const popItem = this.head
    this.head = popItem.next
    popItem.next = null

    if (this.isEmpty()) {
      this.tail = null
    }

    return popItem.key
  }

  isEmpty () {
    return this.head === null
  }
}

class Item {
  constructor (key) {
    this.key = key
    this.next = null
  }
}

// 我們利用課程提供的test cases來檢查tree會不會太深而導致recursive的解法stack overflow
// 結果是會，跑到test case 21 (有100000個nodes) 就error了
function runTest () {
  const testDir = path.resolve(__dirname, '2_TreeHeight_tests')
  const files = fs.readdirSync(testDir)
  let currentResult = ''
  for (let i = 0; i < files.length; i++) { // Loop all testing files
    console.log('Run:', files[i])
    const data = fs.readFileSync(path.resolve(testDir, files[i]), 'utf8')
    if (i % 2 === 0) { // Input file
      const inputs = data.split('\r\n')
      const n = inputs[0]
      const parent = inputs[1].split(' ').map(value => parseInt(value))

      const {nodes, rootIndex} = constructNodes(n, parent)
      currentResult = getTreeHeight(nodes, rootIndex)
    } else { // Answer file
      const realAnswer = parseInt(data)
      console.log(currentResult === realAnswer ? 'Success' : 'Failure')
    }
  }
}

// runTest()
