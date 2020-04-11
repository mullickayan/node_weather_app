const path = require('path')
const express = require('express')
const hbs = require('hbs')
const weather = require('./utils/weather')

const app = express()
const port = process.env.PORT || 3000

const publicPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

app.use(express.static(publicPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Ayan Mullick'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Ayan Mullick'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Ayan Mullick',
        msg: 'This is help page of the Weather App'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Query search term not supplied'
        })
    }

    weather.currentWeather(req.query.address, (error, data) => {
        if (error) {
            return res.send({
                error: error
            })                        
        }    

        res.send({
            address: req.query.address,
            location: data.location,
            forecast: data.current
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Error',
        name: 'Ayan Mullick',
        msg: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Error',
        name: 'Ayan Mullick',
        msg: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up and running on port ' + port)
})
