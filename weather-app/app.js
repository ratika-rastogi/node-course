import { geocode } from './utils/geocode.js'
import { forecast } from './utils/forecast.js'
import chalk from 'chalk'


const location = process.argv[2]
if(location){
    console.log("location input parameter"+location)
    geocode(location , (geocodeError,geocodeData) => {
    if(geocodeError){
       return  console.log(chalk.red('Error:'), chalk.red(error))
    }
    forecast(geocodeData.longitude,geocodeData.latitude, (forecastError,forecastData) => {
        if(forecastError){
            return console.log("Forecast Error:",error)
        }
        console.log(chalk.bgGreen('In '+ forecastData?.location.name +' it is '+ forecastData?.current.temp_c + " degree celsius. The probability of rain is "+forecastData?.current.precip_in))    
    })
    
})
}else{
    console.log('Please enter a valid input')
}



