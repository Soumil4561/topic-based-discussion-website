const mongoose = require("../config/db");

const Topic = require('../models/topic.js');
const User = require('../models/user.js');
const Post = require('../models/post.js');

const getUserFollowedTopics  = function (userId) {
    Topic.find({topicFollowers: userId}).then((topics) => {
        console.log(topics);
        return topics;
    }).catch((err) => {
        console.log(err)
    });}

module.exports = getUserFollowedTopics;