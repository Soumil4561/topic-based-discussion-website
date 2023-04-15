const express = require('express');
const router = express.Router();
const Topic = require('../models/topic.js');
const User = require('../models/user.js');
const Post = require('../models/post.js');

router.get("/createTopic", (req, res) => {
    if(req.isAuthenticated()) {
        res.render('createTopic');
    }  
    else {
        res.redirect('/auth/login');
    }
});

router.post("/createTopic", (req,res) => {
    const topic = new Topic({
        topicName: req.body.topicName,
        topicDescription: req.body.topicDescription,
        topicPosts: [],
        topicFollowers: [req.user.id],
        topicCreator: req.user.id,
        topicCreated: Date.now()

    });
    if(req.body.topicPhoto != null) {
        topic.topicPhoto = req.body.topicPhoto;
    }
    if(req.body.topicBanner != null) {
        topic.topicBanner = req.body.topicBanner;
    }
    console.log(topic);
    topic.save()
    .then((result) => {
        console.log(result);
        User.findOne({_id: req.user.id}).then((user) => {
            user.topicsFollowed.push(result._id);
            user.topicsCreated.push(result._id);
            user.save();}).catch((err) => console.log(err));
        res.redirect('/topic/'+topic.topicName);
    }).catch((err) => { 
        console.log(err);
        if(err.code === 11000) {
            console.log('Duplicate topic');
            res.redirect('/topic/'+topic.topicName);
        }
        else res.redirect('/home');
    });
});

router.get("/:topicName", (req, res) => {
    const topicName = req.params.topicName;
    Topic.findOne({topicName: topicName})
        .then((topic) => {
            if(!Array.isArray(topic.topicPosts)) {
                console.log('No posts');
                res.render('topic.ejs', {topic: topic, posts: []});
            }
            else{
                let numberOfPosts = topic.topicPosts.length;
                let posts = [];
                let i;
                for (i = numberOfPosts-1 ; i >= numberOfPosts-11; i--){
                    posts.push(Post.findOne({_id: topic.topicPosts[i]}));
                }
                console.log(posts);
                res.render('topic.ejs', {topic: topic, posts: posts});
            }
            
        }).catch((err) => { console.log(err); });
});



module.exports = router;