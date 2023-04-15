const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title:{
        type: String,
        required: true
    },

    content:{
        type: String,
        required: true
    },

    image:{
        type: String,
        required: false
    },

    topic:{
        type: String,
        required: true
    },

    dateCreated:{
        type: Date,
        default: Date.now,
        required: true
    },

    likes: {
        type: Number
    },

    dislikes: {
        type: Number
    },

    comments: {
        type: Array
    },

    authorName: {
        type: String,
        required: true
    },

    authorId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

const post = mongoose.model('post', postSchema);

module.exports = post;

