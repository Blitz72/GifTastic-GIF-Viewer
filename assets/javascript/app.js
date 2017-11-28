$(document).ready(function(){

var topics = ["Darth Vader", "Luke Skywalker", "Obi Wan Kenobi", "R2-D2", "C-3PO", "Jar Jar Binks",
 "James T. Kirk", "Mr. Spock", "Captain Picard", "Worf", "Commander Data", "Alf"];

 var newMessage = $('<div class="new-msg">');

// Function for displaying movie data
function renderButtons() {
  console.log(topics.length);
  // Deleting the movie buttons prior to adding new movie buttons
  // (this is necessary otherwise we will have repeat buttons)
  $("#buttons-view").empty();
  //Empties the text from the #topic-input text box
  $('#topic-input').val(null);

  // Looping through the array of movies
  for (var i = 0; i < topics.length; i++) {
    // Then dynamicaly generating buttons for each movie in the array.
    // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
    var btn = $("<button>");
    // Adding a class
    btn.addClass("topic");
    // Adding a data-attribute with a value of the movie at index i
    btn.attr("data-name", topics[i]);
    // Providing the button's text with a value of the movie at index i
    btn.text(topics[i]);
    // Adding the button to the HTML
    $("#buttons-view").append(btn);
  }
  console.log(topics);
}

$(document).on('click', '.topic', function(event) {
  newMessage.html("Click on an image to play/pause the GIF!");
  var character = $(this).attr('data-name');
  var queryURL = "https://api.giphy.com/v1/gifs/search?q="
                   + character + "&api_key=LJ2ETZ8e0mEtJyVfzhLnoCVqAGArNRiA&limit=10";
  $.ajax({
    url: queryURL,
    method: "GET"
  })
  // After the data comes back from the API
  .done(function(response) {
    console.log(response);
    for (var i = 0; i < response.data.length; i++){
      var gifDiv = $('<div class="gif-div">');
      var img = $('<img>').attr('src', response.data[i].images.fixed_height_still.url);
      img.attr('data-still', response.data[i].images.fixed_height_still.url);
      img.attr('data-animate', response.data[i].images.fixed_height.url);
      img.attr('data-state', 'still');
      img.addClass('gif');
      gifDiv.append(img);
      var rating = $('<div class="rating-div">');
      var str = response.data[i].rating.toUpperCase();
      var p = $('<span>').text("Rating: " + str);
      rating.append(p);
      gifDiv.append(rating);
      // img.attr('src', response.data[i].images.fixed_height);
      $('#gifs-view').prepend(gifDiv);
    }
    // console.log(response.data[0].images.fixed_height);
  });
});

$(document).on('click', '.gif', function(event) {
  console.log(this);
  var state = $(this).attr('data-state');
  if (state === 'still') {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});

// This function handles events where one button is clicked
$("#add-topic").on("click", function(event) {
  // event.preventDefault() prevents the form from trying to submit itself.
  // We're using a form so that the user can hit enter instead of clicking the button if they want
  event.preventDefault();
  // This line will grab the text from the input box
  if ($("#topic-input").val() !== ''){  //Checks to make sure there is valid text
    var topic = $("#topic-input").val().trim(); //.trim() will trim extra white space
    // The topic from the textbox is then added to our array
    topics.push(topic);
  }
  console.log(topic);
  // calling renderButtons which handles the processing of our movie array
  renderButtons();
});


// Calling the renderButtons function at least once to display the initial list of movies
renderButtons();
$('#message-div').text('Use the textbox to add your favorite movie/TV character to the list (who says the "USS Enterprise" isn\'t a valid character? :) )');
newMessage.html('Click on a character button to show related GIF\'s.');
$('#message-div').append(newMessage);

});