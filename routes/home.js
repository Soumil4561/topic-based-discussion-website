const express = require('express');
const router = express.Router();
const {createnewTopic,getUserFollowedTopicsTest} = require('../database/topic.js');
const {createnewPost, getUserPostTest} = require('../database/post.js');

router.get('/home', (req, res) => {
    if(req.isAuthenticated()) {
        const topics = getUserFollowedTopicsTest('123');
        const posts = getUserPostTest("req.user.id");
        res.render('home.ejs', {topics: topics, posts: posts});
    }
    else {
        res.redirect('/auth/login');
    }
});

module.exports = router;