
$(".join-button").on('click', function(event) {
    const classList = event.target.classList;
    if(classList.contains("joined")) {
        // leave the topic
        const topicID = $(".join-button").attr('id');
        var options = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({topicID: topicID, type: "leave"})
        };
        fetch("/topic/follow", options).then(console.log(response => response.json()))
        .then($(event.target).removeClass("joined").addClass("join").html("Join"));}
    else if(classList.contains("join")) {
        // join the topic
        const topicID = $(".join-button").attr('id');
        console.log(topicID);
        var options = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({topicID: topicID, type: "join"})
        };
        fetch("/topic/follow", options).then(console.log(response => response.json()))
        .then($(event.target).removeClass("join").addClass("joined").html("Joined"));
    }
    else{
        window.location.href = "/auth/login";
    }
});

