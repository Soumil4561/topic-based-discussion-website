const express = require('express');
const router = express.Router();
const Post = require('../models/post.js');
const User = require('../models/user.js');
const Topic = require('../models/topic.js');
const Comment = require('../models/comment.js');
const {getUserFollowedTopics} = require('../controllers/home.js');
const {createPost, likePost, dislikePost, savePost, unsavePost, deletePost} = require('../controllers/post.js');

router.get("/createPost", (req, res) => {
    if(req.isAuthenticated()) {
        const topics = getUserFollowedTopics(req.user.id);
        res.render('createPost.ejs', {topics: topics});
    }  
    else {
        res.redirect('/auth/login');
    }
});

router.post("/createPost", async(req, res) => {
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
        if(req.user.username != null) {
            post.postCreatorName = req.user.username;
        }
        post.save().then((result) => {
            Topic.findOne({topicName: result.postTopic}).then((topic) => {
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

router.get("/:postID", async (req, res) => {
    const postID = req.params.postID;
    const post = await Post.findOne({_id: postID});
    var comments = [];
    for(var i = 0; i < post.comments.length; i++){
        const comment = await Comment.findOne({_id: post.comments[i]});
        comments.push(comment);
    }
    res.render('post.ejs', {post: post, comments: comments});
});

router.post("/:postID/function", async (req, res) => {
    const postID = req.body.postID;
    const type = req.body.type;
    if(req.isAuthenticated()){
        if(type == "like"){
            return likePost(postID, req.user.id);
        }
        else if(type == "dislike"){
            return dislikePost(postID, req.user.id);
        }
        else if(type == "save"){
            return savePost(postID, req.user.id);
        }
        else if(type == "unsave"){
            return unsavePost(postID, req.user.id);
        }
        res.redirect('/post/'+postID);
    }
});

router.delete("/:postID", async (req, res) => {
    if(!req.isAuthenticated()){
        console.log("Not authenticated");
        res.redirect('/auth/login');
    }
    else{
        const postID = req.body.postID;
        const post = await Post.findOne({_id: postID});
        if(req.user.id != post.postCreatorID){
            console.log("Not authorized");
            res.redirect('/post/'+postID);
        }
        else{
            console.log("Deleting post");
            Topic.updateOne({topicName: post.postTopic}, {$pull: {topicPosts: postID}});
            User.updateOne({_id: post.postCreatorID}, {$pull: {postsCreated: postID}});
            Post.findOneAndRemove({_id: postID}).then((result) => {
                console.log("Post deleted");
            }).catch((err) => console.log(err));
        }
    }
});

router.patch("/:postID", async (req, res) => {
    const postID = req.params.postID;
    const post = await Post.findOne({_id: postID});
    if(req.user.id != post.postCreatorID){
        res.redirect('/post/'+postID);
    }
    else{
        const body = req.body;
        Post.updateOne({_id: postID}, body).then((result) => {
            console.log("Post updated");
            res.json({redirect: '/post/'+postID});
        }).catch((err) => console.log(err));
    }
});



router.delete("/test", async (req, res) => {
    const postID = req.body.postID;
    const post = await Post.findOne({_id: postID});
    Topic.updateOne({topicName: post.postTopic}, {$pull: {topicPosts: postID}});
    User.updateOne({_id: post.postCreatorID}, {$pull: {postsCreated: postID}});
    Post.findOneAndRemove({_id: postID}).then((result) => {
        console.log("Post deleted");
        res.json({redirect: '/home'});
    }).catch((err) => console.log(err));
});



module.exports = router;