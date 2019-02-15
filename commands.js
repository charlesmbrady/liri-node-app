require("dotenv").config();
module.exports = {
    concertThis: function(artist){
        console.log("You searched for artist: " + artist);
    },

    movieThis: function(movie){
        console.log("You searched for movie: " + movie);
    },

    spotifyThisSong: function(song){
        console.log("You searched for sond: " + song);
    },

    doWhatItSays: function(){
        console.log("You said to do what it says...");
    }
}