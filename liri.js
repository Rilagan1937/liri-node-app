require("dotenv").config();
var Twitter = require("twitter")
var Spotify = require("node-spotify-api")
var request = require("request")
var keys = require("./keys")

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var programToRun = process.argv[2];
var programAction = process.argv[3];

if (programToRun == "my-tweets") {
    myTweets(programAction);
} else if (programToRun == "spotify-this-song") {
    spotifyThisSong(programAction);
} else if (programToRun == "movie-this") {
    movieThis();
} else if (programToRun == "do-what-it-says") {
    doWhatItSays();
} else {
    console.log("you need to specify a program")
}




function myTweets() {

    var params = { screen_name: 'reyzm1937' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            var tweetArr = []
            for (var i = 0; i < tweets.length; i++) {
                tweetArr.push({
                    time: tweets[i].created_at,
                    text: tweets[i].text,
                })
            }
            console.log(tweetArr)
        }
    })
};
function spotifyThisSong(programAction) {

    spotify.search({ type: 'track', query: programAction }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log(data.tracks.items[0].name);
        console.log(data.tracks.items[0].album.name);
        console.log(data.tracks.items[0].artists[0].name);
        console.log(data.tracks.items[0].external_urls.spotify);
    });

};

function movieThis() {
    request("http://www.omdbapi.com/?t=" + programAction + "&y=&plot=short&r=json&apikey=trilogy", function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log("* Title of the movie:         " + JSON.parse(body).Title);
            console.log("* Year the movie came out:    " + JSON.parse(body).Year);
            console.log("* IMDB Rating of the movie:   " + JSON.parse(body).imdbRating);
            console.log("* Country produced:           " + JSON.parse(body).Country);
            console.log("* Language of the movie:      " + JSON.parse(body).Language);
            console.log("* Plot of the movie:          " + JSON.parse(body).Plot);
            console.log("* Actors in the movie:        " + JSON.parse(body).Actors);

        }
    });

};


function doWhatItSays() {
    console.log("running do-what program")
};


