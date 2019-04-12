const fs = require('fs')
const path = require('path')

function genCharArray (charA, charZ) {
  let a = []
  let i = charA.charCodeAt(0)
  let j = charZ.charCodeAt(0)

  for (; i <= j; ++i) {
    a.push(String.fromCharCode(i))
  }
  return a
}

function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

const alphabetArr = genCharArray('A', 'Z')

const res = []
alphabetArr.forEach((from) => {
  alphabetArr.forEach((to) => {
    if (from === to) {
      return
    }

    const cost = getRandomInt(0, 100)
    res.push(`${from}${to}${cost}`)
  })
})

fs.writeFileSync(path.join(__dirname, 'routes.big.txt'), res.join(', '))
