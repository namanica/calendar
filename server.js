const express = require('express');
const path = require('path');
const fs = require('fs');
const Todo = require('./models/todos');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname)));

app.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`listening port ${PORT}`);

});

app.post('/add-todo', (req, res) => {
    const { data, time, todo, author } = req.body;
    const post = new Todo({data, time, todo, author});
    post
    .save()
    .then((result) => {
        res.send(result);
    })
    .catch((error) => {
        console.log(error);
    })
});