require("dotenv").config();
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var fs = require("fs");
var commands = require("./commands");
var command = process.argv[2];
var input = process.argv[3];

switch (command) {
    case "concert-this":
        commands.concertThis(input);
        break;
    case "spotify-this-song":
        commands.spotifyThisSong(input);
        break;
    case "movie-this":
        commands.movieThis(input);
        break;
    case "do-what-it-says":
        commands.doWhatItSays();
        break;
    default:
        console.log("Please enter a valid command...");
        break;
}

