import request from 'postman-request'

export function geocode  (address,callback) {
    const url = 'https://api.mapbox.com/search/geocode/v6/forward?q='+ encodeURIComponent(address) +'&access_token=pk.eyJ1IjoicmF0aWthcmFzdG9naTEiLCJhIjoiY21jZDR4Z2JoMGVtMjJpczN1OWRkNTQ5ayJ9.qM1aWyHM-KC0r3cngw8RpQ&limit=1'
    
    request({url, json:true}, (error, {body}) => {
        if(error){
            callback('Unable to coonect to the geocode service!!',undefined)
        } else if (body.error_code || body.features.length === 0){
            callback('Unable to find location for the given data try again......',undefined)
        } else {
            console.log("from geocode"+body.features[0].properties.full_address)
            callback(undefined,{
                latitude:body.features[0].properties.coordinates.latitude,
                longitude:body.features[0].properties.coordinates.longitude,
                place:body.features[0].properties.full_address
            })
        }
    })
}