# liri-node-app
**Description:**

 LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters and gives you back data.

**DEMO**
YouTube: https://www.youtube.com/watch?v=vl4foqJEThM&feature=youtu.be

**Overview:**
To run on your machine, clone the repo, and install the node modules using "npm install"

This app lets you do 4 things:

1. search for __*song info*__ on Spotify - (using the Spotify api)
    - format `spotify-this-song <songname>`
    - This will show the following information about the song in your terminal/bash window
        - Artist(s)
        - The song's name
        - A preview link of the song from Spotify
        - The album that the song is from
    - If no song is provided then your program will default to "The Sign" by Ace of Base.

    - Ex. Command 
        - `node liri.js spotify-this-song I want it that way`
    

2. search for __*concerts*__ based on band/artist name - (using the BandsInTown api)
    - format `concert-this <artist/band name>`
    - This will search the Bands in Town Artist Events API for an artist and render the following information about each event to the terminal:
        - Name of the venue
        - Venue location
        - Date of the Event

    - Ex. Command 
        - `node liri.js concert-this mandolin orange`

3. search for __*movie info*__ - (using the omdb api)
    - format `movie-this <movie name>`
    - This will output the following information to your terminal/bash window:
        * Title of the movie.
        * Year the movie came out.
        * IMDB Rating of the movie.
        * Rotten Tomatoes Rating of the movie.
        * Country where the movie was produced.
        * Language of the movie.
        * Plot of the movie.
        * Actors in the movie.
    - If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

    - Ex. Command 
        - `node liri.js movie-this the avengers`

4. do one of the above three by reading the command from the file random.txt
    - format `do-what-it-says`
    
    - Ex. Command 
        - `node liri.js do-what-it-says`
