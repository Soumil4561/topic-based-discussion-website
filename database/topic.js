//jshint esversion:6
const mongoose = require('mongoose');

const createnewTopic = function(topicObject) {
    //topicName, topicDescription, topicCreatorId, topicCreatorName, topicImage

    mongoose.connect('mongodb://127.0.0.1:27017/test1');

    mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
    mongoose.connection.once('open', () => {
    console.log('Database connected');
    });

    const topicSchema = new mongoose.Schema({
        name: String,
        description: String,
        creator: {
            id: String,
            name: String
        },
        image: String,
        posts: [String],
        followers: [String]
    });

    const Topic = mongoose.model('Topic', topicSchema);

    const topic = new Topic({
        name: topicObject.name,
        description: topicObject.description,
        creator: {
            id: topicObject.creator.id,
            name: topicObject.creator.name
        },
        image: topicObject.image,
        posts: topicObject.posts,
        followers: topicObject.followers
    });
        
    topic.save().then(() => {console.log("Successfully Saved")}).catch((err) => {console.log(err)});
}

const getUserTopics = function(userId) {
    mongoose.connect('mongodb://localhost:27017/test1');

    mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
    mongoose.connection.once('open', () => {
    console.log('Database connected');
    });

    const topicSchema = new mongoose.Schema({
        name: String,
        description: String,
        creator: {
            id: String,
            name: String
        },
        image: String,
        posts: [String],
        followers: [String]
    });

    const Topic = mongoose.model('Topic', topicSchema);
    
    Topic.find({creator: {id: userId}}, (err, topics) => {
        if(err) {
            console.log(err);
        }
        else {
            return topics;
        }
    });
}

const getUserFollowedTopics = function(userId) {
    mongoose.connect('mongodb://localhost:27017/test1');

    mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
    mongoose.connection.once('open', () => {
    console.log('Database connected');
    });

    const topicSchema = new mongoose.Schema({
        name: String,
        description: String,
        creator: {
            id: String,
            name: String
        },
        image: String,
        posts: [String],
        followers: [String]
    });

    const Topic = mongoose.model('Topic', topicSchema);
    
    Topic.find({followers: {id: userId}}, (err, topics) => {
        if(err) {
            console.log(err);
        }
        else {
            return topics;
        }
    });
}

const getUserFollowedTopicsTest = function(userId) {
    topics: ['topic1', 'topic2', 'topic3'];
    return topics;
}
module.exports = {createnewTopic, getUserTopics, getUserFollowedTopics, getUserFollowedTopicsTest};