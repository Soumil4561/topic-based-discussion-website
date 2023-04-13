const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

mongoose.connect(process.env.MONGO_HOST);

const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    
    password:{
        type: String,
        required: false
    },
    
    email:{
        type: String,
        required: true,
        unique: true,
        matches: [/.+@.+\..+/, "Please enter a valid e-mail address"]
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
const User = mongoose.model("User", userSchema);

module.exports = User;
