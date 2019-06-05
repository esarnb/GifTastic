/*
    <p id="topics"></p>

    <div class="container">

        <p id="gifs"></p>

        <!-- Form to ask user what topic to look for -->

    </div>
*/

// Global Variables
var topics = ["stars", "galaxy", "nebulas", "earth", "mars", "black hole"];
var topicDOM = $("#topics");
var gifDOM = $("#gifs");


 //Functions
 function addButtons() {
    topicDOM.empty();
    for (var i = 0; i < topics.length; i++) {
        var newBtn = $("<button>");
        newBtn.attr("data-topic", topics[i])
        newBtn.addClass("apiBtn");
        newBtn.text(topics[i]);

        topicDOM.append(newBtn);
    }
 }

 function ajaxCall(search) {
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=P7kpXhj98SICbOhqVNiHA8s6cG9p7mJy";

    queryURL += "&q=" + search.replace(" ","+");
    queryURL += "&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        appendGifs(response);
    })
 }

 function appendGifs(response) {
     console.log(response);
        
    //  for (var i = 0; i < topics.length; i++) {
    //     topicDOM.empty();

    //     var newBtn = $("<button>");
    //     newBtn.attr("position", i);
    //     newBtn.attr("data-still", stillURL);
    //     newBtn.attr("data-animate", animateURL);
    //     newBtn.addClass("gifBtn");

    // }     
 }

$(document).ready(function() {
    //Load up default topics
    addButtons();
    //On each topic btn, run ajax call
    $(".apiBtn").on("click", function() {
        ajaxCall($(this).attr("data-topic"))
    })
})


