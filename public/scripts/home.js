$(".post").on("click", function(event) {
    var hasNumber = /\d/;
    if(hasNumber.test(event.target.classList[1]) && !event.target.classList.contains("postButton")){
        window.location.href = "/post/" + event.target.classList[1];
    }
});

$("#likebutton").on("click", async function(event) {
    const postID = event.target.classList[1];
    console.log(event.target.classList); 
    console.log(postID);
    var options = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({postID: postID})
        };
    fetch("/post/" + postID + "/like", options).then(response =>response.json())
    .then(data => { console.log(data); });
});