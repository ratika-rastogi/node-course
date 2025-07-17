import { geocode } from './utils/geocode.js'
import { forecast } from './utils/forecast.js'
import chalk from 'chalk'


const address = process.argv[2]
if(address){
    console.log("address input parameter"+address)
    geocode(address , (geocodeError,{latitude,longitude,place} = {}) => {
    if(geocodeError){
       return  console.log(chalk.red('Error:'), chalk.red(error))
    }
    forecast(latitude,longitude, (forecastError,forecastData) => {
        if(forecastError){
            return console.log("Forecast Error:",forecastError)
        }
        console.log(chalk.bgGreen('In '+ place +' it is '+ forecastData?.current.temp_c + " degree celsius. The probability of rain is "+forecastData?.current.precip_in))    
    })
    
})
}else{
    console.log('Please enter a valid input')
}



