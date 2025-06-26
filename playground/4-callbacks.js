// setTimeout( () =>{
//     console.log('2 seconds timer bro')
// }, 2000)

// const names = ['rasha','ratika','shashank']
// const shortHands= names.filter((name)=> name.length<=5)
// console.log(shortHands)

// const geocode = (address, callback) => {
//     setTimeout( () => {
//         const data ={
//         longitude:0,
//         latitude:0
//         }
//         callback(data)
//     },2000)
// }
// //console.log(geocode('india'))

// geocode('india',(data)=>{
//     console.log(data)
// })

const add = (a ,b , printSum) => {
    setTimeout( () => {
        printSum(a+b)
    }, 2000)
}

add(5,10, (sum)=>{
    console.log('Sum is:' + sum)
})