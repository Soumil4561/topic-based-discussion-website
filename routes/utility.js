const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');
const Post = require('../models/post');
const User = require('../models/user');
const {addComment, likeComment, dislikeComment, deleteComment} = require('../controllers/comment');

router.post("/createComment", (req, res) => {
    if(req.isAuthenticated()) {
        const comment = new Comment({
            commentContent: req.body.commentContent,
            commentCreatorID: req.user.id,
            commentCreated: Date.now(),
            commentCreatorName: req.user.username,
            commentLikes: 0,
            commentDislikes: 0,
            commentReplies: [],
            commentParent: null,
            commentPost: req.body.commentPost
        });
        return addComment(comment, req.body.commentPost, req.user.id);
        res.redirect('/post/'+req.body.commentPost);
    }
    else {
        res.redirect('/auth/login');
    }
});

router.post("/comment", (req, res) => {
    if(req.isAuthenticated()) {
        if (req.body.type == "like") return likeComment(req.body.commentID, req.user.id);
        else if (req.body.type == "dislike") return dislikeComment(req.body.commentID, req.user.id);
        res.redirect('/post/'+req.body.commentPost);
    }
    else {
        res.redirect('/auth/login');
    }
});

router.delete("/deleteComment", (req, res) => {
    if(req.isAuthenticated()) {
        deleteComment(req.body.commentID, req.body.commentPost);
        res.redirect('/post/'+req.body.commentPost);
    }
    else {
        res.redirect('/auth/login');
    }
});

router.patch("/replyComment", (req, res) => {
    if(req.isAuthenticated()) {
        const comment = new Comment({
            commentContent: req.body.commentContent,
            commentCreatorID: req.user.id,
            commentCreated: Date.now(),
            commentCreatorName: req.user.username,
            commentLikes: 0,
            commentDislikes: 0,
            commentReplies: [],
            commentParent: req.body.commentParent,
            commentPost: req.body.commentPost
        });
        addComment(comment, req.body.commentPost, req.user.id);
        res.redirect('/post/'+req.body.commentPost);
    }
    else {
        res.redirect('/auth/login');
    }
});

module.exports = router;