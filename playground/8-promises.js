const doWorkPromise = new Promise((resolve,reject) => {
    setTimeout(()=>{
        resolve(true)
        //reject('Shit!!!')
        resolve(false)
        //reject('Noooo Shit!!!')

    },2000)
})

doWorkPromise.then((result)=>{
    console.log('Success',result)
}).catch((error)=>{
    console.log('Error',error)
})