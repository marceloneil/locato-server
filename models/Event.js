const db = require('mongoose')

const eventSchema = new db.Schema({
  name: String,
  description: String,
  location: String,
  time: Date,
  categories: [String],
  cost: Number,
  url: String,
  photo: String
})

const Event = db.model('Event', eventSchema)

module.exports = Event
