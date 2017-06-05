const request = require('request')

// Models
const Event = require('../models/Event')

let date

let createEvent = (item) => {
    const calEvent = item.calEvent
    calEvent.dates.forEach((itemDate) => {
        const startDateTime = new Date(itemDate.startDateTime)
        if (date === startDateTime.toDateString()) { 
            let location = ''
            let categories = []
            let cost = 0
            let photo = ''
            if(calEvent.locations) {
                location = calEvent.locations[0].address
            }
            if(calEvent.category) {
                calEvent.category.forEach((category) => {
                    categories.push(category.name)
                })
            }
            if (calEvent.cost) {
                cost = parseFloat(calEvent.cost.adult)
            }
            if (calEvent.image) {
                photo = 'http://app.toronto.ca' + calEvent.image.url
            }
            Event.create({
                name: calEvent.eventName,
                description: calEvent.description,
                location: location,
                time: startDateTime,
                keywords: categories,
                categories: categories,
                cost: cost,
                url: calEvent.eventWebsite,
                photo: photo
            })
        }
    })
}     

exports.update = () => {
    Event.remove({}, (err) => {
        if(err) console.error(err)
    })
    request.get('http://app.toronto.ca/cc_sr_v1_app/data/edc_eventcal_APR', {
        'qs': {
            'limit': 500
        }
    }, (error, response, body) => {
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
