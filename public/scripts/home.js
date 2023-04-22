$(".post").on("click", function(event) {
    var hasNumber = /\d/;
    console.log(event.target.classList);
    if(hasNumber.test(event.target.classList[1]) && !event.target.classList.contains("postButton")){
        window.location.href = "/post/" + event.target.classList[1];
    }
});

$("#likebutton").on("click", async function(event) {
    const postID = event.target.classList[1];
    var options = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({postID: postID, type: "like"})
        };
    fetch("/post/" + postID + "/function", options).then(response =>response.json())
    .then(data => {
        $("#likes").html(data.likes);
        $("#dislikes").html(data.dislikes);
        $(event.target).removeClass("like").addClass("liked");
        $("#dislikebutton").removeClass("disliked").addClass("dislike");
     });
});

$("#dislikebutton").on("click", async function(event) {
    const postID = event.target.classList[1];
    var options = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({postID: postID, type: "dislike"})
        };
    fetch("/post/" + postID + "/function", options).then(response =>response.json())
    .then(data => {
         $("#dislikes").html(data.dislikes) 
         $("#likes").html(data.likes);
         $(event.target).removeClass("dislike").addClass("disliked");
         $("#likebutton").removeClass("liked").addClass("like");});
});

$("#savebutton").on("click", async function(event) {
    const postID = event.target.classList[1];
    var options = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({postID: postID, type: "save"})
        };
    fetch("/post/" + postID + "/function", options).then(response =>response.json())
    .then(data => {
        $("#saves").addClass("saved").removeClass("save");
    });
});