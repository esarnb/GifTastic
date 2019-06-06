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
     gifDOM.empty();
     console.log(response);
     var staticGif, animatedGif;
     var newRow = $("<div>").addClass("row");
     for (var i = 0; i < response.data.length; i++) {
        staticGif = response.data[i].images.downsized_still.url;
        animatedGif = response.data[i].images.downsized.url;
         
        var newColumn = $("<div>").addClass("column");     
        
        var newGif = $("<img>");
            newGif.attr("src", staticGif);
            newGif.attr("alt", topics[i] + " gif number " + (i+1))
            newGif.attr("data-still", staticGif);
            newGif.attr("data-animate", animatedGif);
            newGif.addClass("gifBtn");
        
        var gifText = $("<div>");
            gifText.addClass("sideBySide")
            gifText.text("Rating: ");
            gifText.append("<br>")
            gifText.append(newGif)
            
        newColumn.append(gifText)
        newRow.append(newColumn);
            // gifDOM.append(gifText);
        console.log(i);
        
        if ((i+1) % 5 == 0) {
            //new row
            console.log("newrow" + i);
            
            gifDOM.append(newRow);
            newRow = $("<div>").addClass("row")
       }

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


