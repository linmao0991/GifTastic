var topics = ["anaconda", "boar", "cat", "dog", "elephant", "fish", "giraffe", "hippo", "gorilla", "jackal", "iguana","llama","monkey","newt"];
var apiKey = "ShmyFeKw9JQGtRlJkQypZSgpphZCyW6T";
var resultLimit = 10;
var resultRating = "G";

//On window load event to create buttons for all the items in the array topics
$(window).on("load", function(){
    if(localStorage.storedTopic){
        topics = localStorage.storedTopic.split(",");
        for ( var i = 0; i < topics.length; i++){
            createButton(topics[i]);
        }
        console.log("Loading stored session storage");
        console.log(localStorage.storedTopic);
    }else{
        localStorage.setItem("storedTopic",topics);
        for ( var i = 0; i < topics.length; i++){
            createButton(topics[i]);
        }
        console.log("Create new session storage");
        console.log(localStorage.storedTopic);
    }
});

//On click function listining to id addTopic to add the input as a button.
$(document).on("click", "#addTopic", function(){
    var newTopic = $("#newTopic").val().trim().toLowerCase();
    if(topics.indexOf(newTopic) == -1 && newTopic != ""){
    createButton(newTopic);
    topics.push(newTopic);
    localStorage.setItem("storedTopic",topics);
    $("#newTopic").val("");
    }else if (newTopic == ""){
        //Do Nothing
    }else{
        alert("That topic is already in the list!");
        $("#newTopic").val("");
    }
});

$(document).on("click", "#clearLocalStorage", function(){
    if(localStorage.storedTopic){
        localStorage.removeItem("storedTopic");
        topics = ["anaconda", "boar", "cat", "dog", "elephant", "fish", "giraffe", "hippo", "gorilla", "jackal", "iguana","llama","monkey","newt"];
        $("#buttonColumn").html("");
        for (var i = 0; i < topics.length; i++){
            createButton(topics[i]);
        }
    }else{
        alert("No local storage found.");
    }
});

//On click function listining to class topicButton then calling displayResults to create gif cards 
$(document).on("click",".topicButton", function(){
    $("#cardColumns").html("");
    var searchTopic = $(this).attr("data-topic");
    displayResults(searchTopic);
});

//Function to create buttons for loading topic gifs
function createButton(topicString){
    var button = $("<button>");
    button.attr("type", button);
    button.attr("data-topic", topicString);
    button.addClass("topicButton btn btn-info m-2");
    button.text(topicString);
    $("#buttonColumn").prepend(button);
};

//Function to pause and play gif
$(document).on("click",".card-img-top", function(){
    var animate = $(this).attr("data-animate");
    if( animate == "pause"){
    $(this).attr("data-animate","play");
    $(this).attr("src",$(this).attr("data-gif-play"));
    }else{
        $(this).attr("data-animate","pause");
        $(this).attr("src",$(this).attr("data-gif-pause"));
    }
});

//Function to create card elements for each gif.
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
            cardImg.attr("src",response.data[i].images.fixed_height_still.url);
            cardImg.attr("alt",searchTopic+i);
            cardImg.attr("data-gif-pause",response.data[i].images.fixed_height_still.url)
            cardImg.attr("data-gif-play",response.data[i].images.fixed_height.url);
            cardImg.attr("data-animate","pause");
            card.append(cardImg);
            //Card Body
            var cardBody = $("<div>").addClass("card-body");
            var cardBodyTitle = $("<h5>").addClass("card-title border rounded p-1");
            cardBodyTitle.text(response.data[i].title);
            cardBody.append(cardBodyTitle);
            var cardBodyRating = $("<p>").addClass("card-text");
            cardBodyRating.html("The above image is rated: <b>"+response.data[i].rating.toUpperCase()+"</b>");
            cardBody.append(cardBodyRating);
            if(response.data[i].user !== undefined ){
                var cardBodyUser = $("<p>").addClass("card-text");
                cardBodyUser.html("<a href='"+response.data[i].user.profile_url+"'>- "+response.data[i].user.username+"</a>");
                cardBody.append(cardBodyUser);
            }else{
                var cardBodyUser = $("<p>").addClass("card-text");
                cardBodyUser.html("- Username Unavaliable");
                cardBody.append(cardBodyUser);
            }
            card.append(cardBody);
            //Append to html
            $("#cardColumns").append(card);
        }
    });
}