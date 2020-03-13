const express = require('express');
const path = require('path');
const fs = require('fs');
const morgan = require('morgan');
const createError = require('http-errors');
const cors = require('cors');
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://samuel:Sam13792805@cluster0-leqzf.mongodb.net/thegreatpizza?retryWrites=true&w=majority",{ useNewUrlParser: true,useUnifiedTopology: true });


const app = express();
app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('combined', { stream: fs.createWriteStream('app.log', { flags: 'a' }) }))

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

const pizza = require('./routes/pizza');
const topping = require('./routes/topping');
app.use('/pizza', pizza);
app.use('/topping', topping);

app.use((req, res, next) => {
    next(createError(404));
});
app.use((err, req, res, next) => {
    next(createError(400, err));
});

module.exports = app;