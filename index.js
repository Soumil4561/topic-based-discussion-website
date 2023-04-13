//jshint esversion:6
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(express.static('public'));

const router = require('./routes/auth.js');
app.use('/', router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Server started on port 3000');
});