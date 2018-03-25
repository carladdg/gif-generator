
var gifGenerator = {
    queryURL: "https://api.giphy.com/v1/gifs/search",
    
    topics: ["dog", "cat", "blue whale", "eagle", "horse", "antelope", "fox", "giraffe", "iguana", "jaguar"],

    renderButtons: function() {
        this.topics.sort();

        $("#buttons").empty();
        for (var i = 0; i < this.topics.length; i++) {
            $("<button>").text(this.topics[i]).addClass("gif-button").appendTo($("#buttons"));
        }
    },

    renderGifs: function(keyword) {
        $.ajax({
            url: this.queryURL,
            data: {
                api_key: "1fVh94bFgEPdAgl2HKwRYDpCLT6aJSLk",
                q: keyword,
                limit: 10
            },
            method: 'GET'
        }).then(function(response) {
            $("#gifs").empty();

            for (var i = 0; i < response.data.length; i++) {
                var newGif = $("<div>").appendTo("#gifs");

                var rating = $("<p>").appendTo(newGif);
                if (response.data[i].rating) {
                    rating.text("Rating: " + response.data[i].rating.toUpperCase());
                } else {
                    rating.text("Rating: None");
                }
                    
                $("<img>").addClass("gif").attr({
                    src: response.data[i].images.fixed_height_still.url,
                    alt: keyword + " GIF",
                    state: "still",
                    still: response.data[i].images.fixed_height_still.url,
                    animated: response.data[i].images.fixed_height.url,
                    id: keyword
                }).appendTo(newGif);
            }
        });
    },

    addButton: function(newButtonText) {
        if (this.topics.indexOf(newButtonText) === -1) {
            $("#new-button-text").val("");
            this.topics.push(newButtonText);
            this.renderButtons();
        } else {
            $("#new-button-text").select();
            $("<p>").addClass("error-text").text("That button already exists!").appendTo(".add-form");
        }
    },

    animateGif: function(gif) {
        $(gif).attr({
            src: $(gif).attr("animated"),
            state: "animated"
        });
    },

    pauseGif: function(gif) {
        $(gif).attr({
            src: $(gif).attr("still"),
            state: "still"
        });
    }
}

gifGenerator.renderButtons();

$(document).on("click", ".gif-button", function() {
    var keyword = $(this).text();
    gifGenerator.renderGifs(keyword);
})

$("#add-button").on("click", function() {
    event.preventDefault();
    var newButtonText = $("#new-button-text").val().trim().toLowerCase();
    if (newButtonText) {
        gifGenerator.addButton(newButtonText);
    }
})

/* If animate on click desired, use this code
$(document).on("click", ".gif", function() {
    if ($(this).attr("state") === "still") {
        gifGenerator.animateGif(this);
    } else {
        gifGenerator.pauseGif(this);
    }
}) */

// If animate on hover desired, use this code
$(document).on({
    mouseenter: function() {
        gifGenerator.animateGif(this);
    },
    mouseleave: function() {
        gifGenerator.pauseGif(this);
    }
}, ".gif")