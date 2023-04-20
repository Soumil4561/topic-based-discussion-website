$(".post").on("click", function(event) {
    var hasNumber = /\d/;
    if(hasNumber.test(event.target.classList[1]) && event.target.classList.contains("postbutton")){
        window.location.href = "/post/" + event.target.classList[1];
    }
});

var flag = false;

// //const postbuttons = document.querySelectorAll(".postbutton");
// postbuttons.forEach((postbutton) => {
//     postbutton.addEventListener("click", (event) => {
//         flag = true;
//     });
// });

// $(".postbutton").on("click", function(event) {
//     flag = true;
// });


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
    .then(data => { $("#dislikes").html(data.dislikes) });
});

$("#savebutton").on("click", async function(event) {
    const postID = event.target.classList[1];
    var options = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({postID: postID, type: "save"})
        };
    fetch("/post/" + postID + "/function", options).then(response =>response.json())
    .then(data => { console.log(data); });
});