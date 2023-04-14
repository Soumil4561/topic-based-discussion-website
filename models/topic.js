const mongoose = require("../config/db");
const Schema = mongoose.Schema;

const topicSchema = new Schema({
    topicName: {
        type: String,
        required: true,
        unique: true
    },

    topicDescription: {
        type: String,
        required: true
    },

    topicPhoto: String,

    topicBanner: String,

    topicCreator: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    topicCreated: {
        type: Date,
        default: Date.now
    },

    topicFollowers: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],

    topicPosts: [{
        type: Schema.Types.ObjectId,
        ref: "Post"
    }]
});

const Topic = mongoose.model("Topic", topicSchema);

module.exports = Topic;
