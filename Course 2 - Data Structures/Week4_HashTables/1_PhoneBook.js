const readline = require('readline')

process.stdin.setEncoding('utf8')
const rl = readline.createInterface({
  input: process.stdin,
  terminal: false
})

let queries // Number of queries
// For hashing integer
const PRIME_NUMBER = 10000019 // 比10^7大 (這題電話號碼最多7位數)
const HASH_TABLE_SIZE = 1000
// 這邊我們使用固定大小的array以符合作業的目的
const phoneBook = new Array(HASH_TABLE_SIZE)

class Contact {
  constructor (phoneNumber, name) {
    this.phoneNumber = phoneNumber
    this.name = name
  }
}

rl.on('line', (input) => {
  if (input !== '\n') {
    // First line
    if (queries === undefined) {
      queries = parseInt(input)
      return
    }

    // Process queries
    const [queryType, phoneNumber, name] = input.split(' ')
    switch (queryType) {
      case 'add':
        addContact(new Contact(phoneNumber, name))
        break
      case 'find':
        console.log(findName(phoneNumber))
        break
      case 'del':
        delContact(phoneNumber)
        break
    }
    queries--

    if (queries === 0) {
      process.exit()
    }
  }
})

// Hashing integers
// 1482567 -> 185
function getHashValue (x) {
  // a: 34, b:2，直接照課堂上的範例實作
  return ((34 * x + 2) % PRIME_NUMBER) % HASH_TABLE_SIZE
}

// 以下Map的實作，我們在list部分，直接使用內建的JavaScript array: []
function findName (phoneNumber) {
  const hashValue = getHashValue(phoneNumber)
  const phoneList = phoneBook[hashValue]
  if (phoneList) {
    for (const contact of phoneList) {
      if (contact.phoneNumber === phoneNumber) {
        return contact.name
      }
    }
  }
  return 'not found'
}

function addContact (newContact) {
  const hashValue = getHashValue(newContact.phoneNumber)
  const phoneList = phoneBook[hashValue]
  if (phoneList) {
    for (const contact of phoneList) {
      if (contact.phoneNumber === newContact.phoneNumber) {
        contact.name = newContact.name
        return
      }
    }
    phoneList.push(newContact)
  } else {
    phoneBook[hashValue] = []
    phoneBook[hashValue].push(newContact)
  }
}

// 這邊實作變相的setContract (name -> not found)，但其實也可以直接從list中移除
function delContact (phoneNumber) {
  const hashValue = getHashValue(phoneNumber)
  const phoneList = phoneBook[hashValue]
  if (phoneList) {
    for (const contact of phoneList) {
      if (contact.phoneNumber === phoneNumber) {
        contact.name = 'not found'
        return
      }
    }
  }
}

// For local testing
// addContact(new Contact(911, 'police'))
// addContact(new Contact(12345, 'Bob'))
// addContact(new Contact(911, 'police2'))
// console.log(findName(911)) // police2
// console.log(findName(12345)) // Bob
// console.log(findName(9527)) // not found
// delContact(12345)
// console.log(findName(12345)) // not found
