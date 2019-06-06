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
     var staticGif, animatedGif;
     for (var i = 0; i < topics.length; i++) {
        topicDOM.empty();
        staticGif = response.data[i].images.downsized_still.url;
        animatedGif = response.data[i].images.downsized_small.url;
        var newGif = $("<img>");
        newGif.attr("src", staticGif);
        newGif.attr("alt", topics[i] + " gif number " + (i+1))
        newGif.attr("data-still", staticGif);
        newGif.attr("data-animate", animatedGif);
        newGif.addClass("gifBtn");

        gifDOM.append(newGif);

    }     
 }

$(document).ready(function() {
    //Load up default topics
    addButtons();
    //On each topic btn, run ajax call
    $(".apiBtn").on("click", function() {
        ajaxCall($(this).attr("data-topic"))
    })

    $(".gifBtn").on("click", function() {
        //If still, animate, else reverse.
    })
})


