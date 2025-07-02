import request from 'postman-request'

export function geocode  (address,callback) {
    const url = 'https://api.mapbox.com/search/geocode/v6/forward?q='+ encodeURIComponent(address) +'&access_token=pk.eyJ1IjoicmF0aWthcmFzdG9naTEiLCJhIjoiY21jZDR4Z2JoMGVtMjJpczN1OWRkNTQ5ayJ9.qM1aWyHM-KC0r3cngw8RpQ&limit=1'
    
    request({url : url, json:true}, (error, response) => {
        if(error){
            callback('Unable to coonect to the geocode service!!',undefined)
        } else if (response.body.error_code || response.body.features.length === 0){
            callback('Unable to find location for the given data try again......',undefined)
        } else {
            console.log("from geocode"+response.body.features[0].properties.full_address)
            callback(undefined,{
                latitude:response.body.features[0].properties.coordinates.latitude,
                longitude:response.body.features[0].properties.coordinates.longitude,
                place:response.body.features[0].properties.full_address
            })
        }
    })
}