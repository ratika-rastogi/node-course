import request from "postman-request";

export function forecast (longitude,latitude,callback){
    const url = 'http://api.weatherapi.com/v1/current.json?key=57b8430cc76f493e9ae52658252606&q='+ latitude+'%20'+longitude +'&aqi=yes'
    request({url:url, json:true},(error, response) => {
        if(error){
            callback('Unable to connect to the forecast api....',undefined)
        } else if (response.body.error){
            callback('Unable to find location',undefined)
        } else{
            callback(undefined,response.body)
        }
    })
}