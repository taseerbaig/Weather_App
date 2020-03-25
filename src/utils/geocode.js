const request = require('request')


const geocode = (address , callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoiam9obndpY2s3ODAiLCJhIjoiY2s3dndseThjMWR5NzNnc2Y5cmlvbWMxaiJ9.GcPQSQXFAW4rs-pGU4Q-fg'

    request( {url , json:true} , (error , {body}) => {
        if (error){
            callback('Internet connection not found!' , undefined)
        }
    
        else if (body.features.length === 0) {
            callback('location not found!' , undefined)
        }
    
        else{
            const long = body.features[0].center[0]
            const lat = body.features[0].center[1]
            const loc = body.features[0].place_name

            callback( undefined , {
                long ,
                lat ,
                loc 
            })

        }
    })
}

module.exports = (geocode)