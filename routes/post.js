const express = require('express');
const router = express.Router();
const Post = require('../models/post.js');
const User = require('../models/user.js');
const Topic = require('../models/topic.js');
const {getUserFollowedTopics} = require('../controllers/home.js');

router.get("/createPost", (req, res) => {
    if(req.isAuthenticated()) {
        const topics = getUserFollowedTopics(req.user.id);
        res.render('createPost.ejs', {topics: topics});
    }  
    else {
        res.redirect('/auth/login');
    }
});

router.post("/createPost", (req, res) => {
    console.log(req.body);
    if(req.isAuthenticated()) {
        console.log(req.body.postImage);
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

router.get("/:postID", (req, res) => {
    postID = req.params.postID;
    Post.findOne({_id: postID}).then((post) => {
        res.render('post.ejs', {post: post});
    }).catch((err) => {
        console.log(err);
        res.render('404.ejs');} );
});

router.post("/:postID/function", (req, res) => {
    const postID = req.body.postID;
    console.log(postID);
    const type = req.body.type;
    if(type == "like") {
        return res.json({likes:101});
    }
    else if(type == "dislike") {
        return res.json({dislikes:10});
    }
    else if(type == "save") {
        return res.json({save:"true"});
    }
});

router.delete("/:postID", async (req, res) => {
    const postID = req.params.postID;
    const post = await Post.findOne({_id: postID});
    const topic = await Topic.findOne({topicName: post.postTopic});
    topic.topicPosts = topic.topicPosts.filter((post) => post != postID);
    topic.save();
    const user = await User.findOne({_id: post.postCreatorID});
    user.postsCreated = user.postsCreated.filter((post) => post != postID);
    user.save();
    Post.findOneAndRemove({_id: postID}).then((result) => {
        console.log("Post deleted");
        res.json({redirect: '/home'});
    }).catch((err) => console.log(err));
});




module.exports = router;