// Global Variables
var topics = ["stars", "galaxy", "nebulas", "earth", "mars", "black hole"];
var topicDOM = $("#topics");
var gifDOM = $("#gifs");
var search = $("#search")

 //Functions

 /**
  * Function creates default new buttons that searches
  * for a specific topic. A topic value and a class
  * for onClick is added to each button.
  */
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

 /**
  * 
  * @param {String} search is the phrase inputted
  * by the user for a specific search request
  * to the Giphy API. The response is sent to a
  * helper function for parsing.
  */
 function ajaxCall(search) {
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=P7kpXhj98SICbOhqVNiHA8s6cG9p7mJy";

    queryURL += "&q=" + search.replace(" ","+").replace("&","+");
    queryURL += "&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        appendGifs(response);
    })
 }

 /**
  * 
  * @param {Object} response holds the response per 
  * Ajax call. Each response will create 10 gifs
  * with data attributes of urls and an onClick class
  * is added. Each row contains 5 columns of gifs.
  * 
  */
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
        
        if ((i+1) % 5 == 0) {
            gifDOM.append(newRow);
            newRow = $("<div>").addClass("row")
       }
    }     
 }

/**
 * Once the website loads, default buttons, gifs, and
 * the search bar hook to respective click and submit
 * event listeners.
 */
$(document).ready(function() {
    //Load up default topics
    addButtons();
    //On 'this' topic btn, run ajax call to get pics
    $(".apiBtn").on("click", function() {
        ajaxCall($(this).attr("data-topic"))
    })

    //If pic is clicked, animate/still the gif
    $(".gifBtn").on("click", function() {
        //If still, animate, else reverse.
    })

    //Search listener for specific queries
    $("#searchForm").on("submit", function(event){
        var inputTopic = $("#search").val().trim()
        event.preventDefault();
        topics.push(inputTopic)
        $("#search").val("");
        ajaxCall(inputTopic)
        addButtons()
        
    })
})


