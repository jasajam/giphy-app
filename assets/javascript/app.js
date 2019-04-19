$(document).ready(function() {
    // var APIKey = OACoqy4IogSdsQAIW3DnQxB3TCf7j3kZ;

    var chosenStyles = [];

    // possible to make this a more generic function? 
// could something selected via jQuery get passed as an argument to the function? 
    // how to make sure empty button doesn't get created? 
    function createStyleButtons() {
        $("#style-buttons").empty();

        for (var i = 0; i < chosenStyles.length; i++) {
            var newStyleButton = $("<button>")
            
            newStyleButton.text(chosenStyles[i]);

            newStyleButton.addClass("style-btn");

            newStyleButton.attr("hairstyle", chosenStyles[i]);

            $("#style-buttons").append(newStyleButton);

        }
    }

    $("#find-style-previews").on("click", function(event) {

        event.preventDefault();

        var newStyle = $("#new-hair").val().trim();

        chosenStyles.push(newStyle);
        console.log(chosenStyles);

        createStyleButtons();

        $("#new-hair").val("");
    })

    function displayStyles() {
        var hairstyle = $(this).attr("hairstyle");

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + hairstyle + "&api_key=OACoqy4IogSdsQAIW3DnQxB3TCf7j3kZ";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            console.log(response);

            var results = response.data;

            var styleExample = $("<div>");

            for (var i = 0; i < 10; i++) {

                // CODE FOR GIF RATING
                var imageRating = results[i].rating;
                // console.log(imageRating);
                var ratingDisplay = $("<p>").text(imageRating);

                $(styleExample).append(ratingDisplay);

                // CODE FOR IMAGE ITSELF
                var styleImage = $("<img>");

                styleImage.attr("src", results[i].images.original_still.url);

                styleImage.attr("data-state", "still");

                styleImage.attr("data-live", results[i].images.original.url);

                styleImage.attr("data-still", results[i].images.original_still.url);

                styleImage.addClass("style-preview");

                $(styleExample).append(styleImage);
            }

            $("#style-previews").prepend(styleExample);
                
        })
    }

    function setStillOrLive() {
        if ($(this).attr("data-state") === "still") {
            $(this).attr("src", $(this).attr("data-live"));
            $(this).attr("data-state", "live");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    }

    $(document).on("click", ".style-btn", displayStyles);

    $(document).on("click", ".style-preview", setStillOrLive);
})


// when the user enters search term, a button for the style gets created
        // grab the user's input term - save value to a variable
            // put the style into an array 
    // loop over the array to create a button for any style therein
        // first, empty the buttons div so that dup buttons aren't created
            // buttons should be created any time that a user does this so that they're always available
            // create a button - should have an attribute with the input term
            // give a class of style-btn or something 
            // append the button to the button (style-buttons) div 
        // see movie button layout activity
            // need to then clear out input on form though - not in activity 
         // see log movie name activity
     // activities from day 2

// when the user clicks a button, 10 gifs get revealed from the giphy API
    // see dynamic elements activity
    // probably response.data of the object response - console.log response to check
        // loop through array which is given in response.data
        // make a p with text of the rating of the image
        // make an image with the source the still image of the image 
            // give attributes of data state="still"?
            // put animated url as attribute, too
            // give a class of image
    // append the images and rating to the images (style-previews) div

// gifs should be still - if get clicked, then switch to animated url
    // if you click the image (event listener function)
        // the src changes to the animated source && state goes to animated
    // if you click again, 
        // src changes to still source && state goes to still 
    // see pausing gifs activty
