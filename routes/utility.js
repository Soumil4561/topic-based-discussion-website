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
        addComment(comment, req.body.commentPost, req.user.id);
        res.redirect('/post/'+req.body.commentPost);
    }
    else {
        res.redirect('/auth/login');
    }
});