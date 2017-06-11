const request = require('request')

// Models
const Event = require('../models/Event')

let date

let createEvent = (item) => {
  const calEvent = item.calEvent
  calEvent.dates.forEach((itemDate) => {
    const startDateTime = new Date(itemDate.startDateTime)
    if (date === startDateTime.toDateString()) {
      let event = {
        name: calEvent.eventName,
        description: calEvent.description,
        location: '',
        time: startDateTime,
        categories: [],
        cost: 0,
        url: calEvent.eventWebsite,
        photo: ''
      }
      if (calEvent.locations) {
        event.location = calEvent.locations[0].address
      }
      if (calEvent.category) {
        calEvent.category.forEach((category) => {
          event.categories.push(category.name)
        })
      }
      if (calEvent.cost) {
        event.cost = parseFloat(calEvent.cost.adult)
      }
      if (calEvent.image) {
        event.photo = 'http://app.toronto.ca' + calEvent.image.url
      }
      for (let key in event) {
        if (event.hasOwnProperty(key)) {
          if (event[key] == null || event[key] === undefined) {
            if (key === 'categories') event[key] = []
            else if (key === 'cost') event[key] = 0
            else event[key] = ''
          }
        }
      }
      Event.create(event)
    }
  })
}

exports.update = () => {
  Event.remove({}, (err) => {
    if (err) console.error(err)
  })
  request.get('http://app.toronto.ca/cc_sr_v1_app/data/edc_eventcal_APR', {
    'qs': {
      'limit': 500
    }
  }, (err, response, body) => {
    if (err) console.error(err)
    date = new Date().toDateString()
    JSON.parse(body).forEach(createEvent)
  })
}

exports.events = (req, res) => {
  Event.find({}, {
    _id: 0,
    __v: 0
  }, (err, event) => {
    if (err) {
      res.status(500).send(err)
    }
    res.send(event)
  })
}
