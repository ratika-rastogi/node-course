const name = 'Ratika'
const userAge = 29

const user ={
    name:name,
    age: userAge,
    location:'India'
}

console.log(user)

//object destructuring

const product = {
    label:'Purple Pen',
    price:10,
    stock:100,
    salePrice:12
}
console.log(product)
let  label = product.label
let price = product.price
console.log(label)
console.log(price)
label = 'pinki poo'
price =12
console.log(label)
console.log(price)
console.log(product)

let {label:prodLabel,price:prodPrice,rating} = product
console.log(prodLabel)
console.log(prodPrice)
console.log(rating)
prodLabel='green'
prodPrice='5'
console.log(prodLabel)
console.log(prodPrice)
console.log(product)


const transaction = (type , {label,stock}) => {
    console.log(type,label,stock)
}

transaction('order',product)