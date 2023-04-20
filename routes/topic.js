const express = require('express');
const router = express.Router();
const Topic = require('../models/topic.js');
const User = require('../models/user.js');
const Post = require('../models/post.js');
const nodeNotifier = require('node-notifier');

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
            nodeNotifier.notify('Topic already exists. redirecting to that topic');
            res.redirect('/topic/'+topic.topicName);
        }
        else res.redirect('/home');
    });
}); 

router.get("/:topicName", async (req, res) => {
    const user = await User.findById({_id: req.user.id});
    try {
        const topicName = req.params.topicName;
        let topic = await Topic.find({topicName: topicName});
        topic = topic[0];
        let len = topic.topicPosts.length;
        let post =[]
        post = topic.topicPosts;
        var posts = [];
        for(let i = len-1; i>=0; i--) {
            let epost = await Post.findById({_id: post[i]});
            posts.push(epost);
            
        }
        console.log(posts);
        res.render('topic.ejs', {topic: topic, posts: posts, user:user});
    } catch (error) {
        console.log(error);
        res.status(404).render('404.ejs',{user:user});  
    }
});







module.exports = router;

