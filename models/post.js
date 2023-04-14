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
        required: true
    },

    likes: {
        type: Number,
        required: true
    },

    dislikes: {
        type: Number,
        required: true
    },

    comments: {
        type: Array,
        required: true
    },

    userCreated:{
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

const post = mongoose.model('post', postSchema);

