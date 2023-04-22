const User = require("../models/user.js");
const Topic = require("../models/topic.js");
const Post = require("../models/post.js");

const joinTopic = async (topicID, userID) => {
    //check if user has already joined the topic
    if(await User.findOne({_id: userID, topicsFollowed: topicID}) != null) {
        return false;
    }
    const user = await User.updateOne({_id: userID}, {$push: {topicsFollowed: topicID}});
    await Topic.updateOne({_id: topicID}, {$push: {topicFollowers: userID}})
    return true;
};

const leaveTopic = async (topicID, userID) => {
    //check if user has already joined the topic
    if(await User.findOne({_id: userID, topicsFollowed: topicID}) == null) {
        return false;
    }
    await User.updateOne({_id: userID}, {$pull: {topicsFollowed: topicID}});
    await Topic.updateOne({_id: topicID}, {$pull: {topicFollowers: userID}});
    return true;
};

module.exports = {joinTopic, leaveTopic};