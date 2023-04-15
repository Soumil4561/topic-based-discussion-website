const express = require('express');
const router = express.Router();

router.get("/:postID", (req, res) => {
    postID = req.params.postID;
});

router.get("/createPost", (req, res) => {
    if(req.isAuthenticated()) {
        res.render('createPost.ejs');
    }  
    else {
        res.redirect('/auth/login');
    }
});

module.exports = router;