const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Todo = require('./models/todos');
require('dotenv').config();

const Server = async () => {
  const chalk = await import('chalk');
  const errorMessage = chalk.default.blue.bgRed.bold;
  const successMessage = chalk.default.white.bgGreen.bold;

  const app = express();
  const PORT = 3000;
  const db = 'mongodb+srv://tymur_naboka:1ikuoFfdOrE0RdQe@calendar.9w5ltgm.mongodb.net/Calendar-todos?retryWrites=true&w=majority&appName=Calendar';

  app.use(express.static(path.join(__dirname)));
  app.use(express.json());

  app.listen(PORT, (error) => {
    if (error) {
      console.log(errorMessage(error));
    } else {
      console.log(successMessage(`listening port ${PORT}`));
    }
  });

  mongoose
    .connect(db)
    .then(() => {
      console.log(successMessage('connected to DB'));
    })
    .catch((error) => {
      console.log(errorMessage(error));
    });

  app.post('/add-todo', (req, res) => {
    const { data, time, todo, author } = req.body;
    const userId = req.ip;

    const post = new Todo({
      data,
      time,
      todo,
      author,
      userId,
    });

    post.save()
      .then((result) => {
        res.status(201).json(result);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ error: 'Error In Post Request' });
      });
  });

  app.get('/todos', (req, res) => {
    const userId = req.ip;

    Todo.find({ userId })
      .then((todos) => {
        const userTodos = todos.filter((todo) => todo.userId === userId);
        res.status(200).json(userTodos);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ error: 'Error In Get Request' });
      });
  });
};

Server();
