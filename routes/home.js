const express = require('express');
const router = express.Router();
const mongoose = require("../config/db");
const Topic = require('../models/topic.js');
const Post = require('../models/post.js');
const getUserFollowedTopics = require('../database/topic.js');

router.get("/", (req, res) => {
    res.redirect('/home');
});

router.get('/home', (req, res) => {
    if(req.isAuthenticated()) {
        res.send('home page');
    }
    else {
        res.redirect('/auth/login');
    }
});

module.exports = router;