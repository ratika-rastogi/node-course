import request from "postman-request";

export function forecast (latitude,longitude,callback){
    const url = 'http://api.weatherapi.com/v1/current.json?key=57b8430cc76f493e9ae52658252606&q='+ latitude+'%20'+longitude +'&aqi=yes'
    request({url, json:true},(error, {body}) => {
        if(error){
            callback('Unable to connect to the forecast api....',undefined)
        } else if (error){
            callback('Unable to find location',undefined)
        } else{
            callback(undefined,'Weather condition- '+body?.current.condition.text+'. It is '+ body?.current.temp_c + " degree celsius. The probability of rain is "+body?.current.precip_in)
        }
    })
}