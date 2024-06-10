const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  data: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  todo: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
}, {timestamps: true});

const Todos = mongoose.model('Todo', todoSchema);
module.exports = Todos;