// Problem: Binary tree traversals

// Idea: iterative版本，使用Stack?

const readline = require('readline')
const fs = require('fs')
const path = require('path')

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

let n // number of vertices, vertex 0 is the root
let currentVertexIndex = 0
const nodes = []
rl.on('line', (input) => {
  if (input !== '\n') {
    // First line
    if (n === undefined) {
      n = parseInt(input)
      return
    }

    // Information about vertices
    const inputs = input.split(' ').map(value => parseInt(value))
    nodes.push(new Node(inputs[0], inputs[1], inputs[2]))
    currentVertexIndex++

    if (currentVertexIndex === n) {
      printResults(inOrderTraversal(nodes[0]))
      console.log('')
      printResults(preOrderTraversal(nodes[0]))
      console.log('')
      printResults(postOrderTraversal(nodes[0]))
      process.exit()
    }
  }
})

// [想法]
// Stack順序: 有left的話持續push left，沒有的話先push top (inOrder)，然後看看有沒有right，有的話push right
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
    } else { // 2. 沒有leftChild，pop目前top node (記錄到results)
      results.push(top.key)
      stack.pop()
      top.isPop = true

      // 2.1 檢查剛才pop的rightChild，若有rightChild，push rightChild
      const rightIndex = top.rightIndex
      if (rightIndex !== -1 && !nodes[rightIndex].isPop) { // 記得檢查有沒有被pop過
        stack.push(nodes[rightIndex])
      }
    }
  }

  return results
}

// [想法]
// Stack順序: 先pop top (preOrder)，接著依序push right、left (這樣pop順序left -> right)
function preOrderTraversal (root) {
  const results = []
  const stack = []
  stack.push(root)
  while (stack.length !== 0) {
    const top = stack[stack.length - 1]

    // 1. 先pop top (mid)
    results.push(top.key)
    stack.pop()

    // 2. 依序push right、left
    const rightIndex = top.rightIndex
    if (rightIndex !== -1) {
      stack.push(nodes[rightIndex])
    }
    const leftIndex = top.leftIndex
    if (leftIndex !== -1) {
      stack.push(nodes[leftIndex])
    }
  }

  return results
}

// [想法]
// Stack順序: 有right先push right，再來push left (這樣pop順序left -> right)，都沒有children才pop top (postOrder)
function postOrderTraversal (root) {
  // 先重置所有nodes的isPop
  for (let i = 0; i < nodes.length; i++) {
    nodes[i].isPop = false
  }

  const results = []
  const stack = []
  stack.push(root)
  while (stack.length !== 0) {
    const top = stack[stack.length - 1]

    const leftIndex = top.leftIndex
    const rightIndex = top.rightIndex
    // 1. 有leftChild，push leftChild
    if (leftIndex !== -1 && !nodes[leftIndex].isPop) {
      stack.push(nodes[leftIndex])
      // 2. 有rightChild，push rightChild
    } else if (rightIndex !== -1 && !nodes[rightIndex].isPop) {
      stack.push(nodes[rightIndex])
      // 3. 若沒有children或是都已經pop過，pop自己
    } else {
      results.push(top.key)
      stack.pop()
      top.isPop = true
    }
  }

  return results
}

function printResults (results) {
  for (const result of results) {
    process.stdout.write(`${result} `)
  }
}
