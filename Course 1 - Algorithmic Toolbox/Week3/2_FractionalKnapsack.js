const readline = require('readline')

process.stdin.setEncoding('utf8')
const rl = readline.createInterface({
  input: process.stdin,
  terminal: false
})

let n
let capacity
let values = []
let weights = []
rl.on('line', input => {
  if (input !== '\n') {
    const inputs = input.split(' ')
    // Fist line
    if (n === undefined) {
      n = parseInt(inputs[0])
      capacity = parseInt(inputs[1])
      return
    }

    // i-th line
    values.push(parseInt(inputs[0]))
    weights.push(parseInt(inputs[1]))
    if (values.length === n) {
      const result = getOptimalValue(capacity, values, weights)
      console.log(result)
      process.exit()
    }
  }
})

function getOptimalValue (capacity, values, weights) {
  const items = []
  // 組合values和weights到同一陣列
  for (let i = 0; i < values.length; i++) {
    items.push({value: values[i], weight: weights[i]})
  }
  // TODO: 這邊我直接使用了內建的sort function，有不需要sort但是一樣有效率的解法
  items.sort((a, b) => b.value / b.weight - a.value / a.weight)

  let remainder = capacity // 背包的剩餘空間
  let result = 0
  for (let i = 0; i < items.length; i++) { // 由於已經sort過，直接從CP值最高的開始裝
    if (remainder === 0) return result // 若背包已經滿了 回傳結果

    const item = items[i]
    const weight = remainder > item.weight ? item.weight : remainder // 背包還夠就全裝，否則把剩下的空間裝滿
    remainder -= weight // 扣掉這輪裝的空間
    result += weight * (item.value / item.weight)
  }

  return result.toFixed(4)
}
