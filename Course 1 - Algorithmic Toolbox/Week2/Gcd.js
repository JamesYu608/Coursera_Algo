// Starter Solution (Java):
// private static int gcd_naive(int a, int b) {
//   int current_gcd = 1;
//   for(int d = 2; d <= a && d <= b; ++d) {
//     if (a % d == 0 && b % d == 0) {
//       if (d > current_gcd) {
//         current_gcd = d;
//       }
//     }
//   }
//
//   return current_gcd;
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
    const inputs = input.split(' ')
    const a = parseInt(inputs[0])
    const b = parseInt(inputs[1])
    const result = gcd(a, b)
    console.log(result)
    process.exit()
  }
})

// 使用輾轉相除法
function gcd (a, b) {
  if (b === 0) return a

  return (a < b) ? gcd(b, a) : gcd(b, a % b)
}
