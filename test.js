const request = require('request'); // "Request" library
const readline = require("readline-sync")

const client_id = '5352be5b021042188d2c62155df50f5d'; // Your client id
const client_secret = '2d83ee2f9cc84e60b54e0aeb5f0e1f3d'; // Your secret

// your application requests authorization
const authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

const spotifySearch = (username) =>  request.post(authOptions, function(error, response, body) {
  if (!error && response.statusCode === 200) {

    // use the access token to access the Spotify Web API

    var token = body.access_token;
    var options = {
      url: 'https://api.spotify.com/v1/users/' + username,
      headers: {
        'Authorization': 'Bearer ' + token
      },
      json: true
    };
    request.get(options, function(error, response, body) {
      console.log(body);
    });
  }
});

const spotifySearchArtist = (name) =>  request.post(authOptions, function(error, response, body) {
  if (!error && response.statusCode === 200) {

    // use the access token to access the Spotify Web API

    var token = body.access_token;
    var options = {
      url: 'https://api.spotify.com/v1/search?q=' + name + '&type=artist',
      headers: {
        'Authorization': 'Bearer ' + token
      },
      json: true
    };
    request.get(options, function(error, response, body) {
      console.log(body);
    });
  }
});



console.log("Enter a spotify username?");
const username = readline.question("> ");
spotifySearch(username);

console.log("Enter an artist name")
let name = readline.question("> ");
spotifySearchArtist(name);