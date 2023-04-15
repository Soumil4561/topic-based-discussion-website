const express = require('express');
const router = express.Router();
const Post = require('../models/post.js');
const User = require('../models/user.js');
const Topic = require('../models/topic.js');

router.get("/createPost", (req, res) => {
    if(req.isAuthenticated()) {
        res.render('createPost.ejs');
    }  
    else {
        res.redirect('/auth/login');
    }
});

router.post("/createPost", (req, res) => {
    console.log(req.body);
    if(req.isAuthenticated()) {
        const post = new Post({
            postTitle: req.body.postTitle,
            postContent: req.body.postContent,
            postCreatorID: req.user.id,
            postCreated: Date.now(),
            postTopic: req.body.postTopic,
            likes: 0,
            dislikes: 0,
            comments: []
        });
        if(req.body.postImage != null) {
            post.postImage = req.body.postImage;
        }
        post.save().then((result) => {
            Topic.findOne({_id: result.postTopic}).then((topic) => {
                topic.topicPosts.push(result._id);
                topic.save();
            }).catch((err) => console.log(err));

            User.findOne({_id: result.postCreatorID}).then((user) => {
                user.postsCreated.push(result._id);
                user.save();
            }).catch((err) => console.log(err));
            res.redirect('/post/'+post._id);
        }).catch((err) => console.log(err));
    }
    else {
        res.redirect('/auth/login');
    }
});

router.get("/:postID", (req, res) => {
    postID = req.params.postID;
});

module.exports = router;