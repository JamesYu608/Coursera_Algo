// Starter Solution (Java):
// private static long calc_fib(int n) {
//   if (n <= 1)
//     return n;
//
//   return calc_fib(n - 1) + calc_fib(n - 2);
// }
// 缺點: 太慢

const readline = require('readline')

process.stdin.setEncoding('utf8')
const rl = readline.createInterface({
  input: process.stdin,
  terminal: false
})

rl.on('line', input => {
  if (input !== '\n') {
    const n = parseInt(input)
    const result = calcFib2(n)
    console.log(result)
    process.exit()
  }
})

// 使用陣列的解法，優點是易讀
function calcFib (n) {
  if (n < 2) return n

  const fib = [0, 1]
  for (let i = 2; i < n + 1; i++) {
    fib[i] = fib[i - 1] + fib[i - 2]
  }

  return fib[n]
}

// 若是一次性的計算，其實我們只需要最後的數字，不用陣列來保存全部過程
function calcFib2 (n) {
  if (n < 2) return n

  let tempPrev = 0 // F[0]
  let prev = 1 // F[1]
  let curr = 1 // F[2]
  for (let i = 3; i < n + 1; i++) { // 從F[3]開始，一路加到F[n]
    tempPrev = prev
    prev = curr
    curr += tempPrev
  }

  return curr
}
