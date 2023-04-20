const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    postTitle:{
        type: String,
        required: true
    },

    postContent:{
        type: String,
        required: true
    },

    postImage:{
        type: String,
        required: false
    },

    postTopic:{
        type: String,
        required: true
    },

    postCreated:{
        type: Date,
        default: Date.now,
        required: true
    },

    likes: {
        type: Number,
        default: 0
    },

    dislikes: {
        type: Number,
        default: 0
    },

    comments: {
        type: Array
    },

    postCreatorName: {
        type: String,
        default: "Anonymous",
        required: false
    },

    postCreatorID: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

const post = mongoose.model('post', postSchema);

module.exports = post;

