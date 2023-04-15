const express = require('express');
const router = express.Router();

router.get("/:topicName", (req, res) => {
    const topicName = req.params.topicName;
    Topic.find({topicName: topicName})
        .then((topic) => {
            if(!Array.isArray(topic.topicPosts)) {
                res.render('topic.ejs', {topic: topic, posts: []});
            }
            else{
                let numberOfPosts = topic.topicPosts.length;
                let posts = [];
                let i;
                for (i = numberOfPosts-1 ; i >= numberOfPosts-11; i--){
                    posts.push(Post.findOne({_id: topic.topicPosts[i]}));
                }
                res.render('topic.ejs', {topic: topic, posts: posts});
            }
            
        }).catch((err) => { console.log(err); });
});

router.get("/createTopic", (req, res) => {
    if(req.isAuthenticated()) {
        res.render('createTopic.ejs');
    }  
    else {
        res.redirect('/auth/login');
    }
});

router.post("/createTopic", (req,res) => {
    const topic = new Topic({
        topicName: req.body.topicName,
        topicDescription: req.body.topicDescription,
    });
    if(req.body.topicPhoto != null) {
        topic.topicPhoto = req.body.topicPhoto;
    }
    if(req.body.topicBanner != null) {
        topic.topicBanner = req.body.topicBanner;
    }
    topic.topicCreator = req.user.id;
    topic.topicCreated = Date.now();
    topic.topicFollowers = [req.user.id];
    topic.topicPosts = [];
    topic.save()
    .then((result) => {
        console.log(result);
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

module.exports = router;