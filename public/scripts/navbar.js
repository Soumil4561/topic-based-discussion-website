$("#button").click(function() {
    $("#fn").toggle();
    $('#button').hide();
  });

  $("#button2").click(function() {
    $("#xd").toggle();
    $('#button2').hide();
  });

$(".searchTopics").keypress(async function(e) {
    var keyword = ($(".searchTopics").val()+e.originalEvent.key);
    if(keyword.length>2){
      var url = "/utility/searchTopic/"+keyword;
      let response = await fetch(url);
      let jsonData = await response.json();
      console.log(jsonData);
    }
});

  