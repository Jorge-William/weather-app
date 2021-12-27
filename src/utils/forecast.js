const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=50da2620c7905022ca5dade68d7dc064&query=
    ${encodeURIComponent(latitude)}, ${encodeURIComponent(longitude)} &units=m`
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            const precip = body.current.precip
            callback(undefined, 'Its ' +
                body.current.weather_descriptions +
                ' and currently ' + body.current.temperature +
                'º. There is a ' + precip.toFixed(2.0) +
                '% chance of rain.' + ' Wind speed: ' + body.current.wind_speed +
                ', Humidity: ' + body.current.humidity)
        }
    })
}


module.exports = forecast