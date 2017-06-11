const app = require('express')()
const db = require('mongoose')

// Controllers
const eventbriteController = require('./controllers/eventbrite')
const torontoController = require('./controllers/toronto')

// Database
db.connect('db')
torontoController.update()
setInterval(() => {
  torontoController.update()
}, 24 * 60 * 60 * 1000)

// Endpoints
app.get('/eventbrite/events', eventbriteController.events)
app.get('/eventbrite/venues/:venue', eventbriteController.venues)
app.get('/toronto', torontoController.events)

app.listen(3001)
