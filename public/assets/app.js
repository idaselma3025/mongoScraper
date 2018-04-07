$(document).ready(function(){
  $.getJSON("/headlines",function(data){
    for (var i =0; i<data.length;i++){
      $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "<br />" + data[i].quote+"</p>");
    }
  });
});
$(document).on("click","p",function(){
  $("#notes").empty();
  var thisId = $(this).attr("data-id");
  $.ajax({
    method:"GET",
    url:"/headlines/"+thisId
  })
  .then(function(data){
    $("#notes").append("<h2>"+data.title+"</h2>");
    $("#notes").append("<input id='titleinput' name='title' >");
    $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
    $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
    if (data.note) {
      // Place the title of the note in the title input
      $("#titleinput").val(data.note.title);
      // Place the body of the note in the body textarea
      $("#bodyinput").val(data.note.body);
    }

  });
});

$(document).on("click", "#savenote", function() {
  var thisId = $(this).attr("data-id");
$.ajax({
  method: "POST",
  url: "/headlines/" + thisId,
  data: {
  title: $("#titleinput").val(),
  body: $("#bodyinput").val()
},
  })
    .then(function(data) {
      console.log(data);
      $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});
