const express = require("express");
const router = express.Router();
const mongoose = require("../config/db");
const Topic = require("../models/topic.js");
const Post = require("../models/post.js");
const User = require("../models/user.js");
const { getUserFollowedTopics, getPosts } = require("../controllers/home.js");

router.get("/", (req, res) => {
  res.redirect("/home");
});

router.get("/home", async (req, res) => {
  if (req.isAuthenticated()) {
    const user = await User.findOne({ _id: req.user.id });
    const topics = await getUserFollowedTopics(req.user.id);
    const posts = await getPosts(topics);
    res.render("home", { topics: topics, posts: posts, user: user });
  } else {
    res.redirect("/auth/login");
  }
});

module.exports = router;
