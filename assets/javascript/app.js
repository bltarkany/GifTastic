// global variables
var buttons;
var gifNames = [];
var query = "";
var queryURL = "";
var apiKey = "rYed95HV95nttuves2NhxhXz9ufsBclk";




// global functions
// button production 
function buttonRender() {
    // empty previous array 
    $("#buttons").empty();
    // loop through the gif name array
    for (var i = 0; i < gifNames.length; i++) {
        // button definition and structure
        buttons = $("<button>");
        buttons.addClass("btn btn-outline-info gifSearch");
        buttons.attr('data-type', gifNames[i]);
        buttons.text(gifNames[i]);
        // add buttons to the button array 
        $("#buttons").append(buttons);
        // space between buttons
        $("#buttons").append(" ");
    }
}

// push results into the appropriate div's for appending



// ======================================================================================
// main app logic
// ======================================================================================
$(document).ready(function () {

    $("#search-button").on("click", function (event) {
        // prevents defualt function of the submit button
        event.preventDefault();
        // adds the search input into valid form for the URL
        query = $("#search-input").val().trim();
        // added name to array that produces buttons
        gifNames.push(query);
        console.log(gifNames);
        // add your buttons
        buttonRender();
        // empty search input for new query
        $("#search-input").val("");
    })

    $(document.body).on("click", ".gifSearch", function () {
        var name = $(this).data('type');
        console.log(name);
        // URL components added together for proper format to pull from Giphy site
        queryURL = "https://api.giphy.com/v1/gifs/search?q=" + name + "&api_key=" + apiKey + "&limit=10";
        // call to ajax
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(queryURL);
            console.log(response);
            // results of the search plus the data
            for (var i = 0; i < response.data.length; i++) {
                var gifDiv = $("<div>");
                var gifImage = $("<img>");
                var rating = $("<p>");
                var still = response.data[i].images.fixed_height_still.url
                var animate = response.data[i].images.fixed_height.url
                // add src url to variable
                gifImage.addClass("gifs");
                gifImage.attr("src", still);
                gifImage.attr('data-still', still);
                gifImage.attr('data-animate', animate);
                gifImage.attr('data-state', 'still');
                rating.text("Rating: " + response.data[i].rating);
                gifDiv.append(rating);
                gifDiv.prepend(gifImage);
                // push gifDiv to the DOM
                $("#gifs-display").prepend(gifDiv);

            }


        })

    })

    $(document.body).on("click", ".gifs", function () {
        var state = $(this).attr("data-state");
        console.log(state);

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    })

});