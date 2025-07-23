const add = (a,b) =>{
    return new Promise((resolve,reject) => {
        setTimeout(()=>{
            resolve(a+b)
        },2000)
    })
}

// add(1,2).then((res)=>{
//     console.log(res)
//     add(res,5).then((result)=>{
//         console.log(result)
//     }).catch((e)=>{
//         console.log(e)
//     })
// }).catch((e)=>{
//     console.log(e)
// })


add(2,2).then((sum)=>{
    console.log(sum)
    return add(sum,6)
}).then((sum)=>{
    console.log(sum)
}).catch((E)=>{
    console.log(E)
})