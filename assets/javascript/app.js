$(document).ready(function() {
    

    var chosenStyles = [];

  
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

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + hairstyle + "&api_key=OACoqy4IogSdsQAIW3DnQxB3TCf7j3kZ&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            console.log(response);

            var results = response.data;

            var styleExample = $("<div>").addClass("full-style-example");

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


