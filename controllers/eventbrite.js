const request = require('request');

module.exports = (req, res) => {
    request.get('https://www.eventbriteapi.com/v3/events/search/', {
        'auth': {
            'bearer': process.env.EVENTBRITE_TOKEN
        },
        'qs': {
            'location.latitude': req.query.lat,
            'location.longitude': req.query.lng
        }
    }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            res.json(body);
        } else if (response.statusCode === 401) {
            console.error("Eventbrite: Invalid Token");
        }
        if (error) {
            console.error(error);
        }
    });
};
