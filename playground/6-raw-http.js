import http from 'http'
import chalk from 'chalk'
const url ='http://api.weatherapi.com/v1/current.json?key=57b8430cc76f493e9ae52658252606&q=40%20-75&aqi=yes'
const request =http.request(url,(response)=>{
    let data =''

    response.on('data',(chunk)=>{
       data = data + chunk.toString()
    })

    response.on('end',()=>{
        const response = JSON.parse(data)
        console.log(response)
    })
})

request.on('error',(error)=>{
    console.log(chalk.bgRed(error))
})

request.end()