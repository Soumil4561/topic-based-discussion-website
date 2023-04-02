const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.use(express.static('public'));

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    //req.isAuthenticated() is a function that returns true if the user is logged in
    if(true) {
        res.redirect('/home');
    }
    else {
        res.redirect('/login');
    }
});

app.get('/home', (req, res) => {
    res.render('home.ejs');
});

app.get('/login', (req, res) => {
    res.render('login.ejs');
});

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log(username, password);
    //Check if the username and password are correct
    if(true) {
        res.redirect('/home');
    }
    else {
        res.redirect('/login');
    }
});

app.listen(PORT, () => {
    console.log('Server started on port 3000');
});