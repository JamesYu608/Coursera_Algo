const readline = require('readline')

process.stdin.setEncoding('utf8')
const rl = readline.createInterface({
  input: process.stdin,
  terminal: false
})

let s, p
let segments = [] // unsorted
let points = [] // sorted
rl.on('line', input => {
  if (input !== '\n') {
    const inputs = input.split(' ')
    // Fist line
    if (s === undefined && p === undefined) {
      s = parseInt(inputs[0])
      p = parseInt(inputs[1])
      return
    }
    // Segments
    if (s > 0) {
      segments.push(inputs.map(value => parseInt(value)))
      s--
      return
    }
    // Points
    for (const point of inputs) {
      points.push(parseInt(point))
    }

    console.log('Segments', segments)
    console.log('Points', points)

    process.exit()
  }
})
