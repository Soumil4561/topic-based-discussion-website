let displayImage = document.getElementById("display-image");
$("#file-input").on("change", function () {
    let file = this.files[0];
    if (file) {
        let reader = new FileReader();
        reader.addEventListener("load", function () {
            displayImage.setAttribute("src", this.result);
        });
        reader.readAsDataURL(file);
    }
});

$(".button-submit").on('click', async (event) => {
    event.preventDefault();
    const postTitle = $("#postTitle").val();
    const postTopic = $("#postTopic").val();
    const postContent = $("#postContent").val();

    var body = {
        postTitle: postTitle,
        postTopic: postTopic,
        postContent: postContent
    }
    await fetch('/post/createPost', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    }).then(response => response.json()).then(data => {
        console.log(data);
        console.log("hello");
        window.location.href = "/home/profile";
    })
});

$(".button-edit").on('click', async (event) => {
    event.preventDefault();
    const postTitle = $("#postTitle").val();
    const postTopic = $("#postTopic").val();
    const postContent = $("#postContent").val();
    const postID = event.target.id;
    var body = {
        postTitle: postTitle,
        postTopic: postTopic,
        postContent: postContent
    }
    await fetch("/post/" + postID , {
        method: 'PATCH',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    }).then(response => response.json()).then(data => {
        console.log(data);
        console.log("hello");
        window.location.href = "/home/profile";
    }) 
});     