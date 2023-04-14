const express = require('express');
const router = express.Router();

const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
var GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();

const User = require('../models/user');

passport.use(User.createStrategy());

passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      cb(null, { id: user.id, username: user.username});
    });
  });

  passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
  });

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/home",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    // //console.log(profile);

    // const userinfo = User.findOne({googleID: profile.id});
    // console.log(userinfo);

    // if(userinfo === null) {
    //     console.log("No user found");
    //     const user = new User({
    //         username: profile.displayName,
    //         email: profile.emails[0].value,
    //         googleID: profile.id,
    //         profilePhoto: profile.photos[0].value
    //     });   
    //     user.save(function(err){
    //         if(err) console.log(err);
    //         return user;
    //     });
    // }
    // else {
    //     console.log("User found");
    //     return userinfo;
    // }

    User.findOrCreate({ googleID: profile.id }, function (err,result) {
        return cb(err, result);
    });
}));
    

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
            res.redirect('/auth/register');
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

router.get('/logout', (req, res) => {
    req.logout( function(err) {
        if(err) {
            console.log(err);}
            else {
                res.redirect('/home');
            }
    });
});

router.get('/setup', (req, res) => {
    console.log(req.profile);
    res.render('setup.ejs');
});

router.get('/google', passport.authenticate('google', { scope: ['profile',
'https://www.googleapis.com/auth/userinfo.email'] }));

router.get('/google/home', 
  passport.authenticate('google', { failureRedirect: 'auth/login' }),
  function(req, res) {
    // Successful authentication, redirects home.
    res.redirect('/home');
  });


module.exports = router;