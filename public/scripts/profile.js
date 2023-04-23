$(".delete").on("click", function(event) {
    const classList = event.target.classList;
    if(classList.contains("delete")) {
        const postID = $(event.target).attr('id');
        var options = {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({postID: postID})
        };
        fetch("/post/"+postID, options).then(res => {
            if(res.status == 200){
                res.json().then(data => {
                    $("."+postID).remove();
                })
            }
        });
    } 
});

// $(".edit").on("click", function(event) {
//     const classList = event.target.classList;
//     if(classList.contains("edit")) {
//         const postID = $(event.target).attr('id');
//         var options = {
//             method: "GET",
//             headers: {"Content-Type": "application/json"},
//             body: JSON.stringify({postID: postID})
//         };
//         fetch("/post/"+postID+"/edit", options).then(res => {
//             if(res.status == 200){
//                 res.json().then(data => {
//                     wind
//             }
//         });
//     } 
// });

    //appen as url to post image });