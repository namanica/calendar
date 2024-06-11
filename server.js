const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Todo = require('./models/todos');

const app = express();
const PORT = 3000;
const db = 'mongodb+srv://tymur_naboka:1ikuoFfdOrE0RdQe@calendar.9w5ltgm.mongodb.net/Calendar-todos?retryWrites=true&w=majority&appName=Calendar';

app.use(express.static(path.join(__dirname)));

app.use(express.json());

app.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`listening port ${PORT}`);
});

mongoose
.connect(db)
.then(() => {
    console.log('connected to DB');
})
.catch((error) => {
    console.log(error);
});

app.post('/add-todo', (req, res) => {
    const { data, time, todo, author } = req.body;
    const post = new Todo({
        data,
        time,
        todo,
        author
    });

    post
        .save()
        .then((result) => {
            res.status(201).json(result);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});
