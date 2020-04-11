const request = require('request')

const currentWeather = (address, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=e5c1b65a6b2145d85f693958255158e5&query='+ address +'&units=m'

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('http://api.weatherstack.com/current is not available', undefined)
        } else if (body.error) {
            callback('Incorrect location passed to API', undefined)
        } else {
            callback(undefined, {
                location: body.location.name + ', ' + body.location.region + ', ' + body.location.country,
                current: 'It is ' + body.current.weather_descriptions[0] + ' now. Current temparature ' + body.current.temperature + ' & it feels like '+ body.current.feelslike + '. Humidity is ' + body.current.humidity + ' with rain % ' + body.current.precip,
                time: 'Local time ' + body.location.localtime + ' & temprature recording time ' + body.current.observation_time
            })
        }
    })
}

module.exports = {
    currentWeather: currentWeather
}    