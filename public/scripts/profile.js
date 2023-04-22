$('.delete').on("click", function(event) {
    const classList = event.target.classList;
    if(classList.contains("delete")) {
        const postID = $(event.target).attr('id');
        console.log(postID);
        var options = {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({postID: postID})
        };
        fetch("/post/"+postID, options).then(console.log(response => response.json()))
        .then(window.location.href = "/home");
    } 
});
    //appen as url to post image });