import fs from 'node:fs'
import chalk from 'chalk'

// const book={
//     title:'The Alchemist',
//     author:'Paul Coelho'
// }
// const bookJson=JSON.stringify(book)
// console.log(bookJson)

// const parsedJson= JSON.parse(bookJson)
// console.log(parsedJson)

// fs.writeFileSync('1-json.json',bookJson)

// const dataBuffer = fs.readFileSync('1-json.json')
// console.log(dataBuffer.toString())
// const dataJson = dataBuffer.toString()
// const data = JSON.parse(dataJson)
// console.log("Data"+data)

const data = JSON.parse((fs.readFileSync('1-json.json')).toString())
console.log("Parsed Data- Name:"+ data.name + " Age :"+ data.age+" Place:"+data.planet)
data.name = 'Ratika'
data.age='29'
const stringifiedData = JSON.stringify(data)
console.log("Stringified Data:"+chalk.blue(stringifiedData))
fs.writeFileSync('1-json.json',stringifiedData)