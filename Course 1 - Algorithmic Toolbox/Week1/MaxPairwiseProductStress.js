// 通過stress test並不代表我們可以肯定演算法一定正確
// 原因在於，亂數產生input的時候不一定會碰到所謂的corner case (極端情況的case，e.g. integer overflow)
//
// 以這個題目來說，若我們亂數的n及elements很大，很有可能不會出現最大的兩個數字相同的case
// 所以針對corner case，我們必須手動測試來確保這些情況下演算法的正確性
//
// 結論: 手動測試corner test + 亂數執行stress test = 完整的檢驗我們的演算法

;(() => {
  while (true) { // 無限loop測試直到fail
    // 亂數產生測試input: n, a
    let n = getRandomInt(2, 6) // 2 ~ 5
    console.log(n)
    let a = []
    for (let i = 0; i < n; i++) {
      a.push(getRandomInt(0, 10)) // 0 ~ 9
    }
    console.log(a)

    // 比較output
    let result1 = computeResult1(n, a) // 正確答案
    let result2 = computeResult2(n, a) // 測試目標
    if (result1 !== result2) { // Fail!
      console.log('Wrong answer:', result1, result2)
      break
    } else {
      console.log('OK')
    }
  }
})()

// 亂數產生一個整數，範圍: min(含) ~ max(不含)
function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

// 暴力解但保證正確
function computeResult1 (n, a) {
  let result = 0
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const currentResult = a[i] * a[j]
      if (currentResult > result) {
        result = currentResult
      }
    }
  }

  return result
}

// 真正想要提交的演算法
function computeResult2 (n, a) {
  // 找出最大的
  let maxIndex1 = -1
  for (let i = 0; i < n; i++) {
    if (maxIndex1 === -1 || a[i] > a[maxIndex1]) {
      maxIndex1 = i
    }
  }

  // 找出第二大的
  let maxIndex2 = -1
  for (let i = 0; i < n; i++) {
    if (a[i] !== a[maxIndex1] && // 跳過最大的 (邏輯有錯)
      // if (i !== maxIndex1 && // 修正後pass所有random tests
      (maxIndex2 === -1 || a[i] > a[maxIndex2])) {
      maxIndex2 = i
    }
  }

  return a[maxIndex1] * a[maxIndex2]
}
