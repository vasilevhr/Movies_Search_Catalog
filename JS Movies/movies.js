function Movie(data) {
    this.title = ko.observable(data.Title);
    this.poster = ko.observable(data.Poster);
    this.posterLink = data.Poster;
}

function MovieListViewModel() {
    var self = this;
    self.movies = ko.observableArray([]);
    self.noResults = ko.observable(false);

    self.getMovies = function() { 
        var uri = GetUri();
        self.movies.removeAll();
        $.getJSON(uri, function(allData) {
            if (allData.Search != undefined) {
                var length = (allData.Search.length >= 3) ? 3 : allData.Search.length;
                for(i = 0; i < length; i++) {
                    var item = allData.Search[i];
                    var movie = new Movie(item);
                    if(movie != null) {
                        self.movies.push(movie);
                    }
                }
                self.noResults(false);
            }
            else {
                self.noResults(true);
            }
        });
    }
}

function GetUri () {
    var dbUri = "http://www.omdbapi.com/?apikey=c72ab2eb&s=";
    var param = document.getElementById("tbSearch").value;
    return dbUri + param;
}


function openPage(url) {
    window.open(url);
}

ko.applyBindings(new MovieListViewModel());
