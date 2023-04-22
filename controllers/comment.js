const Comment = require('../models/comment');
const Post = require('../models/post');
const User = require('../models/user');

const addComment = async (comment, postID, userID) =>{
    try{
        await Post.updateOne({_id: postID}, {$push: {comments: comment._id}});
        await User.updateOne({_id: userID}, {$push: {comments: comment._id}});
        await comment.save();
    }
    catch(err){
        console.log(err);
    }
}

const likeComment = async (commentID, userID) =>{
    // Check if user has already liked the comment
}

const dislikeComment = async (commentID, userID) =>{
    // Check if user has already disliked the comment
}

const deleteComment = async (commentID, postID) =>{
    // Delete comment from post
    // Delete comment from user
    // Delete comment from database
}



module.exports = {addComment, likeComment, dislikeComment, deleteComment};