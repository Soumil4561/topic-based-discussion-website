const User = require("../models/user.js");
const Topic = require("../models/topic.js");
const Post = require("../models/post.js");

const likePost = async (postID, userID) => {
    //check if user has already liked the post
    if(await User.findOne({_id: userID, postsLiked: postID}) != null) {
        return {likes: await Post.findOne({_id: postID}, "likes")};
    }
    //check if user has already disliked the post
    if(await User.findOne({_id: userID, postsDisliked: postID}) != null) {
        await User.updateOne({_id: userID}, {$pull: {postsDisliked: postID}});
        const current = await Post.findOne({_id: postID}, "dislikes");
        var updatedDislikes = current.dislikes - 1;
        const body = {dislikes: updatedDislikes};
        await Post.updateOne({_id: postID}, body);
    }
    await User.updateOne({_id: userID}, {$push: {postsLiked: postID}});
    const current = await Post.findOne({_id: postID}, "likes dislikes");
    var updatedLikes = current.likes + 1;
    const body = {likes: updatedLikes};
    await Post.updateOne({_id: postID}, body);
    return body;
}

const dislikePost = async (postID, userID) => {
    //check if user has already disliked the post
    if(await User.findOne({_id: userID, postsDisliked: postID}) != null) {
        return {dislikes: await Post.findOne({_id: postID}, "dislikes")};
    }
    //check if user has already liked the post
    if(await User.findOne({_id: userID, postsLiked: postID}) != null) {
        await User.updateOne({_id: userID}, {$pull: {likedPosts: postID}});
        const currentLikes = await Post.findOne({_id: postID}, "likes");
        var updatedLIkes = currentLikes.likes - 1;
        const body = {likes: updatedLIkes};
        await Post.updateOne({_id: postID}, body);
    }
    await User.updateOne({_id: userID}, {$push: {postsDisliked: postID}});
    const current = await Post.findOne({_id: postID}, "likes dislikes");
    var updatedDislikes = current.dislikes + 1;
    const body = {likes: current.likes, dislikes: updatedDislikes};
    Post.updateOne({_id: postID}, body);
    return body;
}

const savePost = async (postID, userID) => {
    //check if user has already saved the post
    if(await User.findOne({_id: userID, savedPosts: postID}) != null) {
        return false;
    }
    await User.updateOne({_id: userID}, {$push: {savedPosts: postID}})
    .then(() => {return true}). catch(() => {return false});
    
}

const unsavePost = async (postID, userID) => {
    //check if user has already saved the post
    if(await User.findOne({_id: userID, savedPosts: postID}) == null) {
        return false;
    }
    await User.updateOne({_id: userID}, {$pull: {savedPosts: postID}})
    .then(() => {return true}). catch(() => {return false});
}

const deletePost = async (postID, userID) => {}

module.exports = {likePost, dislikePost, savePost, unsavePost, deletePost};