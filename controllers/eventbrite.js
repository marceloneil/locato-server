const request = require('request')

exports.events = (req, res) => {
  request.get('https://www.eventbriteapi.com/v3/events/search/', {
    'auth': {
      'bearer': process.env.EVENTBRITE_TOKEN
    },
    'qs': {
      'sort_by': 'date',
      'location.latitude': req.query.lat,
      'location.longitude': req.query.lng
    }
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      res.send(body)
    } else if (response.statusCode === 401) {
      res.status(401).send('Invalid Token')
    }
    if (error) {
      res.status(500).send(error)
    }
    res.status(500).send(body)
  })
}

exports.venues = (req, res) => {
  request.get('https://www.eventbriteapi.com/v3/venues/' + req.params.venue, {
    'auth': {
      'bearer': process.env.EVENTBRITE_TOKEN
    }
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      res.send(body)
    } else if (response.statusCode === 401) {
      res.status(401).send('Invalid Token')
    }
    if (error) {
      res.status(500).send(error)
    }
    res.status(500).send(body)
  })
}
