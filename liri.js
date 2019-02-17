/*______________________Dependencies / variables_____________________________*/
    require("dotenv").config();
    var Spotify = require('node-spotify-api');
    var keys = require("./keys.js");
    var axios = require("axios");
    var fs = require("fs");
    var moment = require("moment");

    var spotify = new Spotify(keys.spotify);
    var command = process.argv[2];
/*_________________________________________________________________________*/

///////////////// Handle Multiword Input/////////////
    var arguments = process.argv;
    var inputWords = [];
    var input = "";

    for (var i = 3; i < arguments.length; i++) {
        inputWords.push(arguments[i]);
    }
    input = inputWords.join(" ");
/*_________________________________________________________________________*/

//Switch statement for the different commands
switch (command) {
    case "concert-this":
        concertThis(input);
        break;
    case "spotify-this-song":
        spotifyThisSong(input);
        break;
    case "movie-this":
        movieThis(input);
        break;
    case "do-what-it-says":
        doWhatItSays();
        break;
    default:
        console.log("Please enter a valid command...");
        break;
}



//__________________________    Functions   ____________________________//
//TODO:limiting API responses
function concertThis(artist) {
    //first log the command to the log.txt file
    fs.appendFile("log.txt", "**********************************************************" + "\r\n\n" + process.argv.slice(2).join(" ") + ", "  + '\r\n\n', function(err){
        if(err){
            console.log("there was an error");
        }
    });
    console.log("You searched for artist: " + artist);

    /*_____________________ Bands In Town API call___________________*/
    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    axios.get(queryUrl).then(function (response) {
        var events = response.data;

    //loop through each event in the response and log the Artist Name, Venue Name, and Venue City
        events.forEach(function (event) {
            console.log("****************************************************************************************");
            console.log("Artist: " + artist);
            console.log("________________________________________");
            console.log("Venue: " + event.venue.name);
            console.log("________________________________________");
            console.log("Venue Location: " + event.venue.city);
            console.log("________________________________________");

            var convertedDate = moment(event.datetime, "YYYY-MM-DDTHH:mm:ss")
            console.log("Date: " + convertedDate.format("MMM do hh:mm a"));
            console.log("****************************************************************************************");

            //log each result to log.txt
            fs.appendFile("log.txt", "Artist: " + artist + '\r\n\n' + "Venue: " + event.venue.name + '\r\n\n' + "Venue Location: " + event.venue.city + '\r\n\n' + "Date: " + convertedDate.format("MMM do hh:mm a") + '\r\n\n' + "_____________________________________________________________________________" + '\r\n\n', function(err){
                if(err){
                    console.log("there was an error");
                }
            });
        });
    });
}

function movieThis(movie) {
    //first log the command to the log.txt file
    fs.appendFile("log.txt", "****************************************************************************************" + '\r\n\n' + process.argv.slice(2).join(" ") + ", " + '\r\n\n', function(err){
        if(err){
            console.log("there was an error");
        }
    });

    //return default movie data for Mr. Nobody if no movie is declared
    if (!movie) {
        movie = "Mr. Nobody";
    }

    var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

    axios.get(queryUrl).then(function (response) {
        console.log("****************************************************************************************");
        console.log("You searched for movie: " + movie);
        console.log("\r\n");
        console.log("Title: " + response.data.Title);
        console.log("\r\n");
        console.log("Release Year: " + response.data.Year);
        console.log("\r\n");    
        console.log("IMDB Rating: " + response.data.imdbRating);
        console.log("\r\n");
        console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
        console.log("\r\n");
        console.log("Country where produced: " + response.data.Country);
        console.log("\r\n");
        console.log("Language: " + response.data.Language);
        console.log("\r\n");
        console.log("Plot: " + response.data.Plot);
        console.log("\r\n");
        console.log("Actors: " + response.data.Actors);
        console.log("****************************************************************************************");

        //log the search result to log.txt
        fs.appendFile("log.txt", "You searched for movie: " + movie + "\r\n" + "Title: " + response.data.Title + "\r\n" + "Release Year: " + response.data.Year + "\r\n\n" + "IMDB Rating: " + response.data.imdbRating + "\r\n\n" + "Rotten Tomatoes Rating: " + response.data.Ratings[1].Value + "\r\n\n" + "Country where produced: " + response.data.Country + "\r\n\n" + "Language: " + response.data.Language + "\r\n\n" + "Plot: " + response.data.Plot + "\r\n\n" + "Actors: " + response.data.Actors + "\r\n\n", function(err){
            if(err){
                console.log("there was an error");
            }
        });
    }).catch(function (err) {
        console.log("There was an error: " + err);
    });//TODO: why does this not work?

}

function spotifyThisSong(song) {
    //first log the command to the log.txt file
    fs.appendFile("log.txt", "****************************************************************************************" + '\r\n\n' + process.argv.slice(2).join(" ") + ", "  + '\r\n\n', function(err){
        if(err){
            console.log("there was an error");
        }
    });

    /*if(!song){
        spotify.request("https://api.spotify.com/v1/search/q=the+sign%20artist:ace+of+base").then(function (response) {
            
            console.log(response);
            //console.log(data.tracks); //log that song search result
            return 0;
        });
    }*/
    //TODO: make this default request work
    console.log("________________________________________");
    console.log("You searched for song: " + song);
    console.log("________________________________________");

    spotify.search({ type: 'track', query: song, limit: 2 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        var results = data.tracks.items;
        //console.log(data.tracks); //log that song search result
        results.forEach(function (track, i) {
            console.log("Track " + (i + 1));
            var artists = track.artists;
            console.log("\r\n");
            var temp = [];

            console.log("Artist(s):");
            artists.forEach(function (artist) {
                console.log("--" + artist.name);
                temp.push(artist.name);
            });
            temp.join(", ");
            console.log("\r\n");

            var trackName = track.name
            console.log("Track name: " + trackName);
            console.log("\r\n");

            var trackAlbum = track.album.name;
            console.log("Album: " + trackAlbum);
            console.log("__________________________________");

            var previewURL = track.preview_url;
            if (previewURL == null) {
                previewURL = "No preview available";
            }
            console.log("Preview URL: " + previewURL);
            console.log("__________________________________");

            //append results to log.txt
            fs.appendFile("log.txt", "Track " + (i + 1) + "\r\n\n" + "Artist(s): " + temp + "\r\n\n" + "Track name: " + trackName + "\r\n\n" + "Album: " + trackAlbum + "\r\n\n" + "Preview URL: " + previewURL + "\r\n\n" + "_______________________________________________________" + "\r\n\n" , function(err){
                if(err){
                    console.log("there was an error");
                }
            });
            
        });
    });
}

function doWhatItSays() {
    //first log the command to the log.txt file
    /*fs.appendFile("log.txt", "****************************************************************************************" + '\r\n\n' + process.argv.slice(2).join(" ") + ", "  + '\r\n\n', function(err){
        if(err){
            console.log("there was an error");
        }
    });*/
    console.log("You said to do what it says...");
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            console.log("There was an error: " + error);
            return 0;
        }

        var inputs = data.split(",")
        command = inputs[0];
        input = inputs[1];

        switch (command) {
            case "concert-this":
                concertThis(input);
                break;
            case "spotify-this-song":
                spotifyThisSong(input);
                break;
            case "movie-this":
                movieThis(input);
                break;
            case "do-what-it-says":
                doWhatItSays();
                break;
            default:
                console.log("Please enter a valid command...");
                break;
        }
    });
}