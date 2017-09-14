const readline = require('readline')

process.stdin.setEncoding('utf8')
const rl = readline.createInterface({
  input: process.stdin,
  terminal: false
})

let n
let segments = []
rl.on('line', input => {
  if (input !== '\n') {
    const inputs = input.split(' ').map(value => parseInt(value))
    // Fist line
    if (n === undefined) {
      n = inputs[0]
      return
    }
    // i-th line
    segments.push({start: inputs[0], end: inputs[1]})
    if (segments.length === n) {
      const result = optimalPoints(segments)
      console.log(result.length)
      console.log(result.join(' '))
      process.exit()
    }
  }
})

function optimalPoints (segments) {
  let result = []
  let remainderSegments = segments.sort((a, b) => a.end - b.end) // 依結束時間從早排到晚
  while (remainderSegments.length !== 0) { // 只要還沒有涵蓋到所有區段
    const segment = remainderSegments.shift() // 把結束時間最早的當作point
    const point = segment.end
    result.push(point)

    // 下面這一段是把當前point有涵蓋到的區段給踢掉
    const removes = []
    for (let i = 0; i < remainderSegments.length; i++) {
      const segment = remainderSegments[i]
      if (segment.start <= point && point <= segment.end) {
        removes.push(segment)
      }
    }
    remainderSegments = remainderSegments.filter(segment => !removes.includes(segment))
  }

  return result
}
