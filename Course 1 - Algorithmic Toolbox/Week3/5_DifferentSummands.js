const readline = require('readline')

process.stdin.setEncoding('utf8')
const rl = readline.createInterface({
  input: process.stdin,
  terminal: false
})

rl.on('line', input => {
  if (input !== '\n') {
    const n = parseInt(input)
    const summands = optimalSummands(n)
    console.log(summands.length)
    // console.log(summands.join(' ')) // 不會過
    for (const summand of summands) {
      // 這題解答一定要用這種方式輸出才會過...
      process.stdout.write(`${summand} `)
    }
    process.exit()
  }
})

function optimalSummands (n) {
  let remainder = n
  let pairwise = []

  let current = 1
  while (true) {
    // 關鍵就在於列出幾個簡單例子觀察後，發現只要滿足這個條件就表示下一輪一定沒辦法滿足，所以這輪就是最後一輪
    if (remainder <= 2 * current) {
      pairwise.push(remainder)
      break
    } else {
      remainder -= current
      pairwise.push(current)
      current++
    }
  }

  return pairwise
}
