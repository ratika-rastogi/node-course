import request from 'postman-request'
import chalk from 'chalk'
const url = 'http://api.weatherapi.com/v1/current.json?key=57b8430cc76f493e9ae52658252606&q=26.860556%2080.915833&aqi=yes'

// request({url: url , json:true}, (error, response) => {
//     //const data = JSON.parse(response.body)
//    // console.log(data.current )
//    // console.log(response.body)
//    const res =response.body
//    try{
//     if(res.error){
//         console.log('Unable to find location')
//     }else{
//         const data = res.current
//         //console.log(response.body)
//         console.log(chalk.bgCyan('It is '+ data.temp_c + " The probability of rain is "+data.precip_in))
//     }
    
//    }catch (error){
//      console.log("Unable to reach api: "+error)
//    }  
// })

const geocodingUrl = 'https://api.mapbox.com/search/geocode/v6/forward?q=Sambhal&access_token=pk.eyJ1IjoicmF0aWthcmFzdG9naTEiLCJhIjoiY21jZDR4Z2JoMGVtMjJpczN1OWRkNTQ5ayJ9.qM1aWyHM-KC0r3cngw8RpQ&limit=1'
request({url : geocodingUrl , json:true}, (error,response) => {
    try{
        if(error){
            console.log('Unable to connect to the api')
        } else if( response.body.error_code ){
            console.log("Unable to find location for the given data try again......")
        } else{
            console.log(response.body.features[0].properties.coordinates.longitude)
        }
    }catch(error){
        console.log('Unexpected error occurred'+error)
    }
})