// Input: [](()
// Result: 3

const readline = require('readline')

process.stdin.setEncoding('utf8')
const rl = readline.createInterface({
  input: process.stdin,
  terminal: false
})

rl.on('line', (input) => {
  if (input !== '\n') {
    console.log(checkBrackets(input))

    process.exit()
  }
})

// 這邊我用array實作stack，並且沒有另外再寫stack的utility function
function checkBrackets (input) {
  const stack = new Array(input.length)
  let elementCount = 0

  for (let i = 0; i < input.length; i++) {
    const char = input[i]
    // Case 1: 找到opening bracket，"push"
    if (isOpeningBracket(char)) {
      stack[elementCount] = i // 紀錄的是index (因為題目需要return失敗的位置)
      elementCount++
    } else if (isClosingBracket(char)) { // Case 2: 找到closing bracket，"pop"
      if (elementCount === 0) { // Case 2-1: 當前stack為空，失敗
        return i + 1 // 失敗的case，1-based，所以要+1
      }

      const top = input[stack[elementCount - 1]] // Pop
      elementCount--
      if (!isOpeningBracket(top)) { // Case 2-2: 若當前top不是opening bracket，失敗
        return i + 1
      }
      // Case 2-3: 若當前top是opening bracket，檢查是否match
      const isMatch = ((top === '[' && char === ']') ||
        (top === '{' && char === '}') ||
        (top === '(' && char === ')'))
      if (!isMatch) {
        return i + 1 // 若不match，失敗
      }
    }
  }

  // input掃描完畢，檢查stack，若為空才表示success
  return (elementCount === 0) ? 'Success' : stack[elementCount - 1] + 1
}

function isOpeningBracket (c) {
  return c === '[' || c === '{' || c === '('
}

function isClosingBracket (c) {
  return c === ']' || c === '}' || c === ')'
}
