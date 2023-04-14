const mongoose = require('../config/db');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;
const findOrCreate = require('mongoose-findorcreate');

const userSchema = new Schema({
    username:{
        type: String,
        //required: true,
        unique: true
    },
    
    password:{
        type: String,
        //required: false
    },
    
    email:{
        type: String,
        //required: true,
        unique: true,
        matches: [/.+@.+\..+/, "Please enter a valid e-mail address"]
    },

    profilePhoto: String,

    googleID:{
        type: String
    },
    
    userCreated:{
        type: Date,
        default: Date.now
    },
    
    topicsFollowed:[{
        type: Schema.Types.ObjectId,
        ref: "Topic"
    }],
    
    topicsCreated:[{
        type: Schema.Types.ObjectId,
        ref: "Topic"
    }],
    
    commentsCreated:[{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }],
    
    savedPosts: [{
        type: Schema.Types.ObjectId,
        ref: "Post"
    }],
    
    commentsLiked:[{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }],
    
    postsLiked:[{
        type: Schema.Types.ObjectId,
        ref: "Post"
    }],
    
    postsDisliked:[{
        type: Schema.Types.ObjectId,
        ref: "Post"
    }],
    
    commentsDisliked:[{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }],
    
    postsCreated:[{
        type: Schema.Types.ObjectId,
        ref: "Post"
    }]
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = mongoose.model("User", userSchema);

module.exports = User;

