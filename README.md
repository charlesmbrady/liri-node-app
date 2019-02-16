# liri-node-app
**Description:**

 LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters and gives you back data.

**Overview:**

This app lets you do 4 things:
1. search for songnames on Spotify - (using the Spotify api)
    - format `spotify-this-song <songname>`
    - Ex. Command 
        - `node liri.js spotify-this-song I want it that way`
2. search for concerts based on band/artist name - (using the BandsInTown api)
    - format `concert-this <artist/band name>`
    - Ex. Command 
        - `node liri.js concert-this mandolin orange`
3. search for movie info - (using the omdb api)
    - format `movie-this <movie name>`
    - Ex. Command 
        - `node liri.js movie-this the avengers`
4. do one of the above three by reading the command from the file random.txt
    - format `do-what-it-says`
    - Ex. Command 
        - `node liri.js do-what-it-says`
