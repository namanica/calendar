const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  data: {
    type: String,
    required: false,
  },
  time: {
    type: String,
    required: false,
  },
  todo: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: false,
  },
  userId: {
    type: String,
    required: true,
  },
}, {timestamps: true});

const Todos = mongoose.model('Todo', todoSchema);
module.exports = Todos;