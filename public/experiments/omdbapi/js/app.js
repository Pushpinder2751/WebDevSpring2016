//creating an IIFE or Immediately-Invoked Function Expressions to protect the namespace
(function(){
    $(init);

    var $movieTitleTxt;
    var $searchBtn;
    //to grab tbody from searchResults ID. CSS rule
    var $searchResults;
    var $plot;
    var $actors;
    var $title;
    var $poster;
    var $director;
    var SEARCH_URL = "http://www.omdbapi.com/?s=TITLE";
    var DETAILS_URL = "http://www.omdbapi.com/?i=IMDBID"

    function init(){
        //alert("Hello form JQuery");
        $movieTitleTxt = $("#movieTitleTxt");
        $searchBtn = $("#searchBtn");
        $searchResults = $("#searchResults tbody");

        $plot = $("#plot");
        $actors= $("#actors");
        $title= $("#title");
        $poster= $("#poster");
        $director= $("#director");

        $searchBtn.click(searchMovie)
    }

    function searchMovie(){
        var title = $movieTitleTxt.val();
        // to check if the click event works
        //alert("Search for " + title);

        var url = SEARCH_URL.replace("TITLE", title);
        //alert("url " + url);
        $.ajax({
            url: url,
            success: renderSearchResults
        });
    }

    function renderSearchResults(response) {
        //console.log(response);

        var totalResults= response.totalResults;
        var movies = response.Search;
        // this is so that it does not append on previous reslults
        $searchResults.empty();
        for(var m = 0; m < movies.length; m++){
            var movie = movies[m];
            console.log(movie);
            var posterUrl = movie.Poster;
            var title = movie.Title;
            var year = movie.Year;
            var imdbID = movie.imdbID;

            var $tr = $("<tr>")
                .attr("id", imdbID)
                .click(fetchMovieDetails);

            var $img = $("<img>")
                .attr("src", posterUrl)
                .addClass("posterThmb");


            var $td = $("<td>")
                .append($img)
                .appendTo($tr);

            var $td = $("<td>")
                .append(title)
                .appendTo($tr);

            var $td = $("<td>")
                .append(year)
                .appendTo($tr);

            var $td = $("<td>")
                .append(imdbID)
                .appendTo($tr);

            // to add it in the DOM
            $searchResults.append($tr);
        }

    }

    function fetchMovieDetails(event){
        // to debug
        //alert("fetchMovieDetails");
        console.log(event);

        var $tr = $(event.currentTarget);
        // retrieving the id of the movie
        var imdbID = $tr.attr("id");

        var url = DETAILS_URL.replace("IMDBID", imdbID);

        $.ajax({
            url: url,
            //call back functions
            success: renderMovieDetails
        });

    }

    function renderMovieDetails(response){
        console.log(response);

        var actors = response.Actors;
        var title = response.Title;
        var director = response.Director;
        var plot = response.Plot;
        var poster = response.Poster;

        $title.html(title);
        $plot.html(plot);
        $poster.attr("src", poster);
        $director.html(director);

        // this is so that $actors has nothing form previous movies
        $actors.empty();
        var actorArray = actors.split(",");
        for(var a in actorArray){
            var actor = actorArray[a];
            $li = $("<li>").append(actor).appendTo($actors);
        }
    }

})();
