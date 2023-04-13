const express = require('express');
const router = express.Router();

const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const {createnewTopic,getUserFollowedTopicsTest} = require('../database/topic.js');
const {createnewPost, getUserPostTest} = require('../database/post.js');

const app = express();

app.use(session({
    secret:process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

const User = require('../models/user');

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

router.get('/register', (req, res) => {
    res.render('register.ejs');
});

router.post('/register', (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email
    });

    User.register(user, req.body.password, (err, user) => {
        if(err) {
            console.log(err);
            if(err.code === 11000) {
                console.log('Duplicate email');
            }
            res.redirect('/register');
        }
        else {
            passport.authenticate('local')(req, res, () => {
                res.redirect('/home');
            });
        }
    });
});

router.get('/login', (req, res) => {
    res.render('login.ejs');
});

router.post('/login', (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });
    console.log(user);

    req.login(user, (err) => {
        if(err) {
            console.log(err);
        }
        else {
            passport.authenticate('local')(req, res, () => {
                res.redirect('/home');
            });
        }
    });
});

router.get('/home', (req, res) => {
    const topics = getUserFollowedTopicsTest('123');
    const posts = getUserPostTest("req.user.id");
    res.render('home.ejs', {topics: topics, posts: posts});
});

module.exports = router;