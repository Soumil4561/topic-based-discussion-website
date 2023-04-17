const mongoose = require("../config/db");

const Topic = require('../models/topic.js');
const Post = require('../models/post.js');
const User = require('../models/user.js');

const getUserFollowedTopics  = async function (userId) {
    try{
        const topicFollowed = await User.findById(userId, 'topicsFollowed');
        const topics = await Topic.find({_id: {$in: topicFollowed.topicsFollowed}},'topicName');
        return topics;
    }
    catch(err){
        console.log(err);
    }
}

const getPosts = async function (topicFollowed) {
    try{
        let posts = [];
        for (let i = 0; i < topicFollowed.length; i++) {
            const post = await Post.find({postTopic: topicFollowed[i].topicName});
            for (let j = 0; j < post.length; j++) {
                posts.push(post[j]);
            }
        }
        return posts;
    }
    catch(err){
        console.log(err);
    }
}

module.exports = {getUserFollowedTopics, getPosts};