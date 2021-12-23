const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
	res.render('index')
})

app.get('/about', (req, res) => {
	res.render('about', {
		"title": "Jorge William Dev"
	})
})

app.get('/help', (req, res) => {
	res.render('help', {
		"example": "Do this way."
	})
})

app.get('/weather', (req, res) => {
	if (!req.query.location) {
		return res.send({
			error: "Forneça um termo para busca!"
		})
	}

	geocode(req.query.location, (error, { latitude, logitude, location } = {}) => {
		if (error) {
			return (
				res.send({
					error
				})
			)
		}

		forecast(latitude, logitude, (error, forecastData) => {
			if (error) {
				return (
					res.send({
						error
					})
				)
			}
			res.send({
				forecast: forecastData,
				location,
				address: req.query.location
			})
		})
	})

})


app.get('/help/*', (req, res) => {
	res.send('Help page not found')
})

app.get('*', (req, res) => {
	res.render('404')
})

app.listen(port, () => {
	console.log('Server running in port ' + port);
})