const request = require('request')


const forecast = (lat , long , callback) => {

    const url = 'https://api.darksky.net/forecast/ef1fd20bda35b4e9593ffa7d750ea8b5/'+ lat + ',' + long

    request( {url , json:true} , (error , {body}) => {

        if (error ){
            callback('Connection not found!' , undefined)
        } 
        else if (body.error){
            callback('Location not found!' , undefined)
        } 
        else{
            const city = '\nTimeZone: ' + body.timezone
            const currentWeather = '\nWeather currently ' + body.currently.summary 
            const hourlyWeather = '\nWeather hourly ' + body.hourly.summary 
            callback(undefined , currentWeather)
        }
    })


}

module.exports = (forecast)