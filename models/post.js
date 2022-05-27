const mongoose = require('mongoose');

const attendingSchema = mongoose.Schema({
  username: String,
  userId: { type: mongoose.Schema.Types.ObjectId }
})

// A post has many likes, a like belongs to a POST
const postSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}, // referencing a model
    photoUrl: String,
    description: String,
    eventName: String,
    requirements: String,
    address: String,
    date: String,
    time: String,
    admission: String,
    attending: [attendingSchema] // embedded schema
  })
 

module.exports = mongoose.model('Post', postSchema);