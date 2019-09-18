var topics = ["anaconda", "boar", "cat", "dog", "elephant", "fish", "giraffe", "hippo", "gorilla", "jackal", "iguana","llama","monkey","newt"];
var apiKey = "ShmyFeKw9JQGtRlJkQypZSgpphZCyW6T";
var resultLimit = 10;
var resultRating = "G";
$(window).on("load", function(){
    for ( var i = 0; i < topics.length; i++){
        var button = $("<button>");
        button.attr("type", button);
        button.attr("data-topic", topics[i]);
        button.addClass("topicButton btn btn-info m-2");
        button.text(topics[i]);
        $("#buttonColumn").prepend(button);
    }
});

$(document).on("click",".topicButton", function(){
    $("#cardColumns").html("");
    var searchTopic = $(this).attr("data-topic");
    console.log(searchTopic);
    displayResults(searchTopic);
});

function displayResults(passedTopic){
    var searchTopic = passedTopic;
    queryURL = "https://api.giphy.com/v1/gifs/search?api_key="+apiKey+"&q="+searchTopic+"&limit="+resultLimit+"&offset=0&rating="+resultRating+"&lang=en"
    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(response){
        console.log(response);
        console.log(response.data.length);
        for (var i = 0; i < response.data.length; i++){
            var card = $("<div>").addClass("card");
            //Card Image
            var cardImg = $("<img>").addClass("card-img-top");
            cardImg.attr("src",response.data[i].images.fixed_height.url);
            cardImg.attr("alt",searchTopic+i);
            card.append(cardImg);
            //Card Body
            var cardBody = $("<div>").addClass("card-body");
            var cardBodyTitle = $("<h5>").addClass("card-title");
            cardBodyTitle.text(searchTopic);
            var cardBodyText = $("<p>").addClass("card-text");
            cardBodyText.html("The above image is rated: <b>"+response.data[i].rating.toUpperCase()+"</b>");
            cardBody.append(cardBodyTitle);
            cardBody.append(cardBodyText);
            card.append(cardBody);
            //Append to html
            $("#cardColumns").append(card);
        }
    });
}