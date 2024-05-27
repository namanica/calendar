const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname)));

app.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`listening port ${PORT}`);

});

