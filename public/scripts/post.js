$(".comment-button").click(function(event){
    const postID = event.target.id;
    const commentContent = $("textarea#user-comment").val();
    var body = {
        commentContent: commentContent,
        commentPost: postID
    }
    console.log("Comment button clicked");
    fetch("/utility/createComment", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
    }).then(res => {
        if(res.status == 200){
            res.json().then(data => {
                window.location.reload();
            })
        }
    })
});
