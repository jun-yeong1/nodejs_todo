const mongoose = require('mongoose');

const todoTaskSchema = new mongoose.Schema({
  content: {
    type: String,
    require: true
  },
  date: {
    type: String,
    require: true
  }
})

module.exports = mongoose.model('TodoTask', todoTaskSchema);