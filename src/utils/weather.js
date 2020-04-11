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
                location: body.location.name,
                current: 'It is ' + body.current.weather_descriptions[0] + ' now. Current temparature is ' + body.current.temperature + ' & it feels like '+ body.current.feelslike
                // temperature: body.current.temperature,
                // feelslike: body.current.feelslike,
                //type: body.current.weather_descriptions[0]
            })
        }
    })
}

module.exports = {
    currentWeather: currentWeather
}    