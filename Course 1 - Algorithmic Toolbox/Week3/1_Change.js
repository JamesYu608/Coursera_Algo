const readline = require('readline')

process.stdin.setEncoding('utf8')
const rl = readline.createInterface({
  input: process.stdin,
  terminal: false
})

rl.on('line', input => {
  if (input !== '\n') {
    const n = parseInt(input)
    const result = change(n)
    console.log(result)
    process.exit()
  }
})

function change (n) {
  const coins = [10, 5, 1]
  let remainder = n
  let result = 0

  while (remainder !== 0) { // 只要還沒將錢找完
    const coin = coins.shift() // 用目前最大的面額去找
    const coinCount = parseInt(remainder / coin) // 該面額最多可以找幾個
    if (coinCount !== 0) {
      remainder -= coin * coinCount // 扣掉這輪找的錢
      result += coinCount
    }
  }

  return result
}
