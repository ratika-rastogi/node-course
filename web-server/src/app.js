import express from 'express'
import chalk from 'chalk'
import path from 'path';
import { fileURLToPath } from 'url';
import hbs from 'hbs';
import { geocode } from './utils/geocode.js'
import { forecast } from './utils/forecast.js'
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

const app = express()

//Define paths for Express Config
const publicDir=path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup Handlebars engine & views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)


//Setup static directory to use
app.use(express.static(publicDir))

app.get('', (req,res) => {
    res.render('index',{
        title:'Weather',
        name:'Ratika Rastogi'
    })
})

app.get('/about', (req,res) => {
    res.render('about',{
        title:'About Page',
        name:'Ratika Rastogi'
    })
})

app.get('/help', (req,res) => {
    res.render('help',{
        title:'Help',
        name:'Ratika Rastogi',
        helpText:'This is a help text'
    })
})

app.get('/weather',(req,res) => {
    //let location_object={"location":{"name":"Lucknow","region":"Uttar Pradesh","country":"India","lat":26.85,"lon":80.917,"tz_id":"Asia/Kolkata","localtime_epoch":1751540329,"localtime":"2025-07-03 16:28"},"current":{"last_updated_epoch":1751539500,"last_updated":"2025-07-03 16:15","temp_c":34.0,"temp_f":93.2,"is_day":1,"condition":{"text":"Mist","icon":"//cdn.weatherapi.com/weather/64x64/day/143.png","code":1030},"wind_mph":6.7,"wind_kph":10.8,"wind_degree":101,"wind_dir":"ESE","pressure_mb":997.0,"pressure_in":29.44,"precip_mm":0.0,"precip_in":0.0,"humidity":67,"cloud":75,"feelslike_c":37.0,"feelslike_f":98.5,"windchill_c":35.8,"windchill_f":96.4,"heatindex_c":40.5,"heatindex_f":104.8,"dewpoint_c":21.2,"dewpoint_f":70.2,"vis_km":5.0,"vis_miles":3.0,"uv":1.1,"gust_mph":8.5,"gust_kph":13.6,"air_quality":{"co":436.6,"no2":6.105,"o3":120.0,"so2":8.88,"pm2_5":66.045,"pm10":66.97,"us-epa-index":4,"gb-defra-index":9}}}
    const address = req.query.address
    if(!address){
        return res.send({
            "error":"Please provide an address"
        })
    }

    geocode(address , (geocodeError,{latitude,longitude,place} = {}) => {
        if(geocodeError){
        return  res.send({
            error:geocodeError
        })
        }
        forecast(latitude,longitude, (forecastError,forecastData) => {
            if(forecastError){
                return res.send({
                    error:forecastError
                })
            }
            res.send({
                location:place,
                forecast:forecastData
            })
           // console.log(chalk.bgGreen()    
        })    
    })


})

app.get('/products',(req,res) => {
    if(!req.query.search){
       return  res.send({
            "error": "Buddy add some search"
        })
    }
    res.send({
        products:[]
    })
})

app.get('/help/*r' ,(req,res) => {
        res.render('error',{
        title:'Page Not Found :(',
        name: 'Ratika Rastogi',
        errorText:'The help page does not exist. Please specify a correct url to load'
    })
})

app.get('/*rr',(req,res) => {    
    res.render('error',{
        title:'Page Not Found :(',
        name: 'Ratika Rastogi',
        errorText:'The page does not exist. Please specify a correct url to load'
    })
})
app.listen(3000,()=>{
    console.log(chalk.bgGreenBright("Server is up an running on port 3000"))
})