require("dotenv").config();
var keys = require("./keys.js");
var Twitter = require('twitter');
var command = process.argv[2];
var client = new Twitter(keys.twitter);
var params = {screen_name: "@BrandonCoding"};

client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error && response.statusCode === 200) {
        if (command === "my-tweets") {
        for (var i = 0; i < 20; i++) {
            console.log("------------");
            console.log("created at: " + JSON.parse(JSON.stringify(tweets[i])).created_at);
            console.log("Tweet: " + JSON.parse(JSON.stringify(tweets[i])).text);
            }
        }
    }
});

// requireing spotify API and setting up the keys in a variable
// added variables to hold arguements.
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var input = process.argv;
var songArr = [];


// if to check for spotify arguement
// for looped the rest of the arguement "song name" ans pushed it into an array to join it.
if (command === "spotify-this-song" && input) {
    for (var s = 3; s < input.length; s++) {
        songArr.push(input[s]);
        songArr.join();
    }
        spotify
            .search({ type: 'track', query: songArr, limit: 1})
            .then(function(response){
                console.log("artist(s): " + response.tracks.items[0].album.artists[0].name);
                console.log("Song name: " + response.tracks.items[0].name);
                console.log("Preview link: " + response.tracks.items[0].preview_url);
                console.log("Album: " + response.tracks.items[0].album.name);
            })
            .catch(function(err){
                console.log(err);
            });
}
// tried an if (songname) search the song and else inside the if above. but coming up with the same error when i type it this way. saying there is no search query..
if (command === "spotify-this-song" && !songName) {
    spotify 
        .search({ type: 'track', query: 'The Sign', limit: 1})
        .then(function(response){
            console.log("artist(s): " + response.tracks.items[0].album.artists[0].name);
            console.log("Song name: " + response.tracks.items[0].name);
            console.log("Preview link: " + response.tracks.items[0].preview_url);
            console.log("Album: " + response.tracks.items[0].album.name);
        })
        .catch(function(err){
            console.log(err);
        });
}

var request = require("request");
var movieArr = [];

if (command === "movie-this" && input) {
    for (var m = 3; m < input.length; m++) {
        movieArr.push(input[m]);
        movieArr.join("+");
    }
    request("http://www.omdbapi.com/?t="+ movieArr +"&y=&plot=short&apikey=trilogy", function(error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Year of release: " + JSON.parse(body).Year);
            console.log("ImdbRating: " + JSON.parse(body).imdbRating);
            console.log("Rotten tomatoes rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Produced in: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
        }
    });
}else if (command === "movie-this") {
    request("http://www.omdbapi.com/?t=Mr.+Nobody&y=&plot=short&apikey=trilogy", function(error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log(JSON.parse(body));
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Year of release: " + JSON.parse(body).Year);
            console.log("ImdbRating: " + JSON.parse(body).imdbRating);
            console.log("Rotten tomatoes rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Produced in: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
        }
    });
}

var fs = require('fs');
var randomArr = [];

if (command === "do-what-it-says") {
fs.readFile("random.txt", "utf8", function(err,data) {
    if(err) {
      return console.log("Error occured: " + err);
    }
    randomArr.push(data);
    //console.log(randomArr);
    // tried to spotify search the song. says i need to input my credentials but they are saved in the spotify variable.
    spotify
        .search({ type: 'track', query: randomArr[1], limit: 1})
        .then(function(response){
            console.log("artist(s): " + response.tracks.items[0].album.artists[0].name);
            console.log("Song name: " + response.tracks.items[0].name);
            console.log("Preview link: " + response.tracks.items[0].preview_url);
            console.log("Album: " + response.tracks.items[0].album.name);
        })
        .catch(function(err){
            console.log(err);
        });
})
}