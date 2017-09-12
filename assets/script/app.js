
$(document).ready(function(){
  
var animals = ["cats", "dogs", "turtles", "lions", "tigers", "dolphins","horses", "snakes", "goldfish", "elephants", "frogs", "parrots"];



//=========== FUNCTION CREATE BUTTONS ============//

function renderButtons() {

$("#buttons-view").empty();

        for (var i = 0; i < animals.length; i++) {

          var a = $("<button>");
    
          a.addClass("animal");

          a.attr("data-animal", animals[i]);
 
          a.text(animals[i]);
   
          $("#buttons-view").prepend(a);
        }
}



$("#add-animal").on("click", function(event) {
    event.preventDefault();

var animal = $("#animal-input").val().trim();

if (animal != ""){

animals.push(animal);

$("#animal-input").val("");

renderButtons();
} 


});


function getGifs() {
	console.log("button Clicked");

	 $("#gifsAppearHere").empty();	

	 console.log("div is empty");

	 
      var animal = $(this).attr("data-animal");


      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=dc6zaTOxFJmzC&limit=10";

      $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {

          var results = response.data;
          
          console.log(response.data);

          for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div class='item'>");

            var rating = results[i].rating;

            var p = $("<p class='label'>").text("Rating: " + rating);

            var animalImage = $("<img>");

            animalImage.addClass("gif");

            animalImage.attr("src", results[i].images.fixed_height_still.url);

            animalImage.attr("data-still", results[i].images.fixed_height_still.url);

            animalImage.attr("data-animate", results[i].images.fixed_height.url);

            animalImage.attr("data-state", "still");


            gifDiv.prepend(p);
            gifDiv.prepend(animalImage);

            $("#gifsAppearHere").append(gifDiv);
          }
      });
   
}

//======== still working on this ===========

function activateGif(){
	console.log("item has been clicked");

var state = $(this).attr("data-state");

console.log(state);

if (state === "still"){

 	$(this).attr("src", $(this).attr("data-animate"));

    $(this).attr("data-state", "animate");

} else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");

        }

}

//======== still working on this ===========

$(document).on("click", ".animal", getGifs); 

$(document).on("click", ".gif", activateGif);

renderButtons();
  
}); //end of Doc Ready
